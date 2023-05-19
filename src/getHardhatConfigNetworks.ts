import fs from "fs";
import path from "path";

export const getHardhatConfigNetworks = (accounts: string[]): any => {
  // Read and parse the JSON file
  const dataBuffer = fs.readFileSync(
    path.resolve(__dirname, "..", "data", "networks.json")
  );
  const dataJson: any = JSON.parse(dataBuffer.toString());

  const config: any = {};

  // Loop through the JSON object and create the required structure
  for (const network in dataJson) {
    let apiUrls = dataJson[network].api;
    let evmApi = apiUrls?.find((api: any) => api.type === "evm");
    config[network] = {
      accounts,
      chainId: dataJson[network].chain_id,
      gas: dataJson[network].fees.assets[0].gas,
      gasPrice: dataJson[network].fees.assets[0].gas_price,
      url: evmApi?.url || "",
    };
  }

  return config;
};
