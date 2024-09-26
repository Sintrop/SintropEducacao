"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoginWithWalletAndPassword, UserProps } from "@/app/_services/Auth";
import { toast } from "react-toastify";
import Image from "next/image";
import { createContent, createEpisode, CreateEpisodeProps } from "@/app/_services/Content";
import { uploadImage } from "@/app/_services/UploadImage";
import { uploadPdf } from "@/app/_services/UploadPdf";
import { CreateEpisodeItem } from "./components/CreateEpisodeItem";
import { ActivityIndicator } from "../ActivityIndicator/ActivityIndicator";

export function CreateContent() {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wallet, setWallet] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({} as UserProps);
    const [step, setStep] = useState(1);
    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentImage, setContentImage] = useState<Blob>();
    const [contentImagePreview, setContentImagePreview] = useState('');
    const [contentType, setContentType] = useState<'movie' | 'serie' | 'ebook'>('movie');
    const [contentHost, setContentHost] = useState<'youtube'>('youtube');
    const [contentUrl, setContentUrl] = useState('');
    const [contentPdf, setContentPdf] = useState<Blob>();
    const [contentEpisodes, setContentEpisodes] = useState<CreateEpisodeProps[]>([]);
    const [disablePreviousStep, setDisablePreviousStep] = useState(false);
    const [disableNextStep, setDisableNextStep] = useState(false);
    const [createNewEpisode, setCreateNewEpisode] = useState(false);

    useEffect(() => {
        toggleActiveButtonsStep();
    }, [
        step,
        contentDescription,
        contentImagePreview,
        contentTitle,
        contentType,
        contentUrl,
        contentPdf,
        contentEpisodes
    ]);

    function toggleActiveButtonsStep() {
        //Previous button---------------------------
        if (step === 1) {
            setDisablePreviousStep(true);
        } else {
            setDisablePreviousStep(false);
        }

        //Next button-------------------------------
        if (step === 1) {
            if (!contentTitle.trim() || !contentDescription.trim() || !contentImagePreview.trim()) {
                setDisableNextStep(true);
            } else {
                setDisableNextStep(false);
            }
        }

        if (step === 2) {
            if (contentType === 'movie') {
                if (!contentUrl.trim()) {
                    setDisableNextStep(true)
                } else {
                    setDisableNextStep(false);
                }
                return;
            }

            if (contentType === 'ebook') {
                if (!contentPdf) {
                    setDisableNextStep(true)
                } else {
                    setDisableNextStep(false);
                }
                return;
            }

            setDisableNextStep(false);
        }

        if(step === 3){
            if(contentType === 'serie'){
                if(contentEpisodes.length === 0){
                    setDisableNextStep(true);
                }else{
                    setDisableNextStep(false)
                }
            }
        }

        if (step === 4) {
            setDisableNextStep(true);
        }
    }

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);
        const response = await LoginWithWalletAndPassword(wallet, password);

        if (response?.error) {
            if (response.message === 'User not found') {
                toast.error('Usuário não cadastrado');
            }
            if (response.message === 'Password incorrect') {
                toast.error('Senha incorreta');
            }
            if (response.message === 'User deleted') {
                toast.error('Essa conta foi excluida');
            }
            setLoading(false);
            return;
        }
        if (response?.user) {
            setUserData(response.user);
        }
        setLoading(false);
    }

    async function handleCreateContent() {
        if (loading) {
            return;
        }

        setLoading(true);
        const postUrl = await uploadImage({ file: contentImage });

        let urlContent = '';
        if (contentType === 'movie') {
            urlContent = contentUrl;
        }

        if (contentType === 'ebook') {
            const urlPdf = await uploadPdf({ file: contentPdf });
            urlContent = urlPdf;
        }

        const response = await createContent({
            title: contentTitle,
            author: userData?.wallet,
            category: 'common',
            description: contentDescription,
            platformHost: contentHost,
            postUrl,
            type: contentType,
            urlContent
        });

        if (response.error) {
            toast.error('Erro ao criar seu conteudo');
            setLoading(false);
            return;
        }

        if (contentType === 'serie') {
            for (var i = 0; i < contentEpisodes.length; i++) {
                const ep = contentEpisodes[i];
                await createEpisode({
                    contentId: response.contentId,
                    title: ep.title,
                    description: ep.description,
                    urlContent: ep.urlContent,
                    platformHost: contentHost,
                    postUrl,
                    numberEp: i + 1,
                    season: '1'
                })
            }
        }

        toast.success('Conteúdo criado com sucesso!');
        setLoading(false);
        setOpenDialog(false);
    }

    function addEp(data: CreateEpisodeProps) {
        setContentEpisodes([...contentEpisodes, data])
        setCreateNewEpisode(false)
    }

    function handleSelectContentImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const urlPreview = URL.createObjectURL(file);
            setContentImagePreview(urlPreview);
            setContentImage(file);
        }
    }

    function handleSelectContentPdf(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setContentPdf(file);
        }
    }

    function handleNextStep() {
        if (step === 2) {
            if (contentType !== 'serie') {
                setStep(4);
                return;
            }
        }
        setStep(value => value + 1);
    }

    function handlePreviousStep() {
        if (step === 4) {
            if (contentType !== 'serie') {
                setStep(2);
                return;
            }
        }
        setStep(value => value - 1);
    }

    return (
        <Dialog  open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
            <DialogTrigger className="w-10 h-10 bg-red-500 bottom-5 right-5 fixed">
            
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Criar conteúdo</DialogTitle>
                </DialogHeader>

                {userData.name ? (
                    <>
                        {step === 1 && (
                            <div className="flex flex-col">
                                <label className="mt-10 text-black">Título do conteúdo</label>
                                <input
                                    className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                                    placeholder="Digite aqui"
                                    value={contentTitle}
                                    onChange={(e) => setContentTitle(e.target.value)}
                                    required
                                />

                                <label className="mt-4 text-black">Descrição do conteúdo</label>
                                <input
                                    className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                                    placeholder="Digite aqui"
                                    value={contentDescription}
                                    onChange={(e) => setContentDescription(e.target.value)}
                                    required
                                />

                                <label className="mt-4 text-black">Foto de capa</label>
                                <input
                                    className="w-full text-black"
                                    placeholder="Selecione uma imagem"
                                    onChange={handleSelectContentImage}
                                    type="file"
                                    accept="image/*"
                                />

                                {contentImagePreview !== '' && (
                                    <Image
                                        src={contentImagePreview}
                                        alt='Imagem de capa'
                                        width={300}
                                        height={500}
                                        className="w-[150px] h-[200px] rounded-md object-cover mt-5"
                                    />
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex flex-col">
                                <label className="mt-10 text-black">Tipo do conteúdo</label>
                                <select
                                    className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                                    value={contentType}
                                    onChange={(e) => setContentType(e.target.value as typeof contentType)}
                                >
                                    <option value='movie'>Filme</option>
                                    <option value='serie'>Série</option>
                                    <option value='ebook'>E-book</option>
                                </select>

                                {contentType === 'ebook' ? (
                                    <>
                                        <label className="mt-4 text-black">Selecione o arquivo</label>
                                        <input
                                            className="w-full text-black"
                                            placeholder="Selecione uma imagem"
                                            onChange={handleSelectContentPdf}
                                            type="file"
                                            accept="application/pdf"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <label className="mt-4 text-black">Provedor do conteúdo</label>
                                        <select
                                            className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                                            value={contentHost}
                                            onChange={(e) => setContentHost(e.target.value as typeof contentHost)}
                                        >
                                            <option value='youtube'>Youtube</option>
                                        </select>

                                        {contentType === 'movie' && (
                                            <>
                                                <label className="mt-4 text-black">URL do vídeo</label>
                                                <input
                                                    className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                                                    placeholder="Digite aqui"
                                                    value={contentUrl}
                                                    onChange={(e) => setContentUrl(e.target.value)}
                                                    required
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col max-h-[400px] overflow-y-auto">
                                <div className="flex flex-col gap-2 mb-5">
                                    {contentEpisodes.length === 0 ? (
                                        <p className="text-black">Nenhuma episódio...</p>
                                    ) : (
                                        <>
                                            {contentEpisodes.map(item => (
                                                <CreateEpisodeItem
                                                    addEp={() => { }}
                                                    cancelAdd={() => { }}
                                                    key={item.title}
                                                    data={item}
                                                />
                                            ))}
                                        </>
                                    )}
                                </div>

                                {createNewEpisode ? (
                                    <>
                                        <CreateEpisodeItem
                                            createNew
                                            addEp={addEp}
                                            cancelAdd={() => setCreateNewEpisode(false)}
                                        />
                                    </>
                                ) : (
                                    <button
                                        className="w-full h-10 rounded-md flex items-center justify-center text-white font-bold bg-green-500"
                                        onClick={() => setCreateNewEpisode(true)}
                                    >
                                        Criar episódio
                                    </button>
                                )}
                            </div>
                        )}

                        {step === 4 && (
                            <div className="flex flex-col my-10">
                                <button
                                    onClick={handleCreateContent}
                                    className="w-full h-10 rounded-md flex items-center justify-center text-white font-bold bg-green-500"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator size={30} />
                                    ) : 'Finalizar'}
                                </button>
                            </div>
                        )}

                        <DialogFooter>
                            <button
                                className={`font-bold text-white w-[120px] h-10 bg-gray-500 rounded-md ${disablePreviousStep && 'opacity-30'}`}
                                onClick={handlePreviousStep}
                                disabled={disablePreviousStep}
                            >
                                Voltar
                            </button>

                            <button
                                className={`font-bold text-white w-[120px] h-10 bg-blue-500 rounded-md ${disableNextStep && 'opacity-30'}`}
                                onClick={handleNextStep}
                                disabled={disableNextStep}
                            >
                                Continuar
                            </button>
                        </DialogFooter>
                    </>
                ) : (
                    <form
                        className="flex flex-col"
                        onSubmit={handleLogin}
                    >
                        <h3 className="font-bold text-black text-xl">Vamos entrar na sua conta</h3>

                        <label className="mt-10 text-black">Wallet</label>
                        <input
                            className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                            placeholder="Digite aqui"
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                            required
                        />

                        <label className="mt-4 text-black">Senha</label>
                        <input
                            className="w-full h-12 border border-gray-400 rounded-md text-black px-3"
                            placeholder="Digite aqui"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            className="w-full h-12 bg-blue-500 text-white font-bold rounded-md mt-10 flex items-center justify-center"
                            type='submit'
                        >
                            {loading ? (
                                <ActivityIndicator size={30} />
                            ) : 'Entrar'}
                        </button>
                    </form>

                )}
            </DialogContent>
        </Dialog>
    )
}