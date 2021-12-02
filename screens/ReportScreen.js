import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import litersSumCount from "../functions/item";
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

        getTransactions().then(value => {
            setTransactions(value);
        })

        getItemSetting().then(value => {
            setItems(value);
        })


        getAttendeesSetting().then(value => {
            setAttendees(value);
        })

        const unsubscribe = navigation.addListener('focus', () => {
            litersSumCount().then(value => {
                console.log(value);
                setLiters(value);
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
            {attendees && attendees.map((attendee, index) => {
                return (
                    <View key={index} >
                        <Text>{attendee.name}</Text>
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