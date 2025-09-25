import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../config/ip";

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);

  // 🟢 Fetch profile
  const fetchProfile = async () => {
    try {
      const userdata = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      const parsedUser = JSON.parse(userdata);
      if (!parsedUser?._id) return;

      const res = await axios.get(`${BASE_URL}/profile/${parsedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.error(
        "Error fetching profile:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🟢 Pick image & upload
  const handlePickImage = async () => {
    // Ask for permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need camera roll permissions to upload your photo."
      );
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const base64Image = `data:image/jpeg;base64,${asset.base64}`;

    try {
      setUploading(true);
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/profile/upload`,
        { profilephoto: base64Image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.profile);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  // 🟢 Logout
  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      navigation.navigate("login");
    } catch (error) {
      console.error("Logout error", error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#037ff3" />
      </View>
    );
  }

  return (
    <View>
      {/* Header */}
      <View className="items-center justify-between px-6 py-3 h-20 bg-[#037ff3] flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color="blue"
            className="bg-white rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center rounded-full px-4 py-1 bg-blue-950"
          onPress={logout}
        >
          <MaterialCommunityIcons name="logout" size={20} color="white" />
          <Text className="text-white ps-2">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View className="flex items-center bg-gray-300 rounded-b-3xl justify-center px-6 py-6">
        <TouchableOpacity
          onPress={handlePickImage}
          className="relative w-32 h-32 rounded-full bg-gray-200 items-center justify-center"
          activeOpacity={0.8}
        >
          {profile?.profilephoto ? (
            <Image
              source={{ uri: profile.profilephoto }}
              className="w-32 h-32 rounded-full"
            />
          ) : (
            <MaterialCommunityIcons name="account" size={80} color="#bbb" />
          )}

          {/* Camera overlay */}
          <View className="absolute bottom-1 right-1 bg-white p-1 rounded-full">
            {uploading ? (
              <ActivityIndicator size="small" color="#037ff3" />
            ) : (
              <MaterialCommunityIcons name="camera" size={20} color="#037ff3" />
            )}
          </View>
        </TouchableOpacity>

        <Text className="text-2xl font-bold font-serif text-center mt-4">
          Profile photo
        </Text>
      </View>
      <View className="p-6 space-y-6 w-full gap-5 pt-12">
        <View className="flex-col items-center space-y-">
          <Text className="text-xl font-semibold pb-2">Full Name:</Text>
          <Text className="text-gray-600 text-xl">{profile?.user.username || "Unknown"}</Text>
          <Text className="text-gray-600 border-b-2  border-gray-300 w-[80%]"></Text>

        </View>
        <View className="flex-col items-center space-y-3">
          <Text className="text-xl font-semibold pb-2">Email:</Text>
          <Text className="text-gray-600 text-xl">{profile?.user.email || "Unknown"}</Text>
          <Text className="text-gray-600 border-b-2  border-gray-300 w-[80%]"></Text>

        </View>
        <View className="flex-col items-center space-y-3">
          <Text className="text-xl font-semibold pb-2">Phone:</Text>
          <Text className="text-gray-600 text-xl">{profile?.user.phone || "Unknown"}</Text>
          <Text className="text-gray-600 border-b-2  border-gray-300 w-[80%]"></Text>

        </View>
      </View>
      </View>
  );
};


export default ProfileScreen;
