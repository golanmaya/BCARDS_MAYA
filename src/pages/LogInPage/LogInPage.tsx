import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import './LogInPage.css'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';


export default function LogInPage() {
    {/**STATES */ }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isBusy, setIsBusy] = useState<boolean>(false)


    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBusy(true)

        if (!auth) {
            setIsBusy(false);
            return
        }
        const { error } = await auth?.signIn(email, password)
        if (error) {
            toasts?.addToast('⚠️', 'Error Signing-In', error, 'danger')
        } else {
            toasts?.addToast('👍🏼', 'Successfully Signed-In', `Welcome !`, 'success')
            navigate('/') // לחזור
        }
        setIsBusy(false)
    }

    return (
        <>
            <h3>LogIn</h3>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    /* controlId="floatingInput" */
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                    />

                </FloatingLabel>
                <FloatingLabel /* controlId="floatingPassword"  */ label="Password">
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </FloatingLabel>
                <Button
                    className='mt-4'
                    type='submit'
                    variant='info'
                    size='sm'
                    disabled={isBusy}
                >
                    {
                        (isBusy) &&
                        <Spinner
                            className='me-2'
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    }
                    LogIn
                </Button>
            </Form>
        </>
    )
}
