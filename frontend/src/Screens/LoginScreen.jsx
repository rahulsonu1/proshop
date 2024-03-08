import React, { useState, useEffect } from "react";
import { Link, Navigate, redirect,useLocation,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, NavbarCollapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import Loader from "../Component/Loader";
import FormContainer from "../Component/FormContainer";
import { userAction } from "../store/userDetail";
import axios from 'axios'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const location=useLocation()
  const user=useSelector(state=>state.userDetail)


  const {loading,userInfo,error}=user

  const redirect=location.search?location.search.split('=')[1]:'/'

  useEffect(() => {
    // If userInfo is available and a redirect route is specified, redirect the user
    if (userInfo && redirect) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);


async function submitHandler(e) {
  e.preventDefault();
  try {
    dispatch(userAction.loginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/user/login', { email, password }, config);
    dispatch(userAction.loginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate(redirect);
  } catch (error) {
    dispatch(userAction.loginFail(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}


  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {/* {loading && <Loader></Loader>} */}
      <Form >
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder="Enter your email" value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button onClick={submitHandler} type="submit" variant="primary">Sign In</Button>
      </Form>
      <Row className="py-3">
        <Col>
        New Customer ?<Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
