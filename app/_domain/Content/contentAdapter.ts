import { bigNumberToFloat } from "@/lib/utils";
import { ContentContractProps, ContentProps } from "./types";
import { title } from "process";

function parseContent(data: ContentContractProps): ContentProps {
  return {
    id: bigNumberToFloat(data.id),
    title: title,
    description: data.description,
    photo: data.photo,
    url: data.url,
    downVotes: bigNumberToFloat(data.downVotes),
    upVotes: bigNumberToFloat(data.upVotes),
    type: ""
  }
}

export const contentAdapter = {
  parseContent
}