import React, {useEffect, useState} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";

const HistoryScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Leaderboard',
        });
        AsyncStorage.getItem("@transactions").then(value => {
                setTransactions(value);
        }).catch(err => {
            console.log(err);
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>{transactions}</Text>
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
