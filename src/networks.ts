import fs from "fs";
import path from "path";

export const networks = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, "..", "data", "networks.json"))
    .toString()
);
