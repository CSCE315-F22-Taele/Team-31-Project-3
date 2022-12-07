import { Button, Form, Card } from "react-bootstrap";

import React, { useState, useEffect } from 'react';

import { trpc } from "../utils/trpc";

import styles from "../../pages/index.module.css";


 /**
   * 
   * Sub-component that allows manager to create a new ingredient
   * 
   * @returns NewIng component
   *
   */
function NewIng() {

	const insert = trpc.manager.insertInventoryItem.useMutation()
    const handleSubmit = async (e: {
		target: any;
		preventDefault: () => void;
	}) => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)
        await insert.mutateAsync({
			name: formDataObj.ingName as string,
            unitPrice: 1.99,
            expirationDate: new Date(formDataObj.eDate as string),
            stock: 0,
            restockThreshold: Number(formDataObj.resThresh) 
		});

		if (insert.error) {
			console.log(`INSERT FAILDED: ${insert.error.message}`);
			return;
		}

    }

    return (
        <Card style={{width:'40%', margin:'10px'}}>
            <Card.Header>
                Add New Ingredient
            </Card.Header>
        <Card.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Ingredient Name
                </Form.Label>
                <Form.Control name="ingName" required />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Restock Threshold
                </Form.Label>
                <Form.Control name="resThresh" required />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Expiration Date
                </Form.Label>
                <Form.Control type="date" name="eDate" required />
            </Form.Group>
            <Button type="submit">
                Create Item
            </Button>
        </Form>
        </Card.Body>
        </Card>
    );
}

export default NewIng;
