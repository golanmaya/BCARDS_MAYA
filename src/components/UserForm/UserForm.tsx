import { useState } from 'react';
import { IUserDetails } from '../../interfaces/IUser';
import './UserForm.css'


interface UserFormProps {
    formData: IUserDetails;
    onSubmit: (formData: IUserDetails) => void;
    isBusy: boolean;
}

export default function UserForm({ formData, onSubmit, isBusy }: UserFormProps) {

    const [localFormData, setLocalFormData] = useState<IUserDetails>(formData);
    return (
        <div className='UserForm'>
            UserForm
        </div>
    )
}
