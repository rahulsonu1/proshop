import React, { useState, useEffect } from "react";
import { Link, Navigate, redirect,useLocation,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, NavbarCollapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import Loader from "../Component/Loader";
import FormContainer from "../Component/FormContainer";
import { registerAction } from "../store/register";
import axios from 'axios'

const RegisterScreen = () => {
  const [name,setName]=useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState(null)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const location=useLocation()

  const user=useSelector(state=>state.registerUser)
  const {loading,userInfo,error}=user

  const redirect=location.search?location.search.split('=')[1]:'/'

  // useEffect(() => {
    
  //   if (userInfo && redirect) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, redirect, navigate]);


function submitHandler(e) {
  e.preventDefault();

  if(password!==confirmPassword){
    setMessage("Password do not match!")
  }else{
    handleDispatch()
  }
}

async function handleDispatch(){
  try {
    dispatch(registerAction.regiserRequest)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/user', { name,email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch(registerAction.registerSuccess(data))
    navigate(redirect);

  } catch (error) {
    dispatch(registerAction.registerFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    
  }
}


  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
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
        <Button onClick={submitHandler} type="submit" variant="primary">Register</Button>
      </Form>
      <Row className="py-3">
        <Col>
        Have a account?<Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
