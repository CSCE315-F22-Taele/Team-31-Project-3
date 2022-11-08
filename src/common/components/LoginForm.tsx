import * as React from 'react';

import Link from "next/link";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

function LoginForm() {

    const handleSubmit = (event: {
        target: any; 
        preventDefault: () => void; 
        
    }) => {
        // console.log("hello")
        event.preventDefault();
        const formData = new FormData(event.target),
                formDataObj = Object.fromEntries(formData.entries());

        console.log(formDataObj);
        //   console.log("hello")

        // tprc.auth.
    }    

    return(
        <form onSubmit={handleSubmit}>
          <Form.Group>
          <Form.Label>Username:</Form.Label>
            <Form.Control type="username" 
                name="username"
                placeholder="Username"
                className="w-50"
                required/>
          </Form.Group>
          <Form.Group>
          <Form.Label>Password:</Form.Label>
            <Form.Control type="password" 
                name="password"
                placeholder="Password"
                className="w-50"
                required/>
          </Form.Group>
          <div></div>
          <Form.Group>
          <Button variant="primary" type="submit" style={{
                marginTop:"10px"
            }}>
            Submit
          </Button>
        </Form.Group>
        </form>
    )

}
export default LoginForm;