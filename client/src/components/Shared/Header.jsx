import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { Store } from '../../store';
import { USER_SIGNOUT } from '../../actions';

const Header = () => {

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo, cart: {cartItems}} = state;


    const signOutHandler = () => {
        ctxDispatch({type:USER_SIGNOUT});
        localStorage.removeItem('userInfo', userInfo)
        localStorage.removeItem('cartItems', userInfo)
        localStorage.removeItem('shippingAddress', userInfo)
        localStorage.removeItem('paymentMethod', userInfo)

    }

  return (
    <header>
        <NavBar bg="dark" variant = "dark">
            <Container>
                <LinkContainer to="/">
                    <NavBar.Brand>
                        <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" width={80} alt='Amazon logo'/>
                    </NavBar.Brand>
                </LinkContainer>
                <SearchBox/>
                <nav className='d-flex align-items-center justify-content-end me-2 ms-4'>
                    <Link to="/cart" className='nav-link'>
                        <i className='fa fa-shopping-cart text-white'></i>
                        {cartItems.length > 0 && (
                            <Badge pill bg="danger">
                                {cartItems.reduce((a,c) => a + c.quantity, 0)}
                            </Badge>
                        )}
                    </Link>
                </nav>
                {userInfo? (
                    <NavDropdown className='text-white' title={userInfo.name}>
                        <NavDropdown.Divider/>
                        <Link to="#signo" onClick={(e)=> signOutHandler()} className='dropdown item'>Sign out</Link>
                    </NavDropdown>
                ):<Link to="/signin" className='text-white nav-link'>
                Sign-in
            </Link>}
            </Container>
        </NavBar>
    </header>   
  )
}

export default Header