import { View, Text, SafeAreaView, Image } from "react-native";
import React from 'react'
import { createDrawerNavigator, DrawerItemList  } from '@react-navigation/drawer'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomNavigator from "./BottomNavigator";
import MapScreen from "../screens/MapScreen";


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
 <Drawer.Navigator
  drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View className="w-full justify-center rounded-br-3xl bg-orange-400 items-center space-y-3 h-40 mb-5">
                <Image
                className="w-40 h-80 object-cover"
                resizeMode="contain"
                source={require("../assets/otp.png")}
              />
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
       screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#f0f0f0",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#888",
        drawerLabelStyle: { marginLeft: -20, fontSize: 16 },
      }}
 >
        <Drawer.Screen
        name="bottom"
        component={BottomNavigator}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="home" size={25} color="orange" />
          ),
        }}
      />
        <Drawer.Screen
        name="map"
        component={MapScreen}
        options={{
          drawerLabel: "Map",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="map" size={25} color="orange" />
          ),
        }}
      />

 </Drawer.Navigator>
  )
}

export default DrawerNavigator