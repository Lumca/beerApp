import {getAttendeesSetting, getItemSetting, getTransactions} from "./storage";

const transactions = async () => {

    let _itemSetting;
    let _transactions;
    let _attendeesSetting;

    await getItemSetting().then(itemSetting => {
        _itemSetting = itemSetting;
    });

    await getTransactions().then(transactions => {
        _transactions = transactions;
    })

    await getAttendeesSetting().then(AttendeesSetting => {
        _attendeesSetting = AttendeesSetting;
    })

    return getPrices(_itemSetting, _attendeesSetting, _transactions)

}

const getPrices = (_itemSetting, _attendeesSetting, _transactions) => {
    const data = [];
    for (let i = 0; i < _attendeesSetting.length; i++) {
        data.push({
            attendeeInfo: {
                id: _attendeesSetting[i].id,
                name: _attendeesSetting[i].name,
            },
            itemsInfo: getGlassAndPriceSumByAttendee(_itemSetting, _attendeesSetting[i].id, _transactions),
            priceSum: getWholeSumByAttendee(_itemSetting, _attendeesSetting[i].id, _transactions)
        })
    }
    return data
}

const getGlassInfoSumByItem = (itemId, attendeeId, transactions) => {
    let sum = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].itemInfo.id === itemId && transactions[i].attendeeInfo.id === attendeeId) {
            sum += transactions[i].glassInfo;
        }
    }
    return sum;
};

const getPriceSumByItem = (itemId, itemSetting, attendeeId, transactions) => {
    let sum = 0;
    for (let i = 0; i < itemSetting.length; i++) {
        if (itemSetting[i].id === itemId) {
            //Cena sudu / litry * vypita suma ml
            sum += (itemSetting[i].price / (itemSetting[i].liters * 1000)) * getGlassInfoSumByItem(itemId, attendeeId, transactions);
        }
    }
    return sum;
};

const getGlassAndPriceSumByAttendee = (itemSetting, attendeeId, transactions) => {
    const data = [];
    for (let i = 0; i < itemSetting.length; i++) {
        data.push({
            item: itemSetting[i].id,
            name: itemSetting[i].name,
            litersSum: getGlassInfoSumByItem(itemSetting[i].id, attendeeId, transactions),
            price: getPriceSumByItem(itemSetting[i].id, itemSetting, attendeeId, transactions)
        })
    }
    return data
}


const getWholeSumByAttendee = (itemSetting, attendeeId, transactions) => {
    //Sum of all prices
    let sum = 0;
    for (let i = 0; i < itemSetting.length; i++) {
        sum += getPriceSumByItem(itemSetting[i].id, itemSetting, attendeeId, transactions);
    }
    return sum;
}
export default transactions;