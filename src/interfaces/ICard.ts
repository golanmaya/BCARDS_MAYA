export interface ICard {
    [x: string]: any
    _id: string
    title: string
    subtitle: string
    description: string
    phone: string
    email: string
    web: string
    image: CardImage
    address: CardAddress
    bizNumber: number | string
    likes: string[]
    user_id: string
    createdAt: string
    __v: number
}

interface CardImage {
    url: string
    alt: string
    _id?: string
}

interface CardAddress {
    state: string
    country: string
    city: string
    street: string
    houseNumber: number | string
    zip: number | string
    _id?: string
}

export interface ICardData {
    title: string;
    subtitle?: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: string;
        zip: string;
    };
}