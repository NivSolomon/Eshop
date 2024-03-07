import axios from 'axios';
import { ADD_TO_CART} from './actions';

const getError = (error) => {
    return error.message && error.response.data.message
      ? error.response.data.message
      : error.message;
  };
  
const addToCartHandler = async (product, cartItems, ctxDispatch) => {
    
    const existedItem = cartItems.find((x) => x._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;

    try {
        const { data } = await axios.get(`/api/v1/products/${product._id}`);

        if (data.countInStock < quantity) {
            alert('Sorry, Product is out of stock');
            return;
        }
        ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });

    } catch (err) {
        // ctxDispatch({ type: GET_FAIL, payload: err.message });
    }
}

const getFilterURI = (searchFromURI, filter, skipPathName) => {

    const searchParams = new URLSearchParams(searchFromURI);
    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('query') || 'all';
    const price = searchParams.get('price') || 'all';
    const rating = searchParams.get('rating') || 'all';
    const order = searchParams.get('order') || 'newest';
    const page = searchParams.get('page') || 1;
  
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const filterRating = filter.rating || rating;
    const filterOrder = filter.order || order;
    const filterPage = filter.page || page;
  
    const link = `${skipPathName? "": "/search?"}category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`
  
    return link;
  };
  
  export { getError, addToCartHandler, getFilterURI };