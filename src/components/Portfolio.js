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
    const { nfts } = useNFTs()
    const { isDarkMode } = useTheme()

    // In a real app, this would filter for NFTs owned by the current user
    // For demo purposes, we'll just show the first 3 NFTs as "owned"
    const ownedNFTs = nfts.slice(0, 3)

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
    const totalPortfolioValue = ownedNFTs.reduce((sum, nft) => sum + parseFloat(nft.price), 0)

    return (
        <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
            <h1
                className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}
            >
                My Portfolio
            </h1>

            {ownedNFTs.length === 0 ? (
                <div
                    className={`text-center py-10 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                    You don't own any NFTs yet. Browse the marketplace to get started!
                </div>
            ) : (
                <>
                    {/* Portfolio Performance Section */}
                    <div
                        className={`mb-8 p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
                    >
                        <h2
                            className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                        >
                            Portfolio Performance
                        </h2>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div
                                className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
                            >
                                <p
                                    className={`text-sm mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                >
                                    Total Value
                                </p>
                                <p
                                    className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                >
                                    {totalPortfolioValue.toFixed(3)} ETH
                                </p>
                            </div>
                            <div
                                className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
                            >
                                <p
                                    className={`text-sm mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                >
                                    Growth (YTD)
                                </p>
                                <p className={`text-2xl font-bold text-green-500`}>+37.5%</p>
                            </div>
                            <div
                                className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
                            >
                                <p
                                    className={`text-sm mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                >
                                    Avg. Daily Return
                                </p>
                                <p className={`text-2xl font-bold text-green-500`}>+0.12%</p>
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
                                                stopColor="#10B981"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#10B981"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                                    />
                                    <YAxis
                                        domain={["dataMin - 0.5", "dataMax + 0.5"]}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                                    />
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke={isDarkMode ? "#4B5563" : "#E5E7EB"}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                                            borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                                            color: isDarkMode ? "#F9FAFB" : "#111827",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10B981"
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Investment Performance Metrics */}
                        <div
                            className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
                        >
                            <h3
                                className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                            >
                                Investment Performance
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {/* APR */}
                                <div
                                    className={`p-2 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                                >
                                    <div
                                        className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                        Annual APR
                                    </div>
                                    <div
                                        className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                    >
                                        8.5%
                                    </div>
                                </div>

                                {/* ROI */}
                                <div
                                    className={`p-2 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                                >
                                    <div
                                        className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                        Est. 5-Year ROI
                                    </div>
                                    <div
                                        className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                    >
                                        42.5%
                                    </div>
                                </div>

                                {/* Term */}
                                <div
                                    className={`p-2 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                                >
                                    <div
                                        className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                        Avg. Lockup Period
                                    </div>
                                    <div
                                        className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                    >
                                        1 Year
                                    </div>
                                </div>

                                {/* Liquidity */}
                                <div
                                    className={`p-2 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                                >
                                    <div
                                        className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                        Portfolio Liquidity
                                    </div>
                                    <div
                                        className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                    >
                                        Medium
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 text-xs">
                                <span
                                    className={`inline-block px-1.5 py-0.5 rounded mr-1 ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}
                                >
                                    Historical volatility: Low
                                </span>
                                <span
                                    className={`inline-block px-1.5 py-0.5 rounded ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}
                                >
                                    Quarterly dividends
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* NFT Grid */}
                    <h2
                        className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                        My NFTs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ownedNFTs.map((nft) => (
                            <div
                                key={nft.id}
                                className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] ${
                                    isDarkMode ? "bg-gray-700" : "bg-white"
                                }`}
                            >
                                <img
                                    src={nft.imageUrl}
                                    alt={nft.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3
                                        className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                    >
                                        {nft.title}
                                    </h3>
                                    <div
                                        className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                                    >
                                        <p className="mb-1">Value: {nft.price}</p>
                                        <p>Ownership: {Math.floor(Math.random() * 20) + 10}%</p>
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
