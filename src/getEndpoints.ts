import { networks } from "./networks";
import { ApiType, Api } from "./types";

/**
 * Returns the endpoints of a specified type from a specified network.
 *
 * @param {ApiType} type - The type of API endpoints to be retrieved.
 * @param {string} network - The name of the network from which to retrieve the endpoints.
 *
 * @returns {Api[]} - An array of API endpoint objects of the specified type. If the network
 * does not exist, throws an error. If no matching endpoints are found, returns an empty array.
 */
export const getEndpoints = (type: ApiType, network: string): Api[] => {
  if (!networks[network]) {
    throw new Error(`Network ${network} does not exist.`);
  }

  return networks[network].api.filter((api: Api) => api.type === type);
};
