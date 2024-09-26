import { Prisma } from "@prisma/client"
import Link from "next/link";

interface Props{
    ep: Prisma.EpisodeGetPayload<null>;
}
export function EpisodeItem({ep}: Props){
    return(
        <Link 
            className="flex gap-2 p-3 rounded-md bg-green-900"
            href={`/content/play/${ep.id}/serie`}
        >
            <div className="w-[110px] h-[70px] bg-gray-500 rounded-md">

            </div>

            <div className="flex flex-col gap-1">
                <h4 className="font-bold text-white">{ep.title}</h4>
                <p className="text-white text-sm">{ep.description}</p>
            </div>
        </Link>
    )
}