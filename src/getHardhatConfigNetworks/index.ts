let getHardhatConfigNetworksExport;

if (
  typeof process !== "undefined" &&
  process.versions &&
  process.versions.node
) {
  getHardhatConfigNetworksExport =
    require("./getHardhatConfigNetworks").getHardhatConfigNetworks;
} else {
  getHardhatConfigNetworksExport = () => {
    throw new Error(
      "getHardhatConfigNetworks is not available in this environment"
    );
  };
}

export default getHardhatConfigNetworksExport;
