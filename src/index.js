import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "./config/wagmi"

// RainbowKit theme wrapper component
function RainbowKitThemeWrapper({ children }) {
    const { isDarkMode, colors } = useTheme()
    const [key, setKey] = React.useState(0)

    // Update key when theme changes to force re-render
    useEffect(() => {
        setKey((prevKey) => prevKey + 1)
    }, [isDarkMode])

    // Complete custom theme implementation
    const myCustomTheme = {
        blurs: {
            modalOverlay: isDarkMode ? "8px" : "4px",
        },
        colors: {
            accentColor: colors.accent,
            accentColorForeground: isDarkMode ? "#000000" : "#FFFFFF",
            actionButtonBorder: colors.border,
            actionButtonBorderMobile: colors.border,
            actionButtonSecondaryBackground: colors.backgroundSecondary,
            closeButton: colors.textSecondary,
            closeButtonBackground: colors.backgroundSecondary,
            connectButtonBackground: colors.button,
            connectButtonBackgroundError: "#FF494A",
            connectButtonInnerBackground: colors.backgroundSecondary,
            connectButtonText: colors.text,
            connectButtonTextError: "#FFFFFF",
            connectionIndicator: colors.accent,
            downloadBottomCardBackground: colors.backgroundSecondary,
            downloadTopCardBackground: colors.background,
            error: "#FF494A",
            generalBorder: colors.border,
            generalBorderDim: colors.border,
            menuItemBackground: colors.button,
            modalBackdrop: isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
            modalBackground: colors.background,
            modalBorder: colors.border,
            modalText: colors.text,
            modalTextDim: colors.textSecondary,
            modalTextSecondary: colors.textSecondary,
            profileAction: colors.backgroundSecondary,
            profileActionHover: colors.buttonHover,
            profileForeground: colors.backgroundSecondary,
            selectedOptionBorder: colors.accent,
            standby: isDarkMode ? "#FFB800" : "#3B82F6",
        },
        fonts: {
            body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        radii: {
            actionButton: "8px",
            connectButton: "8px",
            menuButton: "8px",
            modal: "12px",
            modalMobile: "12px",
        },
        shadows: {
            connectButton: isDarkMode
                ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                : "0px 4px 12px rgba(0, 0, 0, 0.05)",
            dialog: isDarkMode
                ? "0px 8px 32px rgba(0, 0, 0, 0.32)"
                : "0px 8px 32px rgba(0, 0, 0, 0.08)",
            profileDetailsAction: isDarkMode
                ? "0px 2px 6px rgba(0, 0, 0, 0.24)"
                : "0px 2px 6px rgba(0, 0, 0, 0.06)",
            selectedOption: isDarkMode
                ? "0px 2px 6px rgba(0, 0, 0, 0.24)"
                : "0px 2px 6px rgba(0, 0, 0, 0.06)",
            selectedWallet: isDarkMode
                ? "0px 2px 6px rgba(0, 0, 0, 0.24)"
                : "0px 2px 6px rgba(0, 0, 0, 0.06)",
            walletLogo: isDarkMode
                ? "0px 2px 6px rgba(0, 0, 0, 0.24)"
                : "0px 2px 6px rgba(0, 0, 0, 0.06)",
        },
    }

    return (
        <RainbowKitProvider
            key={key}
            theme={myCustomTheme}
            coolMode
            modalSize="compact"
            showRecentTransactions={false}
            disableConnectWallet={false}
            includeWalletIds={["metaMask", "rabby"]}
            appInfo={{
                appName: "Tokenization Demo",
                learnMoreUrl: "/",
            }}
        >
            {children}
        </RainbowKitProvider>
    )
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <RainbowKitThemeWrapper>
                        <App />
                    </RainbowKitThemeWrapper>
                </ThemeProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
