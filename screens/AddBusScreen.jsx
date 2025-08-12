// AddBusScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/ip';

export default function AddBusScreen({ navigation }) {
  const [plateNumber, setPlateNumber] = useState("");
  const [driverId, setDriverId] = useState("");
  const [radius, setRadius] = useState("");

  const addBus = () => {
    axios.post(`${BASE_URL}/buses`, {
      plateNumber,
      driverId,
      arrivalRadius: Number(radius)
    })
      .then(() => {
        Alert.alert("Success", "Bus created!");
        navigation.goBack();
      })
      .catch(err => Alert.alert("Error", err.response?.data?.message || err.message));
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        placeholder="Plate Number"
        value={plateNumber}
        onChangeText={setPlateNumber}
        className="border p-3 mb-3"
      />
      <TextInput
        placeholder="Driver ID"
        value={driverId}
        onChangeText={setDriverId}
        className="border p-3 mb-3"
      />
      <TextInput
        placeholder="Arrival Radius (meters)"
        keyboardType="numeric"
        value={radius}
        onChangeText={setRadius}
        className="border p-3 mb-3"
      />
      <TouchableOpacity onPress={addBus} className="bg-green-500 p-4 rounded">
        <Text className="text-white text-center">Add Bus</Text>
      </TouchableOpacity>
    </View>
  );
}
