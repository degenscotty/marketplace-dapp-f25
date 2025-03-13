import React, { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

// Define theme colors based on the provided image
const darkThemeColors = {
    background: "#121212",
    backgroundSecondary: "#1E1E1E",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    accent: "#FFB800",
    border: "#2A2A2A",
    button: "#1E1E1E",
    buttonHover: "#2A2A2A",
}

const lightThemeColors = {
    background: "#F9FAFB",
    backgroundSecondary: "#FFFFFF",
    text: "#111827",
    textSecondary: "#6B7280",
    accent: "#3B82F6",
    border: "#E5E7EB",
    button: "#F3F4F6",
    buttonHover: "#E5E7EB",
}

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

    // Get the current theme colors
    const colors = isDarkMode ? darkThemeColors : lightThemeColors

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
