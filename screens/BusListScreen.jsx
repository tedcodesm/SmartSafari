// BusListScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../config/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BusListScreen({ navigation }) {
  const [buses, setBuses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/buses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBuses(res.data);

        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData)); // stored as JSON.stringify(user)
        }
        console.log("User loaded:", userData);
      } catch (err) {
        console.error(
          "Error fetching buses:",
          err.response?.data || err.message
        );
      }
    };

    fetchBuses();
  }, []);

  const handleSetDestination = (bus) => {
    if (!user) {
      Alert.alert("Unauthorized", "Please log in first");
      return;
    }

    if (user.role === "driver" && bus.driver?._id !== user._id) {
      Alert.alert("Access Denied", "You are not assigned to this bus");
      return;
    }

    navigation.navigate("set", { plateNumber: bus.plateNumber });
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4 font-serif">All Buses</Text>
      <ScrollView>
        <FlatList
          data={buses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="p-4 border-b border-gray-300">
              <Text className="text-lg font-semibold">{item.plateNumber}</Text>
              <Text className="text-gray-500">
                Driver: {item.driver?.username || "Unassigned"}
              </Text>

              {user?.role === "driver" || user?._id === item.driver?._id ? (
                <TouchableOpacity
                  onPress={() => handleSetDestination(item)}
                  className="mt-2 bg-green-500 p-2 rounded"
                >
                  <Text className="text-white text-center">
                    Set location
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate({
                      name: "map",
                      params: { driverId: item.driver?._id },
                      merge: true,
                    })
                  }
                  className="mt-2 bg-green-500 p-2 rounded"
                >
                  <Text className="text-white text-center">Track Bus</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </ScrollView>

      {user && user.role === "admin" && (
        <TouchableOpacity
          onPress={() => navigation.navigate("add")}
          className="mt-4 bg-blue-500 p-4 rounded"
        >
          <Text className="text-white text-center">Add New Bus</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
