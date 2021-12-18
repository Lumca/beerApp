import React from "react";
import {Modal, Button, Alert} from "react-native";
import {Text, View, StyleSheet} from "react-native";
import transactionRevert from "../functions/transactionRevert";
import {useNavigation} from '@react-navigation/native';

const HistoryModal = props => {
    const navigation = useNavigation();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <View style={style.styles_container}>
                <View style={style.styles_body}>
                    <View>
                        <Text style={style.styles_bodyText}>Chceš smazat transakci:</Text>
                        <Text
                            style={style.styles_bodyText}>Vytvořena: {props.transactions[props.selectedTransactionKey].attendeeInfo.name}</Text>
                        <Text
                            style={style.styles_bodyText}>Pivo: {props.transactions[props.selectedTransactionKey].itemInfo.name}</Text>
                        <Text
                            style={style.styles_bodyText}>Ml: {props.transactions[props.selectedTransactionKey].glassInfo}</Text>
                        <Text
                            style={style.styles_bodyText}>Čas: {props.transactions[props.selectedTransactionKey].time}</Text>
                    </View>
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
                                title="Smazat"
                                onPress={() => {
                                    transactionRevert(props.selectedTransactionKey).then(() => {
                                        props.setModalVisible(false);
                                        navigation.navigate('Dashboard');
                                        navigation.navigate('History');
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

export default HistoryModal;

const style = StyleSheet.create({
        styles_container: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: "15vh"
        },
        styles_body: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: 10,
            border: "1px solid blue",
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

