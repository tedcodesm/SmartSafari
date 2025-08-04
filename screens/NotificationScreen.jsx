import { View, Text, ScrollView,TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const notifications = [
  {
    message: 'The bus is approaching your location. Please get ready.',
    time: '5 mins ago',
    type: 'info',
  },
  {
    message: 'Bus service for today has been cancelled due to heavy rain.',
    time: '20 mins ago',
    type: 'warning',
  },
  {
    message: 'The bus has picked up Brian at Kanunga.',
    time: 'Today • 7:05 AM',
    type: 'success',
  },
];

const getIconAndColor = (type) => {
  switch (type) {
    case 'info':
      return { icon: 'bus-clock', color: '#037ff3' };
    case 'warning':
      return { icon: 'alert-circle', color: '#f59e0b' };
    case 'success':
      return { icon: 'check-circle', color: '#10b981' };
    default:
      return { icon: 'bell-outline', color: '#6b7280' };
  }
};

const NotificationScreen = ({navigation}) => {
  return (
    <ScrollView className="flex-1 bg-[#f2f4f7] ">
        <View className=" items-start justify- px-6 py-3 h-16 bg-[#037ff3]  rounded-b-3xl ">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="chevron-left" size={28} color="white" />
                </TouchableOpacity>
                
              </View>
      <View className="mb-4 mt-4">
        <Text className="text-2xl font-bold text-center text-[#037ff3]">
          Notifications (8)
        </Text>
      </View>

      <Text className="text-lg text-gray-700 font-semibold mb-2 px-4">Recents</Text>

      {notifications.map((item, index) => {
        const { icon, color } = getIconAndColor(item.type);

        return (
          <View
            key={index}
            className="bg-white w-full rounded-xl p-4  mb-3 shadow-sm flex-row items-start"
          >
            <View className="mr-3 mt-1">
              <Icon name={icon} size={24} color={color} />
            </View>

            {/* Message & Timestamp */}
            <View className="flex-1">
              <Text className="text-gray-800 font-medium leading-relaxed">
                {item.message}
              </Text>
              <Text className="text-gray-400 text-xs mt-1">{item.time}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default NotificationScreen;
