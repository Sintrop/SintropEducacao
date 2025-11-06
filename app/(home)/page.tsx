import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contentService } from "@/domain/Content/contentService";
import { ContentItem } from "@/components/ContentItem/ContentItem";
import { whitepaperService } from "@/domain/Whitepaper/whitepaperService";
import { WhitepaperItem } from "@/components/WhitepaperItem/WhitepaperItem";

export default async function Home() {
  const contents = await contentService.getContentsList({ mainnet: true });
  const whitepapers = await whitepaperService.getWhitepaperList({
    mainnet: true,
  });
  const emphasis = await contentService.getContent({
    mainnet: true,
    contentId: parseInt(process.env.NEXT_PUBLIC_CONTENT_EMPHASIS_ID ?? "1"),
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
              className="font-bold w-fit px-10 h-10 flex items-center justify-center rounded-md bg-white mt-5 gap-2"
              href={`/content/${emphasis?.id}/view`}
            >
              Ver conteúdo
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-5 pb-10">
          <h3 className="font-semibold text-white pl-5">Whitepapers</h3>
          <div className="flex gap-5 flex-wrap px-5">
            {whitepapers.map((item) => (
              <WhitepaperItem key={item.id} data={item} />
            ))}
          </div>

          <h3 className="font-semibold text-white pl-5 mt-5">Conteúdos</h3>
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
