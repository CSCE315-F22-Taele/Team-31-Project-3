import { DB } from './psql';
import { saleItem, excessItem, pairItem, restockItem, } from '../types/report';

export async function salesReport(db: DB, startDate: Date, endDate: Date): Promise<saleItem[]> {
    const rs = await db.query(`
        SELECT
        b.name,
        Count(a.orderItemID) as Sales
    FROM
        OrderItems a
        inner join MenuItems b on a.menuItemID = b.menuItemID
        inner join Orders c on a.orderID = c.orderID
        WHERE
        c.orderTime BETWEEN ${startDate.toISOString()} AND
        ${endDate.toISOString()}
        GROUP BY
        b.name
        ORDER BY Sales desc
      `)
    //name: rs.rows[0].name as string,

    let salesList = [];

    for (let i = 0; i < rs.rowCount; i++) {
        let item: saleItem = {
            name: rs.rows[i].name as string,
            sales: rs.rows[i].sales as number
        }
        salesList.push(item);
    }
    return salesList;
}

export async function excessReport(db: DB, startDate: Date, endDate: Date): Promise<excessItem[]> {
    const rs = await db.query(`
        WITH usage AS (
            SELECT ing.itemID, SUM(ing.amount) AS itemsUsed
            FROM orders
                INNER JOIN orderITems orderItem on orders.orderID = orderItem.orderID
                INNER JOIN menuItems menuItem ON orderItem.menuItemID = menuItem.menuItemID
                INNER JOIN hasIngredient ing on menuItem.menuItemID = ing.menuItemID
            WHERE orders.orderTime BETWEEN ${startDate.toISOString()} AND ${endDate.toISOString()} GROUP BY ing.itemID
        )
        SELECT inventory.itemID, inventory.name, COALESCE(usage.itemsUsed,0) AS itemsUsed, stock, COALESCE(itemsUsed,0) + stock AS initial
        FROM inventory
            LEFT OUTER JOIN usage on usage.itemID = inventory.itemID
        WHERE stock > (.1 * (COALESCE(usage.itemsUsed, 0) + stock))
      `)

    let excessList = [];

    for (let i = 0; i < rs.rowCount; i++) {
        let item: excessItem = {
            itemId: rs.rows[i].itemid as number,
            name: rs.rows[i].name as string,
            startDate: rs.rows[i].startdate as Date,
            endDate: rs.rows[i].enddate as Date,
            itemsUsed: rs.rows[i].itemsused as number,
            startStock: rs.rows[i].startstock as number,
            endStock: rs.rows[i].endstock as number,

        }
        excessList.push(item);
    }
    return excessList;
}

export async function restockReport(db: DB): Promise<restockItem[]> {
    const rs = await db.query(`
        SELECT itemID, name, unitPrice, stock
        FROM Inventory
        WHERE stock < restockThreshold;
      `)

    let restockList = [];

    for (let i = 0; i < rs.rowCount; i++) {
        let item: restockItem = {
            itemID: rs.rows[i].itemid as number,
            itemName: rs.rows[i].itemname as string,
            price: rs.rows[i].price as number,
            stock: rs.rows[i].stock as number,
        }
        restockList.push(item);
    }
    return restockList;
}

export async function pairsReport(db: DB, startDate: Date, endDate: Date): Promise<pairItem[]> {
    const rs = await db.query(`
        WITH temp AS (
        SELECT orders.orderID,
        orderItems.orderitemID,
        menuItems.menuitemID,
        menuItems.name
        FROM orders
        INNER JOIN OrderItems on orderItems.orderID = orders.orderID
        INNER JOIN MenuItems on menuItems.menuItemID = orderItems.MenuItemID
        WHERE ordertime BETWEEN ${startDate.toISOString()} AND ${endDate.toISOString()}
        )

        SELECT pairs.itemID1,
        pairs.itemID2,
        t1.name AS ItemName1,
        t2.name AS ItemName2,
        pairs.amount
        FROM
        (
            SELECT
            t1.menuItemID AS itemID1,
            t2.menuItemID AS itemID2,
            Count(*) as amount
          FROM temp t1
          JOIN temp t2
          ON t1.orderItemID < t2.orderItemID AND t1.orderID = t2.orderID
          GROUP BY t1.menuItemID, t2.menuItemID
        ) AS pairs
        INNER JOIN MenuItems t1 ON pairs.itemID1 = t1.menuitemID
        INNER JOIN MenuItems t2 ON pairs.itemID2 = t2.menuitemID
        ORDER BY amount desc
      `)

    let pairsList = [];

    for (let i = 0; i < rs.rowCount; i++) {
        let item: pairItem = {
            itemID1: rs.rows[i].itemid1 as number,
            itemID2: rs.rows[i].itemid2 as number,
            itemName1: rs.rows[i].itemname1 as string,
            itemName2: rs.rows[i].itemname2 as string,
            amount: rs.rows[i].amount as number,
        }
        pairsList.push(item);
    }
    return pairsList;
}