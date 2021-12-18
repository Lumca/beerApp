import React, {useEffect, useState} from "react";
import {StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import {useTheme} from "@react-navigation/native";


const SettingsScreen = ({navigation}) => {

    const list = [
        {
            title: 'Nastavení sudů',
            function:() => navigation.navigate('ItemSettings')
        },
        {
            title: 'Nastavení účastníků',
            function:() => navigation.navigate('AttendeesSettings')
        },
    ]
    const theme = useTheme()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nastavení',
            headerRight: () => (
                <View>
                    <Switch
                        title="Uložit"
                        //value={theme.mode === 'dark'}
                        //onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
                    />
                    <TouchableOpacity onPress={() => console.log(theme)}>
                        <Text>Uložit</Text>
                    </TouchableOpacity>
                </View>

            )
        });

    }, [navigation]);

    return (
        <View style={styles.container}>
            {
                list.map((item, i) => (
                    <ListItem key={i} bottomDivider>
                        <TouchableOpacity>
                            <ListItem.Content>
                                <ListItem.Title onPress={item.function}>{item.title}</ListItem.Title>
                            </ListItem.Content>
                        </TouchableOpacity>
                        <ListItem.Chevron/>
                    </ListItem>
                ))
            }
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
