import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { managerRouter } from "./manager";
import { orderRouter } from "./orders";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  orders: orderRouter,
  manager: managerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
