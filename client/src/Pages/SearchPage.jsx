import { Fragment, useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import searchPageReducer from "../Reducers/searchPageReducer";
import axios from "axios";
import { getError, getFilterURI } from "../utils";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import { toast } from "react-toastify";
import { Button, Col, LinkContainer, Row } from "../import";
import Title from "../Components/Shared/Title";
import Rating from "../Components/Shared/Rating";
import Loading from "../Components/Shared/Loading";
import MessageBox from "../Components/Shared/MessageBox";
import Product from '../Components/HomePage/Product';

const prices = [
  { name: "$1-$50", value: "1-50" },
  { name: "$51-$200", value: "51-200" },
  { name: "$201-$1000", value: "201-1000" },
]; //maybe add 1000+

const ratings = [
  { name: "4 stars and up", rating: 4 },
  { name: "3 stars and up", rating: 3 },
  { name: "2 stars and up", rating: 2 },
  { name: "1 star and up", rating: 1 },
];

const Search = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1; 

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(searchPageReducer, { loading: true, error: "" });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get("/api/v1/products/categories");
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({ type: GET_REQUEST });
        const { data } = await axios.get(
          `/api/v1/products/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
      }
    };
    getProducts();
  }, [category, order, page, price, query, rating]);

  return (
    <div>
    <Title title='Search Products' />
    <Row>
        <Col md={3}>
            <h3>Category</h3>
            <div>
                <ul>
                    <li>
                        <Link
                            className={'all' === category ? 'text-bold' : ''}
                            to={getFilterURI(search, { category: 'all' })}
                        >
                            Any
                        </Link>
                    </li>
                    {categories.map((c) => (
                        <li key={c}>
                            <Link
                                className={c === category ? 'text-bold' : ''}
                                to={getFilterURI(search, { category: c })}
                            >
                                {c}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Price</h3>
                <ul>
                    <li>
                        <Link
                            className={'all' === price ? 'text-bold' : ''}
                            to={getFilterURI(search, { price: 'all' })}
                        >
                            Any
                        </Link>
                    </li>
                    {prices.map((p) => (
                        <li key={p.value}>
                            <Link
                                to={getFilterURI(search, { price: p.value })}
                                className={p.value === price ? 'text-bold' : ''}
                            >
                                {p.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Reviews</h3>
                <ul>
                    {ratings.map((r) => (
                        <li key={r.name}>
                            <Link
                                to={getFilterURI(search, { rating: r.rating })}
                                className={`${r.rating} === ${rating} ? 'text-bold' : ''`}
                            >
                                <Rating caption={' '} rating={r.rating}></Rating>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Col>
        <Col md={9}>
            {loading ? (
                <Loading/>
            ) : error ? (
                <MessageBox variant='danger'>
                    {error}
                </MessageBox>
            ) : (
                <Fragment>
                    <Row className="justify-content-between mb-3">
                        <Col md={6}>
                            <div>
                                {countProducts === 0 ? 'No' : countProducts} Results
                                {query !== 'all' && ' : ' + query}
                                {category !== 'all' && ' : ' + category}
                                {price !== 'all' && ' : Price ' + price}
                                {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                {query !== 'all' ||
                                    category !== 'all' ||
                                    rating !== 'all' ||
                                    price !== 'all' ? (
                                    <Button
                                        variant="light"
                                        onClick={() => navigate(getFilterURI(search, {
                                            query: 'all', category: 'all'
                                            , price: 'all', rating: 'all', order: 'newest', page: 1
                                        }))}
                                    >
                                        <i className="fas fa-times-circle"></i>
                                    </Button>
                                ) : null}
                            </div>
                        </Col>
                        <Col className="text-end">
                            Sort by{' '}
                            <select
                                value={order}
                                onChange={(e) => {
                                    navigate(getFilterURI(search, { order: e.target.value }));
                                }}
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="lowest">Price: Low to High</option>
                                <option value="highest">Price: High to Low</option>
                                <option value="toprated">Customer Reviews</option>
                            </select>
                        </Col>
                    </Row>
                    {products.length === 0 && (
                        <MessageBox>No Product Found</MessageBox>
                    )}
                    <Row>
                        {products.map((product) => (
                            <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>

                    <div>
                        {[...Array(pages).keys()].map((x) => (
                            <LinkContainer
                                key={x + 1}
                                className="mx-1"
                                to={{
                                    pathname: '/search',
                                    search: getFilterURI(search, { page: x + 1 }, true),
                                }}
                            >
                                <Button
                                    className={Number(page) === x + 1 ? 'highlight-current-page' : ''}
                                    variant="light"
                                >
                                    {x + 1}
                                </Button>
                            </LinkContainer>
                        ))}
                    </div>
                </Fragment>
            )}
        </Col>
    </Row>
</div>
  );
};
export default Search;