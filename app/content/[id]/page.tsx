import { getContentData } from "@/app/_services/Content";
import Link from "next/link";

interface Props {
    params: {
        id: string;
    }
}

export default async function Content({ params }: Props) {
    const { contentData } = await getContentData(params.id);

    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary">
            <div className="flex flex-col">
                <div className='w-full h-[400px] bg-gradient-to-r from-black to-black/40 flex absolute items-center justify-between px-5'>
                    <div className='flex flex-col gap-2 max-w-[50%]'>
                        <h1 className='font-bold text-white text-7xl'>{contentData?.title}</h1>
                        <h2 className='font-bold text-white'>{contentData?.description}</h2>

                        <div className="flex gap-4 mt-5">
                            {contentData?.type === 'movie' && (
                                <Link
                                    href={`/content/play/${contentData.id}/movie`}
                                    className='font-bold w-32 h-10 flex items-center justify-center rounded-md bg-white mt-5 gap-2'
                                >
                                    Assistir
                                </Link>
                            )}

                            {contentData?.type === 'ebook' && (
                                <a
                                    className='font-bold w-32 h-10 flex items-center justify-center rounded-md bg-white mt-5 gap-2'
                                    href={contentData?.urlContent}
                                    target="_blank"
                                >
                                    Ler ebook
                                </a>
                            )}

                            <button
                                className='font-bold text-white px-5 w-fit h-10 flex items-center justify-center rounded-md border border-white mt-5 gap-2'
                                // onClick={() => {
                                //     navigator.clipboard.writeText(`https://app.sintrop.com/education/content/${contentData?.id}`);
                                //     //toast.success('Link copiado para área de transferência!')
                                // }}
                            >
                                Compartilhar conteúdo
                            </button>
                        </div>
                    </div>

                    <img
                        src={contentData?.postUrl}
                        className="w-[170px] h-[250px] object-cover rounded-md border-2 border-white mr-10"
                    />
                </div>
            </div>


        </div>
    )
}