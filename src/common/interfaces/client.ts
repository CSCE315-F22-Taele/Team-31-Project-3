export type MenuOrder = {
	menuItemID: number,
	menuItemName: string,
	price: number,
	notes: string,
	ingsUsed: { itemID: number, name: string }[],
	amount: number
}
