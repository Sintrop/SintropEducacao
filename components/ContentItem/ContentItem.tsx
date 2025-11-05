import Link from "next/link";
import Image from "next/image";

import { ContentProps } from "@/domain/Content/types";

interface Props {
  type?: "top-10" | "normal";
  data: ContentProps;
  index: number;
}

export function ContentItem({ data }: Props) {
  // if (type === "top-10") {
  //   return (
  //     <Link
  //       className="flex w-[500px] h-[220px] relative"
  //       href={`/content/${data.id}`}
  //     >
  //       <p className="font-bold text-gray-400 text-[280px] leading-[220px]">
  //         {index + 1}
  //       </p>
  //       <Image
  //         alt="Imagem de capa do conteúdo"
  //         width={150}
  //         height={200}
  //         src={data?.postUrl}
  //         className="w-[150px] ml-[-50px] h-full object-cover border-2 border-white rounded-md"
  //       />
  //     </Link>
  //   );
  // }
  return (
    <Link
      className="flex w-[200px] h-[230px] border-2 border-white rounded-md overflow-hidden relative"
      href={`/content/${data.id}`}
    >
      <Image
        alt="Imagem de capa do conteúdo"
        width={150}
        height={200}
        src={data?.photo}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 bg-black/50 w-full h-14 px-2 py-1 flex items-center justify-center overflow-hidden">
        <p className="text-white text-center text-ellipsis truncate">
          {data.title}
        </p>
      </div>
    </Link>
  );
}
