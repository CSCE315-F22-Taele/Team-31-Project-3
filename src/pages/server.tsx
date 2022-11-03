import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { trpc } from "../common/utils/trpc";

import styles from "./index.module.css";

import RevsHeader from "../common/components/RevsHeader"

const Menu: NextPage = () => {
    return (
      <>
        
        <RevsHeader />
        <div className="PageWrapper">
          <h1>
            Menu
          </h1>
          <Tabs
            defaultActiveKey="entrees"
            className="mb-3"
          >
            <Tab eventKey="entrees" title="Entrees">
              <div>hiiii</div>
            </Tab>
            <Tab eventKey="sides" title="Sides">
              <div>hsagWhbn</div>
            </Tab>
          </Tabs>
        </div>
      </>
    )
  }
  
  export default Menu;