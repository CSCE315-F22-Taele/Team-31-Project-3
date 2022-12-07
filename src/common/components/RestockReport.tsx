import * as React from 'react';

import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { trpc } from "../../common/utils/trpc";
import { restockItem } from '../../server/types/report';

/**
   * 
   * Holds restock report table and date range picker for manager
   * 
   * @returns a RestockReport component
   *
   */
function RestockReport() {

	function TableRow(item: restockItem) {
		return (
			<tr>
				<td>{item.itemID}</td>
				<td>{item.itemName}</td>
				<td>{item.price}</td>
				<td>{item.stock}</td>
			</tr>
		)

	}


	const sale = trpc.manager.restock.useQuery()
    const sales = sale.data?.restockReport;

	// const menuItems = menu.data?.menuItems.entrees.concat(menu.data?.menuItems.sides);

	// const [order, setOrder] = useState(0);

	return (
        <>
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Price</th>
					<th>Stock</th>
				</tr>
			</thead>
			<tbody>
				{sales?.map(d => {
					return (
						<TableRow key={d.itemID} {...d} />
					);
				})}
			</tbody>
		</Table>
        </>
	);
}

export default RestockReport;
