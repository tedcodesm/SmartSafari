import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from "../config/ip";


const SignupScreen = ({}) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("jcfvbnm,");
  const [email, setEmail] = useState("dbitlmr112624@spu.ac.ke");
  const [phone, setPhone] = useState("123456");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSignup = async () => {
    
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        password,
        email,
        phone,
      });
      if (response.status === 201) {
        alert(`Signup successful: ${response.data.message}`);
        navigation.navigate("otp",{email});
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
      setErrorModalVisible(true);
    }
  };
  return (
    <View className="flex-1 items-center justify-start w-full bg-[#87CEEB]">
      <View className=" flex w-full h-56  rounded-lg">
        <Image
          className="w-full h-56  object-fit"
          source={require("../assets/signup.jpeg")}
        />{" "}
      </View>
      <ScrollView
        className="bg-white flex-1 w-full rounded-t-lg p-4"
        vertical={true}
      >
        <View className="bg-white flex-1 w-full rounded-t-lg p-4">
          <Text className="text-2xl font-bold font-serif text-center mt-4">
            Create Account
          </Text>
          <View className="mt-4">
            <Text className="text-lg">Full Name:</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your full name"
            />
          </View>

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
            <Text className="text-lg">Phone:</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
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
        name={showPassword ? 'eye-off' : 'eye'}
        size={24}
        color="gray"
      />
    </TouchableOpacity>
  </View>
</View>

          <TouchableOpacity
            className="bg-blue-500 p-2 rounded-lg mt-4"
            onPress={handleSignup}
          >
            <Text className="text-white text-lg text-center">Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            className="mt-4"
          >
            <Text className="text-blue-500 text-center">
              {" "}
              <Text className="font-bold text-black mr-4">
                Already have an account?
              </Text>{" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
       {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="bg-white p-6 rounded-xl w-full">
            <Text className="text-red-600 text-lg font-bold mb-2">Signup Failed</Text>
            <Text className="text-base text-gray-700">{errorMessage}</Text>
            <Pressable
              onPress={() => setErrorModalVisible(false)}
              className="mt-4 bg-blue-500 px-4 py-2 rounded-md">
              <Text className="text-white text-center">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignupScreen;
