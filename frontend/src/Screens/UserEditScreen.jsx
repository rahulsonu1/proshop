import React, { useEffect, useState} from "react";
import {useNavigate ,Link,useParams} from "react-router-dom";
import { Form, Button,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import FormContainer from "../Component/FormContainer";
import Loader from "../Component/Loader";
import axios from "axios";
import { profileAction } from "../store/profileDetail";

const UserEditScreen = () => {
  const [name,setName]=useState('')
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  let { id } = useParams();

 
  const navigate=useNavigate()
  const dispatch=useDispatch()
 

  const {loading,user,error}=useSelector((state)=>state.profileDetail)

  const {userInfo}=useSelector((state)=>state.userDetail)

  useEffect(()=>{
   
  },[id])
  
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
 
}



  return (
    <>
    <Link to='/admin/userlist' ClassName='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>Edit User</h1>
      {error?<Message variant='danger'>{error}</Message>:(<Form >
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder="Enter your name" value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="isAdmin">
          <Form.Check type='checkbox' label="isAdmin" checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)}></Form.Check>
        </Form.Group>
        
        <Button onClick={submitHandler} type="submit" variant="primary">Update</Button>
      </Form>)}
      
      
    </FormContainer>
    </>
  );
};

export default UserEditScreen;
