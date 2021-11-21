import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";

const ItemSettingsScreen = ({navigation}) => {

    const [count, setCount] = useState();

    const { control, handleSubmit, formState: { errors } } = useForm({});
    const onSubmit = data => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            i++;
            arr.push({
                id: i,
                name: data[`name${i}`],
                liters: data[`liters${i}`]
            });
            i--;
        }
        AsyncStorage.setItem('@itemSetting', arr)
            .then(() => {;
                navigation.navigate('AttendeesSettings');
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nastavení sudů',
        });
    }, [navigation]);

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
                    onPress={handleSubmit(onSubmit)}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ItemSettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
    },
});
