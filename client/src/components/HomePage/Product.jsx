import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from '../Shared/Rating';

const Product = ({product}) => {
  return (
    <Card className='product-card mb-4'>
        <Link to={`/products/${product.token}`}>
            <Card.Img variant='top' src={product.image} alt={product.title}/>
        </Link>
        <Card.Body className='card-body'>
            <Link to={`/products/${product}.token`}>
                <Card.Title>{product.title}</Card.Title>
            </Link>
            <Rating rating={product.rating.rate} numReviews={product.rating.count}/>
            <Card.Text>${product.price}</Card.Text>
            {product.countInStock === 0 ?
                <Button variant='light' disabled>Out of Stock</Button> :
                <Button className='btn-primery'>Add to Cart</Button>}
        </Card.Body>
    </Card>
  )
}

export default Product

Product.propTypes = {product: PropTypes.object}

