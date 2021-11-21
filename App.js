import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {

    const [items, setItems] = React.useState("text");

    return (
        <NavigationContainer items="items" onSetData={(newItems) => setItems(newItems)}>
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
