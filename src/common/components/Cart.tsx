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
	isServer: boolean;
};

function Cart({ orderItems, setOrderItems, isServer }: CartProps) {


	if (!isServer)
		return (
			<>
				<div className={styles.cardGrid}>
					{orderItems.map((o: MenuOrder, id: number) => <OrderCard isServer={isServer} key={o.menuItemID} id={id} orderItems={orderItems} setOrderItems={setOrderItems} />)}
				</div>
			</>
		);
	else
		return (
			<>
			
					<div style={{display:'flex', flexWrap:'wrap'}}>
						{orderItems.map((o: MenuOrder, id: number) => <OrderCard isServer={isServer} key={o.menuItemID} id={id} orderItems={orderItems} setOrderItems={setOrderItems} />)}
					</div>

			</>
		);
			
}

type OrderCardProps = {
	id: number,
	orderItems: MenuOrder[],
	setOrderItems: (value: MenuOrder[]) => void;
	isServer: boolean;
};

const OrderCard = ({ id, orderItems, setOrderItems, isServer }: OrderCardProps) => {

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
		
		<Card style={{ margin: '10px', minWidth: '250px'}}>
			<Card.Body>
				<div className="orderRow">
					<div>
						{item?.menuItemName}
						<div>{item?.ingsUsed.map(item => `no ${item.name}, \n `)}</div>
					</div>
					<div className="right-align">$ {item!.price * item!.amount}</div>
				</div>
				<div className="orderRow">
					<Button className="cancel-btn" variant="outline-danger" onClick={() => remove(id)}>REMOVE</Button>
					<div className="right-align">
						<div className="inc-dec">
							<Button style={{borderRadius:"20% 0 20% 0"}} className="custom-btn" onClick={() => add(id, -1)}>--</Button>
							{item?.amount}
							<Button className="custom-btn" onClick={() => add(id, 1)}>+</Button>
						</div>
					</div>
				</div>
			</Card.Body>
			{/* {isServer && <br />} */}
		</Card>
	)
}

export default Cart;

