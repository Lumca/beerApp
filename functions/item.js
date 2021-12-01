import {getItemSetting, getTransactions} from "./storage";

const litersSumCount = async () => {

    let _itemSetting;
    let _transactions;

    await getItemSetting().then(itemSetting => {
            _itemSetting = itemSetting;
    });

    await getTransactions().then(transactions => {
            _transactions = transactions;
    })

    return getLitersSumsWithId(_itemSetting, _transactions)
}

const getLitersSumFromTransactions = (id, data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].itemInfo.id === id) {
            sum += data[i].glassInfo;
        }
    }
    return sum;
}

const getLitersSumsWithId = (itemSetting, transactions) => {
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

export default litersSumCount;