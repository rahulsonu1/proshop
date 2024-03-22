import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Component/Loader";
import Message from "../Component/Message";
import { orderFindAction } from "../store/orderFind";
import { deliverAction } from "../store/orderDeliver";
import axios from "axios";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userDetail);
  const { loading, error, order } = useSelector((state) => state.orderFind);
  const {loading:deliverLoading,success:deliverSuccess,error:deliverError}=useSelector((state)=>state.orderDeliver)

 

  useEffect(() => {
    if(!order || deliverSuccess){
      fetchOrder();
      dispatch(deliverAction.deliverReset())
    }
    
  }, [dispatch,id,order,deliverSuccess]);

  const fetchOrder = async () => {
    try {
      dispatch(orderFindAction.orderFindRequest());
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/order/${id}`, config);
      dispatch(orderFindAction.orderFindSuccess(data));
    } catch (error) {
      dispatch(
        orderFindAction.orderFindFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

  const deliverHandler=async (e)=>{
    e.preventDefault()
    try {
      dispatch(deliverAction.deliverRequest())
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
     const {data}=await axios.put(`/api/order/${order.id}/deliver`,{},config)
     dispatch(deliverAction.deliverSuccess(data))
    } catch (error) {
      dispatch(deliverAction.deliverFail(error.response && error.response.data.message
        ? error.response.data.message
        : error.message))
    }
  }

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                 <p><strong>Name :  </strong>{order.user.name}</p> 
                 
                 <p><strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  <p>
                  </p> 
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered?(<Message variant='success'>Delivered at {order.deliveredAt}</Message>):(<Message variant='danger'>Not Delivered</Message>)}
                  
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p><strong>Method: </strong>
                  {order.paymentMethod}
                  </p>
                  {order.isPaid?(<Message variant='success'>Paid On</Message>):(<Message variant='danger'>Not Paid</Message>)}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
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
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {item.price} = $
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
                      <Col>${order.totalPrice-order.taxPrice-order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {userInfo &&userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                    <ListGroup.Item>
                      <Button type='button' className="btn btn-block" onClick={deliverHandler}>Mark as Delivered</Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
