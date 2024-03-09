import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import { profileAction } from "../store/profileDetail";
import { updateAction } from "../store/updateProfile";
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
  console.log(success)

  useEffect(()=>{
    if(!userInfo){
        navigate('/login')
    }else{
      if(!user ||!user.name){
        dispatchFunction('profile')
    }else{
      setName(user.name)
      setEmail(user.email)
    }
  }
},[dispatch,navigate,userInfo,user])


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
    const {data}=await axios.get(`/api/user/${id}`,config)

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
      </Col>
    </Row>
  );
};

export default ProfileScreen;
