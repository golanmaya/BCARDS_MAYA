import { useContext } from 'react';
import './SignOutBtn.css'
import { AuthContext } from '../../context/AuthContext';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function SignOutBtn() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await auth?.signOut()
        navigate("/home");
    };

    return (
        <Nav className='SignOutBtn'>

            <Link to={'/home'} className="nav-link" onClick={handleSignOut}>Log Out</Link>

        </Nav>
    )
}


