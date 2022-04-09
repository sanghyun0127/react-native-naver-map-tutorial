import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShowMap from '../pages/map/ShowMap';
const TabStack = createBottomTabNavigator();

const Tab = () => {
  return (
    <TabStack.Navigator screenOptions={{headerShown:false}} initialRouteName={'ShowMap'}>
        <TabStack.Screen name="ShowMap" component={ShowMap} />
    </TabStack.Navigator>
  )
}

export default Tab