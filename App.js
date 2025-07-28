import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OtpScreen from './screens/OtpScreen';


export default function App() {
  return (
      <StackNavigator/>
  );
}

