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

const getTheme = async () => {
    try {
        return await AsyncStorage.getItem("@theme").then(value => {
            if (value !== null) {
                return value;
            } else {
                return [];
            }
        })
    } catch (error) {
        return error;
    }
};

const setTheme = async (theme) => {
    try {
        console.log(theme)
        return await AsyncStorage.setItem("@theme", theme);
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

export {getTransactions, getItemSetting, getAttendeesSetting, getTheme, setTheme};