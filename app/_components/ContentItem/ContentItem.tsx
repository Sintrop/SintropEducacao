import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props{
    type?: 'top-10' | 'normal';
    data: Prisma.ContentGetPayload<null>;
    index: number;
}

export function ContentItem({type, data, index}: Props){
    if(type === 'top-10'){
        return(
            <Link 
                className="flex w-[500px] h-[220px] relative"
                href={`/content/${data.id}`}
            >
                <p className="font-bold text-gray-400 text-[280px] leading-[220px]">{index + 1}</p>
                <Image
                    alt='Imagem de capa do conteúdo'
                    width={150}
                    height={200}
                    src={data?.postUrl}
                    className="w-[150px] ml-[-50px] h-full object-cover border-2 border-white rounded-md"
                />
            </Link>
        )
    }
    return(
        <Link 
            className="flex w-[150px] h-[220px] border-2 border-white rounded-md overflow-hidden"
            href={`/content/${data.id}`}
        >
            <Image
                alt='Imagem de capa do conteúdo'
                width={150}
                height={200}
                src={data?.postUrl}
                className="w-full h-full object-cover"
            />
        </Link>
    )
}