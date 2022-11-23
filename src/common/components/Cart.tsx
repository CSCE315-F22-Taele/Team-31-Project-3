import * as React from 'react';

import Link from "next/link";
import styles from "../../pages/index.module.css";

import Button from 'react-bootstrap/Button';
import { MenuOrder } from '../interfaces/client';

import Card from 'react-bootstrap/Card';

import { useState } from 'react';

import Collapse from 'react-bootstrap/Collapse';

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

import Collapsible from 'react-collapsible';

type CartProps = {
	orderItems: MenuOrder[],
	setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>;
};

function Cart({ orderItems, setOrderItems }: CartProps) {



	return (
		<>
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

		<Card>
			<Card.Body>
				<div className="orderRow">
					<div>
						{item?.menuItemName}
						<div>{item?.ingsUsed.map(item => `-${item.name}\n `)}</div>
					</div>
					<div className="right-align">$ {item!.price * item!.amount}</div>
				</div>
				<div className="orderRow">
					<Button className="cancel-btn" variant="outline-danger" onClick={() => remove(id)}>REMOVE</Button>
					<div className="right-align">
						<div className="inc-dec">
							<Button variant="outline-light" onClick={() => add(id, -1)}>-</Button>
							<div className="item-amount">{item?.amount}</div>
							<Button variant="outline-light" onClick={() => add(id, 1)}>+</Button>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default Cart;

