# ZetaChain Blockchain Networks Registry

This registry is a list of blockchain networks connected to ZetaChain.

## Building a dapp on ZetaChain

If you're looking to build a dapp on ZetaChain, we recommend using the Hardhat
[template](https://github.com/zeta-chain/template). This template has all the
networks preconfigured, so you don't need to install this package manually.

## Prerequisites

Before getting started, ensure that you have
[Node.js](https://nodejs.org/en/download) and [Yarn](https://yarnpkg.com/)
installed on your system.

## Installation

To install this package in Hardhat project, add it as a development dependency:

```
yarn add --dev @zetachain/networks
```

## Usage

In your `hardhat.config.ts` file, import the `getHardhatConfigNetworks` function
from `@zetachain/networks`:

```ts
import { getHardhatConfigNetworks } from "@zetachain/networks";

const config: HardhatUserConfig = {
  networks: {
    ...getHardhatConfigNetworks(),
  },
};
```

In this configuration, the `getHardhatConfigNetworks` function returns all
available networks from ZetaChain and spreads them into the `networks` object.
This way, the Hardhat environment is configured to interact with all the
networks connected to ZetaChain.

`getHardhatConfigNetworks` reads the private key from `PRIVATE_KEY` environment
variable and defaults to an empty account array if the variable not set, and
throws an error if the private key is invalid.

### In a Browser Environment

`@zetachain/networks` is released as a CommonJS project to work out of the box
with the current version of Hardhat. You can use it in a browser environment by
using a bundler like [Vite](https://vitejs.dev).

`vite.config.ts`:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["@zetachain/networks"],
  },
});
```

You can now use `@zetachain/networks` in your browser environment:

```ts
import { getHardhatConfigNetworks } from "@zetachain/networks";
```

## Network List Validation

If you modify the list of networks, it's crucial that the updated list aligns
with the predefined schema. For this, you can use the in-built validation
command:

```
yarn validate
```

## Running the Getters

Getters are designed to access and output the data of the network list. To
execute the getters and print their output to the console, use the following
command:

```
yarn output
```

This command will run the getter functions and display the resulting output in
your terminal.
