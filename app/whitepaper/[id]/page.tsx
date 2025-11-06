import { contentService } from "@/domain/Content/contentService";
import Link from "next/link";
import { ShareButton } from "./components/ShareButton";
import { ContentItem } from "@/components/ContentItem/ContentItem";
import { whitepaperService } from "@/domain/Whitepaper/whitepaperService";

interface Props {
  params: {
    id: string;
  };
}

export default async function Whitepaper({ params }: Props) {
  const { id } = params;
  const whitepaper = await whitepaperService.getWhitepaper({
    mainnet: true,
    whitepaperId: parseInt(id),
  });
  const contents = await contentService.getContentsList({ mainnet: true });

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary relative">
      <div className="flex flex-col mb-[450px]">
        <div className="w-full h-[450px] bg-gradient-to-r from-black to-black/40 flex absolute items-center justify-between px-5">
          <div className="flex flex-col gap-2 max-w-[50%]">
            <h1 className="font-bold text-white text-5xl">
              {whitepaper?.title}
            </h1>
            <h2 className="font-bold text-white">{whitepaper?.description}</h2>

            <div className="flex gap-4 mt-5">
              <Link
                href={`/whitepaper/${id}/view`}
                className="font-bold px-5 w-fit h-10 flex items-center justify-center rounded-md bg-white mt-5 gap-2"
              >
                Ver whitepaper
              </Link>
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-5 pb-10">
        <h3 className="font-semibold text-white pl-5">
          Mais conteúdos que podem te ajudar
        </h3>
        <div className="flex gap-5 flex-wrap px-5">
          {contents.map((item, index) => {
            if (item.id !== parseInt(id)) {
              return <ContentItem key={item.id} data={item} index={index} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
