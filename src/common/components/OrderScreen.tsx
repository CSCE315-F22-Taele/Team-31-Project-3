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
import { OrderItem } from "../../server/types/bo";

function OrderScreen() {
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
            <ItemCard
              name="Classic Hamburger"
              price={6.49}
              id = {1}
            />
            <ItemCard
              name="Cheeseburger"
              price={6.99}
              id={2}
            />
            <ItemCard
              name="Bacon Burger"
              price={7.89}
              id={3}
            />
            <ItemCard
              name="Double Cheeseburger"
              price={8.59}
              id={4}
            />
            <ItemCard
              name="Black Bean Burger"
              price={7.29}
              id={5}
            />
            <ItemCard
              name="Grilled Cheese"
              price={4.49}
              id={6}
            />
            <ItemCard
              name="Grilled Chicken Sandwich"
              price={6.59}
              id={7}
            />
            <ItemCard
              name="Crispy Chicken Sandwich"
              price={6.59}
              id={8}
            />
            <ItemCard
              name="Aggie Chicken Club"
              price={7.99}
              id={9}
            />
            <ItemCard
              name="Gig 'Em Patty Melt"
              price={7.09}
              id={10}
            />
            <ItemCard
              name="Chicken Tenders"
              price={7.49}
              id={11}
            />
            <ItemCard
              name="Chicken Bacon Ranch Salad"
              price={8.69}
              id={12}
            />
            <ItemCard
              name="Cobb Salad"
              price={7.49}
              id={13}
            />
            <ItemCard
              name="Caesar Salad"
              price={8.29}
              id={14}
            />
          </div>
            </Tab>
            <Tab eventKey="sides" title="Sides">
            <div className={styles.cardGrid}>
            <ItemCard
              name="French Fries"
              price={2.69}
              id={15}
            />
            <ItemCard
              name="Fountain Drink"
              price={2.45}
              id={16}
            />
            <ItemCard
              name="Aggie Shake"
              price={4.49}
              id={17}
            />
            <ItemCard
              name="Cookie Sandwich"
              price={4.69}
              id={18}
            />
            <ItemCard
              name="Ice Cream Cup"
              price={3.29}
              id={19}
            />
            <ItemCard
              name="Bottled Water"
              price={1.99}
              id={20}
            />
            <ItemCard
              name="Brownie"
              price={2.49}
              id={21}
            />
            <ItemCard
              name="Lays Chips"
              price={1.49}
              id={22}
            />
            <ItemCard
              name="Tater Tots"
              price={2.79}
              id={23}
            />
            <ItemCard
              name="Sweet Potato Fries"
              price={2.89}
              id={24}
            />
          </div>
            </Tab>
          </Tabs>
        </div>
      </>
    )
  }
  
  export default OrderScreen;


  type ItemCardProps = {
    name: string;
    price: number;
    id: number;
  };
  
  const ItemCard = ({
    name,
    price,
    id,
  }: ItemCardProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addOrderItem = () => {
        let item: OrderItem = {
            orderItemID: 12,
            orderID: 9876,
            menuItemID: id,
            chargePrice: price,
            notes: "food"  
        }
        orderItemList.push(item);
        setShow(false);
    }
    let orderItemList: OrderItem[] = [];
    
    const order = trpc.orders.order.useMutation();
    const createOrder = async () => {
		order.mutate({
			customerName: "bob",
			employeeID: 12345,
			orderItems: orderItemList,
		});
	};

    return (
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <p className={styles.cardDescription}>${price}</p>
        <Button className="custom-btn" variant="primary" onClick={handleShow}>Add to Cart</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item to Cart?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addOrderItem}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      </section>
    );
  };