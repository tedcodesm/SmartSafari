import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OtpScreen from './screens/OtpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestFCMPermission } from './services/fcmservice';
import messaging from '@react-native-firebase/messaging';


export default function App() {
    useEffect(() => {
    messaging().onTokenRefresh(async (newToken) => {
      const jwt = await AsyncStorage.getItem('userToken');
      if (jwt) {
        await requestFCMPermission(jwt);
      }
    });
  }, []);
  return (
      <StackNavigator/>
  );
}

