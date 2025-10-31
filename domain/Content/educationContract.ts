import Web3 from "web3";

import { FreeEducationCenter } from "@/contracts";
import { bigNumberToFloat } from "@/lib/utils";
import { ContentContractProps } from "./types";

async function contentsCount({ mainnet }: { mainnet?: boolean }): Promise<number> {
  const rpc = mainnet ? "https://rpc.sintrop.com" : "https://sequoiarpc.sintrop.com";
  const address = mainnet ? FreeEducationCenter.mainnetAddress : FreeEducationCenter.testnetAddress;

  const provider = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new provider.eth.Contract(FreeEducationCenter.abi, address);

  const response = await contract.methods.contentsCount().call() as string;
  return bigNumberToFloat(response);
}

interface GetContentProps {
  contentId: number;
  mainnet?: boolean
}
async function getContent({ mainnet, contentId }: GetContentProps): Promise<ContentContractProps> {
  const rpc = mainnet ? "https://rpc.sintrop.com" : "https://sequoiarpc.sintrop.com";
  const address = mainnet ? FreeEducationCenter.mainnetAddress : FreeEducationCenter.testnetAddress;

  const provider = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new provider.eth.Contract(FreeEducationCenter.abi, address);

  const response = await contract.methods.getContent(contentId).call() as ContentContractProps;
  return response;
}

export const educationContract = {
  contentsCount,
  getContent
}
