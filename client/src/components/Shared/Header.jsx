import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "../../store";
import { USER_SIGNOUT } from "../../actions";
import { Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { addToCartHandler } from "../../utils";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const {cart} = state;
  const signoutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <NavBar bg="dark" variant="dark" className="main-navbar">
        <Container>
          <Link onClick={() => navigate(-1)}>
            {location.pathname !== "/" && (
              <i className="fa fa-arrow-left text-white align-arrow-right">
                {" "}
                Back
              </i>
            )}
          </Link>
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="Amazon logo"
              />
            </NavBar.Brand>
          </LinkContainer>
          <SearchBox />
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
          <Link to="/cart" className="nav-link">
         <Droppable droppableId="cart-icon">
            {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="cart-icon">
            <i className="fa fa-shopping-cart text-white"></i>

         </div>
         )}
       </Droppable>
  {cartItems.length > 0 && (
    <Badge pill bg="danger">
      {cartItems.reduce((a, c) => a + c.quantity, 0)}
    </Badge>
  )}
</Link>
          </nav>
          {userInfo ? (
            <NavDropdown className="text-white" title={userInfo.name}>
              <NavDropdown.Divider />
              <Link
                to="#signout"
                onClick={signoutHandler}
                className="dropdown-item"
              >
                Sign out
              </Link>
            </NavDropdown>
          ) : (
            <Link to="/signin" className="text-white nav-link">
              Sign in
            </Link>
          )}
        </Container>
      </NavBar>
    </header>
  );
};

export default Header;

// {cartItems.length > 0 && (
  // <Droppable droppableId="badge">
  //   {(provided) => (
  //     <div ref={provided.innerRef} {...provided.droppableProps}>
  //       <Badge pill bg="danger">
  //         {cartItems.reduce((a, c) => a + c.quantity, 0)}
  //       </Badge>
  //       {provided.placeholder}
  //     </div>
  //   )}
  // </Droppable>
// )}