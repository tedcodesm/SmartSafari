import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../config/ip";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { requestFCMPermission } from "../services/fcmservice";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("dbitlmr112624@spu.ac.ke");
  const [password, setPassword] = useState("jcfvbnm,");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      await requestFCMPermission(token);

      navigation.navigate("drawer");
      console.log(res.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setErrorModalVisible(true);
    }
  };

  return (
    <View className="flex-1 items-center justify-start w-full bg-[#87CEEB]">
      {/* Hero Image */}
      <View className="w-full h-56 rounded-lg">
        <Image
          className="w-full h-56 object-fit"
          source={require("../assets/login.jpeg")}
        />
      </View>

      {/* Login Form */}
      <View className="bg-white flex-1 w-full rounded-t-lg p-4">
        <Text className="text-2xl font-bold font-serif text-center mt-4">
          Welcome Back
        </Text>

        <View className="mt-4">
          <Text className="text-lg">Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Enter your email"
          />
        </View>

        <View className="mt-4">
          <Text className="text-lg">Password:</Text>
          <View className="flex-row items-center border border-gray-300 px-2 rounded-lg">
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="flex-1"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#037fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-500 p-2 rounded-lg mt-4"
        >
          <Text className="text-white text-lg text-center">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("signup")}
          className="mt-4"
        >
          <Text className="text-blue-500 text-center">
            <Text className="font-bold text-black mr-4">
              Don't have an account?
            </Text>{" "}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="bg-[#ebf7f8] p-6 rounded-2xl w-full">
            <Text className="text-red-600 font-serif text-lg font-bold mb-2">
              Login Failed
            </Text>
            <Text className="text-base font-serif text-gray-700">
              {errorMessage}
            </Text>
            <Pressable
              onPress={() => setErrorModalVisible(false)}
              className="mt-4 bg-blue-500 px-4 py-2 rounded-md"
            >
              <Text className="text-white text-center">Try again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
