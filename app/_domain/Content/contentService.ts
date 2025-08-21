import { contentAdapter } from "./contentAdapter";
import { educationContract } from "./educationContract";
import { ContentProps } from "./types";

async function getContentsCount({ mainnet }: { mainnet?: boolean }): Promise<number> {
  const response = await educationContract.contentsCount({ mainnet });
  return response;
}

interface GetContentProps {
  contentId: number;
  mainnet?: boolean;
}
async function getContent(props: GetContentProps): Promise<ContentProps> {
  const response = await educationContract.getContent(props);
  return contentAdapter.parseContent(response);
}

export const contentService = {
  getContentsCount,
  getContent
}