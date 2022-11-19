import { type NextPage } from "next";


import styles from "index.module.css";

import RevsHeader from "../common/components/RevsHeader"

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InventoryTable from "../common/components/InventoryTable";
import MenuItemTable from "../common/components/MenuItemTable";
import { useSession } from "next-auth/react";


const Manager: NextPage = () => {
	const { data } = useSession();
	if (!data)
		return <> AHHHHHHH GET OUT!!!!! </>
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
						<InventoryTable />
					</Tab>
					<Tab eventKey="menu" title="Menu Items">
						<MenuItemTable />
					</Tab>
				</Tabs>
			</div>
		</>
	)
}

export default Manager;
