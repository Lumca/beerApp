import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements"
import {getItemSetting, getAttendeesSetting} from "../functions/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const itemPicker = () => {
        return (
            <View style={style.button_item_container}>
                {items.map(item => (
                    <TouchableOpacity onPress={() => {
                        setItemSelected(item)
                    }}>
                        <View style={style.button_item_items}
                              size={80}
                              raised={true}
                              key={item.id}
                              title={item.name}
                        >
                            <Text>
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
                <Button
                    title="300ml"
                    onPress={() => {
                        setGlassSelected(300)
                    }}
                />
                <Button
                    title="400ml"
                    onPress={() => {
                        setGlassSelected(400)
                    }}
                />
                <Button
                    title="500ml"
                    onPress={() => {
                        setGlassSelected(500)
                    }}
                />
            </View>
        );
    };

    const attendeePicker = () => {
        return (
            <View>
                {attendees.map(attendee => (
                    <Button
                        key={attendee.id}
                        title={attendee.name}
                        onPress={() => {
                            setAttendeeSelected(attendee)
                        }}
                    />
                ))}
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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch',
        height: '100%',
    },
    //flexbox 4 views in a row over whole screen wrap
    button_item_items: {
        backgroundColor: '#fff',
        width: '50%',
        height: '100px',
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 1,
        flex: "auto",
    }
});