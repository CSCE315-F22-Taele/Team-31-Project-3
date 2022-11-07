import { Employee, HasIngredient, MenuItem, InventoryItem, OrderItem } from '../types/bo';
import { DB } from './psql';

export const selectEmployees = async (db: DB): Promise<Employee[]> => {
	const rs = await db.query('SELECT * from EMPLOYEES;')
	return rs.rows as Employee[];
}

export async function loginUser(db: DB, username: String, password: String): Promise<Employee> {
	const rs = await db.query(
		`SELECT 
			employeeID, firstName, lastName, username, isManager
		FROM 
			employees
		WHERE
			username = ${username} AND password = ${password} 
		`
	)

	if (rs.rowCount == 0)
		throw new Error('UserNotFound');

	return {
		employeeID: rs.rows[0].employeeID as number,
		firstName: rs.rows[0].firstName as string,
		lastName: rs.rows[0].lastName as string,
		username: rs.rows[0].username as string,
		isManager: rs.rows[0].isManager as boolean
	};
}

export async function InsertOrder(db: DB, customerName: String, employeeID: Number, orderItems: OrderItem[]) {
	try {
		await db.query("BEGIN");

		const rs = await db.query(`
			INSERT INTO orders(customerName, totalCost, orderTime, employeeID)
			VALUES 
				(${customerName}, 0.0, ${Date.now().toString()}, ${employeeID})
			RETURNING orderID;`
		)

		const orderID = rs.rows[0].orderID;

		const orderItemsSQL = orderItems
			.map((o: OrderItem) => `(${orderID}, ${o.menuItemID}, 0.0, '${o.notes}')`)
			.join(",");


		await db.query(`
			INSERT INTO orderItems(orderID, menuItemID, chargePrice, notes)
			VALUES
				${orderItemsSQL};

			UPDATE orderItems as orderItems
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
		INSERT INTO Inventory(name, unitPrice, expirationDate, stock)
		VALUES
			(${item.name} , ${item.unitPrice}, ${item.expirationDate}, ${item.stock})
		`)
}

export async function UpdateInvetoryItem(db: DB, item: InventoryItem) {
	await db.query(`
		UPDATE inventory
		SET
			name = ${item.name},
			unitPrice = ${item.unitPrice},
			expirationDate = ${item.expirationDate},
			stock = ${item.stock}
		WHERE itemID = ${item.itemID};
	`)
}

export async function InsertMenuItem(db: DB, menuItem: MenuItem, ings: HasIngredient[]): Promise<Number> {
	try {
		await db.query('BEGIN');

		const rs = await db.query(`
			INSERT INTO menuItems (name, description, price, isEntree, imageURL)
			VALUES
				(${menuItem.name}, ${menuItem.description}, ${menuItem.price}, ${menuItem.isEntree}, ${menuItem.imageURL})
			RETURNING menuItemID;
		`);

		const menuItemID = rs.rows[0].menuItemID as Number;
		const ingSQL = ings
			.map((ing: HasIngredient) => `(${menuItemID}, ${ing.itemID}, ${ing.amount}`)
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
			name = ${menuItem.name},
			description = ${menuItem.description},
			price = ${menuItem.price}
		WHERE
			menuItemID = ${menuItem.menuItemID}
	`)
}

