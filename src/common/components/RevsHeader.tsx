import * as React from 'react';

import Link from "next/link";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

function RevsHeader() {
  return (
    <div className="RevsHeader">
    <Navbar collapseOnSelect expand="sm" variant="dark" sticky="top">
      <Container style={{
          justifyContent:"right",
          alignItems:"right"
        }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className = "right-aligned" id="responsive-navbar-nav">
          <Nav className="justify-content-end">
            <Button className="custom-btn" href="/server">MENU</Button>
            <Button className="custom-btn" href="/cart">CART</Button>
            <Button className="custom-btn" href="/manager">MANAGER</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
);
}

export default RevsHeader;