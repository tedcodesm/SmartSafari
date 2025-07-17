import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';


export default function App() {
  return (
    <View className="flex-1 items-center justify-center ">
      <SignupScreen/>
    </View>
  );
}

