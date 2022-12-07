/**
 * Used to internally store Orders are their being created
 * 
 * @param menuItemID number
 * @param menuItemName string
 * @param price number
 * @param notes string
 * @param ingsUsed {name string, itemID number}[]
 * @param amount prince

 */
export type MenuOrder = {
	menuItemID: number;
	menuItemName: string;
	price: number;
	notes: string;
	ingsUsed: { itemID: number; name: string }[];
	amount: number;
};
