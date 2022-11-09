import * as React from 'react';

import Link from "next/link";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { trpc } from "../../common/utils/trpc";
import { useState } from 'react';


function LoginForm() {

    // function validateLogin(user: string, pass: string) {
	//     const login = trpc.auth.login.useQuery({ username: user, password: pass });
    // }
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [manager, setManager] = useState(false);

    const login = trpc.auth.login.useQuery({ username: user, password: pass });
    // setManager(login.data?.employee.isManager);

    const handleSubmit = (event: {
        target: any; 
        preventDefault: () => void; 
    }) => {
        // console.log("hello")
        event.preventDefault();
        // const login = trpc.auth.login.useQuery({ username: user, password: pass });

        
        setManager(login.data?.employee.isManager);
        console.log(manager);


        // console.log(login.data?.employee);

        // const formData = new FormData(event.target),
        //         formDataObj = Object.fromEntries(formData.entries());
        
        // setUser(formDataObj["username"]!.toString());
        // setPass(formDataObj["password"]!.toString());
        // login.UseTPRCQueryResult.employee.isManager;
        // console.log(user);
        // console.log(pass);


        // login(user, pass);
        // console.log(formDataObj["username"]);
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
                onChange={(e) => setUser(e.target.value)}
                required/>
          </Form.Group>
          <Form.Group>
          <Form.Label>Password:</Form.Label>
            <Form.Control type="password" 
                name="password"
                placeholder="Password"
                className="w-50"
                onChange={(e) => setPass(e.target.value)}
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
        <Button variant="primary" type="submit" onClick={handleSubmit} style={{
                marginTop:"10px"
            }}>
            Run Event
          </Button>
        </form>
        
    )

}
export default LoginForm;