import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import litersSumCount from "../functions/item";
import transactionsReport from "../functions/transactions";
import {getTransactions, getItemSetting, getAttendeesSetting} from "../functions/storage";


const ReportScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState([]);
    const [items, setItems] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [liters, setLiters] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Report",
        });

        const unsubscribe = navigation.addListener('focus', () => {
            litersSumCount().then(value => {
                setLiters(value);
            })

            transactionsReport().then(value => {
                console.log(value);
                setTransactions(value);
            })
        });


        return unsubscribe;
    }, [navigation]);


    return (
        <View style={style.container}>
            {liters && liters.map((item, index) => {
                return (
                    <View key={index} >
                        <Text>{item.name}</Text>
                        <Text>Původně: {item.liters} litrů</Text>
                        <Text>Vypito: {item.litersSum} ml</Text>
                        <Text>Zbývá: {item.liters * 1000 - item.litersSum} ml</Text>
                    </View>
                )
            })}
            {transactions && transactions.map((transactions, index) => {
                return (
                    <View key={index} >
                        <Text>Jméno: {transactions.attendeeInfo.name}</Text>
                        <Text>Celková částka: {transactions.priceSum}</Text>
                        {transactions.itemsInfo.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Text>Pivo: {item.name}</Text>
                                    <Text>Vypito: {item.litersSum}</Text>
                                    <Text>Částka: {item.price}</Text>
                                </View>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
});

export default ReportScreen;