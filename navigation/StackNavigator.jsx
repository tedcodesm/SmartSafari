import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'

const stack = createBottomTabNavigator()
const StackNavigator = () => {
  return (
   <NavigationContainer>
    <stack.Navigator>
        <stack.Screen name="home" component={HomeScreen} />
    </stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNavigator