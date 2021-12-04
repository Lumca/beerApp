import React, {useEffect, useState} from "react";
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";
import {getTransactions} from "../functions/storage";

const HistoryScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState([]);
    let refresh;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'History',
        });

        const unsubscribe = navigation.addListener('focus', () => {
            getTransactions().then(transactions => {
                if (transactions) {
                    setTransactions(transactions);
                }
                console.log("Refresh done")
            });
        });
        return unsubscribe;
    }, [navigation, refresh])


    const revertTransaction = async (index) => {
        let arrOfTransactions;
        await getTransactions().then(transactions => {
            arrOfTransactions = transactions;
        })
        //hnus, ale funguje dobre, je to kvuli reverse transactions v renderu
        arrOfTransactions.reverse().splice(index, 1);
        arrOfTransactions.reverse();
        AsyncStorage.setItem('@transactions', JSON.stringify(arrOfTransactions));
        setTransactions(arrOfTransactions);
    }

    return (
        <ScrollView>
            <Text style={{fontSize: 25}}>Jméno . Pivo . Čas . Množství</Text>
            {transactions.reverse().map((transaction, i) => (
                <TouchableOpacity key={i} onPress={() => revertTransaction(i)}>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25}}>{transaction.itemInfo.name}</Text>
                        <Text style={{fontSize: 25}}>{transaction.attendeeInfo.name}</Text>
                        <Text style={{fontSize: 25}}>{transaction.glassInfo} ml</Text>
                        <Text style={{fontSize: 25}}>{transaction.time}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        height: 100
    },
});
