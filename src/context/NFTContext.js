import React, { createContext, useContext, useState } from "react"

const NFTContext = createContext()

export function NFTProvider({ children }) {
    const [nfts] = useState(
        Array(10)
            .fill()
            .map((_, index) => ({
                id: index + 1,
                imageUrl: `https://picsum.photos/300/300?random=${index}`,
                title: `NFT #${index + 1}`,
                price: `${(Math.random() * 2).toFixed(3)} ETH`,
            })),
    )

    return <NFTContext.Provider value={{ nfts }}>{children}</NFTContext.Provider>
}

export function useNFTs() {
    const context = useContext(NFTContext)
    if (!context) {
        throw new Error("useNFTs must be used within an NFTProvider")
    }
    return context
}
