import React, {useEffect, useState} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";

const SettingsScreen = ({navigation}) => {

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
        console.log(transactions);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>{transactions}</Text>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
    },
});
