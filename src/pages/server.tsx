import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

import { trpc } from "../common/utils/trpc";

import styles from "./index.module.css";
import logo from '../common/images/revs-logo.png';

import RevsHeader from "../common/components/RevsHeader"

const Menu: NextPage = () => {
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
              price="$6.49"
              documentation="https://nextjs.org/"
            />
            <ItemCard
              name="Cheeseburger"
              price="$6.99"
              documentation="https://www.typescriptlang.org/"
            />
            <ItemCard
              name="Bacon Burger"
              price="$7.89"
              documentation="https://tailwindcss.com/"
            />
            <ItemCard
              name="Double Cheeseburger"
              price="$8.59"
              documentation="https://trpc.io/"
            />
            <ItemCard
              name="Black Bean Burger"
              price="$7.29"
              documentation="https://next-auth.js.org/"
            />
            <ItemCard
              name="Grilled Cheese"
              price="$4.49"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Grilled Chicken Sandwich"
              price="6.59"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Crispy Chicken Sandwich"
              price="$6.59"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Aggie Chicken Club"
              price="$7.99"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Gig 'Em Patty Melt"
              price="$7.09"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Chicken Tenders"
              price="$7.49"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Chicken Bacon Ranch Salad"
              price="$8.69"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Cobb Salad"
              price="$7.49"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Caesar Salad"
              price="$8.29"
              documentation="https://www.prisma.io/docs/"
            />
          </div>
            </Tab>
            <Tab eventKey="sides" title="Sides">
            <div className={styles.cardGrid}>
            <ItemCard
              name="French Fries"
              price="$2.69"
              documentation="https://nextjs.org/"
            />
            <ItemCard
              name="Fountain Drink"
              price="$2.45"
              documentation="https://www.typescriptlang.org/"
            />
            <ItemCard
              name="Aggie Shake"
              price="$4.49"
              documentation="https://tailwindcss.com/"
            />
            <ItemCard
              name="Cookie Sandwich"
              price="$4.69"
              documentation="https://trpc.io/"
            />
            <ItemCard
              name="Ice Cream Cup"
              price="$3.29"
              documentation="https://next-auth.js.org/"
            />
            <ItemCard
              name="Bottled Water"
              price="$1.99"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Brownie"
              price="$2.49"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Lays Chips"
              price="$1.49"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Tater Tots"
              price="$2.79"
              documentation="https://www.prisma.io/docs/"
            />
            <ItemCard
              name="Sweet Potato Fries"
              price="$2.89"
              documentation="https://www.prisma.io/docs/"
            />
          </div>
            </Tab>
          </Tabs>
        </div>
      </>
    )
  }
  
  export default Menu;


  type ItemCardProps = {
    name: string;
    price: string;
    documentation: string;
  };
  
  const ItemCard = ({
    name,
    price,
    documentation,
  }: ItemCardProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <p className={styles.cardDescription}>{price}</p>
        <Button className="custom-btn" variant="primary" onClick={handleShow}>Add to Cart</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item to Cart?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      </section>
    );
  };