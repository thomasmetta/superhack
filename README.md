
# Live at: https://reviewchain.vercel.app/

Superhack2024: ReviewChain is a review platform focused on providing genuine and reliable feedback. This uses Worldcoin ID to verify the identity of every reviewee before submission

# How it is made

- This leveraged Next.js, TailwindCSS, and the [World ID SDK](https://id.worldcoin.org) and uses off-chain web backend verification from Worldcoin cloud.
- New Rollup chain with OP Stack is deployed using Conduit
- Deployed a simple review smart contract on the new rollup
- Utilized the Conduit API to retrieve all the transaction data from the new rollup
- Balance data and Block Explorer powered by Blockscout API
- Thirdweb for wallet interacting with smart contract

## Getting Started

First, set the correct Node.js version using `nvm` and run the development server:

```bash
nvm use 20
pnpm i && pnpm dev
```

Copy `.env.example` to `.env.local` and add your World ID App ID and Action Name to the appropriate variables.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
