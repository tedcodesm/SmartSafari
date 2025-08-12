// SetDestinationScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/ip';

export default function SetDestinationScreen({ route, navigation }) {
  const { plateNumber } = route.params;
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [radius, setRadius] = useState("");

  const setDestination = () => {
    axios.patch(`${BASE_URL}/buses/${plateNumber}/destination`, {
      lat: Number(lat),
      lng: Number(lng),
      radius: Number(radius)
    })
      .then(() => {
        Alert.alert("Success", "Destination set!");
        navigation.goBack();
      })
      .catch(err => Alert.alert("Error", err.response?.data?.message || err.message));
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Set Destination for {plateNumber}</Text>
      <TextInput placeholder="Latitude" value={lat} onChangeText={setLat} className="border p-3 mb-3" />
      <TextInput placeholder="Longitude" value={lng} onChangeText={setLng} className="border p-3 mb-3" />
      <TextInput placeholder="Radius (m)" value={radius} onChangeText={setRadius} className="border p-3 mb-3" />
      <TouchableOpacity onPress={setDestination} className="bg-orange-500 p-4 rounded">
        <Text className="text-white text-center">Save Destination</Text>
      </TouchableOpacity>
    </View>
  );
}
