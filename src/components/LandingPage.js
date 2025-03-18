import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useNFTs } from "../context/NFTContext"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import animationDataLight from "../image/animationDataLight.json"
import animationDataDark from "../image/animationDataDark.json"

function LandingPage() {
    const { colors, isDarkMode } = useTheme()
    const { nfts, isNFTOwned, ownedNFTs, handleImageError } = useNFTs()

    // Get the first 4 NFTs for featured properties
    const featuredNFTs = nfts.slice(0, 4)

    // Function to handle NFT card click
    const handleNFTClick = (nftId) => {
        // Navigate to projects page
        window.location.href = "/projects"
    }

    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <div className="w-full px-4 flex flex-col items-center text-center">
                {/* Lottie Animation */}
                <div style={{ width: "600px", height: "600px" }} className="w-full">
                    <DotLottieReact
                        data={isDarkMode ? animationDataDark : animationDataLight}
                        loop
                        autoplay
                    />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
                    Real Estate Tokenization Platform
                </h1>
                <p
                    className="text-xl md:text-2xl max-w-3xl mb-8"
                    style={{ color: colors.textSecondary }}
                >
                    Invest in premium real estate properties through blockchain technology. Own
                    fractions of high-value properties with full transparency and liquidity.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/projects"
                        className="px-8 py-3 rounded-lg font-medium text-lg transition-transform hover:scale-105"
                        style={{
                            backgroundColor: colors.accent,
                            color: colors.backgroundSecondary,
                        }}
                    >
                        Browse Projects
                    </Link>
                    <Link
                        to="/portfolio"
                        className="px-8 py-3 rounded-lg font-medium text-lg border-2 transition-transform hover:scale-105"
                        style={{
                            borderColor: colors.accent,
                            color: colors.accent,
                        }}
                    >
                        My Portfolio
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full py-16 px-4" style={{ color: colors.text }}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why Tokenize Real Estate?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            className="p-6 rounded-lg"
                            style={{ backgroundColor: colors.backgroundSecondary }}
                        >
                            <div className="text-4xl mb-4" style={{ color: colors.accent }}>
                                🏢
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Fractional Ownership</h3>
                            <p style={{ color: colors.textSecondary }}>
                                Invest in high-value properties with as little as $100. Own exactly
                                the share you want.
                            </p>
                        </div>

                        <div
                            className="p-6 rounded-lg"
                            style={{ backgroundColor: colors.backgroundSecondary }}
                        >
                            <div className="text-4xl mb-4" style={{ color: colors.accent }}>
                                💧
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Liquidity</h3>
                            <p style={{ color: colors.textSecondary }}>
                                Easily trade your property tokens on our marketplace without lengthy
                                selling processes.
                            </p>
                        </div>

                        <div
                            className="p-6 rounded-lg"
                            style={{ backgroundColor: colors.backgroundSecondary }}
                        >
                            <div className="text-4xl mb-4" style={{ color: colors.accent }}>
                                🔍
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                            <p style={{ color: colors.textSecondary }}>
                                All property details, rental income, and expenses recorded on the
                                blockchain for full visibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Properties Section */}
            <div className="w-full py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2
                        className="text-3xl font-bold text-center mb-12"
                        style={{ color: colors.text }}
                    >
                        Featured Properties
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredNFTs.map((nft) => {
                            return (
                                <div
                                    key={nft.id}
                                    onClick={() => handleNFTClick(nft.id)}
                                    className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer w-full max-w-xs mx-auto"
                                    style={{
                                        backgroundColor: colors.backgroundSecondary,
                                        color: colors.text,
                                    }}
                                >
                                    <img
                                        src={nft.imageUrl}
                                        alt={nft.title}
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            handleImageError(nft.id)
                                            e.target.src =
                                                "https://via.placeholder.com/300?text=Image+Not+Found"
                                        }}
                                    />
                                    <div className="p-3">
                                        <h3 className="text-base font-semibold mb-1">
                                            {nft.title || "Untitled NFT"}
                                        </h3>
                                        <div className="flex justify-between items-center mb-2">
                                            <span
                                                className="text-xs"
                                                style={{ color: colors.textSecondary }}
                                            >
                                                Price per Token
                                            </span>
                                            <span className="text-sm font-medium">
                                                {nft.price || "0.05 ETH"}
                                            </span>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="mt-1 mb-2">
                                            <div className="text-xs mb-1 flex justify-between">
                                                <span>Sales Progress</span>
                                                <span
                                                    style={{
                                                        color:
                                                            (nft.soldTokens / nft.totalSupply) *
                                                                100 ===
                                                            100
                                                                ? colors.green
                                                                : "inherit",
                                                    }}
                                                >
                                                    {Math.min(nft.soldTokens, nft.totalSupply)} /{" "}
                                                    {nft.totalSupply} (
                                                    {Math.min(
                                                        100,
                                                        (nft.soldTokens / nft.totalSupply) * 100,
                                                    ).toFixed(0)}
                                                    %)
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
                                                            (nft.soldTokens / nft.totalSupply) *
                                                                100 ===
                                                            100
                                                                ? colors.green
                                                                : colors.accent,
                                                        width: `${Math.min(100, (nft.soldTokens / nft.totalSupply) * 100)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/projects"
                            className="px-8 py-3 rounded-lg font-medium text-lg transition-transform hover:scale-105 inline-block"
                            style={{
                                backgroundColor: colors.accent,
                                color: colors.backgroundSecondary,
                            }}
                        >
                            View All Projects
                        </Link>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="w-full py-16 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6" style={{ color: colors.text }}>
                        Ready to Invest in Real Estate Tokens?
                    </h2>
                    <p
                        className="text-xl mb-8 max-w-3xl mx-auto"
                        style={{ color: colors.textSecondary }}
                    >
                        Join thousands of investors who are already building their real estate
                        portfolios through tokenization.
                    </p>
                    <Link
                        to="/projects"
                        className="px-8 py-3 rounded-lg font-medium text-lg transition-transform hover:scale-105 inline-block"
                        style={{
                            backgroundColor: colors.accent,
                            color: colors.backgroundSecondary,
                        }}
                    >
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
