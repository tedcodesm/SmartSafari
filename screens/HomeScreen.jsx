import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotification } from "../context/NotificationContext";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const sampleDays = [
  {
    day: "1",
    morningArrival: "07:30",
    morningDeparture: "08:00",
    eveningArrival: "16:00",
    eveningDeparture: "16:30",
  },
  {
    day: "2",
    morningArrival: "07:28",
    morningDeparture: "08:01",
    eveningArrival: "16:05",
    eveningDeparture: "16:35",
  },
];

const HomeScreen = ({ navigation }) => {
  const [showMonths, setShowMonths] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [user, setUser] = useState(null);

  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const loadUser = async () => {
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

    loadUser();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#037ff3" />

      {/* Header */}
      <View className="h-24 rounded-b-3xl flex-row items-center justify-between px-6 bg-[#037ff3]">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-semibold text-md tracking-wider font-serif">
          {getGreeting()} {user?.username || ""}
        </Text>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center px-6 py-3">
        <View className="relative w-full">
          <TextInput
            placeholder="Search..."
            className="w-full border border-gray-300 bg-white py-2 ps-4 pr-12 rounded-full shadow-sm"
          />
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="#037ff3"
            className="absolute right-4 top-2.5"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
        <View className="flex-1 items-center bg-[#f0f8ff] w-full pt-4 pb-10">
          {/* Month Selector */}
          <TouchableOpacity
            className="bg-[#037ff3] w-[90%] flex-row h-12 rounded-full items-center justify-between px-6 shadow-md"
            onPress={() => setShowMonths(!showMonths)}
          >
            <Text className="text-white font-bold text-lg">
              {selectedMonth || "Select Month"}
            </Text>
            <MaterialCommunityIcons
              name={showMonths ? "chevron-up" : "chevron-down"}
              size={28}
              color="white"
            />
          </TouchableOpacity>

          {/* Month List */}
          {showMonths && (
            <View className="bg-white w-[90%] rounded-xl mt-4 p-4 shadow">
              {months.map((month) => (
                <TouchableOpacity
                  key={month}
                  className="py-2 border-b border-gray-100"
                  onPress={() => {
                    setSelectedMonth(month);
                    setShowMonths(false);
                  }}
                >
                  <Text className="text-lg text-gray-700">{month}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Daily Logs */}
          {selectedMonth && (
            <FlatList
              data={sampleDays}
              keyExtractor={(item) => item.day}
              className="w-[90%] mt-4"
              renderItem={({ item }) => (
                <View className="bg-white rounded-2xl mb-4 p-4 shadow-md">
                  <Text className="font-bold text-lg text-[#037ff3] mb-2">
                    Day {item.day}
                  </Text>
                  <View className="flex-row justify-between">
                    <View>
                      <Text className="text-gray-700">
                        Morning Arrival: {item.morningArrival}
                      </Text>
                      <Text className="text-gray-700">
                        Morning Departure: {item.morningDeparture}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-700">
                        Evening Arrival: {item.eveningArrival}
                      </Text>
                      <Text className="text-gray-700">
                        Evening Departure: {item.eveningDeparture}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
          
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
