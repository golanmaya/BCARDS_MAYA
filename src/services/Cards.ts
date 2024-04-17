import { useNavigate } from "react-router-dom";
import { apiBase } from "../config";
import { ICard } from "../interfaces/ICard";
import { getToken } from "./User";




export const doGetAllCards = async (): Promise<{ error: string | null, result: ICard[] | null }> => {
    try {
        const response = await fetch(`${apiBase}/cards`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json()
        if (!response.ok) return { error: data, result: null }
        return { error: null, result: data }
    } catch (err) {
        const errMessage = (err as Error).message
        return { error: errMessage, result: null }
    }
}

//--------

export const doGetMyCards = async (): Promise<{ error: string | undefined, result: ICard[] | undefined }> => {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/cards/my-cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const data = await response.json()
        if (!response.ok) return { error: data, result: undefined }
        return { error: undefined, result: data }
    } catch (err) {
        const errMessage = (err as Error).message
        return { error: errMessage, result: undefined }
    }
}


export const goToCardDetails = (cardId: string) => {
    const navigate = useNavigate();
    navigate(`/card-details/${cardId}`, { state: { cardId: cardId } })
}

export const fetchMyFavoriteCards = async (): Promise<{ error: string | undefined, result: ICard[] | undefined }> => {
    try {
        const token = await getToken();
        if (!token) return { error: 'No token found', result: undefined };

        const response = await fetch(`${apiBase}/cards/my-cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });

        const data = await response.json();
        if (!response.ok) return { error: data, result: undefined };

        const favoriteCards = data.filter((card: ICard) => {
            const isFavorite = localStorage.getItem(`favorite_${card.cardId}`);
            console.log(`Card ID: ${card.cardId}, Is Favorite: ${isFavorite}`);
            return isFavorite === 'true';
        });

        return { error: undefined, result: favoriteCards };
    } catch (err) {
        const errMessage = (err as Error).message;
        return { error: errMessage, result: undefined };
    }
};



