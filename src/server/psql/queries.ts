import { Employee, HasIngredient, MenuItem, InventoryItem, OrderItem, Subtype } from '../types/bo';
import { DB } from './psql';


type items = {
	sides: {
		dessert: MenuItem[],
		drink: MenuItem[],
		fried: MenuItem[]
	},

	entrees: {
		chicken: MenuItem[],
		burger: MenuItem[],
		salad: MenuItem[]
	}
}

/**
 * Returns of the menuItems by their subgroups
 * @param db Connection to the database
 * @returns menuItems sorted be their subgroup and if their an entree
 */
export const selectMenuItems = async (db: DB): Promise<items> => {
	return {
		sides: {
			dessert: await selectMenuItemsByType(db, 5),
			drink: await selectMenuItemsByType(db, 6),
			fried: await selectMenuItemsByType(db, 4)
		},
		entrees: {
			chicken: await selectMenuItemsByType(db, 1),
			burger: await selectMenuItemsByType(db, 2),
			salad: await selectMenuItemsByType(db, 3),

		}
	}
}

/**
 * Returns menuItems of a given subtype
 * @param db DB connection
 * @param subtype Subtype subtype of menuItems
 * @returns MenuItem[] list of menuItems
 */
export const selectMenuItemsByType = async (db: DB, subtype: Subtype): Promise<MenuItem[]> => {
	const rsType = await db.query(`
	SELECT * from MENUITEMS 
	WHERE 
		subtype = ${subtype} 
	ORDER BY menuItemID;
	`)
	return rsType.rows.map((row: any): MenuItem => {
		return {
			menuItemID: row.menuitemid,
			name: row.name,
			description: row.description,
			price: row.price,
			isEntree: row.isetree,
			imageURL: row.imageurl,
			subtype: row.subtype,
		}
	});
}

/**
 * Returns all Inventory Items
 * @param db Connection to DB
 * @returns Inventory[] 
 */
export const selectInventoryItems = async (db: DB): Promise<InventoryItem[]> => {
	const rs = await db.query('SELECT * from INVENTORY ORDER BY itemID;')
	const inventory: InventoryItem[] = rs.rows.map((row: any): InventoryItem => {
		return {
			itemID: row.itemid,
			name: row.name,
			unitPrice: row.unitprice,
			expirationDate: row.expirationdate,
			stock: row.stock,
			restockThreshold: row.restockthreshold
		}
	});

	return inventory;
}

/**
 * If there is a user returns Employee if not returns null
 * @param db DB connection to db
 * @param email string
 * @returns Employee | null
 */
export async function LoginWithEmail(db: DB, email: string): Promise<Employee | null> {
	try {
		const rs = await db.query(`
		SELECT 
			employeeID, firstName, lastName, username, isManager
		FROM 
			employees
		WHERE
			email = '${email}';
		`)


		return {
			employeeID: rs.rows[0].employeeid as number,
			firstName: rs.rows[0].firstname as string,
			lastName: rs.rows[0].lastname as string,
			username: rs.rows[0].username as string,
			isManager: rs.rows[0].ismanager as boolean
		};
	} catch (e) {
		return null;
	}
}

/**
 * If there is no matching employee throws error
 * @param db Connection to DB
 * @param username string 
 * @param password string
 * @returns Employee
 */
export async function LoginUser(db: DB, username: string, password: string): Promise<Employee> {
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

/**
 * Creates an order in the database
 * 
 * @param db DB connection
 * @param customerName string customer Name
 * @param employeeID number 
 * @param orderItems OrderItem[]
 * @returns 
 */
export async function InsertOrder(db: DB, customerName: string, employeeID: number, orderItems: OrderItem[]): Promise<number> {
	try {
		await db.query("BEGIN");

		const rs = await db.query(`
			INSERT INTO orders(customerName, totalCost, orderTime, employeeID)
			VALUES 
				('${customerName}', 0.0, '${new Date().toISOString().split('T')[0]}', ${employeeID})
			RETURNING orderID;`
		)

		const orderID = rs.rows[0].orderid;

		const orderItemsSQL = orderItems
			.map((o: OrderItem) => `(${orderID}, ${o.menuItemID}, 0.0, '${o.notes}')`)
			.join(",");

		const ingsUsed: { menuItemID: number, ingID: number }[] = [];
		orderItems.forEach((o: OrderItem) =>
			o.ings.forEach((ingID: number) => {
				ingsUsed.push({ menuItemID: o.menuItemID, ingID: ingID });
			})
		)
		const ingsSQL = ingsUsed.map((item) => `(${item.menuItemID}, ${item.ingID})`)
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

			${ingsUsed.length <= 0 ? '' :
				`CREATE TEMPORARY TABLE ingsUsed (
				menuItemID int,
				itemID int); INSERT INTO ingsUsed (menuItemID, itemID)
			VALUES
				${ingsSQL};

			UPDATE inventory
				SET stock = inventory.stock - query.minus
			FROM (
				SELECT ing.itemID, SUM(ing.amount) as minus FROM ingsUsed
				INNER JOIN hasIngredient ing on ing.menuITemID = ingsUsed.menuItemID
					AND ing.itemID = ingsUsed.itemID 
				GROUP BY ing.itemID
			)
			as query WHERE query.itemID = inventory.itemID;
			`}
		`);

		await db.query('COMMIT');
		return orderID;

	} catch (e) {
		console.log(e);
		await db.query('ROLLBACK');
		return -1;
	}
}
/** 
 * Inserts given invetory item to the database
 * 
 * @param db DB connection 
 * @param item InventoryItem 
 */
export async function InsertInventoryItem(db: DB, item: InventoryItem) {
	await db.query(`
		INSERT INTO Inventory(name, unitPrice, expirationDate, stock, restockThreshold)
		VALUES
			('${item.name}' , ${item.unitPrice}, '${item.expirationDate.toISOString().split('T')[0]}', ${item.stock}, ${item.restockThreshold})
		`)
}

/**
 * Updates an inventory Item
 * 
 * @param db DB connection
 * @param item 
 */
export async function UpdateInvetoryItem(db: DB, item: InventoryItem) {
	await db.query(`
		UPDATE inventory
		SET
			name = '${item.name}',
			unitPrice = ${item.unitPrice},
			expirationDate = '${item.expirationDate.toISOString().split('T')[0]}',
			stock = ${item.stock},
			restockThreshold = ${item.restockThreshold}
		WHERE itemID = ${item.itemID};
	`)
}

/**
 * Inserts MenuItems and the Ingredients and returns the new ID
 * 
 * @param db DB Connection to DB
 * @param menuItem MenuItem 
 * @param ings HasIngredient[]
 * @returns newly created Id
 */
export async function InsertMenuItem(db: DB, menuItem: MenuItem, ings: HasIngredient[]): Promise<number> {
	try {
		await db.query('BEGIN');

		const rs = await db.query(`
			INSERT INTO menuItems (name, description, price, isEntree, imageURL, subtype)
			VALUES
				('${menuItem.name}', '${menuItem.description}', ${menuItem.price}, ${menuItem.isEntree}, '${menuItem.imageURL}', '${menuItem.subtype}')
			RETURNING menuItemID;
		`);

		const menuItemID = rs.rows[0].menuitemid as number;
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

/**
 * Updates a Given menuItem
 * 
 * @param db DB connection
 * @param menuItem MenuItem to update
 */
export async function UpdateMenuItem(db: DB, menuItem: MenuItem) {
	await db.query(`
		UPDATE menuItems
		SET
			name = '${menuItem.name}',
			description = '${menuItem.description}',
			price = ${menuItem.price},
			subtype = ${menuItem.subtype}
		WHERE
			menuItemID = ${menuItem.menuItemID}
	`)
}

/**
 * Gets a specific MenuItem
 * @param db DB connection
 * @param menuItem MenuItem Item to be returned
 */
export async function GetMenuItem(db: DB, menuItem: MenuItem) {
	await db.query(`
		UPDATE menuItems
		SET
			name = '${menuItem.name}',
			description = '${menuItem.description}',
			price = ${menuItem.price},
			subtype = ${menuItem.subtype}
		WHERE
			menuItemID = ${menuItem.menuItemID}
	`)
}

/**
 * Returns all of the ingredients for menuItem
 * @param db DB connection
 * @param menuItemID ID on menuItem to return ings
 * @returns {itemID: number, name string}[]
 */
export async function getIngs(db: DB, menuItemID: number): Promise<{ itemID: number, name: string }[]> {

	const resultSet = await db.query(`
		SELECT 
			hasIngredient.itemID,
			inventory.name
		FROM hasIngredient
		INNER JOIN
			inventory on inventory.itemID = hasIngredient.itemID
		WHERE
			menuitemID = ${menuItemID};
	`)
	return resultSet.rows.map((row: any): { itemID: number, name: string } => {
		return { itemID: row.itemid, name: row.name };
	})

}


