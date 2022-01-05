import AsyncStorage from "@react-native-async-storage/async-storage";

const getTransactions = async () => {
    try {
       return await AsyncStorage.getItem("@transactions").then(value => {
            if (value !== null) {
                return JSON.parse(value);
            } else {
                return [];
            }
        })
    } catch (error) {
        return error;
    }
};

const getItemSetting = async () => {
    return AsyncStorage.getItem("@itemSetting").then(value => {
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return [];
        }
    });
};

const getAttendeesSetting = async () => {
    return AsyncStorage.getItem("@attendeesSetting").then(value => {
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return [];
        }
    });
};

const deleteAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        return error;
    }
};

export {getTransactions, getItemSetting, getAttendeesSetting, deleteAllData};