import React from "react"
import { useNFTs } from "../context/NFTContext"
import { useTheme } from "../context/ThemeContext"
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
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

    // Create asset distribution data for pie chart
    const assetDistributionData = ownedNFTs.map((nft) => {
        const nftValue = parseFloat(nft.price) * nft.ownedQuantity
        const percentage = (nftValue / totalPortfolioValue) * 100
        return {
            name: nft.title || "Untitled NFT",
            value: nftValue,
            percentage: percentage.toFixed(1),
        }
    })

    // Colors for pie chart segments
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884d8",
        "#82ca9d",
        "#ffc658",
        "#8dd1e1",
    ]

    // Define the green color for positive performance
    const greenColor = "#10B981"

    return (
        <div className="container mx-auto px-4 mt-6 pb-8 max-w-7xl">
            <h1 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                My Portfolio
            </h1>

            {ownedNFTs.length === 0 ? (
                <div className="text-center py-10" style={{ color: colors.textSecondary }}>
                    You don't own any NFTs yet. Browse the marketplace to get started!
                </div>
            ) : (
                <>
                    {/* Portfolio Analysis Section with side by side charts */}
                    <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Portfolio Performance Section */}
                        <div
                            className="p-4 rounded-lg shadow-lg"
                            style={{ backgroundColor: colors.backgroundSecondary }}
                        >
                            <h2 className="text-base font-bold mb-3" style={{ color: colors.text }}>
                                Portfolio Performance
                            </h2>

                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                <div
                                    className="p-3 rounded-lg"
                                    style={{ backgroundColor: colors.background }}
                                >
                                    <p
                                        className="text-xs mb-1"
                                        style={{ color: colors.textSecondary }}
                                    >
                                        Total Value
                                    </p>
                                    <p
                                        className="text-base font-bold"
                                        style={{ color: colors.text }}
                                    >
                                        {totalPortfolioValue.toFixed(3)} ETH
                                    </p>
                                </div>
                                <div
                                    className="p-3 rounded-lg"
                                    style={{ backgroundColor: colors.background }}
                                >
                                    <p
                                        className="text-xs mb-1"
                                        style={{ color: colors.textSecondary }}
                                    >
                                        USD Value
                                    </p>
                                    <p
                                        className="text-base font-bold"
                                        style={{ color: colors.text }}
                                    >
                                        ${(totalPortfolioValue * 3500).toLocaleString()}
                                    </p>
                                </div>
                                <div
                                    className="p-3 rounded-lg"
                                    style={{ backgroundColor: colors.background }}
                                >
                                    <p
                                        className="text-xs mb-1"
                                        style={{ color: colors.textSecondary }}
                                    >
                                        Growth (YTD)
                                    </p>
                                    <p
                                        className="text-base font-bold"
                                        style={{ color: greenColor }}
                                    >
                                        +37.5%
                                    </p>
                                </div>
                                <div
                                    className="p-3 rounded-lg"
                                    style={{ backgroundColor: colors.background }}
                                >
                                    <p
                                        className="text-xs mb-1"
                                        style={{ color: colors.textSecondary }}
                                    >
                                        Avg. Daily Return
                                    </p>
                                    <p
                                        className="text-base font-bold"
                                        style={{ color: greenColor }}
                                    >
                                        +0.12%
                                    </p>
                                </div>
                            </div>

                            {/* Performance Chart */}
                            <div className="h-48 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={performanceData}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorValue"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
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
                                            tick={{ fill: colors.textSecondary, fontSize: 10 }}
                                        />
                                        <YAxis
                                            domain={["dataMin - 0.5", "dataMax + 0.5"]}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: colors.textSecondary, fontSize: 10 }}
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
                                                fontSize: 12,
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
                                className="p-3 rounded-lg"
                                style={{
                                    backgroundColor: colors.background,
                                    height: "176px",
                                    marginTop: "24px",
                                }}
                            >
                                <h3
                                    className="text-xs font-semibold mb-2"
                                    style={{ color: colors.text }}
                                >
                                    Investment Performance
                                </h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                                            className="text-sm font-bold"
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
                                            className="text-sm font-bold"
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
                                            className="text-sm font-bold"
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
                                            className="text-sm font-bold"
                                            style={{ color: colors.text }}
                                        >
                                            Medium
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 text-xs">
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

                        {/* Asset Distribution Section */}
                        <div
                            className="p-4 rounded-lg shadow-lg"
                            style={{ backgroundColor: colors.backgroundSecondary }}
                        >
                            <h2 className="text-base font-bold mb-3" style={{ color: colors.text }}>
                                Asset Distribution
                            </h2>

                            {/* Asset Distribution Chart - increasing height */}
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={assetDistributionData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={3}
                                            dataKey="value"
                                            nameKey="name"
                                            labelLine={false}
                                        >
                                            {assetDistributionData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Asset List - adjusted to match height of investment performance section */}
                            <div
                                className="mt-3 p-3 rounded-lg overflow-auto"
                                style={{ backgroundColor: colors.background, height: "176px" }}
                            >
                                <h3
                                    className="text-xs font-semibold mb-2"
                                    style={{ color: colors.text }}
                                >
                                    Holdings Breakdown
                                </h3>
                                <div className="space-y-1">
                                    {assetDistributionData
                                        .sort((a, b) => b.value - a.value)
                                        .map((asset, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-1 border-b text-xs"
                                                style={{ borderColor: colors.border }}
                                            >
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-2 h-2 rounded-full mr-2"
                                                        style={{
                                                            backgroundColor:
                                                                COLORS[index % COLORS.length],
                                                        }}
                                                    ></div>
                                                    <span style={{ color: colors.text }}>
                                                        {asset.name}
                                                    </span>
                                                </div>
                                                <div className="flex space-x-3">
                                                    <span style={{ color: colors.textSecondary }}>
                                                        {asset.value.toFixed(3)} ETH
                                                    </span>
                                                    <span
                                                        className="font-medium"
                                                        style={{ color: colors.text }}
                                                    >
                                                        {asset.percentage}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NFT Grid */}
                    <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                        My Projects
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {ownedNFTs.map((nft) => (
                            <div
                                key={nft.id}
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
                                        console.error(`Failed to load image: ${nft.imageUrl}`)
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
                                                        (nft.soldTokens / nft.totalSupply) * 100 ===
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
                                                        (nft.soldTokens / nft.totalSupply) * 100 ===
                                                        100
                                                            ? colors.green
                                                            : colors.accent,
                                                    width: `${Math.min(100, (nft.soldTokens / nft.totalSupply) * 100)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Ownership badge */}
                                    <div
                                        className="mt-2 py-1 px-2 rounded-full text-xs font-medium text-center"
                                        style={{
                                            backgroundColor: `${colors.green}20`,
                                            color: colors.green,
                                        }}
                                    >
                                        You own {nft.ownedQuantity} tokens
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
