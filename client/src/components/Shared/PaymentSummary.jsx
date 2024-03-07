import { Button, Card, Row, ListGroup, Col, axios } from "../../import";
import Loading from "./Loading.jsx";
import { PropTypes } from "../../import";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PaymentSummary = ({ loading, cart, status, submitOrderHandler }) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = async () => {
    try {
      const response = await axios.post("/my-server/create-paypal-order", {
        cart,
      });
      return response.data.id;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.post("/my-server/capture-paypal-order", {
        orderID: data.orderID
      });
      const name = response.data.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      throw error;
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Payment Summary</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>${cart.itemsPrice?.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${cart.shippingPrice?.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${cart.taxPrice?.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>
                  <strong>${cart.totalPrice?.toFixed(2)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                {status === "submitOrder" &&
                localStorage.getItem("paymentMethod") === "PayPal" ? (
                  <>
                    {isPending ? <div className="spinner" /> : null}
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove}/>
                  </>
                ) : null}

                {status === "submitOrder" && (
                  <Button variant="primary" onClick={submitOrderHandler}>
                    Submit
                  </Button>
                )}
                {loading && <Loading />}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};
PaymentSummary.propTypes = {
  loading: PropTypes.bool,
  cart: PropTypes.object,
  status: PropTypes.string,
  submitOrderHandler: PropTypes.func,
};
export default PaymentSummary;
