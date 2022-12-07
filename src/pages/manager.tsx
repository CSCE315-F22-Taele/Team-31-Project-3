import { type NextPage } from "next";

import React, { useState, useEffect } from 'react';

import styles from "index.module.css";

import RevsHeader from "../common/components/RevsHeader"

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InventoryTable from "../common/components/InventoryTable";
import MenuItemTable from "../common/components/MenuItemTable";
import SalesReport from "../common/components/SalesReport";
import ExcessReport from "../common/components/ExcessReport";
import PairsReport from "../common/components/PairsReport";
import RestockReport from "../common/components/RestockReport";
import NewIng from "../common/components/NewIng";
import NewMenu from "../common/components/NewMenu";

import { useSession } from "next-auth/react";


const Manager: NextPage = () => {


	// const [key, setKey] = useState('inventory');

	// let curKey;
	// if (typeof window !== 'undefined') {
	// 	curKey = localStorage.getItem("curTab")
	// }
	// if(curKey == null){
	// 	if (typeof window !== 'undefined') {
	// 		localStorage.setItem("curTab", 'inventory')
	// 	}
	// 	curKey = 'inventory';
	// }
	// setKey(curKey)

	const { data } = useSession();
	if (!data)
		return <> AHHHHHHH GET OUT!!!!! </>
	if (!data.user.isManager)
		return <> ---- NOT A MANAGER --- </>

	return (
		<>
			<RevsHeader />
			<div className="PageWrapper">
				<h1 >
					Manager View
				</h1>
				<Tabs
					// activeKey={key}
					// onSelect={(k) => {
					// 	if (typeof window !== 'undefined') {
					// 		localStorage.setItem("curTab", k!)
					// 	}
					// 	setKey(k!)
					// }
					// }
					className="mb-3"
				>
					<Tab eventKey="inventory" title="Inventory">
						<InventoryTable />
					</Tab>
					<Tab eventKey="menu" title="Menu Items">
						<MenuItemTable />
					</Tab>
          <Tab eventKey="sales" title="Sales Report">
              <SalesReport/>
            </Tab>
            <Tab eventKey="excess" title="Excess Report">
              <ExcessReport/>
            </Tab>
            <Tab eventKey="restock" title="Restock Report">
              <RestockReport/>
            </Tab>
            <Tab eventKey="pairs" title="Pairs Report">
              <PairsReport/>
            </Tab>
			<Tab eventKey="new-item" title="Add Item">
              <div style={{display:'flex'}}>
			  	<NewIng/>
				<NewMenu/>
			  </div>
            </Tab>
			</Tabs>
			</div>
		</>
	)
}

export default Manager;
