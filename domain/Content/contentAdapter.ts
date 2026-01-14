import { bigNumberToFloat } from "@/lib/utils";
import { ContentContractProps, ContentProps, ContentType } from "./types";

interface ReturnCheckContentTypeProps {
  url: string;
  type: ContentType;
}
function checkContentType(url: string): ReturnCheckContentTypeProps {
  if (url.includes('https://')) {
    if (url.includes('youtu.be') || url.includes('youtube.com')) {
      const split = url.split('/');
      const idVideo = split[split.length - 1];
      const newUrl = `https://www.youtube.com/embed/${idVideo}`;

      return {
        type: 'youtube',
        url: newUrl
      }
    }

    return {
      type: 'pdf',
      url
    }
  }
  return {
    type: 'pdf',
    url: `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${url}`
  }
}

function parsePhotoUrl(url: string): string {
  if (url.includes('http://') || url.includes('https://')) {
    return url;
  } else {
    return `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${url}`;
  }
}

function parseContent(data: ContentContractProps): ContentProps {
  const response = checkContentType(data.url)
  return {
    id: bigNumberToFloat(data.id),
    title: data.title,
    description: data.description,
    photo: parsePhotoUrl(data.photo),
    url: response.url,
    downVotes: bigNumberToFloat(data.downVotes),
    upVotes: bigNumberToFloat(data.upVotes),
    type: response.type
  }
}

export const contentAdapter = {
  parseContent
}