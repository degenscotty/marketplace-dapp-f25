import React, { createContext, useContext, useState } from "react"

const NFTContext = createContext()

// Array of random location names
const locationNames = [
    "Manhattan Penthouse",
    "Dubai Skyscraper",
    "Tokyo Tower",
    "London Townhouse",
    "Paris Apartment",
    "Sydney Opera House",
    "Chicago Skyline",
    "Barcelona Villa",
    "Singapore Marina",
    "Toronto Condo",
    "Venice Canal House",
    "Hong Kong Highrise",
    "San Francisco Victorian",
    "Rio Beachfront",
    "Berlin Loft",
    "Amsterdam Canal House",
    "Rome Historic Villa",
    "Moscow Mansion",
    "Seattle Space Needle",
    "Miami Beach House",
]

// Building images from stable sources
const buildingImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300&h=300&fit=crop",
]

// Generate initial NFT data outside the component
const initialNFTs = Array(10)
    .fill()
    .map((_, index) => {
        const randomLocationIndex = index % locationNames.length
        const imageUrl =
            index < buildingImages.length
                ? buildingImages[index]
                : `https://via.placeholder.com/300x300?text=Building+${index + 1}`

        return {
            id: index + 1,
            imageUrl: imageUrl,
            title: locationNames[randomLocationIndex],
            price: `${(Math.random() * 2).toFixed(3)} ETH`,
            totalSupply: Math.floor(Math.random() * 1000) + 100,
            soldTokens: Math.floor(Math.random() * 1000) + 10,
        }
    })

export function NFTProvider({ children }) {
    const [nfts] = useState(initialNFTs)

    return <NFTContext.Provider value={{ nfts }}>{children}</NFTContext.Provider>
}

export function useNFTs() {
    const context = useContext(NFTContext)
    if (!context) {
        throw new Error("useNFTs must be used within an NFTProvider")
    }
    return context
}
