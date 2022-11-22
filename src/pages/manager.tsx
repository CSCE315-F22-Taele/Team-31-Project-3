import { type NextPage } from "next";


import styles from "index.module.css";

import RevsHeader from "../common/components/RevsHeader"

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InventoryTable from "../common/components/InventoryTable";
import MenuItemTable from "../common/components/MenuItemTable";
<<<<<<< HEAD
import SalesReport from "../common/components/SalesReport";



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
              <SalesReport/>
            </Tab>
            {/* <Tab eventKey="excess" title="Excess Report">
              <ExcessReport/>
            </Tab>
            <Tab eventKey="restock" title="Restock Report">
              <RestockReport/>
            </Tab>
            <Tab eventKey="pairs" title="Pairs Report">
              <PairsReport/>
            </Tab> */}

          </Tabs>
        </div>
      </>
    )
  }
  
  export default Manager;
=======
import { useSession } from "next-auth/react";


const Manager: NextPage = () => {
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
>>>>>>> release/sprint2
