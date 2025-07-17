import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";

const SplashScreen = ({ navigation }) => {
  return (
    <View className="flex-1 w-full relative">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/map.jpeg")}
        className="flex-1 items-center blur-sm w-full justify-center"
        resizeMode="cover"
      >
        <Text className="text-white tracking-wider font-serif text-xl font-extrabold absolute bottom-20">Welcome to RideBuddy</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          className="px-4 py-2 rounded-full bg-[#0047AB] absolute bottom-8 w-full "
        >
          <Text className="text-white text-2xl font-bold text-center font-serif ">Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
