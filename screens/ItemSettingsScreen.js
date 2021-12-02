import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";
import {getItemSetting} from "../functions/storage";

const ItemSettingsScreen = ({navigation}) => {

    const [count, setCount] = useState();
    const [items, setItems] = useState();
    const {control, handleSubmit, formState: {errors}} = useForm({});

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nastavení sudů',
        });
        const unsubscribe = navigation.addListener('focus', () => {
            getItemSetting().then(value => {
                setItems(value);
            });
        });
        return unsubscribe;
        }, [navigation]);

    const onSubmit = data => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            i++;
            arr.push({
                id: i,
                name: data[`name${i}`],
                liters: data[`liters${i}`],
                price: data[`price${i}`]
            });
            i--;
        }
        const jsonArr = JSON.stringify(arr)
        AsyncStorage.setItem('@itemSetting', jsonArr)
            .then(() => {
                navigation.navigate('AttendeesSettings');
            })
            .catch(err => {
                console.log(err);
            });
    };
    //Fill form with data if items is not empty
    useEffect(() => {
        if (items) {
            setCount(items.length);
            for (let i = 0; i < items.length; i++) {
                i++;
                control.register(`name${i}`, {value: items[i -1].name});
                control.register(`liters${i}`, {value: items[i -1].liters});
                control.register(`price${i}`, {value: items[i -1].price});
                i--;
            }
        }
    }, [items]);


    const renderItems = () => {
            return Array.apply(null, {length: count}).map((p, index) => (
                <View key={++index}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input key={"name" + index}
                                   placeholder="Jméno sudu"
                                   leftIcon={{type: 'material', name: 'tag'}}
                                   onBlur={onBlur}
                                   value={value}
                                   onChangeText={onChange}
                                   label={'Sud #' + index}
                            />
                        )}
                        name={'name' + index}
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input key={"liters" + index}
                                   placeholder="Litry"
                                   leftIcon={{type: 'material', name: 'local-drink'}}
                                   onBlur={onBlur}
                                   value={value}
                                   onChangeText={onChange}
                                   label={'Litry #' + index}
                            />
                        )}
                        name={'liters' + index}
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input key={"price" + index}
                                   placeholder="Cena"
                                   leftIcon={{type: 'material', name: 'money'}}
                                   onBlur={onBlur}
                                   value={value}
                                   onChangeText={onChange}
                                   label={'Cena #' + index}
                            />
                        )}
                        name={'price' + index}
                    />
                </View>
            ))
    }

    return (
        <ScrollView>
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
                    onPress={handleSubmit(onSubmit)}
                />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ItemSettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
    },
});
