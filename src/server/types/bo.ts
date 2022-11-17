interface Employee {
	employeeID: number,
	firstName: string,
	lastName: string,
	username: string,
	password?: string,
	isManager: boolean
}

interface Order {
	orderID?: number,
	customerName: string,
	totalCost: number,
	orderTime: Date,
	emplyeeID: number
}

interface OrderItem {
	orderItemID?: number,
	orderID?: number,
	menuItemID: number,
	chargePrice?: number,
	notes: string
	ings: number[],
}

interface MenuItem {
	menuItemID?: number,
	name: string,
	description: string,
	price: number,
	isEntree: boolean,
	imageURL: string
}

interface InventoryItem {
	itemID?: number,
	name: string,
	unitPrice: number,
	expirationDate: Date,
	stock: number
	restockThreshold: number
}

interface HasIngredient {
	menuItemID?: number,
	itemID: number,
	amount: number
}

export type { Employee, Order, OrderItem, MenuItem, InventoryItem, HasIngredient }
