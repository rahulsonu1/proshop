import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,Col,Card,ListGroup,Image,Form,Button,
} from "react-bootstrap";
import Message from "../Component/Message";
import { cartAction } from "../store/cartDetail";

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const qtyFromParams = params.get("qty");

  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [count,setCount]=useState(0)

  const cart = useSelector((state) => state.cartDetail);
  const { cartItems } = cart;


  useEffect(() => {
    const updatedQuantities = {};
    cartItems.forEach((item) => {
      updatedQuantities[item.product] = item.qty;
    });
    setQuantities(updatedQuantities);
  }, [cartItems]);

  useEffect(() => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: qtyFromParams ? parseInt(qtyFromParams) : 1,
    }));
  }, [id, qtyFromParams]);

  useEffect(() => {
    const updatedSubtotal = cartItems.reduce((acc, item) => {
      return acc + (quantities[item.product] || 0) * item.price;
    }, 0);
    setSubtotal(updatedSubtotal);
  
  }, [cartItems, quantities]);

  const removeFromCartHandler = (productId) => {
    dispatch(cartAction.removeItem(productId));
  };

  const updateQuantityHandler = (productId, newQty) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQty,
    }));
    dispatch(cartAction.updateItemQuantity(productId, newQty));
  };

  function checkoutHandler() {
    // Implement your checkout logic here
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems && cartItems.length === 0 ? (
          <Message>
            Your cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={quantities[item.product] || 1}
                      onChange={(e) =>
                        updateQuantityHandler(
                          item.product,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal : {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}</h2>
              ${subtotal.toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={!cartItems || cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;


