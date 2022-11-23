import { z } from "zod";
import psql from "../../psql/psql";
import { LoginUser, LoginWithEmail, } from "../../psql/queries";

import { router, publicProcedure } from "../trpc";

export const authRouter = router({
	login: publicProcedure
		.input(z.object({ username: z.string(), password: z.string() }))
		.query(async ({ input }) => {
			try {
				const employee = await LoginUser(psql, input.username, input.password)
				return { employee: employee };
			} catch (e) {
				console.log("caught error");
				return { error: 'user not found' }
			}
		}),
	loginEmail: publicProcedure
		.input(z.object({ email: z.string() }))
		.query(async ({ input }) => {
			const employee = await LoginWithEmail(psql, input.email)
			if (employee == null)
				return { error: 'employee not found' }
			return { employee: employee };
		}),
});
