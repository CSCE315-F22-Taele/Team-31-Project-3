import * as React from 'react';

import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { trpc } from "../../common/utils/trpc";
import { excessItem } from '../../server/types/report';


function ExcessReport() {

	function TableRow(item: excessItem) {
		return (
			<tr>
				<td>{item.itemId}</td>
				<td>{item.name}</td>
				<td>{item.itemsUsed}</td>
			</tr>
		)
	}

    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

	const sale = trpc.manager.excess.useQuery({
        startDate: new Date(start),
        endDate: new Date(end)
    })
    const sales = sale.data?.excessReport;

	// const menuItems = menu.data?.menuItems.entrees.concat(menu.data?.menuItems.sides);

	// const [order, setOrder] = useState(0);

	const handleSubmit = (event: {
		target: any;
		preventDefault: () => void;
	}) => {

		// console.log("hello")
		event.preventDefault();
		// const login = trpc.auth.login.useQuery({ username: user, password: pass });
		setStart(event.target.startdate.value);
		setEnd(event.target.enddate.value);
		
        console.log(start);
        console.log(end);


		// setManager(data.employee.isManager);

		// refetch();
	}





	return (
        <>
       <form onSubmit={handleSubmit}>
            <label>
                Start Date:
                <input type="date" name="startdate"/>
            </label>
            <label>
                End Date:
                <input type="date" name="enddate"/>
            </label>
            <input type="submit" value="Submit" />
        </form>
        
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Amount Used</th>
				</tr>
			</thead>
			<tbody>
				{sales?.map(d => {
					return (
						<TableRow key={d.itemId} {...d} />
					);
				})}
			</tbody>
		</Table>
        </>
	);
}

export default ExcessReport;
