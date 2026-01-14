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

async function getContentsList({ mainnet }: { mainnet?: boolean }): Promise<ContentProps[]> {
  const response = await getContentsCount({ mainnet });

  const list: ContentProps[] = [];
  for (let i = 0; i < response; i++) {
    const content = await getContent({ mainnet, contentId: i + 1 });
    list.push(content);
  }

  return list;
}

export const contentService = {
  getContentsCount,
  getContent,
  getContentsList
}