import React from "react"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"

const NFTCard = ({ imageUrl, title, price }) => {
    const { isDarkMode } = useTheme()

    return (
        <div
            className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
        >
            <img
                src={imageUrl || "https://via.placeholder.com/300"}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title || "Untitled NFT"}</h3>
                <div className="flex justify-between items-center">
                    <span className="text-sm opacity-75">Price</span>
                    <span className="font-medium">{price || "0.05 ETH"}</span>
                </div>
                <button
                    className={`w-full mt-3 py-2 px-4 rounded-lg font-medium transition-colors ${
                        isDarkMode
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    Buy Now
                </button>
            </div>
        </div>
    )
}

function NFTGrid() {
    const { nfts } = useNFTs()

    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {nfts.map((nft) => (
                    <NFTCard
                        key={nft.id}
                        imageUrl={nft.imageUrl}
                        title={nft.title}
                        price={nft.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default NFTGrid
