import * as React from 'react';

import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { trpc } from "../../common/utils/trpc";
import { saleItem } from '../../server/types/report';


function SalesReport() {

	function TableRow(item: saleItem) {
		return (
			<tr>
				<td>{item.sales}</td>
				<td>{item.name}</td>
			</tr>
		)

	}


    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

	const sale = trpc.manager.sales.useQuery({
        startDate: new Date(start),
        endDate: new Date(end)
    })
    const sales = sale.data?.salesReport;

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
					<th>Sales</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{sales?.map(d => {
					return (
						<TableRow key={d.name} {...d} />
					);
				})}
			</tbody>
		</Table>
        </>
	);
}

export default SalesReport;
