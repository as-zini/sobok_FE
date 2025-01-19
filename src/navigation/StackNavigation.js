import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import StartScreen from '../ui/screens/StartScreen';
import LoginScreen from '../ui/screens/LoginScreen';
import SignupScreen from '../ui/screens/SignupScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}
      initialRouteName='Start'
    >
      <Stack.Screen name='Start' component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen}/>
    </Stack.Navigator>
  )
}

export default StackNavigation