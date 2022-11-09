
interface saleItem {
    name: string,
    sales: number,
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

interface pairItem {
    itemID1: number,
    itemID2: number,
    itemName1: string,
    itemName2: string,
    amount: number,

}

interface restockItem {
    itemID: number,
    itemName: string,
    price: number,
    stock: number,

}

export type { saleItem, excessItem, pairItem, restockItem }