import { Employee, HasIngredient, MenuItem, InventoryItem, OrderItem } from '../types/bo';
import { DB } from './psql';

export const selectEmployees = async (db: DB): Promise<Employee[]> => {
	const rs = await db.query('SELECT * from EMPLOYEES;')
	return rs.rows as Employee[];
}

export const selectMenuItems = async (db: DB): Promise<MenuItem[]> => {
	const rs = await db.query('SELECT * from MENUITEMS;')
	return rs.rows as MenuItem[];
}

export const selectInventoryItems = async (db: DB): Promise<InventoryItem[]> => {
	const rs = await db.query('SELECT * from INVENTORY;')
	return rs.rows as InventoryItem[];
}

export async function LoginUser(db: DB, username: String, password: String): Promise<Employee> {
	try {
		const rs = await db.query(
			`SELECT 
			employeeID, firstName, lastName, username, isManager
		FROM 
			employees
		WHERE
			username = '${username}' AND password = '${password}'
		`
		)


		return {
			employeeID: rs.rows[0].employeeid as number,
			firstName: rs.rows[0].firstname as string,
			lastName: rs.rows[0].lastname as string,
			username: rs.rows[0].username as string,
			isManager: rs.rows[0].ismanager as boolean
		};
	} catch (e) {
		console.log(e);
		throw new Error("could not find user");
	}


}

export async function InsertOrder(db: DB, customerName: String, employeeID: number, orderItems: OrderItem[]) {
	try {
		await db.query("BEGIN");

		const rs = await db.query(`
			INSERT INTO orders(customerName, totalCost, orderTime, employeeID)
			VALUES 
				('${customerName}', 0.0, '${new Date().toISOString()}', ${employeeID})
			RETURNING orderID;`
		)

		const orderID = rs.rows[0].orderid;

		const orderItemsSQL = orderItems
			.map((o: OrderItem) => `(${orderID}, ${o.menuItemID}, 0.0, '${o.notes}')`)
			.join(",");


		await db.query(`
			INSERT INTO orderItems(orderID, menuItemID, chargePrice, notes)
			VALUES
				${orderItemsSQL};

			UPDATE orderItems as orderItem
			SET
				chargePrice = menu.price
			FROM 
				menuItems menu 
			WHERE
				menu.menuItemID = orderItem.menuItemID
				AND orderItem.orderID = ${orderID};

			UPDATE orders
			SET
				totalCost = query.totalPrice
			FROM (
				SELECT SUM(chargePrice) as totalPrice
				FROM orderItems
				WHERE orderItems.orderID = ${orderID}
			) AS query
			WHERE orders.orderID = ${orderID};

			UPDATE inventory
			SET
				stock = stock - query.minus
			FROM (
				SELECT ing.itemID, SUM(ing.amount) as minus
				FROM orders
					INNER JOIN orderItems orderItem ON orders.orderID = orderItem.orderID
					INNER JOIN menuItems menuItem ON orderItem.menuItemID = menuItem.menuItemID
					INNER JOIN hasIngredient ing ON menuItem.menuItemID = ing.menuItemID
				WHERE orders.orderID = ${orderID}
				GROUP BY ing.itemID
			) as query
		WHERE inventory.itemID = query.itemID;
		`);

		await db.query('COMMIT');

	} catch (e) {
		console.log(e);
		await db.query('ROLLBACK');
	}
}

export async function InsertInventoryItem(db: DB, item: InventoryItem) {
	await db.query(`
		INSERT INTO Inventory(name, unitPrice, expirationDate, stock, restockThreshold)
		VALUES
			('${item.name}' , ${item.unitPrice}, '${item.expirationDate.toISOString()}', ${item.stock}, ${item.restockThreshold})
		`)
}

export async function UpdateInvetoryItem(db: DB, item: InventoryItem) {
	await db.query(`
		UPDATE inventory
		SET
			name = '${item.name}',
			unitPrice = ${item.unitPrice},
			expirationDate = '${item.expirationDate.toISOString()}',
			stock = ${item.stock},
			restockThreshold = ${item.restockThreshold}
		WHERE itemID = ${item.itemID};
	`)
}

export async function InsertMenuItem(db: DB, menuItem: MenuItem, ings: HasIngredient[]): Promise<Number> {
	try {
		await db.query('BEGIN');

		const rs = await db.query(`
			INSERT INTO menuItems (name, description, price, isEntree, imageURL)
			VALUES
				('${menuItem.name}', '${menuItem.description}', ${menuItem.price}, ${menuItem.isEntree}, '${menuItem.imageURL}')
			RETURNING menuItemID;
		`);

		const menuItemID = rs.rows[0].menuitemid as Number;
		const ingSQL = ings
			.map((ing: HasIngredient) => `(${menuItemID}, ${ing.itemID}, ${ing.amount})`)
			.join(',');

		await db.query(`
			INSERT INTO hasIngredient (menuItemID, itemId, amount)
			VALUES
				${ingSQL};
			`)
		await db.query('COMMIT');

		return menuItemID;
	}
	catch (e) {
		console.log(e);
		db.query("ROLLBACK");

	}
	return -1;
}

export async function UpdateMenuItem(db: DB, menuItem: MenuItem) {
	await db.query(`
		UPDATE menuItems
		SET
			name = '${menuItem.name}',
			description = '${menuItem.description}',
			price = ${menuItem.price}
		WHERE
			menuItemID = ${menuItem.menuItemID}
	`)
}

export async function GetMenuItem(db: DB, menuItem: MenuItem) {
	await db.query(`
		UPDATE menuItems
		SET
			name = '${menuItem.name}',
			description = '${menuItem.description}',
			price = ${menuItem.price}
		WHERE
			menuItemID = ${menuItem.menuItemID}
	`)
}


