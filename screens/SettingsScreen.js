import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import transactions from "../functions/transactions"


const SettingsScreen = ({navigation}) => {

    const list = [
        {
            title: 'Nastavení sudů',
            function:() => navigation.navigate('ItemSettings')
        },
        {
            title: 'Nastavení účastníků',
            function:() => navigation.navigate('AttendeesSettings')
        },
    ]

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nastavení',
        });
        transactions().then(res => {
            console.log(res)
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            {
                list.map((item, i) => (
                    <ListItem key={i} bottomDivider>
                        <TouchableOpacity>
                            <ListItem.Content>
                                <ListItem.Title onPress={item.function}>{item.title}</ListItem.Title>
                            </ListItem.Content>
                        </TouchableOpacity>
                        <ListItem.Chevron/>
                    </ListItem>
                ))
            }
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
