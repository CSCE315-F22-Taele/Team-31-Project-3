
/**
     * saleItem type
     *
     * @param name 	name of item
     * @param sales		number of sales
     */
interface saleItem {
    name: string,
    sales: number,
}

/**
     * excessItem type
     *
     * @param itemId 	itemID
     * @param name		name of item
     * @param startDate		date
     * @param endDate		date
     * @param itemsUsed		items used
     * @param startStock    stock
     * @param endStock		stock
     */
interface excessItem {
    itemId: number,
    name: string,
    startDate: Date,
    endDate: Date,
    itemsUsed: number,
    startStock: number,
    endStock: number,

}

/**
     * pairItem type
     *
     * @param itemID1 	    itemID of item 1
     * @param itemID2		itemID of item 2
     * @param itemName1		name of item 1
     * @param itemName2		name of item 2
     * @param amount		number
     */
interface pairItem {
    itemID1: number,
    itemID2: number,
    itemName1: string,
    itemName2: string,
    amount: number,

}

/**
     * restockItem type
     *
     * @param itemID 	    itemID of item
     * @param itemName		name of item
     * @param price		price
     * @param stock		number
     */
interface restockItem {
    itemID: number,
    itemName: string,
    price: number,
    stock: number,

}

/**
     * all exports
     *
     * @param saleItem 	    saleItem type
     * @param excessItem	excessItem type
     * @param pairItem		pairItem type
     * @param restockItem	restockItem type
     */
export type { saleItem, excessItem, pairItem, restockItem }