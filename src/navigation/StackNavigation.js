import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
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

import ViewAiRoutineResult from '../ui/screens/ViewAiRoutineResult';
import StartAddAsset from '../ui/screens/StartAddAsset';
import AddFreeRoutine from '../ui/screens/AddFreeRoutine';
import AddTodo from '../ui/screens/AddTodo';
import CompleteAddFreeRoutine from '../ui/screens/CompleteAddFreeRoutine';
import AddInstallmentSaving from '../ui/screens/AddInstallmentSaving';
import CompleteAddSaving from '../ui/screens/CompleteAddSaving';
import TodayTodo from '../ui/screens/TodayTodo';
import Timer from '../ui/screens/Timer';
import CompleteTimer from '../ui/screens/CompleteTimer';
import Setting from '../ui/screens/Setting';
import SettingLinkedApp from '../ui/screens/SettingLinkedApp';
import Report from '../ui/screens/Report';
import CompleteSnowCard from '../ui/screens/CompleteSnowCard';
import SnowCardBook from '../ui/screens/SnowCardBook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewLinkedRoutine from '../ui/screens/ViewLinkedRoutine';



const Stack = createStackNavigator();





const StackNavigation = () => {
  const getUser = async() => {
    const token = await AsyncStorage.getItem("access_token")
    console.log(token)
    return(JSON.parse(token));
  }

  useEffect(() => {
    getUser();
    console.log(getUser());
  }, [])
  

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}
      // initialRouteName={getUser() ? "Tabs" : 'Start'}
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
      <Stack.Screen name="StartAddAsset" component={StartAddAsset}/>
      <Stack.Screen name="AiRoutineResult" component={ViewAiRoutineResult}/>
      <Stack.Screen name="AddFreeRoutine" component={AddFreeRoutine}/>
      <Stack.Screen name="AddTodo" component={AddTodo}/>
      <Stack.Screen name="CompleteAddRoutine" component={CompleteAddFreeRoutine}/>
      <Stack.Screen name="AddInstallmentSaving" component={AddInstallmentSaving}/>
      <Stack.Screen name="CompleteAddSaving" component={CompleteAddSaving}/>
      <Stack.Screen name="TodayTodo" component={TodayTodo}/>
      <Stack.Screen name="Timer" component={Timer}/>
      <Stack.Screen name="CompleteTimer" component={CompleteTimer}/>
      <Stack.Screen name="Setting" component={Setting}/>
      <Stack.Screen name="SettingLinkedApp" component={SettingLinkedApp}/>
      <Stack.Screen name="Report" component={Report}/>
      <Stack.Screen name="CompleteSnowCard" component={CompleteSnowCard}/>
      <Stack.Screen name="SnowCardBook" component={SnowCardBook}/>
      <Stack.Screen name="ViewLinkedRoutine" component={ViewLinkedRoutine}/>
  
    </Stack.Navigator>
  )
}

export default StackNavigation