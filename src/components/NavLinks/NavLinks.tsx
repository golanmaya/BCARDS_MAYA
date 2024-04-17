import { Nav, NavDropdown, /* NavDropdown */ } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './NavLinks.css'
import LogInLink from '../LogInLink/LogInLink'
import { useContext } from 'react'
import SignOutBtn from '../SignOutBtn/SignOutBtn'




export default function NavLinks() {
    const auth = useContext(AuthContext)
    return (
        <Nav className="me-3">
            <Link to={'/home'} className="nav-link me-3">Home</Link>
            <Link to={'/about'} className="nav-link me-3">About</Link>

            {auth?.userDetails?.isAdmin &&
                <Link to={'/admin'} className='nav-link me-3'>Admin</Link>}

            {!auth?.userDetails &&
                <Link to={'/signup'} className='nav-link me-3'>SignUp</Link>}

            {(auth?.userDetails?.isBusiness) ?
                <>
                    <NavDropdown title="Action" id="basic-nav-dropdown" className='me-3'>
                        <Link to={'/my-cards'} className="nav-link me-3">My Cards</Link>
                        <Link to={'/create-card'} className="nav-link me-3">Create New Card</Link>
                        <NavDropdown.Divider />
                        <Link to={"/favorites"} className="nav-link me-3">Favorites</Link>
                        <Link to={'/update-user'} className="nav-link me-3">Edit My Profile</Link>

                    </NavDropdown>
                    <SignOutBtn />
                </>
                :
                <LogInLink />}
        </Nav>
    )
}