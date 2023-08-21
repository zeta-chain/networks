import { NetworksSchema } from "./types";
import networks from "./networks";

export const getExplorers = (
  input: string,
  inputType: "address" | "tx",
  networkKey: keyof NetworksSchema
): string[] => {
  const network = networks[networkKey as keyof typeof networks];
  if (!network) {
    throw new Error("Network not found");
  }

  if (!("apps" in network) || !Array.isArray(network.apps)) {
    throw new Error("Explorers not available for the provided network");
  }

  const explorerApps = network.apps.filter((app) => app.type === "explorer");

  const urls: string[] = [];
  for (const app of explorerApps) {
    if (inputType === "address" && app.address) {
      urls.push(app.url + app.address.replace("${address}", input));
    } else if (inputType === "tx" && app.tx) {
      urls.push(app.url + app.tx.replace("${tx}", input));
    }
  }

  return urls;
};
