import React, { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"

function NFTModal({ nft, isOpen, onClose, onBuy }) {
    const { isDarkMode } = useTheme()
    const [quantity, setQuantity] = useState(0)

    // Reset quantity when modal opens
    useEffect(() => {
        if (isOpen) {
            setQuantity(0)
        }
    }, [isOpen])

    const maxAvailable = nft ? Math.max(0, nft.totalSupply - nft.soldTokens) : 0

    // Calculate total price based on quantity
    const totalPrice = nft ? (parseFloat(nft.price) * quantity).toFixed(3) : 0

    if (!isOpen || !nft) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div
                className={`relative rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
            >
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 z-10 text-white bg-gray-800 bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image section */}
                    <div className="md:w-1/2">
                        <img
                            src={nft.imageUrl}
                            alt={nft.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Info section */}
                    <div className="p-6 md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">{nft.title}</h2>

                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">Price per token:</span>
                                <span>{nft.price} ETH</span>
                            </div>

                            <div className="flex justify-between mb-4">
                                <span className="font-medium">Available:</span>
                                <span>
                                    {Math.max(0, nft.totalSupply - nft.soldTokens)} /{" "}
                                    {nft.totalSupply} tokens
                                </span>
                            </div>

                            {/* Progress bar with integrated quantity selector */}
                            <div className="mt-2 mb-6">
                                <div className="mb-2 font-medium">Quantity to purchase</div>
                                <div className="relative">
                                    <div
                                        className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
                                    >
                                        {/* Sold tokens and quantity selector combined */}
                                        <div className="relative h-2">
                                            {/* Sold tokens */}
                                            <div
                                                className="absolute left-0 h-2 rounded-l-full bg-blue-500"
                                                style={{
                                                    width:
                                                        maxAvailable > 0
                                                            ? `${Math.min(100, (nft.soldTokens / nft.totalSupply) * 100)}%`
                                                            : "100%",
                                                }}
                                            ></div>
                                            {/* Selected quantity */}
                                            {maxAvailable > 0 && (
                                                <div
                                                    className="absolute h-2 bg-green-300"
                                                    style={{
                                                        left: `${Math.min(100, (nft.soldTokens / nft.totalSupply) * 100)}%`,
                                                        width: `${Math.min(
                                                            100 -
                                                                (nft.soldTokens / nft.totalSupply) *
                                                                    100,
                                                            (quantity / nft.totalSupply) * 100,
                                                        )}%`,
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
                                            className="absolute top-0 left-0 w-full h-2"
                                            style={{
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxAvailable}
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(parseInt(e.target.value))
                                                }
                                                className={`absolute top-1/2 -translate-y-1/2 h-4 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-800 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-800 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0`}
                                                style={{
                                                    left: `${Math.min(100, (nft.soldTokens / nft.totalSupply) * 100)}%`,
                                                    width: `${100 - Math.min(100, (nft.soldTokens / nft.totalSupply) * 100)}%`,
                                                    pointerEvents: "auto",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                {maxAvailable > 0 && (
                                    <div className="text-center mt-2">
                                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
                                            {quantity} {quantity === 1 ? "token" : "tokens"}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {maxAvailable > 0 ? (
                                <>
                                    {/* Total */}
                                    <div className="flex justify-between text-lg font-bold mb-6">
                                        <span>Total:</span>
                                        <span>{totalPrice} ETH</span>
                                    </div>

                                    {/* Buy button */}
                                    <button
                                        onClick={() => onBuy(nft.id, quantity, totalPrice)}
                                        className={`w-full py-3 px-4 rounded-lg font-medium text-lg transition-colors ${
                                            isDarkMode
                                                ? "bg-gray-600 hover:bg-gray-500 text-white"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                    >
                                        Buy Now
                                    </button>
                                </>
                            ) : (
                                <div className="py-3 px-4 rounded-lg font-medium text-lg text-center bg-gray-200 text-gray-600">
                                    Sold Out
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTModal
