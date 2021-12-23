import React from "react";
import Popup from 'reactjs-popup';
import LongTermDisplay from './LongTermDisplay'
import ShortTermDisplay from './ShortTermDisplay'
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Qoute.css'
import { Navbar,Nav,NavDropdown,Row,Col,Container } from 'react-bootstrap'
import RandomQouteGen from "./RandomQouteGen";


export default function Qoute(){
  
    return(
       <div>
         
 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/qoute">Planned Out</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    <Nav>
      <Nav.Link href="/qoute" className='active'>Homepage</Nav.Link>
      <Nav.Link href="#features">Activities</Nav.Link>
      <Nav.Link href="#pricing">Plan</Nav.Link>
      <Nav.Link href="#pricing">Chat</Nav.Link>
      <NavDropdown title="My Account" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Friends</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Groups</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3"><Popup trigger={<button> Click to open popup </button>} 
     position="right center">
      <div>GeeksforGeeks</div>
      <button>Click here</button>
    </Popup></NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

<Container className="contact-content debug-border">
  <Row className="align-items-center">
    <Col className="text-center text-md-right">
           <RandomQouteGen />  
    </Col>
  </Row>
  <Row>
    <Col className="text-center text-md-right" >
    <div className="goals term-card">
    <h2>Goals</h2>
    </div>
    </Col>
  </Row>
  <Row >
    <Col className="text-center text-md-right">
      
      <LongTermDisplay />
   
    </Col>
    <Col className="text-center text-md-right">
    
     <ShortTermDisplay />

    </Col>
  </Row>
</Container>
           
       </div>
    );
}