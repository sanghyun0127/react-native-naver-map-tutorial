import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Tab from './Tab';
import ShareMyView from '../pages/map/ShareMyView';
import RequestView from '../pages/map/RequestView';

const globalScreenOptions = {
  headerStyle: { backgroundColor: 'white' },
  headerTitleStyle: { color: 'black' },
  headerTintColor: 'black',
  headerShown: false,
};

const MainStack = createNativeStackNavigator();

export const MainStackScreens = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={globalScreenOptions}>
        <MainStack.Screen name="Tab" component={Tab} />
        <MainStack.Screen
          name="ShareMyView"
          component={ShareMyView}
          options={{ animation: 'slide_from_bottom' }}
        />
        <MainStack.Screen
          name="RequestView"
          component={RequestView}
          options={{ animation: 'slide_from_bottom' }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
