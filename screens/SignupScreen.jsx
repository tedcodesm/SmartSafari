import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";

const SignupScreen = ({navigation}) => {
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
            <Text className="text-lg">First Name:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your first name"
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg">Last Name:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your last name"
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg">Email:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your email"
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg">Phone:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your phone number"
            />
          </View>

          <View className="mt-4">
            <Text className="text-lg">Password:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>
          <TouchableOpacity className="bg-blue-500 p-2 rounded-lg mt-4">
            <Text className="text-white text-lg text-center">Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("login")} className="mt-4">
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
