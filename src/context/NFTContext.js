import React, { createContext, useContext, useState, useEffect } from "react"

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

// Replace the existing buildingImages array with an updated array of 20 image URLs
const buildingImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1496564203457-11bb12075d90?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1472224371017-08207f84aaae?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=300&h=300&fit=crop",
]

// Generate initial NFT data outside the component
const initialNFTs = Array(20)
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

// Simple function to generate random owned NFTs
const generateRandomOwnedNFTs = (nfts) => {
    const ownedNFTsMap = {}

    // Randomly decide how many NFTs to own (between 2-5)
    const ownedCount = Math.floor(Math.random() * 4) + 2

    // Create a copy of NFT IDs and shuffle them
    const shuffledIds = [...nfts.map((nft) => nft.id)]
    for (let i = shuffledIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]]
    }

    // Take the first few NFTs from the shuffled array
    const selectedIds = shuffledIds.slice(0, ownedCount)

    // Assign random owned quantities within available supply
    selectedIds.forEach((id) => {
        const nft = nfts.find((n) => n.id === id)
        if (nft) {
            // Make sure we own a reasonable quantity (5-20% of available supply)
            const availableTokens = nft.totalSupply - nft.soldTokens
            if (availableTokens > 0) {
                const minQuantity = Math.max(1, Math.floor(availableTokens * 0.05))
                const maxQuantity = Math.max(minQuantity, Math.floor(availableTokens * 0.2))
                ownedNFTsMap[id] =
                    Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity
            }
        }
    })

    return ownedNFTsMap
}

export function NFTProvider({ children }) {
    const [nfts, setNFTs] = useState(initialNFTs)

    // Initialize with random owned NFTs - simpler approach as requested
    const [ownedNFTs, setOwnedNFTs] = useState(() => generateRandomOwnedNFTs(initialNFTs))

    // Update NFTs to reflect random ownership
    useEffect(() => {
        setNFTs((currentNFTs) =>
            currentNFTs.map((nft) => {
                const ownedAmount = ownedNFTs[nft.id] || 0
                // Update soldTokens to include owned amount
                return {
                    ...nft,
                    soldTokens: Math.max(nft.soldTokens, ownedAmount),
                }
            }),
        )
    }, [ownedNFTs])

    // Add error handling for image loading
    const handleImageError = (id) => {
        console.error(`Failed to load image for NFT #${id}`)
        // You could implement fallback logic here if needed
    }

    // Check if an NFT is owned
    const isNFTOwned = (id) => {
        return id in ownedNFTs
    }

    // Get list of owned NFT objects with ownership quantities
    const getOwnedNFTsWithQuantities = () => {
        return Object.entries(ownedNFTs).map(([id, quantity]) => {
            const nft = nfts.find((n) => n.id === parseInt(id))
            return {
                ...nft,
                ownedQuantity: quantity,
            }
        })
    }

    // Handle selling of NFTs
    const sellNFT = (id, quantity) => {
        if (id in ownedNFTs) {
            const newQuantity = ownedNFTs[id] - quantity

            if (newQuantity <= 0) {
                // Remove the NFT if all tokens are sold
                const newOwnedNFTs = { ...ownedNFTs }
                delete newOwnedNFTs[id]
                setOwnedNFTs(newOwnedNFTs)
            } else {
                // Update the owned quantity
                setOwnedNFTs({
                    ...ownedNFTs,
                    [id]: newQuantity,
                })
            }

            // Update the soldTokens count for this NFT
            setNFTs((currentNFTs) =>
                currentNFTs.map((nft) =>
                    nft.id === id
                        ? { ...nft, soldTokens: Math.max(0, nft.soldTokens - quantity) }
                        : nft,
                ),
            )

            return true
        }
        return false
    }

    // Handle buying of NFTs with availability check
    const buyNFT = (id, quantity) => {
        // Find the NFT to check available supply
        const nft = nfts.find((nft) => nft.id === id)

        if (!nft) {
            console.error(`NFT with ID ${id} not found`)
            return false
        }

        // Calculate available tokens
        const availableTokens = nft.totalSupply - nft.soldTokens

        // Check if requested quantity exceeds available supply
        if (quantity > availableTokens) {
            console.error(`Cannot buy ${quantity} tokens. Only ${availableTokens} available.`)
            return false
        }

        const newOwnedNFTs = { ...ownedNFTs }

        if (id in newOwnedNFTs) {
            // Add to existing quantity
            newOwnedNFTs[id] += quantity
        } else {
            // Add new NFT to owned NFTs
            newOwnedNFTs[id] = quantity
        }

        setOwnedNFTs(newOwnedNFTs)

        // Update the soldTokens count for this NFT
        setNFTs((currentNFTs) =>
            currentNFTs.map((nft) =>
                nft.id === id ? { ...nft, soldTokens: nft.soldTokens + quantity } : nft,
            ),
        )

        return true
    }

    return (
        <NFTContext.Provider
            value={{
                nfts,
                handleImageError,
                ownedNFTs,
                isNFTOwned,
                getOwnedNFTsWithQuantities,
                sellNFT,
                buyNFT,
            }}
        >
            {children}
        </NFTContext.Provider>
    )
}

export function useNFTs() {
    const context = useContext(NFTContext)
    if (!context) {
        throw new Error("useNFTs must be used within an NFTProvider")
    }
    return context
}
