import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/ip";
import { useNavigation } from "@react-navigation/native";

const SetDestinationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { plateNumber } = route.params; // ✅ Get plate number from navigation params
  const [loading, setLoading] = useState(false);

  const setDestination = async (radius = 80) => {
    try {
      setLoading(true);

      // Ask for location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "We need location to set destination."
        );
        setLoading(false);
        return;
      }

      // Get current device location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get token
      const token = await AsyncStorage.getItem("token");

      // Send to backend
      const res = await axios.put(
        `${BASE_URL}/buses/${plateNumber}/destination`,
        {
          lat: latitude,
          lng: longitude,
          radius,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Destination set:", res.data);
      navigation.navigate("drawer");

      Alert.alert("Success", "Current location set successfully!");
    } catch (error) {
      console.error(
        "Error setting destination:",
        error.response?.data || error
      );
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to set destination"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold mb-4">
        Set current location for {plateNumber}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Set location" onPress={() => setDestination()} />
      )}
    </View>
  );
};

export default SetDestinationScreen;
