import {getTransactions} from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const revertTransaction = async (index) => {

    let arrOfTransactions;
    await getTransactions().then(transactions => {
        arrOfTransactions = transactions;
    })
    arrOfTransactions.splice(index, 1);
    AsyncStorage.setItem('@transactions', JSON.stringify(arrOfTransactions));
}

export default revertTransaction;