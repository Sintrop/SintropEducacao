import { bigNumberToFloat } from "@/lib/utils";
import { WhitepaperContractProps, WhitepaperProps } from "./types";

function parseUrl(url: string): string {
  if (url.includes('http://') || url.includes('https://')) {
    return url;
  } else {
    return `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${url}`;
  }
}

function parseWhitepaper(data: WhitepaperContractProps): WhitepaperProps {
  return {
    id: bigNumberToFloat(data.id),
    title: data.title,
    description: data.description,
    downvotes: bigNumberToFloat(data.downvotes),
    upvotes: bigNumberToFloat(data.upvotes),
    url: parseUrl(data.url)
  }
}

export const whitepaperAdapter = {
  parseWhitepaper
}