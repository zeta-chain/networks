import networks from "./networks";

export const getNetworkName = (alias: string): string | null => {
  const lowerCaseAlias = alias.toLowerCase();
  for (const networkKey in networks) {
    const network = networks[networkKey as keyof typeof networks] as {
      chain_aliases?: string[];
    };
    if (
      network.chain_aliases &&
      network.chain_aliases.some(
        (networkAlias) => networkAlias.toLowerCase() === lowerCaseAlias
      )
    ) {
      return networkKey;
    }
    if (networkKey.toLowerCase() === lowerCaseAlias) {
      return networkKey;
    }
  }
  return null;
};
