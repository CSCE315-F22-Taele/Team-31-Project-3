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
import { useSession } from "next-auth/react";

type OrderProps = {
	orderItems: MenuOrder[],
	setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>,
	showImages: boolean
};
function OrderScreen({ orderItems, setOrderItems, showImages }: OrderProps) {
	const menu = trpc.orders.menuItems.useQuery();
	if (!menu.data)
		return <div>loading...</div>;
	const { entrees, sides } = menu.data.menuItems;
	return (
		<>
			<Tabs
				defaultActiveKey="entrees"
				className="mb-3"
			>
				<Tab eventKey="entrees" title="Entrees">
					<Tabs
						defaultActiveKey="burgers"
						className="mb-3"
					>
						<Tab eventKey="burgers" title="Burgers">
							<div className={styles.cardGrid}>
								{entrees.burger.map((e: MenuItem) => {
									return (
										<ItemCard key={e.menuItemID} showImages={showImages} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
									)
								})
								}
							</div>
						</Tab>
						<Tab eventKey="chicken" title="Chicken">
							<div className={styles.cardGrid}>
								{entrees.chicken.map((e: MenuItem) => {
									return (
										<ItemCard key={e.menuItemID} showImages={showImages} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
									)
								})
								}
							</div>
						</Tab>
						<Tab eventKey="salad" title="Salads">
							<div className={styles.cardGrid}>
								{entrees.salad.map((e: MenuItem) => {
									return (
										<ItemCard key={e.menuItemID} showImages={showImages} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
									)
								})
								}
							</div>
						</Tab>
					</Tabs>
				</Tab>
				<Tab eventKey="sides" title="Sides">
					<Tabs
						defaultActiveKey="fried"
						className="mb-3"
					>
						<Tab eventKey="fried" title="Savory">
							<div className={styles.cardGrid}>
								{sides.dessert.map((e: MenuItem) => {
									return (
										<ItemCard key={e.menuItemID} showImages={showImages} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
									)
								})
								}
							</div>
						</Tab>
						<Tab eventKey="dessert" title="Desserts">
							<div className={styles.cardGrid}>
								{sides.fried.map((e: MenuItem) => {
									return (
										<ItemCard key={e.menuItemID} showImages={showImages} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
									)
								})
								}
							</div>
						</Tab>
						<Tab eventKey="drinks" title="Drinks">
							<div className={styles.cardGrid}>
								{sides.drink.map((e: MenuItem) => {
									return (
										<ItemCard key={e.menuItemID} showImages={showImages} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
									)
								})
								}
							</div>
						</Tab>
					</Tabs>
				</Tab>
			</Tabs>
		</>
	)
}

export default OrderScreen;


type ItemCardProps = {
	menuItem: MenuItem,
	orderItems: MenuOrder[],
	setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>,
	showImages: boolean,
};

const ItemCard = ({
	menuItem,
	orderItems,
	setOrderItems,
	showImages,
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
			{showImages && <img src={menuItem.imageURL} />}
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
