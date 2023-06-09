import fs from "fs";
import path from "path";

export const networks = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, "..", "data", "networks.json"))
    .toString()
);

export const getHardhatConfigNetworks = (accounts: string[]): any => {
  const config: any = {};

  // Loop through the JSON object and create the required structure
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
    1001: "klaytn-baobab",
    5: "goerli",
    7001: "athens",
    80001: "polygon-mumbai",
    97: "bsc-testnet",
  }[chainId];
};
