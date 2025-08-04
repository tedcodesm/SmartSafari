import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DrawerNavigator from './DrawerNavigator';
import BottomNavigator from './BottomNavigator';
import MapScreen from '../screens/MapScreen';
import InteligentScreen from '../screens/AgentScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}} />
    <Stack.Screen name="drawer" component={DrawerNavigator} options={{headerShown:false}} />
    <Stack.Screen name="bottom" component={BottomNavigator} options={{headerShown:false}} />
    <Stack.Screen name="int" component={InteligentScreen} options={{headerShown:false}} />
    <Stack.Screen name="profile" component={ProfileScreen} options={{headerShown:false}} />
    <Stack.Screen name="map" component={MapScreen} options={{headerShown:false}} />
    <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
    <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
    <Stack.Screen name="notification" component={NotificationScreen} options={{headerShown:false}} />
         
    </Stack.Navigator>

  </NavigationContainer>
  )
}

export default StackNavigator