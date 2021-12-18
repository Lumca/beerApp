import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Button, Icon} from "react-native-elements"
import {getItemSetting, getAttendeesSetting} from "../functions/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colorPicker from "../functions/colorPicker";

const ItemPickerComponent = () => {
    const [itemSelected, setItemSelected] = useState(null);
    const [glassSelected, setGlassSelected] = useState(null);
    const [attendeeSelected, setAttendeeSelected] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItemSetting().then(item => {
            setItems(item);
        });
        getAttendeesSetting().then(attendee => {
            setAttendees(attendee);
        });
        if (itemSelected && glassSelected && attendeeSelected) {
            const object = {
                itemInfo: itemSelected,
                glassInfo: glassSelected,
                attendeeInfo: attendeeSelected,
                time: new Date().toLocaleString()
            };
            AsyncStorage.getItem('@transactions').then(transactions => {
                if (transactions) {
                    const parsedTransactions = JSON.parse(transactions);
                    parsedTransactions.push(object);
                    AsyncStorage.setItem('@transactions', JSON.stringify(parsedTransactions));
                } else {
                    const newTransactions = [object];
                    AsyncStorage.setItem('@transactions', JSON.stringify(newTransactions));
                }
            });
            setAttendeeSelected(null);
            setItemSelected(null);
            setGlassSelected(null);
        }
    }, [itemSelected, glassSelected, attendeeSelected]);


    const buttonBack = () => {
        setAttendeeSelected(null);
        setItemSelected(null);
        setGlassSelected(null);
    }

    const itemPicker = () => {
        return (
            <View style={style.button_item_container}>
                {items.map(item => (
                    <TouchableOpacity onPress={() => {
                        setItemSelected(item)
                    }}>
                        <View style={[style.button_item_items, {backgroundColor: colorPicker(item.id)}]}
                              size={80}
                              raised={true}
                              key={item.id}
                              title={item.name}
                        >
                            <Text style={style.insideButtonText}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>

                ))}
            </View>
        )
    }

    const glassPicker = () => {
        return (
            <View>
                <View>
                    <TouchableOpacity style={{margin: "2vh", flexDirection: "row"}} onPress={buttonBack}>
                        <Icon name="arrow-left" size={"5vh"} type='font-awesome-5' color='white'/>
                        <Text style={{fontSize: "3vh", color: "white", paddingLeft: "1vh"}}>Zpět</Text>
                        <Text style={{
                            fontSize: "3vh",
                            color: "white",
                            paddingLeft: "10vh"
                        }}>Vybráno: {itemSelected.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.button_item_container}>
                    <TouchableOpacity onPress={() => {
                        setGlassSelected(300)
                    }}>
                        <View key={300} style={[style.button_glass_item, {backgroundColor: "#e03636"}]}>
                            <Text style={style.insideButtonText}>300ml</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setGlassSelected(400)
                    }}>
                        <View key={400} style={[style.button_glass_item, {backgroundColor: "#52a852"}]}>
                            <Text style={style.insideButtonText}>400ml</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setGlassSelected(500)
                    }}>
                        <View key={500} style={[style.button_glass_item, {backgroundColor: "#5b5bfc"}]}>
                            <Text style={style.insideButtonText}>500ml</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const attendeePicker = () => {
        return (
            <View>
                <View>
                    <TouchableOpacity style={{margin: "2vh", flexDirection: "row"}} onPress={buttonBack}>
                        <Icon name="arrow-left" size={"5vh"} type='font-awesome-5' color='white'/>
                        <Text style={{fontSize: "3vh", color: "white", paddingLeft: "1vh"}}>Zpět</Text>
                        <Text style={{
                            fontSize: "3vh",
                            color: "white",
                            paddingLeft: "10vh"
                        }}>Vybráno: {itemSelected.name} {glassSelected} ml</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.button_item_container}>
                    {attendees.map((attendee, key) => (
                        <View key={key}>
                            <TouchableOpacity onPress={() => {
                                setAttendeeSelected(attendee)
                            }}>
                                <View style={[style.button_attendee_item, {backgroundColor: colorPicker(key)}]}>
                                    <Text style={style.insideButtonText}>{attendee.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        )
    }


    let render;

    if (!itemSelected) {
        render = itemPicker();
    }

    if (!glassSelected && itemSelected) {
        render = glassPicker();
    }

    if (!attendeeSelected && glassSelected && itemSelected) {
        render = attendeePicker();
    }

    return (
        <View>
            {render}
        </View>
    );

}

export default ItemPickerComponent;

const style = StyleSheet.create({
    button_item_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "15vh",
    },
    button_item_items: {
        width: '25vh',
        height: '25vh',
        margin: '1vh',
        borderRadius: '1vh',
    },
    insideButtonText: {
        textAlign: 'center',
        fontSize: '2.5vh',
        color: '#000',
        paddingTop: '7vh',
    },
    button_glass_item: {
        backgroundColor: '#fff',
        width: '25vh',
        height: '25vh',
        margin: '1vh',
        borderRadius: '1vh',
        textAlign: 'center',
        fontSize: '2.5vh',
        color: '#000',
    },
    button_attendee_item: {
        backgroundColor: '#fff',
        width: '15vh',
        height: '15vh',
        margin: '2vh',
        borderRadius: '1vh',
        textAlign: 'center',
        fontSize: '2.5vh',
        color: '#000',
    },
});