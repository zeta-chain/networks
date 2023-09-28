import * as dotenv from "dotenv";

import networks from "./networks";

interface Config {
  [key: string]: {
    accounts?: string[];
    chainId: number;
    gas?: number;
    gasPrice?: number;
    url?: string;
  };
}

export const getHardhatConfigNetworks = (): Config => {
  const hardhat = {
    chainId: 1337,
    forking: { blockNumber: 14672712, url: "https://rpc.ankr.com/eth" },
  };

  const validatePrivateKey = (privateKey: string | undefined): string[] => {
    if (!privateKey) {
      return [];
    } else if (privateKey.startsWith("0x")) {
      throw new Error("PRIVATE_KEY env variable should not start with 0x");
    } else if (!/^(0x)?[0-9a-fA-F]{64}$/.test(privateKey)) {
      throw new Error("PRIVATE_KEY env variable is not a valid private key");
    } else {
      return [`0x${privateKey}`];
    }
  };

  dotenv.config();
  const accounts = validatePrivateKey(process.env.PRIVATE_KEY);
  const config: Config = {};

  for (const network in networks as any) {
    if (network === "btc_testnet") continue;
    let apiUrls = (networks as any)[network].api;
    let evmApi = apiUrls?.find((api: any) => api.type === "evm");
    config[network] = {
      accounts,
      chainId: (networks as any)[network].chain_id,
      gas: (networks as any)[network].fees.assets[0].gas,
      gasPrice: (networks as any)[network].fees.assets[0].gas_price,
      url: evmApi?.url || "",
    };
  }

  return { ...config, hardhat };
};
