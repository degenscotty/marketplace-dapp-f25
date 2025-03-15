import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"

function Navbar() {
    const { isDarkMode, toggleDarkMode, colors } = useTheme()
    const { nfts } = useNFTs()

    return (
        <>
            {/* Add a spacer to prevent content from appearing under the navbar */}
            <div className="h-14"></div>
            <div className="fixed top-0 left-0 right-0 z-1">
                {/* Main navbar */}
                <nav
                    className={`h-14 flex justify-center items-center text-base w-full transition-all duration-500`}
                    style={{
                        color: colors.text,
                        pointerEvents: "auto", // Ensure clicks are registered
                    }}
                >
                    <div className="container mx-4 w-full flex justify-between items-center max-w-full">
                        <div className="flex items-baseline space-x-4">
                            <Link
                                to="/"
                                style={{ color: colors.text }}
                                className="text-xl font-bold transition-colors hover:opacity-80"
                            >
                                Tokenization Demo
                            </Link>
                            <Link
                                to="/projects"
                                style={{
                                    color: colors.accent,
                                }}
                                className="text-sm font-medium px-3 py-2 rounded-md transition-colors hover:opacity-80"
                            >
                                Projects
                            </Link>
                            <Link
                                to="/portfolio"
                                style={{
                                    color: colors.accent,
                                }}
                                className="text-sm font-medium px-3 py-2 rounded-md transition-colors hover:opacity-80"
                            >
                                My Portfolio
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div
                                className="text-sm font-medium py-2"
                                style={{ color: colors.textSecondary }}
                            >
                                Listed NFTs: {nfts.length}
                            </div>
                            <div className="scale-95 transform origin-right">
                                <ConnectButton
                                    showBalance={true}
                                    chainStatus="full"
                                    accountStatus={{
                                        smallScreen: "avatar",
                                        largeScreen: "full",
                                    }}
                                    label="Connect Wallet"
                                />
                            </div>
                            <button onClick={toggleDarkMode} className="p-2 text-sm">
                                {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
