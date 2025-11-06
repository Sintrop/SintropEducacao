import { whitepaperAdapter } from "./contentAdapter";
import { WhitepaperProps } from "./types";
import { whitepaperContract } from "./whitepaperContract";

async function getWhitepapersCount({ mainnet }: { mainnet?: boolean }): Promise<number> {
  const response = await whitepaperContract.whitepapersCount({ mainnet });
  return response;
}

interface GetWhitepaperProps {
  whitepaperId: number;
  mainnet?: boolean;
}
async function getWhitepaper(props: GetWhitepaperProps): Promise<WhitepaperProps> {
  const response = await whitepaperContract.getWhitepaper(props);
  return whitepaperAdapter.parseWhitepaper(response);
}

async function getWhitepaperList({ mainnet }: { mainnet?: boolean }): Promise<WhitepaperProps[]> {
  const response = await getWhitepapersCount({ mainnet });

  const list: WhitepaperProps[] = [];
  for (let i = 0; i < response; i++) {
    const content = await getWhitepaper({ mainnet, whitepaperId: i + 1 });
    list.push(content);
  }

  return list;
}

export const whitepaperService = {
  getWhitepapersCount,
  getWhitepaper,
  getWhitepaperList
}