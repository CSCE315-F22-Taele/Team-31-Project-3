import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const orderRouter = router({
    orders: publicProcedure
        .input(z.object({ customerName: z.string(), employeeID: z.number().nullish(), orderItems: z.number().array() }))
        .mutation(({ input }) => {
            return {
                price: 1,
                orderID: 512,
            };
        }),
    menuItems: publicProcedure
        .query(() => {
            return {
                entrees: getEntrees(),
                sides: getSides(),
            }

        }),
});

interface menuItem {
    menuItemID: number,
    name: string,
    desciption: string,
    price: number,
    isEntree: boolean,
    imageURL: string,
}

function getSides(): menuItem[] {
    return []
}

function getEntrees(): menuItem[] {
    return []
}