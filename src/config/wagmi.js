import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, sepolia } from "wagmi/chains"
import { http } from "wagmi"

export const config = getDefaultConfig({
    appName: "NFT Marketplace DApp",
    projectId: "YOUR_PROJECT_ID", // Get one at https://cloud.walletconnect.com
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})
