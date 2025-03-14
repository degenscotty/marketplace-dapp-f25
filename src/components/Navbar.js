import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"

function Navbar() {
    const { isDarkMode, toggleDarkMode, colors } = useTheme()
    const { nfts } = useNFTs()
    const [scrolled, setScrolled] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    // Add scroll listener to detect when user scrolls
    useEffect(() => {
        const handleScroll = () => {
            // Update scrolled state
            setScrolled(window.scrollY > 20)

            // Calculate scroll progress for smoother transitions
            // This gives us a value between 0 and 1 for the first 100px of scrolling
            const progress = Math.min(1, window.scrollY / 100)
            setScrollProgress(progress)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Determine the background color based on theme and scroll position
    const navbarBackgroundColor = scrolled
        ? `${colors.backgroundSecondary}${Math.floor(scrollProgress * 40 + 216).toString(16)}`
        : `${colors.backgroundSecondary}00`

    return (
        <>
            {/* Add a spacer to prevent content from appearing under the navbar */}
            <div className="h-14"></div>
            <div className="fixed top-0 left-0 right-0 z-[9999]">
                {/* Main navbar */}
                <nav
                    className={`h-14 flex justify-center items-center text-base w-full transition-all duration-500 ${
                        scrolled ? "backdrop-blur-md" : "backdrop-blur-none"
                    }`}
                    style={{
                        backgroundColor: navbarBackgroundColor,
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
                                    showBalance={false}
                                    chainStatus="icon"
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

                {/* Improved fade-out gradient that works for both light and dark modes */}
                {scrolled && (
                    <div
                        className="h-8 w-full transition-opacity duration-300"
                        style={{
                            background: isDarkMode
                                ? `linear-gradient(to bottom, 
                                    ${colors.backgroundSecondary} 0%, 
                                    ${colors.backgroundSecondary}CC 40%, 
                                    ${colors.backgroundSecondary}66 70%, 
                                    transparent 100%)`
                                : `linear-gradient(to bottom, 
                                    white 0%, 
                                    rgba(255, 255, 255, 0.8) 40%, 
                                    rgba(255, 255, 255, 0.4) 70%, 
                                    transparent 100%)`,
                            opacity: scrollProgress,
                            pointerEvents: "none", // Allow clicks to pass through
                            marginTop: "-4px", // Overlap with the navbar for a smoother transition
                        }}
                    />
                )}
            </div>
        </>
    )
}

export default Navbar
