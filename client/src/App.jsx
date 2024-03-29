import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
//import Title from './Components/Shared/Title.jsx'
import Container from 'react-bootstrap/Container'
import {HomePage} from './Pages/HomePage'
// import Footer from './Components/Shared/Footer'
import Header from './Components/Shared/Header'
import SignIn from './Pages/SignIn'
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SignUp from './Pages/SignUp'
import Description from './Pages/Description'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import ResetPasswordPage from './Pages/ResetPasswordPage'
import CartPage from './Pages/CartPage'
import ShippingPage from './Pages/ShippingPage'
import SubmitOrderPage from './Pages/SubmitOrderPage'
import PaymentPage from './Pages/PaymentPage'
import OrderConfirmationPage from './Pages/OrderConfirmationPage'
import SearchPage from './Pages/SearchPage'
import { DragDropContext } from 'react-beautiful-dnd';
import { useContext } from 'react'
import { Store } from './store'
import { addToCartHandler } from './utils.js'
import axios from 'axios'

function App() {
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
  
    // If there is no destination or if the destination is the same as the source, do nothing
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    if(destination.droppableId === 'cart-icon'){
      try {
          const {data} = await axios.get(`/api/v1/products/token/${draggableId}`);
          const draggedProduct = data;
          addToCartHandler(draggedProduct, cart.cartItems, ctxDispatch);
          console.log(draggedProduct);
       } catch (error) {
        // Handle errors if any
         console.error('Error fetching dragged product:', error);
       }
    }
  };

  return (
    <BrowserRouter>
     <DragDropContext onDragEnd={handleDragEnd}>
       <div className='d-flex flex-column side-allPage min-width'>
        <ToastContainer position='bottom-center' limit={1}/>
        <Header/>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path = "/" element = {<HomePage/>}></Route>
              <Route path = "/signin" element = {<SignIn/>}></Route>
              <Route path = "/signup" element = {<SignUp/>}></Route>
              <Route path = "/cart" element = {<CartPage/>}></Route>
              <Route path = "/shipping" element = {<ShippingPage/>}></Route>
              <Route path = "/payment" element = {<PaymentPage/>}></Route>
              <Route path = "/placeorder" element = {<SubmitOrderPage/>}></Route>
              <Route path = "/search" element = {<SearchPage/>}></Route>
              <Route path = "/forgot-password" element = {<ForgotPasswordPage/>}></Route>
              <Route path = "/password-reset/:id/:token" element = {<ResetPasswordPage/>}></Route>
              <Route path = "/product/:token" element = {<Description/>}></Route>
              <Route path = "/orders/:id" element = {<OrderConfirmationPage/>}></Route>
            </Routes>
          </Container>
        </main>
        {/* <Footer/> */}
      </div>
     </DragDropContext>
    </BrowserRouter>
  
  )
}

export default App
