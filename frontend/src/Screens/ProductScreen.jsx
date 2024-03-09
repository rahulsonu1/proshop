import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetailAction } from "../store/productDetail";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../Component/Rating";
import axios from "axios";
import Loader from "../Component/Loader";
import { cartAction } from "../store/cartDetail";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(productDetailAction.productDetailRequest());
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch(productDetailAction.productDetailSuccess(data));
      } catch (error) {
        dispatch(productDetailAction.productDetailFail(error.message));
      }
    };

    fetchProduct();
  }, [dispatch, id]);

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  async function addToCartHandler(e) {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(
        cartAction.addItem({
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty: qty,
        })
      );
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    navigate(`/cart/${id}?qty=${qty}`);
  }

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>
      {loading?<Loader></Loader>:(<Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews}reviews`}
              ></Rating>
            </ListGroupItem>
            <ListGroupItem>Price:${product.price}</ListGroupItem>
            <ListGroupItem>Description:{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x+1} value={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>)}
      
    </>
  );
};

export default ProductScreen;
