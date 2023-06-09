import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

interface Config {
  [key: string]: {
    accounts: string[];
    chainId: number;
    gas: number;
    gasPrice: number;
    url: string;
  };
}

export const networks = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, "..", "data", "networks.json"))
    .toString()
);

export const getHardhatConfigNetworks = (): Config => {
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

  for (const network in networks) {
    let apiUrls = networks[network].api;
    let evmApi = apiUrls?.find((api: any) => api.type === "evm");
    config[network] = {
      accounts,
      chainId: networks[network].chain_id,
      gas: networks[network].fees.assets[0].gas,
      gasPrice: networks[network].fees.assets[0].gas_price,
      url: evmApi?.url || "",
    };
  }

  return config;
};

// Temporary function that maps chain IDs to the old chain names
// used by @zetachain/addresses
export const chainNameById = (chainId: number): any => {
  return {
    7001: "athens",
    97: "bsc-testnet",
    5: "goerli",
    1001: "klaytn-baobab",
    80001: "polygon-mumbai",
  }[chainId];
};
