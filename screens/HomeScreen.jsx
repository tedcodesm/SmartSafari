import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#004F98" />
      <View className="h-24 rounded-b-xl flex-row items-center justify-between px-8  bg-[#004F98]">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-xl tracking-wider font-serif">
          Welcome
        </Text>
      </View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
