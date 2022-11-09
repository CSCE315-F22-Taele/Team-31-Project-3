import { z } from "zod";
import psql from "../../psql/psql";
import * as queries from "../../psql/queries";
import * as report from "../../psql/reports";

import { router, publicProcedure } from "../trpc";

export const managerRouter = router({
	sales: publicProcedure
		.input(z.object({ startDate: z.date(), endDate: z.date() }))
		.query(async ({ input }) => {
			return {
				salesReport: await report.salesReport(psql, input.startDate, input.endDate),
			};
		}),
	excess: publicProcedure
		.input(z.object({ startDate: z.date(), endDate: z.date() }))
		.query(async ({ input }) => {
			return {
				excessReport: await report.excessReport(psql, input.startDate, input.endDate),
			};
		}),
	restock: publicProcedure
		.query(async () => {
			return {
				restockReport: await report.restockReport(psql),
			};
		}),
	pairs: publicProcedure
		.input(z.object({ startDate: z.date(), endDate: z.date() }))
		.query(async ({ input }) => {
			return {
				pairsReport: await report.pairsReport(psql, input.startDate, input.endDate),
			};
		}),

	updateMenuItem: publicProcedure
		.input(z.object({
			menuItemID: z.number(),
			name: z.string(),
			description: z.string(),
			price: z.number(),
			isEntree: z.boolean(),
			imageURL: z.string()
		}))
		.mutation(async ({ input }) => {
			await queries.UpdateMenuItem(psql, input);
		}),

	insertMenuItem: publicProcedure
		.input(z.object({
			metaData: z.object({
				name: z.string(),
				description: z.string(),
				price: z.number(),
				isEntree: z.boolean(),
				imageURL: z.string()
			}),
			ings: z.object({
				itemID: z.number(),
				amount: z.number()
			}).array()
		}))
		.mutation(async ({ input }) => {
			await queries.InsertMenuItem(psql, input.metaData, input.ings);
		}),

	insertInventoryItem: publicProcedure
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

	updateInventoryItem: publicProcedure
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

	menuItems: publicProcedure
		.query(async () => {
			return {
				menuItems: await queries.selectMenuItems(psql),
			}

		}),
	inventoryItems: publicProcedure
		.query(async () => {
try {
			return {
				inventoryItems: await queries.selectInventoryItems(psql),
			}
		} catch (e) {
			console.log(e);
			console.log("INV ITEM");
		}
		}),
});

