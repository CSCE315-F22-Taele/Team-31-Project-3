import { type NextPage } from "next";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import OrderScreen from "../common/components/OrderScreen";
import Cart from "../common/components/Cart";
import { MenuOrder } from "../common/interfaces/client";
import { trpc } from "../common/utils/trpc";
import Modal from 'react-bootstrap/Modal';

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

import Collapsible from 'react-collapsible';

import Collapse from 'react-bootstrap/Collapse';

import RevsHeader from "../common/components/RevsHeader"
/**
   * 
   * This page displays the customer view menu
   * 
   * @returns a Menu page 
   *
   */
const Menu: NextPage = () => {

	const [open, setopen] = useState(false);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [orderItems, setOrderItems] = useState<MenuOrder[]>([]);
	const sum = (): number => {
		if (orderItems.length === 0)
			return 0.0;
		return orderItems.map((o) => o.amount * o.price)
			.reduce((_sum: number, x) => _sum + x);
	}

	const toggle = () => {
		if (orderItems.length > 0)
			setopen(!open);
	}

	useEffect(() => {
		if (orderItems.length === 0)
			setopen(false);
	}, [orderItems]);


	const order = trpc.orders.order.useMutation()
	const createOrder = async () => {
		if (orderItems.length === 0)
			return;
		const _orderItems: { menuItemID: number, notes: string, ings: number[] }[] = [];

		// TODO: update the way ings are set
		orderItems.forEach((o: MenuOrder) => {
			const arr = new Array(o.amount).fill({ menuItemID: o.menuItemID, notes: o.notes, ings: o.ingsUsed.map(ing => ing.itemID) });
			_orderItems.push(...arr);
		});
		setShow(true);
		await order.mutateAsync({
			customerName: "bob",
			employeeID: 12345,
			orderItems: _orderItems,
		});

		if (order.error) {
			console.log(`ORDER FAILDED: ${order.error.message}`);
			return;
		}

		handleShow();
		setOrderItems([]);
	};


	return (
		<>
			<RevsHeader />
			<div className="PageWrapper">
				<h1>
					Menu
				</h1>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							ORDER ID: {order.isLoading ? "loading..." : order.data?.orderID}
						</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button onClick={handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
				<OrderScreen showImages={true} orderItems={orderItems} setOrderItems={setOrderItems} />
			</div>

			<div className="cartWrapper" >
				<div className="cartHeader">
					<Button style={{ fontSize: '1.5rem', width: '100%' }} data-toggle="collapse" data-target="#collapseExample" className="toggle-btn" onClick={() => toggle()}>
						{orderItems.length > 0 && (open ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />)}
						Cart  {orderItems.length > 0 ? <>🛒</> : <>🚫</>}
					</Button>
				</div>
				<Collapse in={open} className=".collapse-css-transition">
					<div className="cartOpen" style={{ maxHeight: '600px', overflow: 'auto', margin: '10px 40px' }}>
						<Cart isServer={false} orderItems={orderItems} setOrderItems={setOrderItems} />
						{orderItems.length > 0 &&
							<Button style={{ backgroundColor: '#842323', width: '100%', fontSize: '1.5rem' }}
								onClick={createOrder}
								disabled={order.isLoading}>
								Order: ${sum().toFixed(2)} ➡️
							</Button>
						}
					</div>
				</Collapse>
			</div >
		</>
	)
}
export default Menu;
