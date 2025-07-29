import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileScreen from '../screens/ProfileScreen'
import MapScreen from '../screens/MapScreen'

const Tab = createBottomTabNavigator()
const BottomNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: "orange",
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
            <Icon name="home" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />
        <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon name="account" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />
        <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <Icon name="map" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomNavigator