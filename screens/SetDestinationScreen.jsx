import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/ip";
import { useNavigation } from "@react-navigation/native";

const SetDestinationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { plateNumber } = route.params;
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const setCurrentLocation = async (radius = 80) => {
    try {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        mayShowUserSettingsDialog: true,
      });
      const { latitude, longitude } = location.coords;

      const token = await AsyncStorage.getItem("token");

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

      setModalVisible(true);
    } catch (error) {
      console.error(
        "Error setting destination:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold mb-4">
        Set current location for {plateNumber}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Set location" onPress={() => setCurrentLocation()} />
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl w-80 shadow-lg items-center">
            <Text className="text-xl font-bold text-green-600 mb-2">
              Success
            </Text>
            <Text className="text-gray-700 text-center mb-4">
              Current location has been set successfully for bus {plateNumber}.
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("drawer");
              }}
              className="bg-green-500 px-6 py-2 rounded-xl"
            >
              <Text className="text-white text-lg">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SetDestinationScreen;
