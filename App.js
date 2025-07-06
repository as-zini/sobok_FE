// App.js
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StackNavigation from './src/navigation/StackNavigation';
import NavigationService from './src/ui/components/NavigationService';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    // 2초 뒤에 네이티브 SplashScreen 숨기기
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      {/* 기본 StatusBar 설정, 필요시 커스터마이징 */}
      <StatusBar barStyle="dark-content" />

      <NavigationContainer
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      >
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
