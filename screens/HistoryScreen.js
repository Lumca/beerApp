import React, {useEffect, useState} from "react";
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";

const HistoryScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'History',
        });

        AsyncStorage.getItem('@transactions').then(transactions => {
            if (transactions) {
                setTransactions(JSON.parse(transactions));
            }
        });
    }, [navigation]);

    return (

        <View>
                {transactions.map((transaction, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{transaction.itemInfo.name}</ListItem.Title>
                            <ListItem.Title>{transaction.attendeeInfo.name}</ListItem.Title>
                            <ListItem.Subtitle>{transaction.glassInfo} ml</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
        </View>


    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
    },
});
