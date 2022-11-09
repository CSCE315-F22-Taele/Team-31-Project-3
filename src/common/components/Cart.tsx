import * as React from 'react';

import Link from "next/link";
import styles from "./index.module.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MenuItem, OrderItem } from '../../server/types/bo';


type OrderItems = Map<number, { menuItem: MenuItem, amount: number }>
type CartProps = {
	orderItems: OrderItems,
	setOrderItems: (value: OrderItems) => void;
};
function Cart({ orderItems, setOrderItems }: CartProps) {

	return (
		<div className="PageWrapper">
			<h1>Cart</h1>
			<div>
				{[...orderItems.keys()].map((id) => {
					return <OrderCard orderItems={orderItems} setOrderItems={setOrderItems} key={id.valueOf()} id={id} {...orderItems.get(id.valueOf())} />

				})}
			</div>
		</div>
	);
}

type OrderCardProps = {
	id: number,
	orderItems: OrderItems,
	setOrderItems: (value: OrderItems) => void;
};
const OrderCard = ({ id, orderItems, setOrderItems }: OrderCardProps) => {

	const menuItem = orderItems.get(id)?.menuItem;
	const update = (amount: number) => {
		if (amount == 0) {
			orderItems.delete(id);
		} else {
			const item = orderItems.get(id);
			orderItems.set(id, { menuItem: item!.menuItem, amount: orderItems.get(id)?.amount! + amount });
		}
		setOrderItems(orderItems);
	}

	return (
		<section className={styles.card}>
			<h2 className={styles.cardTitle}>{menuItem?.name}</h2>
			<p className={styles.cardDescription}>$ {menuItem?.price}</p>
			<p className={styles.cardDescription}>amount: {orderItems.get(id)?.amount}</p>
			<Button className="custom-btn" variant="primary" onClick={() => update(1)}>+</Button>
			<Button className="custom-btn" variant="primary" onClick={() => update(-1)}>-</Button>
			<Button className="custom-btn" variant="primary" onClick={() => update(0)}>X</Button>
		</section>
	)
}

export default Cart;

