import { PdfView } from "./components/PdfView";
import { whitepaperService } from "@/domain/Whitepaper/whitepaperService";

interface Props {
  params: {
    id: string;
  };
}

export default async function View({ params }: Props) {
  const { id } = params;
  const whitepaper = await whitepaperService.getWhitepaper({
    whitepaperId: parseInt(id),
    mainnet: true,
  });

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-container-primary relative">
      <PdfView url={whitepaper.url} />
    </div>
  );
}
