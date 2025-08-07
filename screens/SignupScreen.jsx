import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = ({}) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("12345678");
  const [email, setEmail] = useState("dbitlmr112624@spu.ac.ke");
  const [phone, setPhone] = useState("123456");

  const handleSignup = async () => {
    if (!username || !password || !email || !phone) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post("http://192.168.100.178:3001/api/auth/register", {
        username,
        password,
        email,
        phone,
      });
      if (response.status === 201) {
        alert(`Signup successful: ${response.data.message}`);
        navigation.navigate("otp");
      }
    } catch (error) {
      alert( error.response?.data?.message || "Signup failed. Please try again.");
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
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your password"
              secureTextEntry
            />
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
    </View>
  );
};

export default SignupScreen;
