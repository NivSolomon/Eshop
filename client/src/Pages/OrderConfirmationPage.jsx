import React, { useContext, useEffect, useState } from 'react';
import Title from '../Components/Shared/Title';
import { useParams } from 'react-router-dom';
import { Store } from '../store';
import { Col, Row, axios, toast } from '../import';
import OrderSummary from '../Components/Shared/OrderSummary';
import PaymentSummary from '../Components/Shared/PaymentSummary';
import { getError } from '../utils';
import Loading from '../components/Shared/Loading';

const OrderConfirmationPage = () => {
    const { id } = useParams();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [loading, setLoading] = useState(true); // Initially set to true
    const [order, setOrder] = useState(null); // Initially set to null

    useEffect(() => {
        const getOrder = async () => {
            try {
                const { data } = await axios.get(`/api/v1/orders/${id}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                setOrder(data);
            } catch (error) {
                toast.error(getError(error));
            } finally {
                setLoading(false); // Set loading to false after request completes
            }
        };
        getOrder();
    }, [id, userInfo.token]);


    return (
        <div>
            {loading? <div>Loading...<Loading/></div>:
             <div>
                  <Title title='Order Confirmation' />
                  <h1 className='my-3'>Order: {id}</h1>
                  <Row>
                   <Col md={8}>
                      <OrderSummary cart={order.order} status='orderconfirmation' isDelivered={false} />
                   </Col>
                   <Col md={4}>
                     <PaymentSummary loading={loading} status='details-unpaid' cart={order.order} />
                   </Col>
            </Row>
                </div>}
          
        </div>
    );
};

export default OrderConfirmationPage;
