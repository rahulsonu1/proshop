import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { Form, Button, Row, Col,Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import { profileAction } from "../store/profileDetail";
import { updateAction } from "../store/updateProfile";
import { myOrderListAction } from "../store/myOrderList";
import Loader from '../Component/Loader'
import axios from 'axios'

const ProfileScreen = () => {
  const [name,setName]=useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState(null)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const {userInfo}=useSelector(state=>state.userDetail)
  const {user,error}=useSelector(state=>state.profileDetail)
  const {success}=useSelector(state=>state.profileUpdate )

  const {loading,orders,error:myOrderError}=useSelector((state)=>state.myOrderList)
  
  useEffect(()=>{
    if(!userInfo){
        navigate('/login')
    }else{
      if(!user ||!user.name){
        dispatchFunction('profile')
        listmyOrder()
    }else{
      setName(user.name)
      setEmail(user.email)
    }
  }
},[dispatch,navigate,userInfo,user])

console.log(userInfo)





async function listmyOrder(){
  try {
    dispatch(myOrderListAction.listReqest())
    const config={
      headers:{
        Authorization:`Bearer ${userInfo.token}`
      }}
      const {data}=await axios.get('/api/order/myorders',config)
      dispatch(myOrderListAction.listSuccess(data))

  } catch (error) {
    dispatch(myOrderListAction.listFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    
  }
}

async function updateUser(user){
  try {
    dispatch(updateAction.updateRequest())

    const config={
      headers:{
        'Content-Type':"application/json",
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const {data}=await axios.put(`/api/user/profile`,user,config)
    dispatch(updateAction.upateSuccess(data))
  } catch (error) {
    dispatch(updateAction.updateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}


async function dispatchFunction(id){
  try {
    dispatch(profileAction.profileRequest())
    const config={
      headers:{
        'Content-Type':"application/json",
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const {data}=await axios.get(`/api/user/	${id}`,config)

    dispatch(profileAction.profileSuccess(data))
    
  } catch (error) {
    dispatch(profileAction.profileFail((error.response && error.response.data.message ? error.response.data.message : error.message)))
  }
}

function submitHandler(e) {
  e.preventDefault();

  if(password!==confirmPassword){
    setMessage("Password do not match!")
  }else{
    updateUser({id:user._id,name,email,password})
  }
}




  return (
    <Row>
      <Col md={3}>
      <h2>User Profile</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}

      {message && <Message variant='danger'>{message}</Message>}
      {/* {loading && <Loader/>} */}
      <Form >
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder="Enter your name" value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder="Enter your email" value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder="Confirm password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button onClick={submitHandler} type="submit" variant="primary">Update</Button>
      </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
        {loading?<Loader></Loader>:myOrderError?<Message variant='danger'>{myOrderError}</Message>:(<Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order)=>(
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
              <td>{order.isPaid?order.paidAt.substring(0,10):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
              <td>{order.isDelivered?order.deliveredAt.substring(0,10):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
              <td>
                <LinkContainer to={`/order/	${order._id}`}>
                  <Button className="btn-sm" variant="light">Details</Button>

                </LinkContainer>
              </td>
              </tr>
            ))}
          </tbody>

        </Table>)}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
