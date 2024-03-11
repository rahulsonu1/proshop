import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Component/CheckoutSteps";
import { cartAction } from "../store/cartDetail";
import FormContainer from "../Component/FormContainer";

const PaymentScreen = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cartDetail);
  if (!shippingAddress) {
    naviagte("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  function submitHandler(e) {
    e.preventDefault();
    dispatch(cartAction.savePaymentMethtod(paymentMethod));
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    naviagte("/placeorder");
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="lengen">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card "
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
