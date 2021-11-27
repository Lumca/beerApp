import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import DashboardScreen from './screens/DashboardScreen';
import ItemSettingsScreen from './screens/ItemSettingsScreen';
import AttendeesSettingsScreen from './screens/AttendeesSettingsScreen';
import SettingsScreen from './screens/SettingsScreen';
import LeaderboardScreen from "./screens/LeaderboardScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackScreens() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsMenu" component={SettingsScreen}/>
            <Stack.Screen name="ItemSettings" component={ItemSettingsScreen}/>
            <Stack.Screen name="AttendeesSettings" component={AttendeesSettingsScreen}/>
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Settings"
                    component={StackScreens}
                    options={{ headerShown: false }}
                />
                <Tab.Screen name="Dashboard" component={DashboardScreen}/>
                <Tab.Screen name='History' component={HistoryScreen}/>
                <Tab.Screen name='Leaderboard' component={LeaderboardScreen}/>
            </Tab.Navigator>
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
