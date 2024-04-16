This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
### To clone and run this project in localhost

- clone this repository using ```git clone https://github.com/Fearless09/wine-test.git```
- After cloning the repository, install all the depedency using ```npm install```
- Deploy the smart contract e.g using Remix IDE. Go to the `blockchain` folder, copy the code inside the `WineRegistry.sol`
- Go to remix and recreate a file with the name `WineRegistry.sol` and paste the code inside the folder
- Compile the code in remix
- Deploy the code in remix
- Copy the `contract address` from remix
- Go to the `WineRegistry.json` file inside the `blockchain` folder and replace the address with your `contract address`
- Create a `.env` file inside the `app` folder
- paste this inside the `.env` file
NEXT_PUBLIC_JSON_RPC_PROVIDER_URL_ID = d0f4119a707544e7b1fcbc93c9bf659e
NEXT_PUBLIC_JSON_RPC_PROVIDER_URL = https://sepolia.infura.io/v3/$NEXT_PUBLIC_JSON_RPC_PROVIDER_URL_ID
- Start the local server using ```npm run dev```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- NB: Remember to install metamask extension on your browser

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
