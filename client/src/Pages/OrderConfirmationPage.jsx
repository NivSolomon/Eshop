import { useContext, useEffect, useState } from 'react'
import Title from '../Components/Shared/Title'
import { useParams } from 'react-router-dom'
import { Store } from '../store';
import { Col, Row, axios } from '../import';
import OrderSummary from '../Components/Shared/OrderSummary';
import PaymentSummary from '../Components/Shared/PaymentSummary';


const OrderConfirmationPage = () => {

    const {id} = useParams();

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;
    const [loading, setLoading] = useState(false);
    const[order, setOrder] = useState();


    useEffect(() => {
    const getOrder = async () => {
    try {
       const {data} = await axios.get(`/api/v1/orders/${id}`, { headers: { authorization: `Bearer ${userInfo.token}` } } );
       setOrder(data)
    }
    catch (error) {
        alert(error.message);
    }
}
   getOrder();  
    },[id])



  return (
    <div>
        <Title title='Order Confirmation'/>
        <h1 className='my-3'>Order: {id}</h1>
        <Row>
                <Col md={8}>
                    <OrderSummary cart={order} status="orderconfirmation"/>
                </Col>
                <Col md={4}>
                    <PaymentSummary loading={loading} status="details-unpaid" cart={order} />
                </Col>
        </Row>
    </div>
  )
}

export default OrderConfirmationPage