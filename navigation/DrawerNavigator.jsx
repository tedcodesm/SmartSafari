import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavigator from "./BottomNavigator";
import MapScreen from "../screens/MapScreen";
import InteligentScreen from "../screens/AgentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";
import AddBusScreen from "../screens/AddBusScreen";
import SetDestinationScreen from "../screens/SetDestinationScreen";
import BusListScreen from "../screens/BusListScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useBusLocationUpdater from "../screens/LocationScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const GetUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData)); // stored as JSON.stringify(user)
        }
        console.log("User loaded:", userData);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    GetUser();
  }, []);

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
            <MaterialCommunityIcons name="home" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="map"
        component={MapScreen}
        options={{
          drawerLabel: "Live Bus Map",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="int"
        component={InteligentScreen}
        options={{
          drawerLabel: "Answer FAQs",
          drawerIcon: ({ color }) => (
            <Icon name="robot" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      /> */}
 
     {
      user && user.role === 'admin' && (
         <Drawer.Screen
        name="add"
        component={AddBusScreen}
        options={{
          drawerLabel: "AddBus",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      )
     }
      
      <Drawer.Screen
        name="list"
        component={BusListScreen}
        options={{
          drawerLabel: "Available Buses",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="bus" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          drawerLabel: "Answer FAQs",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="fingerprint" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="loc"
        component={useBusLocationUpdater}
        options={{
          drawerLabel: "Location update",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="road" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />

           <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={25} color="#004F98" style={{ marginRight: 16 }} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
