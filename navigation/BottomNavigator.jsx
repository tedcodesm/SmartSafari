import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons'

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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomNavigator