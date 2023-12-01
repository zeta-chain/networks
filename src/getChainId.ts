import networks from "./networks";

export const getChainId = (chainNameOrAlias: string): number | null => {
  if (networks.hasOwnProperty(chainNameOrAlias)) {
    return networks[chainNameOrAlias as keyof typeof networks].chain_id;
  }

  // Iterate through networks to check aliases
  for (const key in networks) {
    if (networks.hasOwnProperty(key)) {
      const chain: any = networks[key as keyof typeof networks];
      if (
        chain.chain_aliases &&
        chain.chain_aliases.includes(chainNameOrAlias)
      ) {
        return chain.chain_id;
      }
    }
  }

  return null;
};
