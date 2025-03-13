import React, { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import NFTModal from "./NFTModal"

const NFTCard = ({ imageUrl, title, price, totalSupply, soldTokens, onClick }) => {
    const { colors } = useTheme()

    // Calculate percentage sold for progress bar, capped at 100%
    const percentageSold = Math.min(100, (soldTokens / totalSupply) * 100)

    // Display the actual tokens, but cap the displayed sold tokens to total supply for UI consistency
    const displaySoldTokens = Math.min(soldTokens, totalSupply)

    // Define the green color for sold out status
    const greenColor = "#4ADE80"

    return (
        <div
            onClick={onClick}
            className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer w-full max-w-xs mx-auto"
            style={{
                backgroundColor: colors.backgroundSecondary,
                color: colors.text,
            }}
        >
            <img
                src={imageUrl || "https://via.placeholder.com/300"}
                alt={title}
                className="w-full h-64 object-cover"
            />
            <div className="p-3">
                <h3 className="text-base font-semibold mb-1">{title || "Untitled NFT"}</h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                        Price per Token
                    </span>
                    <span className="text-sm font-medium">{price || "0.05 ETH"}</span>
                </div>

                {/* Progress bar */}
                <div className="mt-1 mb-2">
                    <div className="text-xs mb-1 flex justify-between">
                        <span>Sales Progress</span>
                        <span style={{ color: percentageSold === 100 ? greenColor : "inherit" }}>
                            {displaySoldTokens} / {totalSupply} ({percentageSold.toFixed(0)}%)
                        </span>
                    </div>
                    <div
                        className="w-full h-1.5 rounded-full"
                        style={{ backgroundColor: colors.border }}
                    >
                        <div
                            className="h-1.5 rounded-full"
                            style={{
                                backgroundColor:
                                    percentageSold === 100 ? greenColor : colors.accent,
                                width: `${percentageSold}%`,
                            }}
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
        <div className="w-full px-2 py-6 mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
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
