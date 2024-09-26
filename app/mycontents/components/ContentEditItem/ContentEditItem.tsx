"use client"

import { ActivityIndicator } from "@/app/_components/ActivityIndicator/ActivityIndicator";
import { updateContentData } from "@/app/_services/Content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
    data: Prisma.ContentGetPayload<{ include: { Episodes: true } }>
    reloadContents: () => void;
}
export function ContentEditItem({ data, reloadContents }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);

    async function handleSaveContentData(){
        setLoading(true);
        try{
            await updateContentData({
                contentId: data.id,
                title,
                description
            });
            toast.success('Alterações salvas com sucesso!');
            reloadContents();
        }catch(e){
            console.log(e);
            toast.error('Erro ao atualizar as informações!')
        }finally{
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="w-[50%] flex p-3 rounded-md bg-green-900 gap-3">
                <Image
                    src={data.postUrl}
                    alt="Post do conteúdo"
                    width={120}
                    height={150}
                    className="rounded-md border-2 border-white w-[120px] h-[150px] object-cover"
                />

                <div className="flex flex-col gap-1 items-start">
                    <h4 className="font-bold text-white text-xl">{data?.title}</h4>
                    <p className="text-white">{data.description}</p>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar conteúdo</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col">
                    <label className="text-black">Título:</label>
                    <input
                        className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                        placeholder="Digite aqui"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="text-black mt-5">Descrição:</label>
                    <input
                        className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                        placeholder="Digite aqui"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        className="w-full h-10 mt-5 rounded-md bg-green-500 flex items-center justify-center text-white"
                        onClick={handleSaveContentData}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size={30}/>
                        ) : 'Salvar alterações'}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}