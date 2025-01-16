import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './src/ui/screens/StartScreen';
import LoginScreen from './src/ui/screens/LoginScreen';

export default function App() {
  return (
    <View >
      {/* <StartScreen/> */}
      <LoginScreen/>
    </View>
  );
}


