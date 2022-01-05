import React from "react";
import {Modal, Button, Alert} from "react-native";
import {Text, View, StyleSheet} from "react-native";
import transactionRevert from "../functions/transactionRevert";
import {useNavigation} from '@react-navigation/native';
import {deleteAllData} from "../functions/storage";

const resetAppModal = props => {
    const navigation = useNavigation();
    return (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <View style={style.styles_container}>
                <View style={style.styles_body}>
                    <Text>Chcete vymazat všechny data?</Text>
                    <View style={style.styles_footer}>
                        <View style={style.styles_buttons}>
                            <Button
                                title="Zavřít"
                                onPress={() => {
                                    props.setModalVisible(false);
                                }}
                            />
                        </View>
                        <View style={style.styles_buttons}>
                            <Button
                                title="Smazat data"
                                onPress={() => {
                                    deleteAllData().then(() => {
                                        props.setModalVisible(false);
                                        navigation.navigate("ItemSettings");
                                    });
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

export default resetAppModal;

const style = StyleSheet.create({
        styles_container: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 200,
        },
        styles_body: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: 10,
            borderColor: 'blue',
            borderWidth: 3,
        },
        styles_bodyText: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        styles_footer: {
            backgroundColor: '#fff',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        styles_buttons: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 10,
        },
    }
);

