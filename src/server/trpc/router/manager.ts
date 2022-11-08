import { z } from "zod";
import psql from "../../psql/psql";
import { InsertInventoryItem, InsertMenuItem, UpdateInvetoryItem, UpdateMenuItem } from "../../psql/queries";

import { router, publicProcedure } from "../trpc";

export const managerRouter = router({
	sales: publicProcedure
		.input(z.object({ startDate: z.string(), endDate: z.string() }))
		.query(({ input }) => {
			return {
				salesReport: getSales(),
			};
		}),
	excess: publicProcedure
		.input(z.object({ startDate: z.string(), endDate: z.string() }))
		.query(({ input }) => {
			return {
				salesReport: getSales(),
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
			await UpdateMenuItem(psql, input);
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
			await InsertMenuItem(psql, input.metaData, input.ings);
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
			await InsertInventoryItem(psql, input)
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
			await UpdateInvetoryItem(psql, input)
		})
});

interface saleItem {
	name: string,
	sales: number,
}

function getSales(): saleItem[] {
	return []
}

interface excessItem {
	itemId: number,
	name: string,
	startDate: Date,
	endDate: Date,
	itemsUsed: number,
	startStock: number,
	endStock: number,

}

function getExcess(): excessItem[] {
	return []
}

interface pairItem {
	itemID1: number,
	itemID2: number,
	itemName1: string,
	itemName2: string,
	amount: number,

}

function getPairs(): pairItem[] {
	return []
}

interface restockItem {
	itemID: number,
	itemName: string,
	price: number,
	stock: number,

}

function getRestock(): restockItem[] {
	return []
}
