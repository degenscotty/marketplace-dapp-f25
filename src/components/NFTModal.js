import React, { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"

function NFTModal({ nft, isOpen, onClose, onBuy }) {
    const { colors } = useTheme()
    const { buyNFT, sellNFT } = useNFTs()
    const [quantity, setQuantity] = useState(1)
    const [sellQuantity, setSellQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState("buy") // 'buy' or 'sell'

    // Reset quantities and set default tab when modal opens
    useEffect(() => {
        if (isOpen) {
            setQuantity(1)
            setSellQuantity(nft && nft.isOwned ? Math.min(nft.ownedQuantity, 1) : 0)
            setActiveTab(nft && nft.isOwned ? "sell" : "buy")
        }
    }, [isOpen, nft])

    // Define the green color for sold out status
    const greenColor = "#4ADE80"

    if (!isOpen || !nft) return null

    const maxAvailable = nft ? Math.max(0, nft.totalSupply - nft.soldTokens) : 0
    const soldPercentage = nft ? Math.min(100, (nft.soldTokens / nft.totalSupply) * 100) : 0
    const availablePercentage = 100 - soldPercentage
    const quantityPercentage = nft
        ? Math.min(availablePercentage, (quantity / nft.totalSupply) * 100)
        : 0

    // Calculate total price as a number, only format for display
    const totalPriceValue = nft ? parseFloat(nft.price) * quantity : 0
    const totalPriceFormatted = totalPriceValue.toFixed(3)

    // Calculate total sell value
    const totalSellValue = nft ? parseFloat(nft.price) * sellQuantity : 0
    const totalSellFormatted = totalSellValue.toFixed(3)

    // Calculate sell quantity percentage (for the progress bar)
    const sellQuantityPercentage =
        nft && nft.ownedQuantity ? (sellQuantity / nft.ownedQuantity) * 100 : 0

    // Handle buy action
    const handleBuy = () => {
        if (onBuy) {
            onBuy(nft.id, quantity, totalPriceFormatted)
            // Also update context
            buyNFT(nft.id, quantity)
        }
    }

    // Handle sell action
    const handleSell = () => {
        if (sellNFT(nft.id, sellQuantity)) {
            alert(
                `Successfully sold ${sellQuantity} tokens of "${nft.title}" for ${totalSellFormatted} ETH`,
            )
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div
                className="relative rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
                style={{
                    backgroundColor: colors.backgroundSecondary,
                    color: colors.text,
                }}
            >
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 z-10 rounded-full w-7 h-7 flex items-center justify-center hover:bg-opacity-70"
                    style={{
                        backgroundColor: colors.button,
                        color: colors.text,
                    }}
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Main content area */}
                <div className="flex-1 flex flex-col md:flex-row">
                    {/* Image section */}
                    <div className="md:w-1/2">
                        <img
                            src={nft.imageUrl}
                            alt={nft.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info section */}
                    <div className="p-5 pb-0 md:w-1/2">
                        <h2 className="text-xl font-bold mb-3">{nft.title}</h2>

                        {/* Ownership badge for owned NFTs */}
                        {nft.isOwned && (
                            <div
                                className="mb-4 py-1 px-3 rounded-full text-sm font-medium inline-block"
                                style={{
                                    backgroundColor: `${greenColor}20`,
                                    color: greenColor,
                                }}
                            >
                                You own {nft.ownedQuantity} tokens
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Price per token:</span>
                                <span className="text-sm">{nft.price} ETH</span>
                            </div>

                            <div className="flex justify-between mb-3">
                                <span className="text-sm font-medium">Available:</span>
                                <span
                                    className="text-sm"
                                    style={{
                                        color: soldPercentage === 100 ? greenColor : "inherit",
                                    }}
                                >
                                    {Math.max(0, nft.totalSupply - nft.soldTokens)} /{" "}
                                    {nft.totalSupply} tokens
                                    {soldPercentage === 100 && " (Sold Out)"}
                                </span>
                            </div>

                            {/* Buy/Sell Tabs - only show if owned */}
                            {nft.isOwned && (
                                <div
                                    className="flex border-b mb-4"
                                    style={{ borderColor: colors.border }}
                                >
                                    <button
                                        className={`py-2 px-4 font-medium text-sm ${activeTab === "sell" ? "border-b-2" : ""}`}
                                        style={{
                                            borderColor:
                                                activeTab === "sell" ? greenColor : "transparent",
                                            color:
                                                activeTab === "sell"
                                                    ? greenColor
                                                    : colors.textSecondary,
                                        }}
                                        onClick={() => setActiveTab("sell")}
                                    >
                                        Sell
                                    </button>
                                    <button
                                        className={`py-2 px-4 font-medium text-sm ${activeTab === "buy" ? "border-b-2" : ""}`}
                                        style={{
                                            borderColor:
                                                activeTab === "buy" ? colors.accent : "transparent",
                                            color:
                                                activeTab === "buy"
                                                    ? colors.accent
                                                    : colors.textSecondary,
                                        }}
                                        onClick={() => setActiveTab("buy")}
                                    >
                                        Buy More
                                    </button>
                                </div>
                            )}

                            {activeTab === "buy" && (
                                /* Progress bar with integrated quantity selector for buying */
                                <div className="mt-2 mb-5">
                                    <div className="mb-2 text-sm font-medium">
                                        Quantity to purchase
                                    </div>
                                    <div className="relative">
                                        <div
                                            className="w-full h-1.5 rounded-full"
                                            style={{ backgroundColor: colors.border }}
                                        >
                                            {/* Sold tokens and quantity selector combined */}
                                            <div className="relative h-1.5">
                                                {/* Sold tokens */}
                                                <div
                                                    className="absolute left-0 h-1.5 rounded-l-full"
                                                    style={{
                                                        backgroundColor:
                                                            maxAvailable <= 0
                                                                ? greenColor
                                                                : colors.accent,
                                                        borderRadius:
                                                            maxAvailable <= 0
                                                                ? "9999px"
                                                                : "9999px 0 0 9999px",
                                                        width:
                                                            maxAvailable > 0
                                                                ? `${soldPercentage}%`
                                                                : "100%",
                                                    }}
                                                ></div>
                                                {/* Selected quantity */}
                                                {maxAvailable > 0 && (
                                                    <div
                                                        className="absolute h-1.5"
                                                        style={{
                                                            backgroundColor: greenColor,
                                                            left: `${soldPercentage}%`,
                                                            width: `${quantityPercentage}%`,
                                                            borderRadius:
                                                                quantity + nft.soldTokens >=
                                                                nft.totalSupply
                                                                    ? "0 9999px 9999px 0"
                                                                    : "0",
                                                        }}
                                                    ></div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Range input with custom styling - only over available section */}
                                        {maxAvailable > 0 && (
                                            <div
                                                className="absolute top-0 left-0 w-full h-1.5"
                                                style={{ pointerEvents: "none" }}
                                            >
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max={maxAvailable}
                                                    value={quantity}
                                                    onChange={(e) =>
                                                        setQuantity(parseInt(e.target.value))
                                                    }
                                                    className="absolute top-1/2 -translate-y-1/2 h-3 cursor-pointer appearance-none bg-transparent 
                                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 
                                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 [&::-webkit-slider-thumb]:shadow-md 
                                                        [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-2 
                                                        [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-800 
                                                        [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0"
                                                    style={{
                                                        left: `${soldPercentage - 1}%`,
                                                        width: `${availablePercentage + 2}%`,
                                                        pointerEvents: "auto",
                                                    }}
                                                    aria-label="Select quantity of tokens to purchase"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {maxAvailable > 0 && (
                                        <div className="text-center mt-2">
                                            <span
                                                className="px-2 py-1 rounded text-xs font-medium"
                                                style={{
                                                    backgroundColor: `${colors.accent}33`,
                                                    color: colors.accent,
                                                }}
                                            >
                                                {quantity} {quantity === 1 ? "token" : "tokens"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "sell" && nft.isOwned && (
                                /* Sell quantity selector */
                                <div className="mt-2 mb-5">
                                    <div className="mb-2 text-sm font-medium">Quantity to sell</div>
                                    <div className="relative">
                                        <div
                                            className="w-full h-1.5 rounded-full"
                                            style={{ backgroundColor: colors.border }}
                                        >
                                            {/* Selected sell quantity */}
                                            <div
                                                className="absolute left-0 h-1.5 rounded-full"
                                                style={{
                                                    backgroundColor: greenColor,
                                                    width: `${sellQuantityPercentage}%`,
                                                    minWidth: sellQuantity > 0 ? "4px" : "0px",
                                                    borderRadius:
                                                        sellQuantity === 0
                                                            ? "9999px"
                                                            : sellQuantity === nft.ownedQuantity
                                                              ? "9999px"
                                                              : "9999px 0 0 9999px",
                                                }}
                                            ></div>
                                        </div>

                                        {/* Range input for sell quantity */}
                                        <div
                                            className="absolute top-0 left-0 w-full h-1.5"
                                            style={{ pointerEvents: "none" }}
                                        >
                                            <input
                                                type="range"
                                                min="1"
                                                max={nft.ownedQuantity}
                                                value={sellQuantity}
                                                onChange={(e) =>
                                                    setSellQuantity(parseInt(e.target.value))
                                                }
                                                className="absolute top-1/2 -translate-y-1/2 h-3 cursor-pointer appearance-none bg-transparent 
                                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 
                                                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 [&::-webkit-slider-thumb]:shadow-md 
                                                    [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-2 
                                                    [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-800 
                                                    [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0"
                                                style={{
                                                    width: "100%",
                                                    pointerEvents: "auto",
                                                    left: "0%",
                                                }}
                                                aria-label="Select quantity of tokens to sell"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-2">
                                        <span
                                            className="px-2 py-1 rounded text-xs font-medium"
                                            style={{
                                                backgroundColor: `${greenColor}20`,
                                                color: greenColor,
                                            }}
                                        >
                                            {sellQuantity} {sellQuantity === 1 ? "token" : "tokens"}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Investment Return Metrics Section */}
                            <div
                                className="mt-5 p-3 rounded-lg"
                                style={{ backgroundColor: colors.background }}
                            >
                                <h3 className="text-sm font-semibold mb-3">
                                    Investment Performance
                                </h3>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* APR */}
                                    <div
                                        className="p-2 rounded-md"
                                        style={{
                                            backgroundColor: colors.backgroundSecondary,
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <div
                                            className="text-xs"
                                            style={{ color: colors.textSecondary }}
                                        >
                                            Annual APR
                                        </div>
                                        <div
                                            className="text-lg font-bold"
                                            style={{ color: colors.text }}
                                        >
                                            8.5%
                                        </div>
                                    </div>

                                    {/* ROI */}
                                    <div
                                        className="p-2 rounded-md"
                                        style={{
                                            backgroundColor: colors.backgroundSecondary,
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <div
                                            className="text-xs"
                                            style={{ color: colors.textSecondary }}
                                        >
                                            Est. 5-Year ROI
                                        </div>
                                        <div
                                            className="text-lg font-bold"
                                            style={{ color: colors.text }}
                                        >
                                            42.5%
                                        </div>
                                    </div>

                                    {/* Term */}
                                    <div
                                        className="p-2 rounded-md"
                                        style={{
                                            backgroundColor: colors.backgroundSecondary,
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <div
                                            className="text-xs"
                                            style={{ color: colors.textSecondary }}
                                        >
                                            Lockup Period
                                        </div>
                                        <div
                                            className="text-lg font-bold"
                                            style={{ color: colors.text }}
                                        >
                                            1 Year
                                        </div>
                                    </div>

                                    {/* Liquidity */}
                                    <div
                                        className="p-2 rounded-md"
                                        style={{
                                            backgroundColor: colors.backgroundSecondary,
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <div
                                            className="text-xs"
                                            style={{ color: colors.textSecondary }}
                                        >
                                            Liquidity
                                        </div>
                                        <div
                                            className="text-lg font-bold"
                                            style={{ color: colors.text }}
                                        >
                                            Medium
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 text-xs">
                                    <span
                                        className="inline-block px-1.5 py-0.5 rounded mr-1"
                                        style={{
                                            backgroundColor: colors.button,
                                            color: colors.textSecondary,
                                        }}
                                    >
                                        Historical volatility: Low
                                    </span>
                                    <span
                                        className="inline-block px-1.5 py-0.5 rounded"
                                        style={{
                                            backgroundColor: colors.button,
                                            color: colors.textSecondary,
                                        }}
                                    >
                                        Quarterly dividends
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky bottom section - no gap */}
                <div
                    className="w-full border-t"
                    style={{
                        backgroundColor: colors.backgroundSecondary,
                        borderColor: colors.border,
                    }}
                >
                    <div className="p-4">
                        {activeTab === "buy" ? (
                            // Buy section
                            maxAvailable > 0 ? (
                                <div className="flex flex-col space-y-3">
                                    {/* Total */}
                                    <div className="flex justify-between text-base font-bold">
                                        <span>Total:</span>
                                        <span>{totalPriceFormatted} ETH</span>
                                    </div>

                                    {/* Buy button */}
                                    <button
                                        onClick={handleBuy}
                                        className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                                        style={{
                                            backgroundColor: colors.accent,
                                            color: "#000000",
                                        }}
                                        disabled={quantity === 0}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="py-2 px-4 rounded-lg font-medium text-sm text-center"
                                    style={{
                                        backgroundColor: colors.button,
                                        color: colors.textSecondary,
                                    }}
                                >
                                    <span style={{ color: "#4ADE80" }}>Sold Out</span>
                                </div>
                            )
                        ) : (
                            // Sell section
                            nft.isOwned && (
                                <div className="flex flex-col space-y-3">
                                    {/* Total */}
                                    <div className="flex justify-between text-base font-bold">
                                        <span>You will receive:</span>
                                        <span>{totalSellFormatted} ETH</span>
                                    </div>

                                    {/* Sell button */}
                                    <button
                                        onClick={handleSell}
                                        className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                                        style={{
                                            backgroundColor: greenColor,
                                            color: "#000000",
                                        }}
                                        disabled={sellQuantity === 0}
                                    >
                                        Sell Tokens
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTModal
