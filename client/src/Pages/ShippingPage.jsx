import { useContext, useEffect } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import { Store } from '../store';
import Title from '../Components/Shared/Title.jsx';
import { Button, Container } from '../import';
import CheckOutSteps from '../Components/Shared/CheckOutSteps.jsx'
import { SAVE_SHIPPING_ADDRESS } from '../actions';

const ShippingPage = () => {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {userInfo, cart: {cartItems}} = state;

    useEffect(() => {
        if(cartItems.length === 0){
            navigate('/');
        }
        if(!userInfo){
            navigate('/signin?redirect/shipping');
        }
    }, [cartItems.length, userInfo, navigate]);

    const submitHandler = (e) => {
      e.preventDefault();
      const FormData = new FormData(e.currentTarget);
      const data = Object.fromEntries(FormData);
      ctxDispatch({type: SAVE_SHIPPING_ADDRESS, payload: data});
      navigate('/payment');
    }

  return (
    <div>
      <Title title="Shipping Details"></Title>
      <CheckOutSteps step1 step2/>
      <Container className='small-container'>
      <h1>Shipping Address</h1>

       <Form onSubmit={submitHandler}>
          <Form.group className='mb-3'>
         <Form.Label>Full Name:</Form.Label>
         <Form.Control name='fullName' required></Form.Control>
       </Form.group>

       <Form.group className='mb-3'>
         <Form.Label>Address:</Form.Label>
         <Form.Control name='address' required></Form.Control>
       </Form.group>

       <Form.group className='mb-3'>
         <Form.Label>City:</Form.Label>
         <Form.Control name='city' required></Form.Control>
       </Form.group>

       <Form.group className='mb-3'>
         <Form.Label>Postal Code:</Form.Label>
         <Form.Control name='postalCode' required></Form.Control>
       </Form.group>

       <Form.group className='mb-3'>
         <Form.Label>Postal Country:</Form.Label>
         <Form.Control name='country' required></Form.Control>
       </Form.group>

       <Button type='submit'>Continue</Button>
       </Form>
      </Container> 
    </div>
  )
}

export default ShippingPage
