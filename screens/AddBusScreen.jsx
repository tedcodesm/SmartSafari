import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BASE_URL } from "../config/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker"; // dropdown picker

export default function AddBusScreen({ navigation }) {
  const [plateNumber, setPlateNumber] = useState("");
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [radius, setRadius] = useState("80");

  // fetch drivers from backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/buses/users/drivers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrivers(res.data); // expected [{_id, name}, ...]
      } catch (err) {
        Alert.alert("Error", err.response?.data?.message || err.message);
      }
    };
    fetchDrivers();
  }, []);

  const addBus = async () => {
    const token = await AsyncStorage.getItem("token");

    axios
      .post(
        `${BASE_URL}/buses`,
        {
          plateNumber,
          driver, // driver name instead of ID
          arrivalRadius: Number(radius),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        Alert.alert("✅ Success", "Bus created!");
      })
      .catch((err) =>
        Alert.alert("❌ Error", err.response?.data?.message || err.message)
      );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Top bar */}
      <View className="absolute z-auto top-0 left-0 right-0 h-56">
        <Image
          className="w-full h-full"
          resizeMode="cover"
          source={require("../assets/bluebus.jpg")}
        />
        <View className="absolute top-10 left-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color="blue"
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 4,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Section */}
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 240 }}
        className="flex-1"
      >
        <Text className="text-2xl font-bold mb-6 text-center text-gray-700">
          🚌 Add New Bus
        </Text>

        <View className="flex-row items-center border rounded-full px-3 py-2 mb-4 shadow-sm">
          <MaterialCommunityIcons name="bus" size={20} color="#037ff3" />
          <TextInput
            placeholder="Plate Number"
            value={plateNumber}
            onChangeText={setPlateNumber}
            className="flex-1 ps-2 "
            autoCapitalize="characters"
          />
        </View>

        {/* Dropdown for Driver */}
        <View className="border rounded-full mb-4 bg-gray-100 flex-row items-center px-3">
          {/* Account Icon */}
          <MaterialCommunityIcons name="account" size={22} color="#037ff3" />

          {/* Picker */}
          <Picker
            selectedValue={driver}
            onValueChange={(val) => setDriver(val)}
            style={{ flex: 1 }} // makes picker take remaining space
          >
            <Picker.Item label="Select Driver" value="" />
            {drivers.map((d) => (
              <Picker.Item key={d._id} label={d.username} value={d._id} />
            ))}
          </Picker>
        </View>

        <View className="flex-row items-center border rounded-full px-3 py-2 mb-6 shadow-sm">
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={20}
            color="#037ff3"
          />
          <TextInput
            placeholder="Arrival Radius (meters)"
            keyboardType="numeric"
            value={radius}
            onChangeText={setRadius}
            className="flex-1 ps-2"
          />
        </View>

        <TouchableOpacity
          onPress={addBus}
          className="bg-[#037fff] p-4 w-full rounded-2xl shadow-md"
        >
          <Text className="text-white text-center font-bold text-lg">
            Add Bus
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
