import React, { useEffect } from "react";
import {  Button,Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import Message from "../Component/Message";
import Loader from "../Component/Loader";
import { userListAction } from "../store/userList";
import axios from "axios";
import { userDeleteAction } from "../store/userDelete";

const UserListScreen = () => {
 const dispatch=useDispatch()
 const navigate=useNavigate()
  const { users, loading, error } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userDetail);
  const{success:deleteSucces}=useSelector((state)=>state.userDelete)

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      fetchUser()
    }else{
      navigate('/login')
    }
    
  }, [navigate,deleteSucces,dispatch]);

  async function fetchUser() {
    try {
      dispatch(userListAction.listRequest());
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get("/api/user", config);
      dispatch(userListAction.listSuccess(data))
    } catch (error) {
        dispatch(userListAction.listFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }

  function deleteHandler(id){
    if(window.confirm('Are you sure')){
      deleteUser(id)
    }
    
  }
  async function deleteUser(id){
    try {
      dispatch(userDeleteAction.deleteRequest())
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data}=await axios.delete(`/api/user/${id}`,config)
      dispatch(userDeleteAction.deleteSuccess())
    } catch (error) {
      dispatch(userDeleteAction.deleteFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  }

  return (<>
  <h1>Users</h1>
  {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(<Table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {users.map((user)=>(
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{user.isAdmin?(<i className="fas fa-check" style={{color:'green'}}></i>):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={(e)=>deleteHandler(user._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
            </tr>
        ))}
    </tbody>
  </Table>)}
  </>);
};

export default UserListScreen;
