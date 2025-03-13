import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit"
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

    // Create theme objects outside of JSX for better control
    const rainbowTheme = isDarkMode
        ? darkTheme({
              accentColor: colors.accent,
              accentColorForeground: "#000000",
              borderRadius: "medium",
              fontStack: "system",
              overlayBlur: "small",
          })
        : lightTheme({
              accentColor: colors.accent,
              accentColorForeground: "#FFFFFF",
              borderRadius: "medium",
              fontStack: "system",
              overlayBlur: "small",
          })

    return (
        <RainbowKitProvider
            key={key}
            theme={rainbowTheme}
            coolMode
            modalSize="compact"
            showRecentTransactions={false}
            disableConnectWallet={false}
            includeWalletIds={["metaMask", "rabby"]}
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
