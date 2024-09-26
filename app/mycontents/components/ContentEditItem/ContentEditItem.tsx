"use client"

import { ActivityIndicator } from "@/app/_components/ActivityIndicator/ActivityIndicator";
import { deleteContent, updateContentData } from "@/app/_services/Content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { ConfirmDelete } from "../ConfirmDelete/ConfirmDelete";

interface Props {
    data: Prisma.ContentGetPayload<{ include: { Episodes: true } }>
    reloadContents: () => void;
}
export function ContentEditItem({ data, reloadContents }: Props) {
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [confirmDelete, setConfirmDelete] = useState(false);

    async function handleSaveContentData() {
        setLoading(true);
        try {
            await updateContentData({
                contentId: data.id,
                title,
                description
            });
            toast.success('Alterações salvas com sucesso!');
            reloadContents();
        } catch (e) {
            console.log(e);
            toast.error('Erro ao atualizar as informações!')
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteContent() {
        setConfirmDelete(false);
        if(loadingDelete){
            return;
        }

        setLoadingDelete(true);
        const success = await deleteContent({
            contentId: data.id,
            contentType: data.type,
        });

        if(success){
            toast.success('Conteúdo excluido com sucesso!');
        }else{
            toast.error('Erro ao tentar excluir o seu conteúdo!')
        }
        setLoadingDelete(false);
        reloadContents();
    }

    return (
        <>
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
                                <ActivityIndicator size={30} />
                            ) : 'Salvar alterações'}
                        </button>

                        <button
                            className="w-full h-10 mt-5 rounded-md bg-red-500 flex items-center justify-center text-white"
                            onClick={() => setConfirmDelete(true)}
                            disabled={loadingDelete}
                        >
                            {loading ? (
                                <ActivityIndicator size={30} />
                            ) : 'Excluir conteúdo'}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={confirmDelete}
                onOpenChange={(open) => setConfirmDelete(open)}
            >
                <ConfirmDelete
                    cancel={() => setConfirmDelete(false)}
                    confirm={handleDeleteContent}
                    message="Deseja realmente excluir esse conteúdo?"
                />
            </Dialog>
        </>
    )
}