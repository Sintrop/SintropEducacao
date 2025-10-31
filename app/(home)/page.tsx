import Image from "next/image";
//import { ContentItem } from "../_components/ContentItem/ContentItem";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contentService } from "@/domain/Content/contentService";
import { ContentItem } from "@/components/ContentItem/ContentItem";

export default async function Home() {
  const contents = await contentService.getContentsList({ mainnet: true });
  const emphasis = await contentService.getContent({
    mainnet: true,
    contentId: 1,
  });

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary">
      <div className="flex flex-col relative">
        <Image
          src={emphasis?.photo as string}
          alt="Post do conteúdo em destaque"
          width={1000}
          height={500}
          className="w-full h-[500px] object-cover"
        />

        <div className="w-full h-[500px] bg-gradient-to-r from-black to-black/40 flex absolute items-center px-5">
          <div className="flex flex-col gap-1 max-w-[50%]">
            <h1 className="font-bold text-white text-7xl">{emphasis?.title}</h1>
            <h2 className="font-bold text-white mt-2">
              {emphasis?.description}
            </h2>

            <Link
              className="font-bold w-32 h-10 flex items-center justify-center rounded-md bg-white mt-5 gap-2"
              href={`/content/${emphasis?.id}`}
            >
              Assitir
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-9 mt-5 pb-10">
          <div className="flex gap-5 flex-wrap px-5">
            {contents.map((item, index) => (
              <ContentItem key={item.id} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
