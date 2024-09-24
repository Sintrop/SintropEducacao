"use server"
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface ContentProps {
    id: string;
    title: string;
    description: string;
    type: string;
    totalPlays: number;
    totalWeek: number;
    author: string;
    urlContent: string;
    postUrl: string;
    emphasis: boolean
    createdAt: string;
    platformHost: string;

    Episodes: EpisodeProps[];
}

export interface EpisodeProps {
    id: string
    title: string
    description: string
    season: string
    contentId: string
    urlContent: string
    platformHost: string;
    numberEp: number
    postUrl: string
    createdAt: string
}

interface ReturnGetContentsProps {
    contents: Prisma.ContentGetPayload<{include: {Episodes: true}}>[];
    trainings: Prisma.ContentGetPayload<{include: {Episodes: true}}>[];
    mostSeen: Prisma.ContentGetPayload<{include: {Episodes: true}}>[];
    ebooks: Prisma.ContentGetPayload<{}>[];
    top10: Prisma.ContentGetPayload<{include: {Episodes: true}}>[];
    emphasis: Prisma.ContentGetPayload<{include: {Episodes: true}}> | null;
}
export async function getContents(): Promise<ReturnGetContentsProps> {
    const contents = await prisma.content.findMany({
        include:{
            Episodes: true
        }
    });

    const filterEmphasis = contents.filter(item => item.emphasis === true);

    const trainingsContents = await prisma.content.findMany({
        where:{
            category: 'trainning',
        },
        orderBy: {
            createdAt: 'desc'
        },
        include:{
            Episodes: true
        }
    });

    const mostSeen = await prisma.content.findMany({
        orderBy:{
            totalPlays: 'desc',
        },
        include:{
            Episodes: true
        }
    });

    const top10Week = await prisma.content.findMany({
        orderBy:{
            totalWeek: 'desc',
        },
        include:{
            Episodes: true
        }
    })

    const ebooks = await prisma.content.findMany({
        where:{
            type: 'ebook',
        },
        orderBy:{
            createdAt: 'desc',
        }
    });

    return{
        contents,
        ebooks,
        emphasis: filterEmphasis.length > 0 ? filterEmphasis[0] : null,
        mostSeen,
        top10: top10Week,
        trainings: trainingsContents
    }
}

interface ReturnGetContentProps {
    contentData?: Prisma.ContentGetPayload<{
        include:{
            Episodes: true
        }
    }>;
    error?: boolean;
}
export async function getContentData(id: string): Promise<ReturnGetContentProps> {
    const contentData = await prisma.content.findUnique({
        where: {
            id,
        },
        include: {
            Episodes: true,
        }
    })
    
    if(contentData){
        return {
            contentData,
            error: false
        }
    }else{
        return{
            error: true
        }
    }
}

interface CreateContentProps{
    title: string;
    description: string;
    postUrl: string;
    type: string;
    urlContent: string;
    category: string;
    author: string;
    platformHost: string;

}
interface ReturnCreateContentProps{
    error: boolean;
}
export async function createContent(data: CreateContentProps): Promise<ReturnCreateContentProps>{
    const {author, type, category, description, platformHost, postUrl, title, urlContent} = data;
    
    try{
        const createdContent = await prisma.content.create({
            data:{
                author,
                category,
                description,
                platformHost,
                postUrl,
                title,
                type,
                urlContent
            }
        });

        return{
            error: false,
        }
    }catch(e){
        return{
            error: true,
        }
    }
}