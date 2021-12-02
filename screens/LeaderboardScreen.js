import React, {useEffect, useState} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const SettingsScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState(null);
    const [liters, setLiters] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Leaderboard',
        });

    }, [navigation]);

    return (
        <View style={styles.container}>
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
