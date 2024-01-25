import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions';
import { addToCartHandler, getError } from '../utils';
import Loading from '../components/Shared/Loading';
import MessageBox from '../components/Shared/MessageBox';
import { Col, Row } from '../import';
import descriptionPageReducer from '../Reducers/descriptionPageReducer.jsx';
import ProductDescription from '../Components/DescriptionPage/ProductDescription';
import CartDescription from '../Components/DescriptionPage/CartDescription';
import Title from '../Components/Shared/Title.jsx';
import { Store } from '../store.jsx';

const initialState = { loading: true, error: "", data: [] };

const Description = () => {
    const [{ loading, error, data }, dispatch] = useReducer(
      descriptionPageReducer,
        initialState
      );
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  useEffect(() => {
    const getProduct = async () => {
        dispatch({type: GET_REQUEST})
        try {
            const {data} = await axios.get(`/api/v1/products/token/${token}`);
            dispatch({type: GET_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_FAIL, payload: getError(error)});
        }
    }
    getProduct();
  }, [token])
  const addToCart = async () => {
    await addToCartHandler(data, cartItems, ctxDispatch)
    navigate("/cart");
  }

  return <div><Title title = {data.title}/>
    {loading? <Loading /> : error? <MessageBox variant="danger">{error}</MessageBox> : (
        <div>            
            <Row>
                <Col md={6}>
                    <img width={400} src={data.image} alt={data.title}/>
                </Col>
                <Col md={3}>
                    <ProductDescription {...data}/> {/* data is product, maybe rename */}
                </Col>
                <Col md={3}>
                    <CartDescription addToCart={addToCart} product={data}/>
                </Col>
            </Row>
        </div>
    )}
  </div>;
};

export default Description;