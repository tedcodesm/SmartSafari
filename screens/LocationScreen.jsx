import React, { useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/ip";

const BusLocationUpdaterScreen = ({ route }) => {
  const { plateNumber } = route?.params || {}; 

  useEffect(() => {
    if (!plateNumber) return; 

    let intervalId;

    const startUpdating = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      intervalId = setInterval(async () => {
        try {
          let loc = await Location.getCurrentPositionAsync({});
          const token = await AsyncStorage.getItem("token");

          await axios.put(
            `${BASE_URL}/buses/${plateNumber}/location`,
            {
              lat: loc.coords.latitude,
              lng: loc.coords.longitude,
              speed: loc.coords.speed,
              heading: loc.coords.heading,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log("Location updated:", loc.coords);
        } catch (err) {
          console.error("Location update failed", err.message);
        }
      }, 5000); // update every 5 seconds
    };

    startUpdating();

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [plateNumber]);

  if (!plateNumber) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">No bus selected.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg">🚍 Tracking bus {plateNumber}...</Text>
    </View>
  );
};

export default BusLocationUpdaterScreen;
