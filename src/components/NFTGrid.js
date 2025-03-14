import React, { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import NFTModal from "./NFTModal"

const NFTCard = ({
    imageUrl,
    title,
    price,
    totalSupply,
    soldTokens,
    onClick,
    id,
    isOwned,
    ownedQuantity,
}) => {
    const { colors } = useTheme()
    const { handleImageError } = useNFTs()
    const [imgSrc, setImgSrc] = useState(imageUrl || "https://via.placeholder.com/300")

    // Calculate percentage sold for progress bar, capped at 100%
    const percentageSold = Math.min(100, (soldTokens / totalSupply) * 100)

    // Display the actual tokens, but cap the displayed sold tokens to total supply for UI consistency
    const displaySoldTokens = Math.min(soldTokens, totalSupply)

    const onImageError = () => {
        console.error(`Failed to load image: ${imageUrl}`)
        if (handleImageError) handleImageError(id)
        setImgSrc("https://via.placeholder.com/300?text=Image+Not+Found")
    }

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
                src={imgSrc}
                alt={title}
                className="w-full h-64 object-cover"
                onError={onImageError}
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
                        <span style={{ color: percentageSold === 100 ? colors.green : "inherit" }}>
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
                                    percentageSold === 100 ? colors.green : colors.accent,
                                width: `${percentageSold}%`,
                            }}
                        ></div>
                    </div>
                </div>

                {/* Ownership badge for owned NFTs */}
                {isOwned && (
                    <div
                        className="mt-2 py-1 px-2 rounded-full text-xs font-medium text-center"
                        style={{
                            backgroundColor: `${colors.green}20`,
                            color: colors.green,
                        }}
                    >
                        You own {ownedQuantity} tokens
                    </div>
                )}
            </div>
        </div>
    )
}

function NFTGrid() {
    const { nfts, isNFTOwned, ownedNFTs } = useNFTs()
    const [selectedNFT, setSelectedNFT] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { colors } = useTheme()

    const handleNFTClick = (nft) => {
        // Check if the NFT is owned and add ownership info to the selected NFT
        const owned = isNFTOwned(nft.id)
        const ownedQuantity = owned ? ownedNFTs[nft.id] : 0

        setSelectedNFT({
            ...nft,
            isOwned: owned,
            ownedQuantity,
        })
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

    // Get the list of owned NFTs
    const ownedNFTIds = Object.keys(ownedNFTs).map((id) => parseInt(id))

    return (
        <div className="w-full px-4 mt-6 mb-6">
            {/* New section for My NFTs */}
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                My Projects
            </h2>
            {ownedNFTIds.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
                    {nfts
                        .filter((nft) => ownedNFTIds.includes(nft.id))
                        .map((nft) => (
                            <NFTCard
                                key={nft.id}
                                id={nft.id}
                                imageUrl={nft.imageUrl}
                                title={nft.title}
                                price={nft.price}
                                totalSupply={nft.totalSupply}
                                soldTokens={nft.soldTokens}
                                isOwned={true}
                                ownedQuantity={ownedNFTs[nft.id]}
                                onClick={() => handleNFTClick(nft)}
                            />
                        ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    You don't own any NFTs yet. Browse below to get started!
                </div>
            )}

            {/* New section for Other NFTs */}
            <h2 className="text-xl font-bold mb-4 mt-8" style={{ color: colors.text }}>
                Other Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
                {nfts
                    .filter((nft) => !ownedNFTIds.includes(nft.id))
                    .map((nft) => (
                        <NFTCard
                            key={nft.id}
                            id={nft.id}
                            imageUrl={nft.imageUrl}
                            title={nft.title}
                            price={nft.price}
                            totalSupply={nft.totalSupply}
                            soldTokens={nft.soldTokens}
                            isOwned={false}
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
