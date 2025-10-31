"use client";

import { useEffect, useState } from "react";
import { contentService } from "@/domain/Content/contentService";
import { ContentProps } from "@/domain/Content/types.js";
import { Youtube } from "./components/Youtube";
import dynamic from "next/dynamic";

const PdfView = dynamic(() => import("./components/PdfView"), { ssr: false });

interface Props {
  params: {
    id: string;
  };
}

export default function Content({ params }: Props) {
  const [content, setContent] = useState<ContentProps | null>(null);

  useEffect(() => {
    async function getContent() {
      const response = await contentService.getContent({
        mainnet: true,
        contentId: parseInt(params.id),
      });
      setContent(response);
    }
    getContent();
  }, [params]);

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary relative">
      <div className="flex flex-col mb-[400px]">
        <div className="w-full h-[400px] bg-gradient-to-r from-black to-black/40 flex absolute items-center justify-between px-5">
          <div className="flex flex-col gap-2 max-w-[50%]">
            <h1 className="font-bold text-white text-7xl">{content?.title}</h1>
            <h2 className="font-bold text-white">{content?.description}</h2>

            <div className="flex gap-4 mt-5">
              <button
                className="font-bold text-white px-5 w-fit h-10 flex items-center justify-center rounded-md border border-white mt-5 gap-2"
                // onClick={() => {
                //   // navigator.clipboard.writeText(
                //   //   `https://app.sintrop.com/education/content/${content?.id}`
                //   // );
                //   //toast.success('Link copiado para área de transferência!')
                // }}
              >
                Compartilhar conteúdo
              </button>
            </div>
          </div>

          <img
            src={content?.photo}
            className="w-[170px] h-[250px] object-cover rounded-md border-2 border-white mr-10"
          />
        </div>
      </div>

      <div className="flex flex-col mt-10 items-center min-h-[500px] mb-20">
        {content?.type === "pdf" && <PdfView url={content.url} />}
        {content?.type === "youtube" && <Youtube content={content} />}
      </div>
    </div>
  );
}
