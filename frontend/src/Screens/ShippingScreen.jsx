import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cartDetail";
import CheckoutSteps from "../Component/CheckoutSteps";

import FormContainer from "../Component/FormContainer";

const ShippingScreen = () => {
  const {shippingAddress}=useSelector(state=>state.cartDetail)

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch=useDispatch()
  const navigate=useNavigate()

  function submitHandler(e){
    e.preventDefault();
    dispatch(cartAction.shippingAddressDetail({address,city,postalCode,country}))
    localStorage.setItem('shippingAddress',JSON.stringify({address,city,postalCode,country}))
    navigate('/payment')

  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder="Enter City" value={city} onChange={(e)=> setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type='text' placeholder="Postal Code" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' placeholder="Country" value={country} onChange={(e)=> setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
        
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
