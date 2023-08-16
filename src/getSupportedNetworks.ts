import networks from "./networks";

/**
 * Retrieves the list of supported networks. If a network type is provided, the
 * function returns networks that support the specific functionality. If no type
 * is provided, it returns all networks.
 *
 * @param {NetworkType} [type] - Optional argument to return only networks that
 * support specific functionality. Accepts "ccm".
 *
 * @returns {string[]} An array of strings representing the supported networks.
 */
export const getSupportedNetworks = (type?: string): string[] => {
  let supportedNetworks = Object.keys(networks);

  if (type === "ccm") {
    const excluded = [
      "btc_testnet",
      "zeta_testnet",
      "baobab_testnet", // TODO: remove when baobab is supported
      "eth_mainnet", // TODO: remove when eth_mainnet is supported
    ];
    supportedNetworks = supportedNetworks.filter(
      (network) => !excluded.includes(network)
    );
  }

  return supportedNetworks;
};
