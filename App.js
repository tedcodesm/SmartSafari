import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OtpScreen from './screens/OtpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationProvider } from './context/NotificationContext';


export default function App() {
    
  return (
    <NotificationProvider>
      <StackNavigator/>
    </NotificationProvider>
  );
}

