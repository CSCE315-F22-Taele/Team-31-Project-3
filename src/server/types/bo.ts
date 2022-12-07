
/**
     * Employee data type
     *
     * @param employeeID 	ID for employees 
     * @param firstName		Employee First name
     * @param lastName		Employee Last name
	 * @param username   	username
	 * @param password   	password
	 * @param isManager   	Determines if user is a manager
     */
interface Employee {
	employeeID: number,
	firstName: string,
	lastName: string,
	username: string,
	password?: string,
	isManager: boolean
}

/**
     * Order data type
     *
     * @param orderID 		Unique ID of order
     * @param customerName	customer's name
     * @param totalCost		net cost
	 * @param orderTime   	time of order
	 * @param emplyeeID   	ID of employee
     */
interface Order {
	orderID?: number,
	customerName: string,
	totalCost: number,
	orderTime: Date,
	emplyeeID: number
}

/**
     * OrderItem data type
     *
     * @param orderItemID 		Unique ID of orderItem
     * @param orderID			Unique ID of order
     * @param menuItemID		ID of menuItem in Order
	 * @param chargePrice   	cost of orderItem
	 * @param notes   			extra notes for the order
	 * @param ings   			ingredients of the orderItem
     */
interface OrderItem {
	orderItemID?: number,
	orderID?: number,
	menuItemID: number,
	chargePrice?: number,
	notes: string,
	ings: number[],
}

/**
     * OrderItem data type
     *
     * @param menuItemID 		Unique ID of menuItem
     * @param name				Name of menuItem
     * @param description		description of menuItem
	 * @param price   			price of menuItem
	 * @param isEntree   		Indicator if it is a side or entree
	 * @param imageURL   		Item image
	 * @param subtype   		Type of food
     */
interface MenuItem {
	menuItemID?: number,
	name: string,
	description: string,
	price: number,
	isEntree: boolean,
	imageURL: string,
	subtype: Subtype,
}

/**
     * InventoryItem data type
     *
     * @param itemID 			Unique ID of item
     * @param name				Name
     * @param unitPrice			price of 1 unit
	 * @param expirationDate	date of expiration
	 * @param stock   		 	number of items left
	 * @param restockThreshold  restockThreshold
     */
interface InventoryItem {
	itemID?: number,
	name: string,
	unitPrice: number,
	expirationDate: Date,
	stock: number,
	restockThreshold: number
}

/**
     * HasIngredient data type
     *
     * @param menuItemID 		 ID of menuItem
     * @param itemID				ID of InventoryItem
     * @param amount			amount of inventoryItem
 	 */
interface HasIngredient {
	menuItemID?: number,
	itemID: number,
	amount: number
}

/**
     * Subtype data type
     *
     * @param chicken 		Food type
     * @param burger		Food type
     * @param salad			Food type
	 * @param dessert   	Food type
	 * @param fried   		Food type
	 * @param drinks   		Food type
     */
enum Subtype {
	chicken = 1,
	burger = 2,
	salad = 3,
	dessert = 4,
	fried = 5,
	drinks = 6
}

/**
     * Export all types
     *
     * @param Employee 		Employee Type
     * @param Order				Order Type
     * @param OrderItem		OrderItem Type
	 * @param MenuItem   			MenuItem Type
	 * @param InventoryItem   		InventoryItem Type
	 * @param HasIngredient   		HasIngredient Type
	 * @param Subtype   		Subtype Type
     */
export type { Employee, Order, OrderItem, MenuItem, InventoryItem, HasIngredient, Subtype }
