import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";
import {getAttendeesSetting, getItemSetting} from "../functions/storage";

const AttendeesSettingsScreen = ({navigation}) => {

    const [count, setCount] = useState();
    const [attendees, setAttendees] = useState();

    const { control, handleSubmit, formState: { errors } } = useForm({});
    const onSubmit = data => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            i++;
            arr.push({
                id: i,
                name: data[`name${i}`],
            });
            i--;
        }
        const jsonArr = JSON.stringify(arr)
        AsyncStorage.setItem('@attendeesSetting', jsonArr)
            .then(() => {
                console.log(arr);
                navigation.navigate('Dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nastavení účastníků',
        });
        const unsubscribe = navigation.addListener('focus', () => {
            getAttendeesSetting().then(value => {
                setAttendees(value);
            });
        });
    }, [navigation]);

    useEffect(() => {
        if (attendees) {
            setCount(attendees.length);
            for (let i = 0; i < attendees.length; i++) {
                i++;
                control.register(`name${i}`, {value: attendees[i -1].name});
                i--;
            }
        }
    }, [attendees]);

    const renderAttendees = () => {
        return Array.apply(null, {length: count}).map((p, index) => (
            <View key={++index}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input key={"name" + index}
                               placeholder="Jméno účastníka"
                               leftIcon={{type: 'material', name: 'tag'}}
                               onBlur={onBlur}
                               value={value}
                               onChangeText={onChange}
                               label={'Účastník #' + index}
                        />
                    )}
                    name={'name' + index}
                />
            </View>
        ))
    }

    return (
        <View style={styles.container}>

            <Input
                placeholder='Počet účastníků'
                leftIcon={{type: 'material', name: 'tag'}}
                containerStyle={styles.input}
                onChangeText={(text) => setCount(text)}
                keyboardType={'numeric'}
                isFocused={true}
                label="Počet účastníků"
            />
            {renderAttendees()}
            <TouchableOpacity>
                <Button
                    title="Pokračovat"
                    onPress={handleSubmit(onSubmit)}
                />
            </TouchableOpacity>
        </View>
    );
};

export default AttendeesSettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
    },
});
