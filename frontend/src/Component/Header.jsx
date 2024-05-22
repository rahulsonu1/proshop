import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { userAction } from "../store/userDetail";
import { myOrderListAction } from "../store/myOrderList";
import { profileAction } from "../store/profileDetail";
import { userListAction } from "../store/userList";

const Header = () => {
  const userDetail=useSelector(state=>state.userDetail)
  const {userInfo}=userDetail
  const dispatch=useDispatch()

  
  
  function logoutHandler(){
    dispatch(userAction.logout())
    localStorage.removeItem("userInfo");
    dispatch(myOrderListAction.listReset())
    dispatch(profileAction.profileReset())
    dispatch(userListAction.listReset())
    
  }

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>		NetMart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo?(
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer  to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ):(<LinkContainer to="/login">
                <Nav.Link>
                  {" "}
                  <i className="fas fa-user"></i>Login
                </Nav.Link>
              </LinkContainer>)}
              {userInfo && userInfo.isAdmin &&(
                 <NavDropdown title="admin" id='adminmenu'>
                 <LinkContainer  to="admin/userlist">
                   <NavDropdown.Item>Users</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer  to="admin/productlist">
                   <NavDropdown.Item>Products</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer  to="admin/orderlist">
                   <NavDropdown.Item>Orders</NavDropdown.Item>
                 </LinkContainer>
               </NavDropdown>
              )}
              
              
            </Nav>
            {/* <SearchBox></SearchBox> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
