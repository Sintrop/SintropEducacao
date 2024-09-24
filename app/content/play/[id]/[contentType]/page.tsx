"use client"
import { getContentData } from "@/app/_services/Content";
import { useEffect, useState } from "react";

interface Props {
    params: {
        id: string;
        contentType: 'movie' | 'serie' | 'ebook'
    }
}

export default function PlayContent({ params }: Props) {
    const [embedUrl, setEmbedUrl] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData(){
        const {contentData} = await getContentData(params.id);

        if(params.contentType === 'movie'){
            if(contentData?.platformHost === 'youtube'){
                fixUrlEmbedYoutube(contentData.urlContent);
            }
        }
    }

    function fixUrlEmbedYoutube(url: string) {
        if (!url) {
            return;
        }

        const split = url.split('/');
        const idVideo = split[split.length - 1];
        const newUrl = `https://www.youtube.com/embed/${idVideo}`;
        setEmbedUrl(newUrl);
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary">
            {embedUrl === '' ? (
                <div className="flex justify-center items-center w-full h-full">
                    <p className="font-bold text-white text-2xl">Carregando conteúdo...</p>
                </div>
            ) : (
                <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    allowFullScreen
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
            )}
        </div>
    )
}