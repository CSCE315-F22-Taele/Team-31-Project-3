import { z } from "zod";

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
});

interface saleItem {
    name: string,
    sales: number,
}

function getSales(): saleItem[] {
    return []
}