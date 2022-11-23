import { type NextPage } from "next";
import { Button } from "react-bootstrap";
import React, { useState } from 'react';
import OrderScreen from "../common/components/OrderScreen";
import Cart from "../common/components/Cart";
import { MenuOrder } from "../common/interfaces/client";
import { trpc } from "../common/utils/trpc";
import Modal from 'react-bootstrap/Modal';

import RevsHeader from "../common/components/RevsHeader"

const Menu: NextPage = () => {

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


	const order = trpc.orders.order.useMutation()
	const createOrder = async () => {
		if (orderItems.length === 0)
			return;
		const _orderItems: { menuItemID: number, notes: string }[] = [];

		orderItems.forEach((o: MenuOrder) => {
			const arr = new Array(o.amount).fill({ menuItemID: o.menuItemID, notes: o.notes });
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
            <div className="server-wrapper">
            <div className="order-items">
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
                <OrderScreen orderItems={orderItems} setOrderItems={setOrderItems} showImages={false} />
            </div>
                <div className="cart-items">
                    <Cart orderItems={orderItems} setOrderItems={setOrderItems} />
                    <div> COST: ${sum().toFixed(2)} </div>
                    <div> TAX: ${(sum() * .07).toFixed(2)} </div>
                    <div> TOTAL: ${(sum() * 1.07).toFixed(2)} </div>
                    <Button onClick={createOrder} disabled={order.isLoading}>ORDER</Button>
                </div>
			</div>
            </div>
		</>
	)
}
export default Menu;
