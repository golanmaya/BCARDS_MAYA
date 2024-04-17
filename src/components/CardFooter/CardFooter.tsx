import './CardFooter.css';
import { useContext, useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import DeleteBtn from '../DeleteBtn/DeleteBtn';


interface CardFooterProps {
    id: string;
    bizNumber: string | number
}

export default function CardFooter({ id, bizNumber }: CardFooterProps) {
    const initialFavoriteState = localStorage.getItem(`favorite_${id}`) === 'true';
    const [isFavorite, setIsFavorite] = useState(initialFavoriteState)

    const auth = useContext(AuthContext)

    function handleToggleFavorite(): void {
        setIsFavorite(prevState => !prevState);
    }

    useEffect(() => {
        if (isFavorite) {
            localStorage.setItem(`favorite_${id}`, String(isFavorite))
        }
        else { localStorage.removeItem(`favorite_${id}`) }
    }, [id, isFavorite]);

    return (
        <div className='CardFooter' onClick={handleToggleFavorite}>
            <Card.Footer className="text-muted">
                {
                    (auth?.userDetails) && (auth.userDetails.isAdmin) ?
                        <DeleteBtn id={id} bizNumber={bizNumber} />
                        :
                        isFavorite ? (
                            <AiFillLike size={18} style={{ marginTop: '-5px' }} />
                        ) : (
                            <AiOutlineLike size={18} style={{ marginTop: '-5px' }} />
                        )
                }
            </Card.Footer>
        </div>
    );
}