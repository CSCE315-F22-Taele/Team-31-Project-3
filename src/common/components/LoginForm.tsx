import * as React from 'react';

import Link from "next/link";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { trpc } from "../../common/utils/trpc";
import { useState } from 'react';

import Router from 'next/router';

function LoginForm() {

    // function validateLogin(user: string, pass: string) {
	//     const login = trpc.auth.login.useQuery({ username: user, password: pass });
    // }
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [manager, setManager] = useState(false);

    const {data, refetch} = trpc.auth.login.useQuery({ username: user, password: pass }, {enabled:false});
    // setManager(login.data?.employee.isManager);

    const handleSubmit = (event: {
        target: any; 
        preventDefault: () => void; 
    }) => {
        
        // console.log("hello")
        event.preventDefault();
        // const login = trpc.auth.login.useQuery({ username: user, password: pass });
        setUser(event.target.username.value);
        setPass(event.target.password.value);
        
        console.log(user);
        console.log(pass);

        // setManager(data.employee.isManager);
        // if(data != undefined){
        //     console.log("valid data");
        //     if(data.employee?.isManager){
        //         Router.push('/manager');
        //     }else{
        //         Router.push('/server');
        //     }
        // }else{
        //     alert("Invalid username or password.");
        // }
        refetch();
        if(data != undefined){
            console.log("valid data");
            if(data.employee?.isManager){
                Router.push('/manager');
            }else{
                Router.push('/server');
            }
        }else{
            alert("Invalid username or password.");
        }
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