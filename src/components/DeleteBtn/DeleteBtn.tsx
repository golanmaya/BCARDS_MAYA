import './DeleteBtn.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/User';
import { apiBase } from '../../config';
import { BsTrash3 } from 'react-icons/bs';

interface IDeleteBtnProps {
    id: string
    bizNumber: string | number
}


export default function DeleteBtn(props: IDeleteBtnProps) {

    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext);
    const navigate = useNavigate();

    const deleteCard = async (cardId: string | null, bizNumber: string) => {
        if (!auth?.userDetails) {
            navigate('/signin')
        }
        try {
            const token = await getToken();
            if (!token) return ('No token found');

            const response = await fetch(`${apiBase}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({ bizNumber }),
            });
            if (!response.ok) {
                throw new Error(`Failed to delete card`);
            }
            toasts?.addToast('🎉', 'Card deleted successfully!', 'success');
        } catch (error) {
            toasts?.addToast('⚠️', 'Error deleting card', 'danger');
        }
    }

    return (
        <>
            <BsTrash3 className='delete-btn' onClick={() => deleteCard(props.id, String(props.bizNumber))} />
        </>
    )
}
