import React from 'react';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Product from './Product.jsx';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Products = ({ products }) => {
  return (
    <Droppable droppableId="cart-icon">
      {(provided) => (
        <Row {...provided.droppableProps} ref={provided.innerRef}>
          {products.map((product, index) => (
            <Draggable key={product.token} draggableId={product.token} index={index}>
              {(provided) => (
                <Col lg={3} md={4} sm={6} xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Product product={product} />
                </Col>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Row>
      )}
    </Droppable>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired
};

export default Products;
