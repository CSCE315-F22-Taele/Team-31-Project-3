import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape }) {
		return shape;
	},
});

/**
 * TRPC router for all end points
 */
export const router = t.router;

/**
 * Public export for all public methods
 */
export const publicProcedure = t.procedure;


const isManager = t.middleware(({ ctx, next }) => {
	if (!ctx.session || !ctx.session.user || !ctx.session.user.isManager) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({
		ctx: {
			session: { ...ctx.session, user: ctx.session.user },
		},
	});
});

/**
 * middleware for manager endpoints
 */
export const managerProcedure = t.procedure.use(isManager);
