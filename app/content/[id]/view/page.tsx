import { contentService } from "@/domain/Content/contentService";

import { PdfView } from "./components/PdfView";
import { Youtube } from "./components/Youtube";

interface Props {
  params: {
    id: string;
  };
}

export default async function View({ params }: Props) {
  const { id } = params;
  const content = await contentService.getContent({
    contentId: parseInt(id),
    mainnet: true,
  });

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary relative">
      {content?.type === "pdf" && <PdfView url={content.url} />}
      {content?.type === "youtube" && <Youtube content={content} />}
    </div>
  );
}
