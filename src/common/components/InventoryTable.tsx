import * as React from 'react';

import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { trpc } from "../../common/utils/trpc";
import { InventoryItem } from '../../server/types/bo';


 /**
   * Holds Inventory table with manager information
   * 
   * @returns InventoryTable component
   *
   */
function InventoryTable() {

	function TableRow(item: InventoryItem) {
		const [newStock, setNewStock] = useState(item.stock);

		const order = trpc.manager.updateInventoryItem.useMutation();

		const handleOrder = (event: {
			target: any;
			preventDefault: () => void;
		}) => {
			// event.preventDefault();
			order.mutate({
				name: item.name,
				itemID: item.itemID!,
				unitPrice: item.unitPrice,
				expirationDate: item.expirationDate,
				stock: newStock,
				restockThreshold: item.restockThreshold
			});
            

		}

		return (
			<tr>
				<td>{item.itemID}</td>
				<td>{item.name}</td>
				<td>{item.stock}</td>
				<td>
					<form onSubmit={handleOrder}>
						<Form.Control name="order" min={0}
							onChange={(e) => setNewStock(item.stock + Number(e.target.value))}
						/>
					</form>
				</td>
			</tr>
		)

	}

	const inv = trpc.manager.inventoryItems.useQuery();

	const invItems = inv.data?.inventoryItems;

	const [order, setOrder] = useState(0);

	// const {data, refetch} = trpc.auth.login.useQuery({ username: user, password: pass }, {enabled:false});



	const handleSubmit = (event: {
		target: any;
		preventDefault: () => void;
	}) => {

		// console.log("hello")
		event.preventDefault();
		// const login = trpc.auth.login.useQuery({ username: user, password: pass });
		setOrder(event.target.order.value);
		console.log(order);

		// setManager(data.employee.isManager);

		// refetch();
	}

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Stock</th>
					<th>Order</th>
				</tr>
			</thead>
			<tbody>
				{invItems?.map(d => {
					return (
						<TableRow key={d.itemID}{...d} />
					);
				})}
			</tbody>
		</Table>
	);
}

export default InventoryTable;
