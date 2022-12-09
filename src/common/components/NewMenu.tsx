import { Button, Form, Card, Table } from "react-bootstrap";

import React, { useState, useEffect } from 'react';

import { trpc } from "../utils/trpc";

import styles from "../../pages/index.module.css";

 /**
   * 
   * Sub-component of NewItem tab that allows manager to create a new menu item
   * 
   * @returns NewMenu component
   *
   */

function NewMenu() {

    const [ingsUsed, setIngsUsed] = useState<{ itemID: number, amount: number}[]>([]);
	const insert = trpc.manager.insertMenuItem.useMutation()
    const handleSubmit = async (e: {
		target: any;
		preventDefault: () => void;
	}) => {
        e.preventDefault()
        const formData = new FormData(e.target),
            data = Object.fromEntries(formData.entries())
        console.log(data)

        await insert.mutateAsync({
			metaData: ({
                name: data.name as string,
                description: "",
                price: Number(data.price) as unknown as number,
                isEntree: Boolean(data.isEntree) as unknown as boolean,
                imageURL: "",
                subtype: Number(data.subtype) as unknown as number
            }), 
            ings: ingsUsed
		});

		if (insert.error) {
			console.log(`INSERT FAILDED: ${insert.error.message}`);
			return;
		}

    }

    const inv = trpc.manager.inventoryItems.useQuery();

	const invItems = inv.data?.inventoryItems;

    return (
        <Card style={{width:'50%', margin:'10px'}}>
            <Card.Header>
                Add New Menu Item
            </Card.Header>
        <Card.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Ingredient Name
                </Form.Label>
                <Form.Control name="name" required />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Price
                </Form.Label>
                <Form.Control name="price" required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Entree?
                </Form.Label>
                <Form.Check name="isEntree"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Subtype
                </Form.Label>
                <Form.Select name="subtype" required> 
                    <option value="1">Chicken</option>
                    <option value="2">Burger</option>
                    <option value="3">Salad</option>
                    <option value="4">Dessert</option>
                    <option value="5">Savory</option>
                    <option value="6">Drink</option>
                </Form.Select>
            </Form.Group>
            <br></br>
            <Button type="submit">
                Create Item
            </Button>
            </Form>
            <br></br>
            <Card>
                <Card.Header>Ingredients</Card.Header>
                <Card.Body style={{height:'200px', overflowY:'scroll'}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {invItems && invItems!.map((item) => {
                            return (
                            <tr key={item.itemID}>
                                <td key={item.itemID}>{item.itemID}</td>
                                <td key={item.itemID}>{item.name}</td>
                                <td key={item.itemID}>{item.stock}</td>
                                <td key={item.itemID}>
                                    <form key={item.itemID} onSubmit={(e) => {
                                        e.preventDefault()
                                        const ing = ingsUsed.find((ing) => ing.itemID === item.itemID);
                                        if (ing)
                                            ingsUsed.filter((ing) => ing.itemID !== item.itemID);
                                        else
                                            ingsUsed.push({itemID: item.itemID!, amount: Number(e.currentTarget.amount.value) as unknown as number})
                                        // console.log(ingsUsed)
                                    }}>
                                        <input key={item.itemID} name="amount" defaultValue={0}/>
                                    </form>
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
        </Card.Body>
        </Card>
    );
}

export default NewMenu;
