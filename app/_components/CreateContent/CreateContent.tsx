"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginWithWalletAndPassword, UserProps } from "@/app/_services/Auth";
import { toast } from "react-toastify";
import Image from "next/image";
import { createContent } from "@/app/_services/Content";
import { uploadImage } from "@/app/_services/UploadImage";

export function CreateContent() {
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
    const [disablePreviousStep, setDisablePreviousStep] = useState(false);
    const [disableNextStep, setDisableNextStep] = useState(false);

    useEffect(() => {
        if (step === 1) {
            setDisablePreviousStep(true);
        } else {
            setDisablePreviousStep(false);
        }

        setDisableNextStep(false);
    }, [
        step
    ]);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

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
            return;
        }
        if (response?.user) {
            setUserData(response.user);
        }
    }

    async function handleCreateContent(){
        const postUrl = await uploadImage({file: contentImage});

        const response = await createContent({
            title: contentTitle,
            author: userData?.wallet,
            category: 'common',
            description: contentDescription,
            platformHost: contentHost,
            postUrl,
            type: contentType,
            urlContent: contentUrl
        });

        if(response.error){
            toast.error('Erro ao criar seu conteudo');
            return;
        }

        toast.success('Conteúdo criado com sucesso!')
    }

    function handleSelectContentImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const urlPreview = URL.createObjectURL(file);
            setContentImagePreview(urlPreview);
            setContentImage(file);
        }
    }

    function handleNextStep() {
        setStep(value => value + 1);
    }

    function handlePreviousStep() {
        setStep(value => value - 1);
    }

    return (
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
                                {/* <option value='serie'>Série</option>
                                <option value='ebook'>E-book</option> */}
                            </select>

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
                        </div>
                    )}

                    {step === 4 && (
                        <div className="flex flex-col">
                            <button 
                                onClick={handleCreateContent}
                            >
                                Criar conteúdo
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
                        className="w-full h-12 bg-blue-500 text-white font-bold rounded-md mt-10"
                        type='submit'
                    >
                        Entrar
                    </button>
                </form>

            )}
        </DialogContent>
    )
}