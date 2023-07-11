import { networks } from "./networks";

/**
 * Enum representing different types of network protocols.
 *
 * @member {string} CCM - Cross-Chain Messaging.
 */
export enum NetworkType {
  CCM = "ccm",
}

/**
 * Retrieves the list of supported networks. If a network type is provided, the
 * function returns networks that support the specific functionality. If no type
 * is provided, it returns all networks.
 *
 * @param {NetworkType} [type] - Optional argument to return only networks that
 * support specific functionality.
 *
 * @returns {string[]} An array of strings representing the supported networks.
 */
export const getSupportedNetworks = (type?: NetworkType): string[] => {
  let supportedNetworks = Object.keys(networks);

  if (type === NetworkType.CCM) {
    supportedNetworks = supportedNetworks.filter(
      (network) => network !== "btc_testnet" && network !== "zeta_testnet"
    );
  }

  return supportedNetworks;
};
