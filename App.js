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
import ReportScreen from "./screens/ReportScreen";
import { MaterialIcons } from '@expo/vector-icons';

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
                    options={{
                        headerShown: false,
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="settings" color={color} size={size}/>
                        )
                    }}
                />
                <Tab.Screen name='Leaderboard'
                            component={LeaderboardScreen}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialIcons name="leaderboard" color={color} size={size}/>
                                )
                            }}
                />
                <Tab.Screen name="Dashboard"
                            component={DashboardScreen}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialIcons name="local-drink" color={color} size={size}/>
                                )
                            }}
                />
                <Tab.Screen name='History'
                            component={HistoryScreen}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialIcons name="history" color={color} size={size}/>
                                )
                            }}
                />
                <Tab.Screen name='Report'
                            component={ReportScreen}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialIcons name="attach-money" color={color} size={size}/>
                                )
                            }}
                />
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
