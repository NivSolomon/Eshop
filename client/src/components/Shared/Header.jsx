import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
const Header = () => {
  return (
    <header>
        <NavBar bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                 <NavBar.Brand>
                    <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" width={80} alt='amazonLogo'/>
                 </NavBar.Brand>
                </LinkContainer>
                <SearchBox/>
                <nav className='d-flex align-items-center justify-content-end me-2 ms-4'> {/*push the icon to righ in the nav*/}
                    <Link to={'/cart'} className='nav-link'>
                        <i className='fas fa-shopping-cart text-white'></i>
                    </Link>
                </nav>
                <Link to={'/signin'} className='text-white nav-link'>
                    Sign In
                </Link>
            </Container>
        </NavBar>
    </header>
  )
}

export default Header
