import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

import { trpc } from "../common/utils/trpc";

import styles from "./index.module.css";
import logo from '../common/images/revs-logo.png';
import OrderScreen from "/home/samyang3/Team-31-Project-3/src/common/components/OrderScreen";

const Menu: NextPage = () => {
    return (
      <> <OrderScreen/>
      </>
    )
  }
  export default Menu;
