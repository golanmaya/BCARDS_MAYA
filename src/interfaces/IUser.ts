export interface IUserSigninJwtPayload {
    _id: string
    isBusiness: boolean
    isAdmin: boolean
    iat: number
}

export interface IUserDetails {
    _id: string
    name: IName
    phone: string
    email: string
    password: string
    verifyPassword: string
    image: IImage
    address: IAddress
    isAdmin: boolean
    isBusiness: boolean
    createdAt: string
    isBusy: boolean
}

export interface IUserSignup {
    name: IName
    phone: string
    email: string
    password: string
    image?: IImage
    address: IAddress
    isBusiness: boolean
}

// -----------------------------------------------------------------------
export interface IUserUpdate {
    name: IName
    phone: string
    image?: IImage
    address: IAddress
}

// -----------------------------------------------------------------------

interface IName {
    first: string
    middle?: string
    last: string
}

interface IImage {
    url: string
    alt: string
}

interface IAddress {
    state?: string
    country: string
    city: string
    street: string
    houseNumber: number | string
    zip: number | string
}
