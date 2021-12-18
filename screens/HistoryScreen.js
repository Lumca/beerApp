import React, {useEffect, useState} from "react";
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getTransactions} from "../functions/storage";
import HistoryModal from "../modal/historyModal";

const HistoryScreen = ({navigation}) => {

    const [transactions, setTransactions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTransactionKey, setSelectedTransactionKey] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'History',
        });

        const unsubscribe = navigation.addListener('focus', () => {
            getTransactions().then(transactions => {
                if (transactions) {
                    setTransactions(transactions);
                }
            });
        });
        return unsubscribe;
    }, [navigation, !modalVisible]);

    return (
        <ScrollView style={styles.container}>
            {modalVisible ?
                <HistoryModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    transactions={transactions}
                    selectedTransactionKey={selectedTransactionKey}
                /> : null}
            <View style={styles.container_text}>
                <Text style={{fontSize: 20, flex: 1}}>Pivo</Text>
                <Text style={{fontSize: 20, flex: 1}}>Jméno</Text>
                <Text style={{fontSize: 20, flex: 1}}>Množství</Text>
                <Text style={{fontSize: 20, flex: 1}}>Čas</Text>
            </View>
            {transactions.map((transaction, i) => (
                <TouchableOpacity key={i} onPress={() => {
                    setSelectedTransactionKey(i);
                    setModalVisible(true)
                }}>
                    <View key={i} style={styles.container_text}>
                        <Text style={{fontSize: 20, flex: 1}}>{transaction.itemInfo.name}</Text>
                        <Text style={{fontSize: 20, flex: 1}}>{transaction.attendeeInfo.name}</Text>
                        <Text style={{fontSize: 20, flex: 1}}>{transaction.glassInfo} ml</Text>
                        <Text style={{fontSize: 20, flex: 1}}>{transaction.time}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3e3939',
    },
    container_text: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        height: 70
    },
});
