import React, {useEffect, useState} from "react";
import {StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";
import {useTheme} from "@react-navigation/native";
import ResetAppModal from "../modal/resetAppModal";


const SettingsScreen = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const list = [
        {
            title: 'Nastavení sudů',
            function: () => navigation.navigate('ItemSettings')
        },
        {
            title: 'Nastavení účastníků',
            function: () => navigation.navigate('AttendeesSettings')
        },
    ]
    const theme = useTheme()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nastavení'
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            {modalVisible ?
                <ResetAppModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                /> : null}
            <View>
                <View style={styles.list}>
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
                <View style={styles.button}>
                    <Button title="Vymazat data"
                            onPress={() => {
                                setModalVisible(true);
                            }}/>
                </View>
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    list: {
        backgroundColor: "#fff",
        alignItems: "center",
    },
    button: {
        position: "fixed",
        bottom: 50,
        width: "100%",

    },

});
