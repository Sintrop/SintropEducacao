"use server"
import { api } from "./api";

export interface ContentProps {
    id: string
    title: string
    description: string
    type: string
    totalPlays: number
    totalWeek: number
    totalMiliseconds: number
    gender: string
    author: string
    fileServer: string
    postUrl: string
    emphasis: boolean
    createdAt: string;
    launchedAt: string;
    category: string

    Episodes: EpisodeProps[];
}

export interface EpisodeProps {
    id: string
    title: string
    description: string
    season: string
    contentId: string
    fileServer: string
    numberEp: number
    postUrl: string
    totalMiliseconds: number
    createdAt: string
    launchedAt: string
}

interface ReturnGetContentsProps{
    contents: ContentProps[];
    trainings: ContentProps[];
    mostSeen: ContentProps[];
    ebooks: ContentProps[];
    top10: ContentProps[];
    emphasis: ContentProps | null
}
export async function getContents(): Promise<ReturnGetContentsProps> {
    const response = await api.get('/content');
    const {contents, trainings, mostSeen, ebooks, top10} = response.data as ReturnGetContentsProps;

    const filterEmphasis = contents.filter(item => item.emphasis === true);

    return{
        contents,
        trainings,
        mostSeen,
        ebooks,
        top10,
        emphasis: filterEmphasis.length > 0 ? filterEmphasis[0] : null,
    }
}