// BusListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/ip';

export default function BusListScreen({ navigation }) {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/buses`)
      .then(res => setBuses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">All Buses</Text>
      <FlatList
        data={buses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("SetDestination", { plateNumber: item.plateNumber })}
            className="p-4 border-b border-gray-300"
          >
            <Text className="text-lg font-semibold">{item.plateNumber}</Text>
            <Text className="text-gray-500">Driver: {item.driver?.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("add")}
        className="mt-4 bg-blue-500 p-4 rounded"
      >
        <Text className="text-white text-center">Add New Bus</Text>
      </TouchableOpacity>
    </View>
  );
}
