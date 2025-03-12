import React, { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import NFTModal from "./NFTModal"

const NFTCard = ({ imageUrl, title, price, totalSupply, soldTokens, onClick }) => {
    const { isDarkMode } = useTheme()

    // Calculate percentage sold for progress bar, capped at 100%
    const percentageSold = Math.min(100, (soldTokens / totalSupply) * 100)

    // Display the actual tokens, but cap the displayed sold tokens to total supply for UI consistency
    const displaySoldTokens = Math.min(soldTokens, totalSupply)

    return (
        <div
            onClick={onClick}
            className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
            }`}
        >
            <img
                src={imageUrl || "https://via.placeholder.com/300"}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title || "Untitled NFT"}</h3>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm opacity-75">Price</span>
                    <span className="font-medium">{price || "0.05 ETH"}</span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 mb-3">
                    <div className="text-xs mb-1 flex justify-between">
                        <span>Sales Progress</span>
                        <span>
                            {displaySoldTokens} / {totalSupply}
                        </span>
                    </div>
                    <div
                        className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
                    >
                        <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${percentageSold}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NFTGrid() {
    const { nfts } = useNFTs()
    const [selectedNFT, setSelectedNFT] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleNFTClick = (nft) => {
        setSelectedNFT(nft)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleBuyNFT = (nftId, quantity, totalPrice) => {
        // This would connect to your blockchain contract in a real app
        console.log(`Buying ${quantity} tokens of NFT #${nftId} for ${totalPrice} ETH`)
        alert(
            `Purchase initiated: ${quantity} tokens of "${selectedNFT.title}" for ${totalPrice} ETH`,
        )
        setIsModalOpen(false)
    }

    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {nfts.map((nft) => (
                    <NFTCard
                        key={nft.id}
                        imageUrl={nft.imageUrl}
                        title={nft.title}
                        price={nft.price}
                        totalSupply={nft.totalSupply}
                        soldTokens={nft.soldTokens}
                        onClick={() => handleNFTClick(nft)}
                    />
                ))}
            </div>

            {/* NFT Detail Modal */}
            <NFTModal
                nft={selectedNFT}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onBuy={handleBuyNFT}
            />
        </div>
    )
}

export default NFTGrid
