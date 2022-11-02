import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { orderRouter } from "./orders";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  orders: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
