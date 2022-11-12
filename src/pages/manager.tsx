import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../common/utils/trpc";

import styles from "index.module.css";

import RevsHeader from "../common/components/RevsHeader"

import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Username</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Mark</td>
									<td>Otto</td>
									<td>@mdo</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Jacob</td>
									<td>Thornton</td>
									<td>@fat</td>
								</tr>
							</tbody>
						</Table>
					</Tab>
					<Tab eventKey="menu" title="Menu Items">
						<div>hsagWhbn</div>
					</Tab>
				</Tabs>
			</div>
		</>
	)
}

export default Manager;
