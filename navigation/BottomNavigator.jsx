import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileScreen from '../screens/ProfileScreen'
import MapScreen from '../screens/MapScreen'
import InteligentScreen from '../screens/AgentScreen'
import NotificationScreen from '../screens/NotificationScreen'

const Tab = createBottomTabNavigator()
const BottomNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#e5e7eb" },
        headerShown: false,
      }}
    >
        <Tab.Screen
        name="bottom"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home" size={25} color={focused ? "blue" : "black"} />
          ),
        }}
      />
       
       
        <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="map" size={25} color={focused ? "blue" : "black"} />
          ),
        }}
      />
       <Tab.Screen
        name="notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="bell" size={25} color={focused ? "blue" : "black"} />
          ),
        }}
      />
       <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" size={25} color={focused ? "blue" : "black"} />
          ),
        }}
      />     

    </Tab.Navigator>
  )
}

export default BottomNavigator
