import { z } from "zod";
import psql from "../../psql/psql";
import * as queries from "../../psql/queries";
import * as report from "../../psql/reports";

import { router, managerProcedure } from "../trpc";

/**
     * Functions for the manager view to access reports
     * and edit database
     * 
     * @return saleItem[] - All menu items and their
     *         number of sales
     * @return excessItem[] - every item with less than
     *         10% of inv used with time frame
     * @return restockItem[] - all inventory items that
     *         are currently
     *         below their respective restock threshold
     * @return pairItem[] - List of pairs of menuitems
     *         and their number of
     *         occurences together
     * 
     * @return Updated Menu Item
     * @return Inserts Menu Item
     * @return Inserts Inventory Item
     * @return Updated Inventory Item
     * @return menuItems[] - all menu items
     * @return inventoryItems[] - all inventory items
     * 
     */
export const managerRouter = router({
    sales: managerProcedure
        .input(z.object({ startDate: z.date(), endDate: z.date() }))
        .query(async ({ input }) => {
            return {
                salesReport: await report.salesReport(psql, input.startDate, input.endDate),
            };
        }),
    excess: managerProcedure
        .input(z.object({ startDate: z.date(), endDate: z.date() }))
        .query(async ({ input }) => {
            return {
                excessReport: await report.excessReport(psql, input.startDate, input.endDate),
            };
        }),
    restock: managerProcedure
        .query(async () => {
            return {
                restockReport: await report.restockReport(psql),
            };
        }),
    pairs: managerProcedure
        .input(z.object({ startDate: z.date(), endDate: z.date() }))
        .query(async ({ input }) => {
            return {
                pairsReport: await report.pairsReport(psql, input.startDate, input.endDate),
            };
        }),

    updateMenuItem: managerProcedure
        .input(z.object({
            menuItemID: z.number(),
            name: z.string(),
            description: z.string(),
            price: z.number(),
            isEntree: z.boolean(),
            imageURL: z.string(),
            subtype: z.number()
        }))
        .mutation(async ({ input }) => {
            await queries.UpdateMenuItem(psql, input);
        }),

    insertMenuItem: managerProcedure
        .input(z.object({
            metaData: z.object({
                name: z.string(),
                description: z.string(),
                price: z.number(),
                isEntree: z.boolean(),
                imageURL: z.string(),
                subtype: z.number()
            }),
            ings: z.object({
                itemID: z.number(),
                amount: z.number()
            }).array()
        }))
        .mutation(async ({ input }) => {
            await queries.InsertMenuItem(psql, input.metaData, input.ings);
        }),

    insertInventoryItem: managerProcedure
        .input(z.object({
            name: z.string(),
            unitPrice: z.number(),
            expirationDate: z.date(),
            stock: z.number(),
            restockThreshold: z.number()
        }))
        .mutation(async ({ input }) => {
            await queries.InsertInventoryItem(psql, input)
        }),

    updateInventoryItem: managerProcedure
        .input(z.object({
            itemID: z.number(),
            name: z.string(),
            unitPrice: z.number(),
            expirationDate: z.date(),
            stock: z.number(),
            restockThreshold: z.number()
        }))
        .mutation(async ({ input }) => {
            await queries.UpdateInvetoryItem(psql, input)
        }),

    menuItems: managerProcedure
        .query(async () => {
            return {
                menuItems: await queries.selectMenuItems(psql),
            }

        }),
    inventoryItems: managerProcedure
        .query(async () => {
            try {
                return {
                    inventoryItems: await queries.selectInventoryItems(psql),
                }
            } catch (e) {
                console.log(e);
            }
        }),
});

