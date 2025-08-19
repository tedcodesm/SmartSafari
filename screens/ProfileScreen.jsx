import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config/ip";

const ProfileScreen = ({navigation}) => {
const logout = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${BASE_URL}/auth/logout`,
      {}, // empty body
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Clear stored data
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    navigation.navigate("login");
    return true;
  } catch (error) {
    console.error("Logout error", error.response?.data || error.message);
    return false;
  }
};

  return (
    <View>
      <View className=" items-center justify-between px-6 py-3 h-20 bg-[#037ff3]  flex-row">
        <TouchableOpacity>
          <Icon name="chevron-left" size={28} color="blue" className="bg-white p- rounded-full"/>
        </TouchableOpacity>
        <TouchableOpacity
        
          onPress={() => navigation.navigate("notification")}>
          <Icon name="bell" size={28} color="white"  />
        </TouchableOpacity>
      </View>
      <View className=" flex w-full h-32   rounded-b-lg">
        <Image
          className="w-full h-32 rounded-b-lg object-fit"
          source={require("../assets/mappin.jpeg")}
        />{" "}
      </View>
      <View className="flex items-center flex-row justify-between px-6 py-3">
        <TouchableOpacity className="flex-row items-center">
          <Icon name="map-marker" size={20} color="grey" />
          <Text className="text-gray-700 ps-2">View in Map</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <Icon name="circle" size={12} color="green" />
          <Text className="text-gray-700 ps-2">In Bus</Text>
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-center gap- px-6 py-">
        <TouchableOpacity
          className="relative w-32 h-32 rounded-full bg-gray-200 items-center justify-center"
          activeOpacity={0.8}
        >
          <Icon name="account" size={80} color="#bbb" />

          {/* Camera icon overlay */}
          <View className="absolute bottom-1 right-1 bg-white p-1 rounded-full">
            <Icon name="camera" size={20} color="#037ff3" />
          </View>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-center mt-4">Name</Text>
        <Text className="text-md font-semibold text-center">Grade 4</Text>
      </View>
      <View className="flex-row items-center justify-center gap-28 px-6 py-4">
        <TouchableOpacity className="flex-row items-center">
          <Icon name="phone" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <Icon name="calendar" size={20} color="grey" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={logout}
      className="bg-[#037ff3] p-4 rounded-lg mb-4">
        <Text className="text-white text-center">Logout</Text>
      </TouchableOpacity>
      <View className=" bg-[#037ff3] w-full flex">
        <View className="flex-row items-center justify-between px-6 py-3">
          <TouchableOpacity className="flex items-center">
            <Icon name="chevron-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">December, 2016</Text>
          <TouchableOpacity className="flex items-center">
            <Icon name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className=" bg-[#037ff3] w-full flex">
        <View className="flex-row items-center justify-between px-6 py-3">
          <TouchableOpacity className="flex items-center">
            <Icon name="chevron-left" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-white font-bold text-sm">MON</Text>
            <Text className="text-white font-bold text-lg">23</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-white font-bold text-sm">TUE</Text>
            <Text className="text-white font-bold text-lg">24</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-white font-bold text-sm">WED</Text>
            <Text className="text-white font-bold text-lg">25</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-white font-bold text-sm">THU</Text>
            <Text className="text-white font-bold text-lg">26</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-white font-bold text-sm">FRI</Text>
            <Text className="text-white font-bold text-lg">27</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-white font-bold text-sm">SAT</Text>
            <Text className="text-white font-bold text-lg">28</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-white font-bold text-sm">SUN</Text>
            <Text className="text-white font-bold text-lg">29</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex items-center">
            <Icon name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row bg-[#0560b6] px-4 py-6 w-full">
          <View className="flex-1 gap-6">
            <Text className="text-white font-bold text-lg">Picked</Text>
            <Text className="text-white font-bold text-lg">Reached</Text>
            <Text className="text-white font-bold text-lg">Left</Text>
            <Text className="text-white font-bold text-lg">Dropped</Text>
          </View>

          <View className="flex-1 gap-6 items-center">
            <Icon name="map-marker-down" size={20} color="white" />
            <Icon name="city-variant-outline" size={20} color="white" />
            <Icon name="city-variant-outline" size={20} color="white" />
            <Icon name="map-marker-down" size={20} color="white" />
          </View>

          <View className="flex-1 gap-6">
            <Text className="text-white font-bold text-lg">8:00 AM</Text>
            <Text className="text-white font-bold text-lg">9:00 AM</Text>
            <Text className="text-white font-bold text-lg">10:00 PM</Text>
            <Text className="text-white font-bold text-lg">11:00 PM</Text>
          </View>

          <View className="flex-1 gap-6">
            <Text className="text-white font-bold text-lg">Kanunga</Text>
            <Text className="text-white font-bold text-lg">At School</Text>
            <Text className="text-white font-bold text-lg">From School</Text>
            <Text className="text-white font-bold text-lg">Thome</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
