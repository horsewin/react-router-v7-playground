export interface Pet {
    id: string
    name: string
    breed: string
    gender: "Female" | "Male",
    price: number
    imageUrl: string
    likes: number
    shop: {
        name: string
        location: string
    }
    birthDate: string
    referenceNumber: string
    tags: string[]
    isComparable?: boolean
}

