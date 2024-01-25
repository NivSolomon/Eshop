import React from 'react'
import { Card, PropTypes, ListGroup, Row, Col } from '../../import'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const CartDescription = ({product, addToCart}) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>${product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>{product.countInStock > 0? <Badge bg="success">In Stock</Badge>
                                            : <Badge bg="danger">Not In Stock</Badge>} </Col>
            </Row>
          </ListGroup.Item>
          {product.countInStock > 0 && <ListGroup.Item><div className='d-grid'><Button onClick={()=> addToCart()}></Button></div></ListGroup.Item>}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

CartDescription.propTypes = { product: PropTypes.object, addToCart: PropTypes.func };
export default CartDescription
