import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import StartScreen from './src/ui/screens/StartScreen';
import LoginScreen from './src/ui/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import ChoiceModal from './src/ui/components/SpareTimeChoiceModal';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import NavigationService from './src/ui/components/NavigationService';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, [])
  

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}>
        <StackNavigation/>
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


