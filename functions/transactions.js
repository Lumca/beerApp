import {getItemSetting, getTransactions} from "./storage";

const transactions = async () => {

    let _itemSetting;
    let _transactions;

    await getItemSetting().then(itemSetting => {
        _itemSetting = itemSetting;
    });

    await getTransactions().then(transactions => {
        _transactions = transactions;
    })


}

const getPrices = (itemSetting, transactions) => {
    const data = [];
    for (let i = 0; i < itemSetting.length; i++) {
        data.push({
            id: itemSetting[i].id,
            name: itemSetting[i].name,
            liters: itemSetting[i].liters,
            litersSum: getLitersSumFromTransactions(itemSetting[i].id, transactions)
        })
    }
    return data
}

export default transactions;