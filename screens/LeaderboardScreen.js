import React, {useEffect, useState} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";
import litersCount from "../functions/item";

const SettingsScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState(null);
    const [liters, setLiters] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Leaderboard',
        });
        AsyncStorage.getItem("@transactions").then(value => {
                setTransactions(value);
        }).catch(err => {
            console.log(err);
        });
        const unsubscribe = navigation.addListener('focus', () => {
            litersCount(1).then(value => {
                setLiters(value);
            })
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>{liters}</Text>
            <Button onPress={() => litersCount(1)}>
            Helloo
            </Button>

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