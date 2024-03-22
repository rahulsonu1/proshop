import React, { useEffect } from "react";
import {  Button,Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import Message from "../Component/Message";
import Loader from "../Component/Loader";
import { userListAction } from "../store/userList";
import axios from "axios";
import { orderListAction } from "../store/orderList";

const OrderListScreen = () => {
 const dispatch=useDispatch()
 const navigate=useNavigate()
  const { userInfo } = useSelector((state) => state.userDetail);
  const {loading,orders,error}=useSelector((state)=>state.orderList)

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      fetchOrders()
    }else{
      navigate('/login')
    }
    
  }, [navigate,dispatch,userInfo]);

  async function fetchOrders() {
    try {
      dispatch(orderListAction.listRequest());
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get("/api/order", config);
      dispatch(orderListAction.listSuccess(data))
    } catch (error) {
        dispatch(orderListAction.listFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }

  

  return (<>
  <h1>Orders</h1>
  {loading?<Loader/>:error?(<Message variant='danger'>{error}</Message>):(<Table>
    <thead>
        <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL PRICE</th>
            <th>PAID</th>
            <th>DELIVERED</th>
        </tr>
    </thead>
    <tbody>
        {orders.map((order)=>(
            <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>

                <td>{order.isPaid?(order.paidAt.substring(0,10)):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>

                <td>{order.isDelivered?(order.deliveredAt.substring(0,10)):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>


                
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                  
                </td>
            </tr>
        ))}
    </tbody>
  </Table>)}
  </>);
};

export default OrderListScreen;
