import React, { useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const navigation = useNavigation(); // ✅ Moved here

  const handleAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Biometrics not available.");
      return;
    }

    setTimeout(async () => {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirm your identity",
      });

      if (result.success) {
        navigation.navigate('int'); 
      } else {
        Alert.alert("Authentication failed: " + result.error);
      }
    }, 300);
  };

  useFocusEffect(
    useCallback(() => {
      handleAuth();
    }, [])
  );

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Icon name="fingerprint" size={100} color="#4F8EF7" />
      <Text className="text-lg mt-2 text-blue-600 font-bold">Waiting for authentication...</Text>
    </View>
  );
};

export default AuthScreen;
