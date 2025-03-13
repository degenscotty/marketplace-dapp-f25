import React from "react"
import { useNFTs } from "../context/NFTContext"
import { useTheme } from "../context/ThemeContext"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts"

function Portfolio() {
    const { getOwnedNFTsWithQuantities } = useNFTs()
    const { colors } = useTheme()

    // Use the owned NFTs from context instead of hardcoding first 3
    const ownedNFTs = getOwnedNFTsWithQuantities()

    // Sample performance data for the chart
    // In a real application, this would come from an API
    const performanceData = [
        { month: "Jan", value: 4.0 },
        { month: "Feb", value: 4.2 },
        { month: "Mar", value: 4.1 },
        { month: "Apr", value: 4.3 },
        { month: "May", value: 4.5 },
        { month: "Jun", value: 4.4 },
        { month: "Jul", value: 4.6 },
        { month: "Aug", value: 4.8 },
        { month: "Sep", value: 5.0 },
        { month: "Oct", value: 5.1 },
        { month: "Nov", value: 5.3 },
        { month: "Dec", value: 5.5 },
    ]

    // Calculate total portfolio value
    const totalPortfolioValue = ownedNFTs.reduce((sum, nft) => {
        // Use the price multiplied by owned quantity
        return sum + parseFloat(nft.price) * nft.ownedQuantity
    }, 0)

    // Define the green color for positive performance
    const greenColor = "#10B981"

    return (
        <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-6" style={{ color: colors.text }}>
                My Portfolio
            </h1>

            {ownedNFTs.length === 0 ? (
                <div className="text-center py-10" style={{ color: colors.textSecondary }}>
                    You don't own any NFTs yet. Browse the marketplace to get started!
                </div>
            ) : (
                <>
                    {/* Portfolio Performance Section */}
                    <div
                        className="mb-8 p-6 rounded-lg shadow-lg"
                        style={{ backgroundColor: colors.backgroundSecondary }}
                    >
                        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
                            Portfolio Performance
                        </h2>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div
                                className="p-4 rounded-lg"
                                style={{ backgroundColor: colors.background }}
                            >
                                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                                    Total Value
                                </p>
                                <p className="text-2xl font-bold" style={{ color: colors.text }}>
                                    {totalPortfolioValue.toFixed(3)} ETH
                                </p>
                            </div>
                            <div
                                className="p-4 rounded-lg"
                                style={{ backgroundColor: colors.background }}
                            >
                                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                                    Growth (YTD)
                                </p>
                                <p className="text-2xl font-bold" style={{ color: greenColor }}>
                                    +37.5%
                                </p>
                            </div>
                            <div
                                className="p-4 rounded-lg"
                                style={{ backgroundColor: colors.background }}
                            >
                                <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                                    Avg. Daily Return
                                </p>
                                <p className="text-2xl font-bold" style={{ color: greenColor }}>
                                    +0.12%
                                </p>
                            </div>
                        </div>

                        {/* Performance Chart */}
                        <div className="h-64 mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={performanceData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop
                                                offset="5%"
                                                stopColor={greenColor}
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor={greenColor}
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: colors.textSecondary }}
                                    />
                                    <YAxis
                                        domain={["dataMin - 0.5", "dataMax + 0.5"]}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: colors.textSecondary }}
                                    />
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke={colors.border}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: colors.backgroundSecondary,
                                            borderColor: colors.border,
                                            color: colors.text,
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={greenColor}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Investment Performance Metrics */}
                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: colors.background }}
                        >
                            <h3
                                className="text-sm font-semibold mb-3"
                                style={{ color: colors.text }}
                            >
                                Investment Performance
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                                        Avg. Lockup Period
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
                                        Portfolio Liquidity
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

                    {/* NFT Grid */}
                    <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
                        My Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ownedNFTs.map((nft) => (
                            <div
                                key={nft.id}
                                className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
                                style={{ backgroundColor: colors.backgroundSecondary }}
                            >
                                <img
                                    src={nft.imageUrl}
                                    alt={nft.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3
                                        className="text-xl font-semibold mb-2"
                                        style={{ color: colors.text }}
                                    >
                                        {nft.title}
                                    </h3>
                                    <div style={{ color: colors.textSecondary }}>
                                        <p className="mb-1">Value: {nft.price}</p>
                                        <p>
                                            Owned Tokens: {nft.ownedQuantity} (
                                            {((nft.ownedQuantity / nft.totalSupply) * 100).toFixed(
                                                1,
                                            )}
                                            %)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Portfolio
