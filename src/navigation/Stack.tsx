import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Tab from './Tab';
import WritePost from '../pages/map/WritePost';

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
          name="WritePost"
          component={WritePost}
          options={{ animation: 'slide_from_bottom' }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
