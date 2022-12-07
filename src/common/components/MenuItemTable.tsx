import * as React from 'react';

import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { trpc } from "../../common/utils/trpc";
import { MenuItem, Subtype } from '../../server/types/bo';


 /**
   * Holds information on all menu items for manager view
   * 
   * @returns MenuItemTable component
   *
   */
function MenuItemTable() {

	function TableRow(item: MenuItem) {
		const [newPrice, setNewPrice] = useState(item.price);

		const order = trpc.manager.updateMenuItem.useMutation();

		const handleUpdate = (event: {
			target: any;
			preventDefault: () => void;
		}) => {
			let entree = false;
			let imageURL = "";
			if (item.isEntree != undefined) {
				entree = item.isEntree;
			}
			if (item.imageURL != undefined) {
				imageURL = item.imageURL;
			}
			// event.preventDefault();
			order.mutate({
				menuItemID: item.menuItemID!,
				name: item.name,
				description: item.description,
				price: newPrice,
				isEntree: entree,
				imageURL: imageURL,
				subtype: item.subtype
			});

		}

		return (
			<tr>
				<td>{item.menuItemID}</td>
				<td>{item.name}</td>
				<td>
					<form onSubmit={handleUpdate}>
						<Form.Control name="order"
							placeholder={item.price.toString()}
							onChange={(e) => setNewPrice(Number(e.target.value))}
						/>
					</form>
				</td>
			</tr>
		)

	}

	const menu = trpc.manager.menuItems.useQuery();

	const menuItems = menu.data?.menuItems.entrees.burger.concat(menu.data?.menuItems.entrees.chicken, menu.data?.menuItems.entrees.salad, menu.data?.menuItems.sides.dessert, menu.data?.menuItems.sides.drink, menu.data?.menuItems.sides.fried);

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
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{menuItems?.map(d => {
					return (
						<TableRow key={d.menuItemID} {...d} />
					);
				})}
			</tbody>
		</Table>
	);
}

export default MenuItemTable;
