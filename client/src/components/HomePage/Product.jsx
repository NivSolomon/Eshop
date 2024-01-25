import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from '../Shared/Rating';
import { useContext } from 'react';
import { Store } from '../../store';
import { addToCartHandler } from '../../utils';

const Product = ({product}) => {

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cartItems} = state.cart;
  
  return (
    <Card className='product-card mb-4'>
        <Link to={`/product/${product.token}`}>
            <Card.Img variant='top' src={product.image} alt={product.title}/>
        </Link>
        <Card.Body className='card-body'>
            <Link to={`/product/${product.token}`}>
                <Card.Title>{product.title}</Card.Title>
            </Link>
            <Rating rating={product.rating.rate} numReviews={product.rating.count}/>
            <Card.Text>${product.price}</Card.Text>
            {product.countInStock===0?<Button variant='light' disabled>Out of Stock</Button>:
            <Button className='btn-primary' onClick={() => addToCartHandler(product, cartItems, ctxDispatch)}>Add to Cart</Button>}
        </Card.Body>
    </Card>
  )
}

Product.propTypes = {product: PropTypes.object}
export default Product