import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Tab from './Tab'

const globalScreenOptions = {
    headerStyle: { backgroundColor: 'white' },
    headerTitleStyle: { color: 'black' },
    headerTintColor: 'black',
    headerShown: false,
  };

const MainStack = createNativeStackNavigator();

export const MainStackScreens = () => {
    return(
        <NavigationContainer>
            <MainStack.Navigator screenOptions={globalScreenOptions}>
                <MainStack.Screen name="Tab" component={Tab} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}