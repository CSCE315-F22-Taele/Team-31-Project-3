
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
interface InventoryItem {
	itemID?: number,
	name: string,
	unitPrice: number,
	expirationDate: Date,
	stock: number,
	restockThreshold: number
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
interface HasIngredient {
	menuItemID?: number,
	itemID: number,
	amount: number
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
enum Subtype {
	chicken = 1,
	burger = 2,
	salad = 3,
	dessert = 4,
	fried = 5,
	drinks = 6
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
export type { Employee, Order, OrderItem, MenuItem, InventoryItem, HasIngredient, Subtype }
