"use client"

import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ActivityIndicator } from "../_components/ActivityIndicator/ActivityIndicator";
import { LoginWithWalletAndPassword, UserProps } from "../_services/Auth";
import 'react-toastify/dist/ReactToastify.css';
import { getContentsByAuthor } from "../_services/Content";
import { Prisma } from "@prisma/client";
import { ContentEditItem } from "./components/ContentEditItem/ContentEditItem";

export default function MyContents(){
    const [loading, setLoading] = useState(false);
    const [wallet, setWallet] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({} as UserProps);
    const [contents, setContents] = useState<Prisma.ContentGetPayload<{include: {Episodes: true}}>[]>([]);

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
        setLoading(false);
        
        if (response?.user) {
            setUserData(response.user);
            getContents(response.user.wallet);
        }
    }

    async function getContents(wallet: string){
        setLoading(true);
        const response = await getContentsByAuthor(wallet);
        setContents(response.contents);
        setLoading(false);
    }

    return(
        <div className="flex flex-col w-full h-screen bg-green-950 overflow-y-auto">
            {userData.name ? (
                <div className="flex flex-col p-5">
                    <h1 className="text-white font-bold text-3xl">Olá, {userData.name}</h1>

                    <div className="flex flex-col gap-3 mt-5">
                        {loading ? (
                            <ActivityIndicator size={50}/>
                        ) : (
                            <>
                                {contents.length === 0 ? (
                                    <p className="text-white">Você não tem nenhum conteúdo criado</p>
                                ) : (
                                    <>
                                        {contents.map(item => (
                                            <ContentEditItem
                                                key={item.id}
                                                data={item}
                                                reloadContents={() => getContents(userData.wallet)}
                                            />
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-screen w-full items-center  justify-center">
                    <div className="flex flex-col p-3 rounded-md bg-white w-[500px] items-center">
                        <form
                                className="flex flex-col w-full"
                                onSubmit={handleLogin}
                            >
                                <h3 className="font-bold text-black text-xl mt-10 text-center">Vamos entrar na sua conta</h3>

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
                    </div>
                </div>
            )}

            <ToastContainer/>
        </div>
    )
}