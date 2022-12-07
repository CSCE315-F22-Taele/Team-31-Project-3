import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { MenuItem, OrderItem } from "../../server/types/bo";
import { MenuOrder } from "../interfaces/client";
import { trpc } from "../utils/trpc";
import { Ing } from "./OrderScreen";

export type IngredientPickerProps = {
  show: boolean,
  handleClose: () => void,
  addOrderItem: (menuItem: MenuItem, ings: Ing[]) => void,
  menuItem: MenuItem,
}

export function IngredientPicker({ show, handleClose, menuItem, addOrderItem }: IngredientPickerProps) {

  if (!menuItem.menuItemID)
    return <div>Error</div>

  const ingsData = trpc.orders.ings.useQuery({ menuItemID: menuItem.menuItemID });
  const [ingsUsed, setIngsUsed] = useState<Ing[]>([]);

  const addOrRemove = (item: Ing) => {
    const ing = ingsUsed.find((ing) => ing.itemID === item.itemID);
    if (ing)
      ingsUsed.filter((ing) => ing.itemID !== item.itemID);
    else
      ingsUsed.push(item)

    setIngsUsed([...ingsUsed, item]);
  }

  if (!ingsData.data)
    return <div>loading...</div>

  const ings = ingsData.data.ings;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Cart?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {ings && ings.map((ing) => {
            return <Form.Check onClick={() => addOrRemove(ing)} key={ing.itemID} defaultChecked={true} label={ing.name} />
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => addOrderItem(menuItem, ingsUsed)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
