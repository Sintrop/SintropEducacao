import { CreateEpisodeProps } from "@/app/_services/Content";
import { useState } from "react";

interface Props {
    createNew?: boolean;
    data?: CreateEpisodeProps;
    addEp: (data: CreateEpisodeProps) => void;
    cancelAdd: () => void;
}

export function CreateEpisodeItem({ createNew, data, addEp, cancelAdd }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [urlContent, setUrlContent] = useState('');
    const [urlPost, setUrlPost] = useState('');

    function handleAddEp() {
        if (!title.trim()) {
            return;
        }
        if (!description.trim()) {
            return;
        }
        if (!urlContent.trim()) {
            return;
        }

        addEp({ title, description, urlContent, urlPost });
    }

    if (createNew) {
        return (
            <div
                className="flex gap-2 w-full border rounded-md p-3 bg-gray-300"
            >
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm text-black">Título do espisódio:</label>
                    <input
                        className="w-full h-10 border rounded-md px-3 text-black"
                        placeholder="Digite aqui"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="text-sm text-black mt-2">Descrição do espisódio:</label>
                    <input
                        className="w-full h-10 border rounded-md px-3 text-black"
                        placeholder="Digite aqui"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label className="text-sm text-black mt-2">Url do vídeo:</label>
                    <input
                        className="w-full h-10 border rounded-md px-3 text-black"
                        placeholder="Digite aqui"
                        value={urlContent}
                        onChange={(e) => setUrlContent(e.target.value)}
                    />

                    <button 
                        className="mt-2 w-full h-10 rounded-md bg-green-500 text-white font-semibold"
                        onClick={handleAddEp}
                    >
                        Adicionar EP
                    </button>

                    <button className="w-full mt-2 text-black" onClick={cancelAdd}>
                        Cancelar
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div
            className="flex gap-2 w-full border rounded-md p-3 bg-gray-300"
        >
            <div className="flex flex-col gap-1 w-full">
                <p className="font-bold text-black text-sm">{data?.title}</p>
                <p className="text-black text-sm">{data?.description}</p>
                <p className="text-black text-sm">{data?.urlContent}</p>
            </div>
        </div>
    )
}