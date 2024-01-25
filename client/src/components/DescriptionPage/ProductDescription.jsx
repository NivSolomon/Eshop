import { ListGroup, PropTypes } from "../../import";
import Rating from "../Shared/Rating.jsx";

const ProductDescription = ({ title, rating, price, description }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <h1 style={{ wordWrap: "break-word" }}>{title}</h1>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating rating={rating.rate} numReviews={rating.count}></Rating>
      </ListGroup.Item>
      <ListGroup.Item>
        Price: ${price}
      </ListGroup.Item>
      <ListGroup.Item>
        Description:<p className="lead">{description}</p>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ProductDescription;

ProductDescription.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string,
};
