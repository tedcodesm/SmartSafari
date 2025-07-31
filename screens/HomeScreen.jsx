import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Pressable,
  TextInput
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#037ff3" />
      <View className="h-24 rounded-b-xl flex-row items-center justify-between px-8  bg-[#037ff3]">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-xl tracking-wider font-serif">
          Welcome
        </Text>
      </View>
      <View className="flex py-2 items-center justify-center px-4">
        <TextInput className="w-full border py-2 ps-4 rounded-full"></TextInput>
        <Icon
          name="magnify"
          size={28}     
          color="#037ff3"
          className="absolute right-6 top-3"
          />
      </View>
     
    </View>
  );
};

export default HomeScreen;
