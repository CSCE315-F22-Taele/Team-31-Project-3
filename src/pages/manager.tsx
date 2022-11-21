import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../common/utils/trpc";

import styles from "./index.module.css";

import RevsHeader from "../common/components/RevsHeader"

import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import logo from '../common/images/revs-logo.png';
import InventoryTable from "../common/components/InventoryTable";
import MenuItemTable from "../common/components/MenuItemTable";


const Manager: NextPage = () => {
    return (
      <>
        <RevsHeader />
        <div className="PageWrapper">    
            <h1 >
                Manager View
            </h1>
            <Tabs
                defaultActiveKey="inventory"
                className="mb-3"
            >
            <Tab eventKey="inventory" title="Inventory">
                <InventoryTable/>
            </Tab>
            <Tab eventKey="menu" title="Menu Items">
              <MenuItemTable/>
            </Tab>
            <Tab eventKey="sales" title="Sales Report">
              <MenuItemTable/>
            </Tab>
            <Tab eventKey="excess" title="Excess Report">
              <MenuItemTable/>
            </Tab>
            <Tab eventKey="restock" title="Restock Report">
              <MenuItemTable/>
            </Tab>
            <Tab eventKey="pairs" title="Pairs Report">
              <MenuItemTable/>
            </Tab>

          </Tabs>
        </div>
      </>
    )
  }
  
  export default Manager;