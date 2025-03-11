import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sepolia } from "wagmi/chains"
import { http } from "wagmi"

export const config = getDefaultConfig({
    appName: "NFT Marketplace DApp",
    projectId: "YOUR_PROJECT_ID", // Get one at https://cloud.walletconnect.com
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },
})
