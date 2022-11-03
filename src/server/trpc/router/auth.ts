import { z } from "zod";
import { selectEmployees } from "../../psql/queries";
import { Employee } from "../../types/bo";

import { router, publicProcedure } from "../trpc";

export const authRouter = router({
    login: publicProcedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .query(({ input }) => {
            return {
                employeeID: 1,
                firstName: "bob",
                lastName: "bo",
                isManager: false,
            };
        }),
});