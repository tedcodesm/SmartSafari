import * as Location from "expo-location";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/ip";

const UseBusLocationUpdater = () => {
      const { plateNumber } = route.params; // comes from navigation
  UseBusLocationUpdater(plateNumber);   // ✅ pass it into hook

  useEffect(() => {
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
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg">Tracking bus {plateNumber}...</Text>
    </View>
  );
};

export default UseBusLocationUpdater;
