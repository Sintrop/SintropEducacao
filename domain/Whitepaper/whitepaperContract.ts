import Web3 from "web3";

import { WhitepaperCenter } from "@/contracts";
import { bigNumberToFloat } from "@/lib/utils";
import { WhitepaperContractProps } from "./types";

async function whitepapersCount({ mainnet }: { mainnet?: boolean }): Promise<number> {
  const rpc = mainnet ? "https://rpc.sintrop.com" : "https://sequoiarpc.sintrop.com";
  const address = mainnet ? WhitepaperCenter.mainnetAddress : WhitepaperCenter.testnetAddress;

  const provider = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new provider.eth.Contract(WhitepaperCenter.abi, address);

  const response = await contract.methods.whitepapersCount().call() as string;
  return bigNumberToFloat(response);
}

interface GetWhitepaperProps {
  whitepaperId: number;
  mainnet?: boolean
}
async function getWhitepaper({ mainnet, whitepaperId }: GetWhitepaperProps): Promise<WhitepaperContractProps> {
  const rpc = mainnet ? "https://rpc.sintrop.com" : "https://sequoiarpc.sintrop.com";
  const address = mainnet ? WhitepaperCenter.mainnetAddress : WhitepaperCenter.testnetAddress;

  const provider = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new provider.eth.Contract(WhitepaperCenter.abi, address);

  const response = await contract.methods.getWhitepaper(whitepaperId).call() as WhitepaperContractProps;
  return response;
}

export const whitepaperContract = {
  whitepapersCount,
  getWhitepaper
}
