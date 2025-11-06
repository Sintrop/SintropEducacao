import Link from "next/link";

import { WhitepaperProps } from "@/domain/Whitepaper/types";

interface Props {
  data: WhitepaperProps;
}

export function WhitepaperItem({ data }: Props) {
  return (
    <Link
      className="flex w-[200px] h-[230px] border-2 border-white rounded-md overflow-hidden"
      href={`/whitepaper/${data.id}`}
    >
      <div className="w-full h-full bg-black/50 px-2 py-1 flex items-center justify-center overflow-hidden">
        <p className="text-white text-center">{data.title}</p>
      </div>
    </Link>
  );
}
