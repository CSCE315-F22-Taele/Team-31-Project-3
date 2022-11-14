import * as React from 'react';

import Link from "next/link";
import styles from "../../pages/index.module.css";

import Button from 'react-bootstrap/Button';
import { MenuOrder } from '../interfaces/client';

type CartProps = {
	orderItems: MenuOrder[],
	setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>;
};
function Cart({ orderItems, setOrderItems }: CartProps) {

	return (
		<>
			<h1>Cart</h1>
			<div className={styles.cardGrid}>
				{orderItems.map((o: MenuOrder, id: number) => <OrderCard key={o.menuItemID} id={id} orderItems={orderItems} setOrderItems={setOrderItems} />)}
			</div>
		</>
	);
}

type OrderCardProps = {
	id: number,
	orderItems: MenuOrder[],
	setOrderItems: (value: MenuOrder[]) => void;
};

const OrderCard = ({ id, orderItems, setOrderItems }: OrderCardProps) => {

	const item = orderItems[id];

	const remove = (id: number) => {
		const updatedItems = orderItems.filter((_, i: number) => i !== id)
		setOrderItems([...updatedItems]);
	}
	const add = (id: number, _amount: number) => {
		if (!orderItems[id])
			return;
		if (orderItems[id]?.amount == 1 && _amount == -1) {
			remove(id);
			return;
		}
		orderItems[id]!.amount += _amount;
		setOrderItems([...orderItems]);
	}
	return (
		<section className={styles.card}>
			<h2 className={styles.cardTitle}>{item?.menuItemName}</h2>
			<p className={styles.cardDescription}>$ {item?.price}</p>
			<p className={styles.cardDescription}># {item?.amount}</p>
			<p className={styles.cardDescription}>total: $ {item!.price * item!.amount}</p>
			<div className = "order-btns">			
					<Button className="cancel-btn" variant="danger" onClick={() => remove(id)}>x</Button>
					<Button className="custom-btn" variant="primary" onClick={() => add(id, -1)}>-</Button>
					<Button className="custom-btn" variant="primary" onClick={() => add(id, 1)}>+</Button>
			</div>
		</section>
	)
}

export default Cart;

