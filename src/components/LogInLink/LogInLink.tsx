import { Nav } from 'react-bootstrap'
import './LogInLink.css'
import { Link } from 'react-router-dom'

export default function LogInLink() {

    return (
        <Nav className='LogInLink'>
            <Link to={'/signin'} className="nav-link me-3">LogIn</Link>
        </Nav>
    )
}
