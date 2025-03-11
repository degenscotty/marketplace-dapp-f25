import React, { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    // Check if dark mode is stored in localStorage or use system preference as fallback
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
            return savedTheme === "dark"
        }
        // Use system preference as fallback
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    })

    // Update localStorage and apply body class when theme changes
    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")
        // Optional: Add/remove a class on the body for global styling
        document.body.classList.toggle("dark-mode", isDarkMode)
    }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
