import React from "react"
import Navbar from "./components/Navbar"
import NFTGrid from "./components/NFTGrid"
import { useTheme } from "./context/ThemeContext"
import { NFTProvider } from "./context/NFTContext"

function App() {
    const { isDarkMode } = useTheme()

    return (
        <NFTProvider>
            <div className={`min-h-screen ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <Navbar />
                <NFTGrid />
            </div>
        </NFTProvider>
    )
}

export default App
