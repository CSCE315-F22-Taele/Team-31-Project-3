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