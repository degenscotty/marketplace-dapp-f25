import React from "react"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"

function Navbar() {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const { nfts } = useNFTs()

    return (
        <nav
            className={`h-16 flex justify-center items-center text-base fixed top-0 w-full z-50 shadow-md ${
                isDarkMode ? "bg-gray-700" : "bg-white"
            }`}
        >
            <div className="container mx-auto px-12 flex justify-between items-center max-w-7xl">
                <div className="text-2xl font-bold">
                    <a
                        href="/"
                        className={`${isDarkMode ? "text-white hover:text-gray-300" : "text-gray-800 hover:text-gray-600"} transition-colors`}
                    >
                        Tokenization Demo
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    <div className={`${isDarkMode ? "text-white" : "text-gray-800"} font-medium`}>
                        Listed NFTs: {nfts.length}
                    </div>
                    <ConnectButton />
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-lg transition-colors ${
                            isDarkMode
                                ? "bg-gray-500 text-gray-200 hover:bg-gray-400"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
