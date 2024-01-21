import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Product from './Product.jsx';

const Products = ({products}) => {
  return (
    <Row>
        {products.map((product) =>(
            <Col key={product.token} lg={3} md={4} sm={6} xs={12}>
                <Product product={product}/>
            </Col>
        ))}
    </Row>
  )
}
Products.propTypes = {products: PropTypes.array}
export default Products;