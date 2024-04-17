import { Navbar } from 'react-bootstrap'
import './BrandName.css'

export default function BrandName() {
    return (

        <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
                src='/img/BCARDS.png'
                alt="BCARDS Logo"

                className="me-2 logo "
            />
        </Navbar.Brand>

    )
}
