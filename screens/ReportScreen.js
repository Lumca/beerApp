import React, {useEffect, useState} from "react";
import {View, StyleSheet, TouchableOpacity, ScrollView, FlatList, Switch} from "react-native";
import {Text} from 'react-native-elements';
import litersSumCount from "../functions/item";
import transactionsReport from "../functions/transactions";
import Collapsible from "react-native-collapsible";

const ReportScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState([]);
    const [items, setItems] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [liters, setLiters] = useState(null);
    const [collapsible, setCollapsible] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Report",
        });

        const unsubscribe = navigation.addListener('focus', () => {
            litersSumCount().then(value => {
                setLiters(value);
            })

            transactionsReport().then(value => {
                setTransactions(value);
            })
        });


        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView>
            <Text h3 style={{marginLeft: 20}}>Stav sudů:</Text>
            <View style={style.items_container}>
                {liters && liters.map((item, index) => {
                    return (
                        <View key={index} style={style.items_items}>
                            <Text h4>{item.name}</Text>
                            <Text>Původně: {item.liters} litrů</Text>
                            <Text>Vypito: {item.litersSum} ml</Text>
                            <Text>Zbývá: {item.liters * 1000 - item.litersSum} ml</Text>
                        </View>
                    )
                })}
            </View>
            <Text h3 style={{marginLeft: 20}}>Report útraty zůčastněných:</Text>

            <View style={style.attendees_container}>
                {transactions && transactions.map((transactions, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            (collapsible !== index) ? setCollapsible(index) : setCollapsible(null)
                        }} key={index}>
                            <View key={index} style={style.attendees_items}>
                                <View style={style.attendees_name_price_container}>
                                    <Text>Jméno: {transactions.attendeeInfo.name}</Text>
                                    <Text>Celková částka: {transactions.priceSum.toFixed(2)}</Text>
                                </View>
                                <Collapsible collapsed={collapsible !== index}>
                                    <View style={style.item_name_price_container}>
                                        {transactions.itemsInfo.map((item, index) => {
                                            return (
                                                <View key={index}>
                                                    <Text>{item.name}</Text>
                                                    <Text>Cena: {item.price.toFixed(2)}</Text>
                                                    <Text>Množství v ml: {item.litersSum}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </Collapsible>
                            </View>

                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}


const style = StyleSheet.create({
    items_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 10,
    },
    items_items: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
    },
    attendees_container: {
        flexDirection: 'column',
        margin: 10,
    },
    attendees_items: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
    },
    attendees_name_price_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item_name_price_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10,
    }
});

export default ReportScreen;