import { Button, Form, Card, Table } from "react-bootstrap";

import React, { useState, useEffect } from 'react';

import { trpc } from "../utils/trpc";

import styles from "../../pages/index.module.css";


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

    let ingsArray = new Map<number, number>();

    

    const handleUpdate = (item: { itemID: number; }, e: {
		target: any;
		preventDefault: () => void;
	}) => {
        e.preventDefault()
        ingsArray.set(item.itemID!, e.target.value as unknown as number)
        console.log(ingsArray)
    }


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
                <Form.Check name="isEntree" required/>
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
                            <tr>
                                <td>{item.itemID}</td>
                                <td>{item.name}</td>
                                <td>{item.stock}</td>
                                <td>
                                    <Form.Control name="amount" defaultValue={0} 
                                        onChange={(e) => setIngsUsed([...ingsUsed, {itemID: item.itemID!, amount: Number(e.target.value) as unknown as number}])}
                                    />
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Button type="submit">
                Create Item
            </Button>
        </Form>
        </Card.Body>
        </Card>
    );
}

export default NewMenu;
