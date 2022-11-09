import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../common/utils/trpc";

import RevsHeader from "../common/components/RevsHeader"
import LoginForm from "../common/components/LoginForm"


const Login: NextPage = () => {
    return (
        <>
        
        <RevsHeader />
        <div className="PageWrapper"> 
            <h1>Employee Login</h1>   
            <LoginForm />
        </div>
        </>
      )
}

export default Login;