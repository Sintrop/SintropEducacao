"use server"
import { api } from "./api";

export interface ErrorAxiosProps{
    response:{
        data:{
            message: string;
        }
    }
}

export interface UserProps{
    id: string;
    wallet: string;
    name: string;
    userType: number;
    imgProfileUrl: string;
    address: string;
    createdAt: string;
}

interface ReturnLoginWithWalletAndPasswordProps{
    error: boolean;
    user?: UserProps;
    message?: string;
}
export async function LoginWithWalletAndPassword(wallet: string, password: string): Promise<ReturnLoginWithWalletAndPasswordProps | null>{
    try{
        const response = await api.post('/login', {
            wallet,
            password
        });

        if(response.data){
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            const user = await GetUserData();
            if(user.user){
                return{
                    user: user.user,
                    error: false,
                }
            }
        }

        return {
            message: 'algo deu errado',
            error: true,
        }
    }catch(e){
        const error = e as ErrorAxiosProps;

        return {
            error: true,
            message: error.response.data.message,
        };
    }
}

interface ReturnGetUserDataProps{
    user?: UserProps;
    error: boolean;
}
async function GetUserData(): Promise<ReturnGetUserDataProps>{
    try{
        const response = await api.get('/me')
        
        return{
            user: response.data.user as UserProps,
            error: false,
        }
    }catch(e){
        console.log(e)
        return{
            error: true
        }
    }
}