import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShowMap from '../pages/map/ShowMap';
import CommunityHome from '../pages/community/CommunityHome';
import Profile from '../pages/profile/Profile';
const TabStack = createBottomTabNavigator();

const Tab = () => {
  return (
    <TabStack.Navigator screenOptions={{headerShown:false}} initialRouteName={'ShowMap'}>
        <TabStack.Screen name="ShowMap" component={ShowMap} />
        <TabStack.Screen name="CommunityHome" component={CommunityHome} />
        <TabStack.Screen name="Profile" component={Profile} />
    </TabStack.Navigator>
  )
}

export default Tab