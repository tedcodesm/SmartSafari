import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const OtpScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center gap-7 items-center w-full p-4">
            <Image
              className="w-full h-80 "
              source={require('../assets/otp.png')}
            />
            <Text className="font-bold text-xl font-serif text-center">
              Enter the OTP sent to your email 
            </Text>
            <TextInput
              className="w-[80%] h-12 px-4 border border-gray-300 rounded-md"
              keyboardType="number-pad"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
            />
            <TouchableOpacity className="w-[80%] h-12 px-4 bg-blue-400 rounded-xl flex items-center justify-center">
              <Text className="text-white font-bold text-xl">Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default OtpScreen;
