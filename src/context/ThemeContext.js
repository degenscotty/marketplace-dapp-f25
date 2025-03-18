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
    background: "#EFE6D9", // Light beige/tan background from the image
    backgroundSecondary: "#F5F0E8", // Slightly lighter beige for secondary backgrounds
    text: "#8C583C", // Brown text color for main content
    textSecondary: "#A67B60", // Lighter brown for secondary text
    accent: "#EE952A", // Reddish-brown accent color from the Foundation branding
    border: "#D3C5B6", // Light brown border color
    button: "#B27553", // Button background color like the "Trade Now" button
    buttonHover: "#96532A", // Darker brown for button hover state
    green: "#6A8D73", // Earthy green that matches the theme
    red: "#C25D45", // Earthy red that matches the theme
}

const vineyardSunsetTheme = {
    background: "#F9EDE3", // Soft peach background
    backgroundSecondary: "#FAEFD7", // Cream colored secondary background
    text: "#5E4B56", // Deep plum text color
    textSecondary: "#937B92", // Lighter plum for secondary text
    accent: "#E08D60", // Sunset orange accent color
    border: "#D5BFA9", // Sandy border color
    button: "#8C5D7B", // Grapevine purple button color
    buttonHover: "#704B63", // Deeper purple for hover state
    green: "#7F9E6F", // Vineyard green
    red: "#C15B4C", // Terracotta red
}

const coastalBreezeTheme = {
    background: "#E6F0F3", // Soft sky blue background
    backgroundSecondary: "#F0F7F7", // Pale seafoam secondary background
    text: "#2A5674", // Deep ocean blue text
    textSecondary: "#5B89A6", // Medium blue for secondary text
    accent: "#F3B749", // Sandy gold accent color
    border: "#C2D8E1", // Light blue-gray border
    button: "#4E9BAA", // Teal button color
    buttonHover: "#367785", // Deeper teal for hover state
    green: "#8BB8A8", // Seafoam green
    red: "#E77A77", // Coral red
}

const cherryBlossomTheme = {
    background: "#FFF5F8", // Pale pink background
    backgroundSecondary: "#FDFAFC", // Softer pink-white secondary background
    text: "#5D4157", // Deep plum text
    textSecondary: "#8E6E87", // Lighter plum for secondary text
    accent: "#FF8AAE", // Cherry blossom pink accent
    border: "#F0D4DD", // Light pink border
    button: "#A4709C", // Lavender purple button
    buttonHover: "#8A5A84", // Deeper purple for hover state
    green: "#A9D0B6", // Soft leaf green
    red: "#E87A90", // Traditional Japanese red (traditional color "Toki")
}

const desertOasisTheme = {
    background: "#F6F0E8", // Warm sand background
    backgroundSecondary: "#FDF8F1", // Lighter sand secondary background
    text: "#5C4A3D", // Deep earth brown text
    textSecondary: "#8C7A6B", // Softer brown for secondary text
    accent: "#4AA39C", // Turquoise oasis water accent
    border: "#E5D6C6", // Pale sandstone border
    button: "#D28B54", // Terra cotta button
    buttonHover: "#B6703E", // Deeper terra cotta for hover state
    green: "#95B09E", // Desert sage green
    red: "#CB6B5B", // Mesa red
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
            document.documentElement.classList.remove("light")
        } else {
            document.documentElement.classList.remove("dark")
            document.documentElement.classList.add("light")
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
