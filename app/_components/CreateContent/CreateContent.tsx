"use client"

import { FormEvent, useState } from "react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginWithWalletAndPassword, UserProps } from "@/app/_services/Auth";
import { toast } from "react-toastify";

export function CreateContent() {
    const [wallet, setWallet] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({} as UserProps);
    const [step, setStep] = useState(1);
    const [contentTitle, setContentTitle] = useState('');

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
                        </div>
                    )}
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