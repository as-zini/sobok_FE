import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import StartScreen from '../ui/screens/StartScreen';
import LoginScreen from '../ui/screens/LoginScreen';
import SignupScreen from '../ui/screens/SignupScreen';
import TestStartScreen from '../ui/screens/TestStartScreen';
import Test from '../ui/screens/Test';
import AiRoutineCompleteScreen from '../ui/screens/AiRoutineCompleteScreen';
import Home from '../ui/screens/Home';
import BottomTabNavigation from './BottomTabNavigation';
import ViewInstallmentSavingScreen from '../ui/screens/ViewInstallmentSavingScreen';
import DetailInstallmentSavingScreen from '../ui/screens/DetailInstallmentSavingScreen';
import ViewRoutineListScreen from '../ui/screens/ViewRoutineListScreen';
import DetailRoutineScreen from '../ui/screens/DetailRoutineScreen';
import DetailTodo from '../ui/screens/DetailTodo';
import ViewPointScreen from '../ui/screens/ViewPointScreen';
import StartAddAIRoutine from '../ui/screens/StartAddAIRoutine';

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
      <Stack.Screen name="TestStart" component={TestStartScreen}/>
      <Stack.Screen name="Test" component={Test}/>
      <Stack.Screen name="AiRoutineComplete" component={AiRoutineCompleteScreen} />
      <Stack.Screen name="Tabs" component={BottomTabNavigation}/>
      <Stack.Screen name="ViewSave" component={ViewInstallmentSavingScreen} />
      <Stack.Screen name="DetailSave" component={DetailInstallmentSavingScreen}/>
      <Stack.Screen name="ViewRoutine" component={ViewRoutineListScreen} />
      <Stack.Screen name="DetailRoutine" component={DetailRoutineScreen}/>
      <Stack.Screen name="DetailTodo" component={DetailTodo}/>
      <Stack.Screen name="ViewPoint" component={ViewPointScreen}/>
      <Stack.Screen name="StartAiRoutine" component={StartAddAIRoutine}/>
    </Stack.Navigator>
  )
}

export default StackNavigation