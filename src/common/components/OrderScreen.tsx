import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

import { trpc } from "../utils/trpc";

import styles from "../../pages/index.module.css";
import logo from '../common/images/revs-logo.png';

import RevsHeader from "./RevsHeader";
import { OrderItem, MenuItem } from "../../server/types/bo";
import { MenuOrder } from "../interfaces/client";

type OrderProps = {
	orderItems: MenuOrder[],
	setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>;
};
function OrderScreen({ orderItems, setOrderItems }: OrderProps) {
	const menu = trpc.orders.menuItems.useQuery();
	if (!menu.data)
		return <div>loading...</div>;
	const { entrees, sides } = menu.data.menuItems;
	return (
		<>

			<RevsHeader />
			<div className="PageWrapper">
				<h1>
					Menu
				</h1>
				<Tabs
					defaultActiveKey="entrees"
					className="mb-3"
				>
					<Tab eventKey="entrees" title="Entrees">
						<div className={styles.cardGrid}>
						{entrees.map((e: MenuItem) => {
							return (
									<ItemCard key={e.menuItemID} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
							)
						})
						}
								</div>
					</Tab>
					<Tab eventKey="sides" title="Sides">
						<div className={styles.cardGrid}>
							{sides.map((s: MenuItem) => {
								return (
										<ItemCard key={s.menuItemID} menuItem={s} orderItems={orderItems} setOrderItems={setOrderItems} />
										)
									})
								}
						</div>
					</Tab>
				</Tabs>
			</div>
		</>
	)
}

export default OrderScreen;


type ItemCardProps = {
	menuItem: MenuItem,
	orderItems: MenuOrder[],
	setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>;
};

const ItemCard = ({
	menuItem,
	orderItems,
	setOrderItems,
}: ItemCardProps) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const addOrderItem = (menuItem: MenuItem, notes: string) => {
		const item = orderItems.find(orderItem => orderItem.menuItemID == menuItem.menuItemID);
		if (!menuItem.menuItemID)
			return;
		if (!item)
			orderItems.push({
				menuItemID: menuItem!.menuItemID,
				menuItemName: menuItem.name,
				price: menuItem.price,
				amount: 1,
				notes: notes,
			});
		else
			item.amount += 1;
		setOrderItems([...orderItems]);
		setShow(false);
	};


	return (
		<section className={styles.card}>
			<h2 className={styles.cardTitle}>{menuItem.name}</h2>
			<p className={styles.cardDescription}>${menuItem.price}</p>
			<Button className="custom-btn" variant="primary" onClick={handleShow}>Add to Cart</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Item to Cart?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => addOrderItem(menuItem, '')}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</section>
	);
};
