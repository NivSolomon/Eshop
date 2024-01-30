import { useContext } from "react";
import { Col, Row, toast } from "../import.js";
import ItemsInCart from "../Components/CartPage/ItemsInCart.jsx";
import { Store } from "../store.jsx";
import Title from "../Components/Shared/Title.jsx";
import axios from "axios";
import CheckOutPage from "./CheckOutPage.jsx";
import { ADD_TO_CART, PRODUCT_REMOVE_FROM_CART } from "../actions.jsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const navigate = useNavigate();

  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  }

  const removeCartHandler = async (product) => {
    ctxDispatch({ type: PRODUCT_REMOVE_FROM_CART, payload: product})
  }

  const updateCartHandler = async (product, quantity) => {
    try {
        const { data } = await axios.get(`/api/v1/products/${product._id}`);
    
        if (data.countInStock < quantity) {
          alert("Sorry, product is out of stock");
          return;
        }
        ctxDispatch({
          type: ADD_TO_CART,
          payload: { ...product, quantity },
        });
      } catch (error) {
        toast(error.message);
      }
  };
  return (
    <div>
      <Title title={"Shopping Cart"}></Title>
      <Row>
        <Col md={8}><ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler} 
        removeCartHandler={removeCartHandler}/></Col>
        <Col md={4}><CheckOutPage cartItems={cartItems} checkOutHandler={checkOutHandler}/></Col>
      </Row>
    </div>
  );
};


export default CartPage;
