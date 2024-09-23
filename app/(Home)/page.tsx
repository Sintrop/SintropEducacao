import Image from "next/image";
import { getContents } from "../_services/Content";
import { ContentItem } from "../_components/ContentItem/ContentItem";
import Link from "next/link";

export default async function Home() {
    const { contents, ebooks, emphasis, mostSeen, top10, trainings } = await getContents();

    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary">
            <div className="flex flex-col relative">
                <Image
                    src={emphasis?.postUrl as string}
                    alt='Post do conteúdo em destaque'
                    width={1000}
                    height={500}
                    className="w-full h-[500px] object-cover"
                />

                <div className='w-full h-[500px] bg-gradient-to-r from-black to-black/40 flex absolute items-center px-5'>
                    <div className='flex flex-col gap-1 max-w-[50%]'>
                        <h1 className='font-bold text-white text-7xl'>{emphasis?.title}</h1>
                        <h2 className='font-bold text-white mt-2'>{emphasis?.description}</h2>

                        {emphasis?.type !== 'ebook' && (
                            <Link
                                className='font-bold w-32 h-10 flex items-center justify-center rounded-md bg-white mt-5 gap-2'
                                href={`/content/${emphasis?.id}`}
                            >
                                Assitir
                            </Link>
                        )}

                        {emphasis?.type === 'ebook' && (
                            <a
                                className='font-bold w-32 h-10 flex items-center justify-center rounded-md bg-white mt-5 gap-2'
                                href={emphasis?.urlVideo}
                                target="_blank"
                            >
                                Ler ebook
                            </a>
                        )}
                    </div>

                </div>
                    <div className='flex flex-col gap-9 mt-5 pb-10'>
                        {mostSeen.length > 0 && (
                            <div>
                                <p className='font-bold text-white mx-5'>Mais vistos</p>

                                <div className='flex gap-3 pl-5'>
                                    {mostSeen.map((item, index) => (
                                        <ContentItem
                                            key={item?.id}
                                            data={item}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {top10.length > 0 && (
                            <div>
                                <p className='font-bold text-white mx-5'>Top 10 da semana</p>

                                <div className='flex gap-[130px] pl-5 overflow-x-auto overflow-y-hidden'>
                                    {top10.map((item, index) => (
                                        <ContentItem
                                            key={item?.id}
                                            data={item}
                                            type='top-10'
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {trainings.length > 0 && (
                            <div>
                                <p className='font-bold text-white mx-5'>Treinamentos</p>

                                <div className='flex gap-3 pl-5 overflow-x-auto overflow-y-hidden'>
                                    {trainings.map((item, index) => (
                                        <ContentItem
                                            key={item?.id}
                                            data={item}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {ebooks.length > 0 && (
                            <div>
                                <p className='font-bold text-white mx-5'>Ebooks</p>

                                <div className='flex gap-3 pl-5 overflow-x-auto overflow-y-hidden'>
                                    {ebooks.map((item, index) => (
                                        <ContentItem
                                            key={item?.id}
                                            data={item}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
            </div>
        </div>
    );
}
