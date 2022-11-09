import * as React from 'react';

import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function InventoryTable() {
    
    // function getTableData(){


    // }



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
            <tr>
                <td>101</td>
                <td>Bun</td>
                <td>2000</td>
                <td></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
        </tbody>
        </Table>
    );
}

export default InventoryTable;
