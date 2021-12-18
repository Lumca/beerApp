import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";
import ItemPickerComponent from "../components/ItemPickerComponent";

const DashboardScreen = ({navigation}) => {

    useEffect(() => {
        AsyncStorage.getItem('@itemSetting').then(itemSetting => {
            if (!itemSetting) {
                navigation.navigate('ItemSettings');
            }
        });
        AsyncStorage.getItem('@attendeesSetting').then(attendeesSetting => {
            if (!attendeesSetting) {
                navigation.navigate('AttendeesSettings');
            }
        });
    }, []);


    return (
        <View style={styles.container}>
            <ScrollView>
                <ItemPickerComponent/>
            </ScrollView>
        </View>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3e3939",
    },
});
