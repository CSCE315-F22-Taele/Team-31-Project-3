import { z } from "zod";
import psql from "../../psql/psql";
import { getIngs, InsertOrder, selectMenuItems } from "../../psql/queries";

import { router, publicProcedure } from "../trpc";

export const orderRouter = router({
	order: publicProcedure
		.input(z.object({
			customerName: z.string(),
			employeeID: z.number(),
			orderItems: z.object({
				menuItemID: z.number(),
				notes: z.string(),
				ings: z.number().array()
			}).array()
		}))
		.mutation(async ({ input }) => {
			return {
				orderID: await InsertOrder(psql, input.customerName, input.employeeID, input.orderItems)
			};
		}),
	menuItems: publicProcedure
		.query(async () => {
			return {
				menuItems: await selectMenuItems(psql),
			}

		}),
	ings: publicProcedure
		.input(z.object({
			menuItemID: z.number(),
		}))
		.query(async ({ input }) => {
			return {
				ings: await getIngs(psql, input.menuItemID),
			}

		}),
});
