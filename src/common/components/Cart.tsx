import * as React from 'react';

import Button from 'react-bootstrap/Button';
import { MenuOrder } from '../interfaces/client';

import Card from 'react-bootstrap/Card';

type CartProps = {
  orderItems: MenuOrder[],
  setOrderItems: React.Dispatch<React.SetStateAction<MenuOrder[]>>;
  isServer: boolean;
};

function Cart({ orderItems, setOrderItems, isServer }: CartProps) {

  return (
    <>
      <div style={{ display: 'grid' }}>
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

    <Card className="cart-card">
      <Card.Body >
        <div style={{ display: 'grid' }}>
          <div >
            <h3 style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: 5, }}>{item?.menuItemName}</h3>
            <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '1.75rem', width: 0 }} className="right-align">$ {(item!.price * item!.amount).toFixed(2)}</div>
            <ul style={{ listStyle: 'none' }} >
              {item?.ingsUsed.map(item => <li key={item.name} style={{ fontSize: '1.25rem', fontStyle: 'italic' }} className="no-li">{item.name}</li>)}
            </ul>
          </div>
          <div style={{ display: 'flex' }}>
            <Button className="cancel-btn" variant="outline-danger" onClick={() => remove(id)}>REMOVE</Button>
            <div className="inc-dec" style={{ marginLeft: 'auto', alignItems: 'center', fontSize: '1.25rem' }}>
              <Button className="custom-btn emj" onClick={() => add(id, -1)}>➖</Button>
              {item?.amount}
              <Button className="custom-btn emj" onClick={() => add(id, 1)}>➕</Button>
            </div>
          </div>
        </div>
      </Card.Body >
    </Card >
  )
}

export default Cart;

