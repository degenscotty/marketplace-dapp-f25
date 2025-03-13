import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import NFTGrid from "./components/NFTGrid"
import Portfolio from "./components/Portfolio"
import { useTheme } from "./context/ThemeContext"
import { NFTProvider } from "./context/NFTContext"

function App() {
    const { colors } = useTheme()

    return (
        <NFTProvider>
            <Router>
                <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<NFTGrid />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Routes>
                </div>
            </Router>
        </NFTProvider>
    )
}

export default App
