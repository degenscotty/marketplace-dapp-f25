import React, { useState } from "react"
import { useTheme } from "../context/ThemeContext"

function NFTModal({ nft, isOpen, onClose, onBuy }) {
    const { isDarkMode } = useTheme()
    const [quantity, setQuantity] = useState(1)
    const maxAvailable = nft ? Math.min(10, nft.totalSupply - nft.soldTokens) : 0

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
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
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

                            {/* Progress bar */}
                            <div className="mt-2 mb-6">
                                <div
                                    className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                                >
                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{
                                            width: `${Math.min(100, (nft.soldTokens / nft.totalSupply) * 100)}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {maxAvailable > 0 ? (
                                <>
                                    {/* Quantity selector */}
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">
                                            Quantity to purchase
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                type="range"
                                                min="1"
                                                max={maxAvailable}
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(parseInt(e.target.value))
                                                }
                                                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                        <div className="text-center mt-2">
                                            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
                                                {quantity} {quantity === 1 ? "token" : "tokens"}
                                            </span>
                                        </div>
                                    </div>

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
                                                ? "bg-blue-500 hover:bg-blue-600 text-white"
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
