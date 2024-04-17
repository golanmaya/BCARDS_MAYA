import './Header.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import BrandName from '../BrandName/BrandName';
import NavLinks from '../NavLinks/NavLinks';
import SearchBox from '../SearchBox/SearchBox';
import ScreenMode from '../ScreenMode/ScreenMode';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';



export default function Header() {
  const auth = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container className='me-auto'>
        <BrandName />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLinks />
          <SearchBox />
          <ScreenMode />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
