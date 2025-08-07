import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomNavigator from "./BottomNavigator";
import MapScreen from "../screens/MapScreen";
import InteligentScreen from "../screens/AgentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SafeAreaView>
          <View className="w-full justify-center rounded-br-3xl bg-[#004F98] items-center space-y-3 h-44 mb-5">
            <Image
              className="w-full h-24 object-cover rounded-full"
              resizeMode="contain"
              source={require("../assets/logo (2).png")}
            />
          </View>
          <DrawerItemList {...props} />
        </SafeAreaView>
      )}
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
            <Icon name="home" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="map"
        component={MapScreen}
        options={{
          drawerLabel: "Map",
          drawerIcon: ({ color }) => (
            <Icon name="map" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="int"
        component={InteligentScreen}
        options={{
          drawerLabel: "AI Chat",
          drawerIcon: ({ color }) => (
            <Icon name="robot" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color }) => (
            <Icon name="account" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          drawerLabel: "Auth",
          drawerIcon: ({ color }) => (
            <Icon name="fingerprint" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
