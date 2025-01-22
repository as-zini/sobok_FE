import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './src/ui/screens/StartScreen';
import LoginScreen from './src/ui/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import ChoiceModal from './src/ui/components/SpareTimeChoiceModal';

export default function App() {
  return (
   
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
      
  );
}


