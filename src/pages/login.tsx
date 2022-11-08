import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../common/utils/trpc";

import styles from "./index.module.css";

import RevsHeader from "../common/components/RevsHeader"
import LoginForm from "../common/components/LoginForm"


import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import logo from '../common/images/revs-logo.png';

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