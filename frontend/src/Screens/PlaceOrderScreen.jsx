import React, { useEffect } from "react";
import {
  Button,Row,Col,ListGroup,Image, Card,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Component/CheckoutSteps";
import Message from "../Component/Message";
import { orderAction } from "../store/orderDetail";
import axios from 'axios'

const PlaceOrderScreen = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const cart = useSelector((state) => state.cartDetail);
  const {userInfo}=useSelector((state)=>state.userDetail)

  const {order,success,error}=useSelector((state)=>state.orderDetail)

  useEffect(()=>{
     if(success){
      navigate(`/order/	${order._id}`)
     }
  },[success,navigate])


  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = Number(itemsPrice) > 100 ? 0 : 100;

  const taxPrice = Number((0.15 * Number(itemsPrice)).toFixed(2));

  let totalPrice=Number(Number(taxPrice)+(Number(shippingPrice)+Number(itemsPrice))).toFixed(1)

totalPrice=Number(totalPrice)
console.log(typeof(totalPrice))

  

  function placeOrderHandler(e) {
    e.preventDefault()
    orderHandler({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethod:cart.paymentMethod,
      itemsPrice:itemsPrice,
      shippingPrice:shippingPrice,
      taxPrice:taxPrice,
      totalPrice:totalPrice
    })
  }

  async function orderHandler(order){
    try {
      dispatch(orderAction.orderCreateRequest())
      const config={
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${userInfo.token}`
        }
      }

      const {data}=await axios.post(`api/order`,order,config)
      dispatch(orderAction.orderCreateSuccess(data))
      localStorage.setItem('orderItems',JSON.stringify(data))

    } catch (error) {
      dispatch(orderAction.orderCreateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }


 



  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {success && <Message>Order Placed </Message>}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/	${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = 	$
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>	${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>	${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>	${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>	${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
