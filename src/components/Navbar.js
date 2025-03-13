import React from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"

function Navbar() {
    const { isDarkMode, toggleDarkMode, colors } = useTheme()
    const { nfts } = useNFTs()

    return (
        <nav
            className={`h-14 flex justify-center items-center text-base fixed top-0 w-full z-50 shadow-md`}
            style={{
                backgroundColor: colors.backgroundSecondary,
                color: colors.text,
            }}
        >
            <div className="container mx-auto px-12 flex justify-between items-center max-w-7xl">
                <div className="flex items-center space-x-4">
                    <div className="text-xl font-bold">
                        <Link
                            to="/"
                            style={{ color: colors.text }}
                            className="transition-colors hover:opacity-80"
                        >
                            Tokenization Demo
                        </Link>
                    </div>
                    <Link
                        to="/portfolio"
                        style={{
                            color: colors.text,
                        }}
                        className="text-sm font-medium px-3 py-2 rounded-md transition-colors hover:opacity-80"
                    >
                        My Portfolio
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                        Listed NFTs: {nfts.length}
                    </div>
                    <div className="scale-95 transform origin-right">
                        <ConnectButton
                            showBalance={false}
                            className="p-2 rounded-md transition-colors"
                        />
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 text-sm rounded-lg transition-colors"
                        style={{
                            backgroundColor: colors.button,
                            color: colors.text,
                        }}
                    >
                        {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
