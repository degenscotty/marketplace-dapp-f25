import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import NFTGrid from "./components/NFTGrid"
import Portfolio from "./components/Portfolio"
import { useTheme } from "./context/ThemeContext"
import { NFTProvider } from "./context/NFTContext"

function App() {
    const { colors } = useTheme()

    // Update CSS variables for theme colors
    React.useEffect(() => {
        // Set the CSS custom properties based on current theme
        document.documentElement.style.setProperty(
            "--themed-scrollbar-track",
            colors.backgroundSecondary,
        )
        document.documentElement.style.setProperty("--themed-scrollbar-thumb", colors.accent)
        document.documentElement.style.setProperty("--themed-background", colors.background)
    }, [colors]) // Re-run when colors change

    return (
        <NFTProvider>
            <Router>
                <div
                    className="flex flex-col h-screen overflow-hidden bg-pattern"
                    style={{ backgroundColor: colors.background }}
                >
                    {/* Navbar with hidden overflow to prevent scrollbar */}
                    <div className="flex-none scrollbar-hide">
                        <Navbar />
                    </div>

                    {/* Content with dynamic scrollbar styling */}
                    <div className="flex-1 overflow-y-auto themed-scrollbar">
                        <Routes>
                            <Route path="/" element={<NFTGrid />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </NFTProvider>
    )
}

export default App
