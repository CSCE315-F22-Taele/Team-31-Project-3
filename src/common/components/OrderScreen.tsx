import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';

import { trpc } from "../utils/trpc";

import styles from "../../pages/index.module.css";
import logo from '../common/images/revs-logo.png';

import RevsHeader from "./RevsHeader";
import { OrderItem, MenuItem } from "../../server/types/bo";
import { MenuOrder } from "../interfaces/client";
import { useSession } from "next-auth/react";
import { IngredientPicker } from "./IngredientPicker";


 /**
   * 
   * @param orderItems - list of items in order
   * @param setOrderItems - allows item list to be updated
   * @param showImages - toggles images for server view
   * 
   * @returns NewIng component
   *
   */
type OrderProps = {
  orderItems: MenuOrder[],
  setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>,
  showImages: boolean
};

 /**
   * 
   * Holds main order screen functionality
   * 
   * @returns OrderScreen component
   *
   */
function OrderScreen({ orderItems, setOrderItems, showImages }: OrderProps) {
  const menu = trpc.orders.menuItems.useQuery();
  if (!menu.data)
    return <div>loading...</div>;
  const { entrees, sides } = menu.data.menuItems;


  const tabs = (menuItems: MenuItem[]) => {

    return (
      <div className={styles.cardGrid}>
        {menuItems.map((e: MenuItem) => {
          return (
            <ItemCard key={e.menuItemID} showImages={showImages} menuItem={e} orderItems={orderItems} setOrderItems={setOrderItems} />
          )
        })
        }
      </div>
    )
  }

  return (
    <>
      <Tabs
        defaultActiveKey="entrees"
        className="mb-3"

      >
        <Tab eventKey="entrees" title="Entrees">
          <Tabs
            defaultActiveKey="burger"
            className="no-border"
          >
            <Tab className="custom-tab" eventKey="burger" title="Burger">
              {tabs(entrees.burger)}
            </Tab>
            <Tab className="custom-tab" eventKey="chicken" title="Chicken">
              {tabs(entrees.chicken)}
            </Tab>
            <Tab className="custom-tab" eventKey="salad" title="Salad">
              {tabs(entrees.salad)}
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="sides" title="Sides">
          <Tabs
            defaultActiveKey="fried"
            className="no-border"
          >
            <Tab className="custom-tab" eventKey="dessert" title="Dessert">
              {tabs(sides.dessert)}
            </Tab>
            <Tab className="custom-tab" eventKey="fried" title="Fried">
              {tabs(sides.fried)}
            </Tab>
            <Tab className="custom-tab" eventKey="drink" title="Drinks">
              {tabs(sides.drink)}
            </Tab>
          </Tabs>
        </Tab>
      </Tabs>
    </>
  )
}

export default OrderScreen;

 /**
   * 
   * @param menuItem - menu item tied to a particular card
   * @param orderItems - global orderItems list
   * @param setOrderItems - allows order items to be updated
   * @param showImages - toggles images for server view
   * 
   * @returns ItemCardProps type
   *
   */
type ItemCardProps = {
  menuItem: MenuItem,
  orderItems: MenuOrder[],
  setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>,
  showImages: boolean,
};

/**
   * 
   * @param name - ingredient name
   * @param itemID - ingredient ID
   * 
   * @returns Ingredient type
   *
   */
export type Ing = {
  name: string,
  itemID: number
}

/**
   * 
   * Holds menu item information and functionality in one clickable card
   * 
   * @returns an ItemCard component
   *
   */
export const ItemCard = ({
  menuItem,
  orderItems,
  setOrderItems,
  showImages,
}: ItemCardProps) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const sameIngs = (ings1: Ing[], ings2: Ing[]): boolean =>
    ings1.length === ings2.length &&
    ings1.every(i1 => ings2.some((i2) => i1.itemID === i2.itemID));

  const addOrderItem = (menuItem: MenuItem, ingsUsed: Ing[]) => {
    if (!menuItem.menuItemID)
      return;

    const item = orderItems.find(orderItem =>
      orderItem.menuItemID == menuItem.menuItemID &&
      sameIngs(ingsUsed, orderItem.ingsUsed)
    );

    if (!item)
      orderItems.push({
        menuItemID: menuItem!.menuItemID,
        menuItemName: menuItem.name,
        price: menuItem.price,
        amount: 1,
        ingsUsed: ingsUsed,
        notes: '',
      });
    else
      item.amount += 1;
    setOrderItems([...orderItems]);
    handleClose();
  };
  return (
    <>
      <section onClick={handleShow} className={styles.card}>
        <h2 className={styles.cardTitle}>{menuItem.name}</h2>
        {showImages && <img src={menuItem.imageURL} alt = {menuItem.name}/>}
        <p className={styles.cardDescription}>${menuItem.price}</p>
        {/* <Button className="custom-btn" variant="primary" onClick={handleShow}>Add to Cart</Button> */}
      </section>
      <IngredientPicker
        addOrderItem={addOrderItem}
        show={show}
        handleClose={handleClose}
        menuItem={menuItem} />
    </>
  );
};
