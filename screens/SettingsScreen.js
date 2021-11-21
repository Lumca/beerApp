import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from "react-hook-form";

const SettingsScreen = ({navigation}) => {

    const [count, setCount] = useState();
    const [itemInfo, setItemInfo] = useState();
    const [liters, setLiters] = useState();
    const [name, setName] = useState();

    const onSubmit = data => console.log(data);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nastavení',
        });
    }, [navigation]);

    const renderItems = () => {
        return Array.apply(null, {length: count}).map((p, index) => (
            <View key={++index}>
                <Input key={"name" + index}
                       placeholder="Jméno sudu"
                       leftIcon={{type: 'material', name: 'tag'}}
                       onChangeText={(text) => setName(text)}
                       label={'Sud #' + index}
                />
                <Input key={"liters" + index}
                       placeholder="Kolik litrů"
                       leftIcon={{type: 'material', name: 'tag'}}
                       onChangeText={(text) => setLiters(text)}
                       label={'Sud #' + index}
                />
            </View>
        ))
    }

    return (
            <View style={styles.container}>
                <Input
                    placeholder='Kolik sudů'
                    leftIcon={{type: 'material', name: 'tag'}}
                    containerStyle={styles.input}
                    onChangeText={(text) => setCount(text)}
                    keyboardType={'numeric'}
                    isFocused={true}
                    label="Počet sudů"
                />
                {renderItems()}
                <TouchableOpacity>
                    <Button
                        title="Pokračovat"
                    />
                </TouchableOpacity>
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
