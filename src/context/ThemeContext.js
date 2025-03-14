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
    green: "#4ADE80",
    red: "#FF4C4C",
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
    green: "#3B8A4D",
    red: "#C72C2C",
}

export function ThemeProvider({ children }) {
    // Check if dark mode is stored in localStorage or use system preference as fallback
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check for saved preference in localStorage
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
            return savedTheme === "dark"
        }
        // If no preference is saved, use system preference
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    })

    // Apply the theme immediately on mount and whenever it changes
    useEffect(() => {
        // Update localStorage
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")

        // Apply dark class to html element (for Tailwind)
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

        // Apply theme-specific CSS variables including scrollbar colors
        document.documentElement.style.setProperty(
            "--accent-color",
            isDarkMode ? darkThemeColors.accent : lightThemeColors.accent,
        )

        // Apply Tailwind scrollbar CSS variables
        document.documentElement.style.setProperty(
            "--scrollbar-thumb",
            isDarkMode ? darkThemeColors.accent : lightThemeColors.accent,
        )

        document.documentElement.style.setProperty(
            "--scrollbar-track",
            isDarkMode ? darkThemeColors.backgroundSecondary : lightThemeColors.backgroundSecondary,
        )
    }, [isDarkMode])

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = (e) => {
            // Only update if user hasn't set a preference
            if (!localStorage.getItem("theme")) {
                setIsDarkMode(e.matches)
            }
        }

        // Add listener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange)
        } else {
            // For older browsers
            mediaQuery.addListener(handleChange)
        }

        // Cleanup listener
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleChange)
            } else {
                // For older browsers
                mediaQuery.removeListener(handleChange)
            }
        }
    }, [])

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
