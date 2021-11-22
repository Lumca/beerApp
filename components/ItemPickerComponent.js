import React, {useState} from "react";
import {View} from "react-native";
import {Button} from "react-native-elements"
import AsyncStorage from "@react-native-async-storage/async-storage";

const mockedItemData = [{
    id: 1,
    name: "Plzen",
    liters: 30
},
    {
        id: 2,
        name: "Budvar",
        liters: 15
    }];

const mockedAttendeeData = [{
    id: 1,
    name: "Lumca"
},
    {
        id: 2,
        name: "Klárka"
    }];


const ItemPickerComponent = () => {
    const [itemSelected, setItemSelected] = useState(null);
    const [glassSelected, setGlassSelected] = useState(null);
    const [attendeeSelected, setAttendeeSelected] = useState(null);

    const itemPicker = () => {
        return (
            <View>
                {mockedItemData.map(item => (
                    <Button
                        key={item.id}
                        title={item.name}
                        onPress={() => {
                            setItemSelected(item)
                        }}
                    />
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
                {mockedAttendeeData.map(attendee => (
                    <Button
                        key={attendee.id}
                        title={attendee.name}
                        onPress={() => {
                            setAttendeeSelected(attendee)
                            finishPicking();
                        }}
                    />
                ))}
            </View>
        )
    }

    const finishPicking = () => {

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