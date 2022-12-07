import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { MenuItem, OrderItem } from "../../server/types/bo";
import { MenuOrder } from "../interfaces/client";
import { trpc } from "../utils/trpc";
import { Ing } from "./OrderScreen";


 /**
   * Ingredient picker properties
   * 
   * @returns Props type for IngPicker
   *
   */

export type IngredientPickerProps = {
  show: boolean,
  handleClose: () => void,
  addOrderItem: (menuItem: MenuItem, ings: Ing[]) => void,
  menuItem: MenuItem,
}


 /**
   * Holds Ingredient Picker (checklist) modal component
   * 
   * @returns IngredientPicker component
   *
   */

export function IngredientPicker({ show, handleClose, menuItem, addOrderItem }: IngredientPickerProps) {

  const [ingsUsed, setIngsUsed] = useState<Ing[]>([]);

  if (!menuItem.menuItemID)
    return <div>Error</div>
    
  const ingsData = trpc.orders.ings.useQuery({ menuItemID: menuItem.menuItemID });

  const addOrRemove = (item: Ing) => {
    const ing = ingsUsed.find((ing) => ing.itemID === item.itemID);
    if (ing)
      ingsUsed.filter((ing) => ing.itemID !== item.itemID);
    else
      ingsUsed.push(item)

    setIngsUsed([...ingsUsed]);
  }

  const submit = () => {
    addOrderItem(menuItem, ingsUsed)
    setIngsUsed([]);
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
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={() => submit()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
