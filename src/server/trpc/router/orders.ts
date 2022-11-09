import { z } from "zod";
import psql from "../../psql/psql";
import { InsertOrder, selectMenuItems } from "../../psql/queries";

import { router, publicProcedure } from "../trpc";

export const orderRouter = router({
	order: publicProcedure
		.input(z.object({
			customerName: z.string(),
			employeeID: z.number(),
			orderItems: z.object({
				menuItemID: z.number(),
				notes: z.string()
			}).array()
		}))
		.mutation(async ({ input }) => {
			return {
				orderID: await InsertOrder(psql, input.customerName, input.employeeID, input.orderItems)
			};
		}),
	menuItems: publicProcedure
		.query(() => {
			return {
				menuitems: selectMenuItems(psql),
			}

		}),
});
