import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Nav,Navbar,Container } from 'react-bootstrap'
const Header = () => {
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark" >
      <Container>
         <LinkContainer to='/'>
           <Navbar.Brand >NetMart</Navbar.Brand>
         </LinkContainer>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="ml-auto">
         <LinkContainer to='/cart'>
         <Nav.Link  ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
         </LinkContainer>
          <LinkContainer to="/login">
          <Nav.Link > <i className='fas fa-user'></i>Login</Nav.Link>
          </LinkContainer>
        </Nav>
       </Navbar.Collapse>
      </Container>
  </Navbar>
</div>

  )
}

export default Header
