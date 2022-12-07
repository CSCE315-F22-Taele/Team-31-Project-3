import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { trpc } from "../utils/trpc";

import styles from "../../pages/index.module.css";

import { MenuItem } from "../../server/types/bo";
import { MenuOrder } from "../interfaces/client";
import { ItemCard } from "./OrderScreen";

/**
 * Props Component for the Order screen in the server view
 * 
 * @param orderItems MenuOrder[]
 * @param setOrderItems setState
 * @param showImages false
 */
export type OrderProps = {
  orderItems: MenuOrder[],
  setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>,
  showImages: boolean
};


function ServerOrderScreen({ orderItems, setOrderItems, showImages }: OrderProps) {
  const menu = trpc.orders.menuItems.useQuery();
  if (!menu.data)
    return <div>loading...</div>;
  const { entrees, sides } = menu.data.menuItems;


  const itemCards = (menuItems: MenuItem[]) => {
    return (
      <div className={styles.cardGrid}>
        {menuItems.map((e: MenuItem) =>
          <ItemCard
            key={e.menuItemID}
            showImages={showImages}
            menuItem={e}
            orderItems={orderItems}
            setOrderItems={setOrderItems}
          />
        )
        }
      </div>
    )
  }
  return (
    <>
      <Tabs className="" defaultActiveKey="entrees" >
        <Tab eventKey="entrees" title="Entrees" className="custom-tab">
          <h3>Burger 🍔</h3>
          {itemCards(entrees.burger)}
          <h3>Chicken 🍗</h3>
          {itemCards(entrees.chicken)}
          <h3>Salad 🥗</h3>
          {itemCards(entrees.salad)}
        </Tab>
        <Tab eventKey="sides" title="Sides" className="custom-tab" >
          <h3>Dessert 🍦</h3>
          {itemCards(sides.dessert)}
          <h3>Drinks 🧃</h3>
          {itemCards(sides.drink)}
          <h3>Fried 🍟</h3>
          {itemCards(sides.fried)}
        </Tab>
      </Tabs>
    </>
  )
}

/**
 * Component for the Order screen in the server view
 * @returns ServerORderScreen Component
 */
export default ServerOrderScreen;


