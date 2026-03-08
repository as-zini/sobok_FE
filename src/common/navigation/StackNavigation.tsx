import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import StartScreen from '@/common/ui/screens/StartScreen';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import SignupScreen from '@/common/ui/screens/SignupScreen';
import TestStartScreen from '@/common/ui/screens/TestStartScreen';
import Test from '@/common/ui/screens/Test';
import AiRoutineCompleteScreen from '@/common/ui/screens/AiRoutineCompleteScreen';
import BottomTabNavigation from './BottomTabNavigation';
import baseUrl from '@/common/api/baseURL';
import ViewInstallmentSavingScreen from '@/common/ui/screens/ViewInstallmentSavingScreen';
import DetailInstallmentSavingScreen from '@/common/ui/screens/DetailInstallmentSavingScreen';
import ViewRoutineListScreen from '@/common/ui/screens/ViewRoutineListScreen';
import DetailRoutineScreen from '@/common/ui/screens/DetailRoutineScreen';
import DetailTodo from '@/common/ui/screens/DetailTodo';
import ViewPointScreen from '@/common/ui/screens/ViewPointScreen';

import ViewAiRoutineResult from '@/common/ui/screens/ViewAiRoutineResult';
import StartAddAsset from '@/common/ui/screens/StartAddAsset';
import AddFreeRoutine from '@/common/ui/screens/AddFreeRoutine';
import AddTodo from '@/common/ui/screens/AddTodo';
import CompleteAddFreeRoutine from '@/common/ui/screens/CompleteAddFreeRoutine';
import AddInstallmentSaving from '@/common/ui/screens/AddInstallmentSaving';
import CompleteAddSaving from '@/common/ui/screens/CompleteAddSaving';
import TodayTodo from '@/common/ui/screens/TodayTodo';
import Timer from '@/common/ui/screens/Timer';
import CompleteTimer from '@/common/ui/screens/CompleteTimer';
import Setting from '@/common/ui/screens/Setting';
import SettingLinkedApp from '@/common/ui/screens/SettingLinkedApp';
import Report from '@/common/ui/screens/Report';
import CompleteSnowCard from '@/common/ui/screens/CompleteSnowCard';
import SnowCardBook from '@/common/ui/screens/SnowCardBook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewLinkedRoutine from '@/common/ui/screens/ViewLinkedRoutine';
import ViewSaveTime from '@/common/ui/screens/ViewSaveTime';
import AddSaveTime from '@/common/ui/screens/AddSaveTime';
import DetailSnowCard from '@/common/ui/screens/DetailSnowCard';
import TicketPurchase from '@/common/ui/screens/TicketPurchase';
import ConnectRoutineInSaving from '@/common/ui/screens/ConnectRoutineInSaving';
import PointInfo from '@/common/ui/screens/PointInfo';
import SettingAssistance from '@/common/ui/screens/SettingAssistance';
import SettingTermList from '@/common/ui/screens/SettingTermList';
import SettingTerm from '@/common/ui/screens/SettingTerm';
import SettingVersion from '@/common/ui/screens/SettingVersion';
import SettingAccountList from '@/common/ui/screens/SettingAccountList';
import SettingAccount from '@/common/ui/screens/SettingAccount';
import Notification from '@/common/ui/screens/Notification';
import ViewInterest from '@/common/ui/screens/ViewInterest';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const [version, setVersion] = useState<keyof RootStackParamList>('Tabs');

  const isValidUser = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const response = await baseUrl.post(
        '/user/refresh-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      await AsyncStorage.setItem('access_token', response.data.accessToken);
    } catch (error) {
      console.log(error);
      setVersion('Start');
    }
  };

  useEffect(() => {
    isValidUser();
  }, []);

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={version}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tabs" component={BottomTabNavigation} />
      <Stack.Screen name="TestStart" component={TestStartScreen} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="AiRoutineComplete" component={AiRoutineCompleteScreen} />

      <Stack.Screen name="ViewSave" component={ViewInstallmentSavingScreen} />
      <Stack.Screen name="DetailSave" component={DetailInstallmentSavingScreen} />
      <Stack.Screen name="ViewRoutine" component={ViewRoutineListScreen} />
      <Stack.Screen name="DetailRoutine" component={DetailRoutineScreen} />
      <Stack.Screen name="DetailTodo" component={DetailTodo} />
      <Stack.Screen name="ViewPoint" component={ViewPointScreen} />
      <Stack.Screen name="StartAddAsset" component={StartAddAsset} />
      <Stack.Screen name="AddFreeRoutine" component={AddFreeRoutine} />
      <Stack.Screen name="AddTodo" component={AddTodo} />
      <Stack.Screen name="CompleteAddRoutine" component={CompleteAddFreeRoutine} />
      <Stack.Screen name="AddInstallmentSaving" component={AddInstallmentSaving} />
      <Stack.Screen name="CompleteAddSaving" component={CompleteAddSaving} />
      <Stack.Screen name="TodayTodo" component={TodayTodo} />
      <Stack.Screen name="Timer" component={Timer} />
      <Stack.Screen name="CompleteTimer" component={CompleteTimer} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="SettingLinkedApp" component={SettingLinkedApp} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="CompleteSnowCard" component={CompleteSnowCard} />
      <Stack.Screen name="SnowCardBook" component={SnowCardBook} />
      <Stack.Screen name="ViewLinkedRoutine" component={ViewLinkedRoutine} />
      <Stack.Screen name="ViewAiRoutine" component={ViewAiRoutineResult} />
      <Stack.Screen name="ViewSaveTime" component={ViewSaveTime} />
      <Stack.Screen name="AddSaveTime" component={AddSaveTime} />
      <Stack.Screen name="DetailSnowCard" component={DetailSnowCard} />
      <Stack.Screen name="TicketPurchase" component={TicketPurchase} />
      <Stack.Screen name="ConnectRoutine" component={ConnectRoutineInSaving} />
      <Stack.Screen name="PointInfo" component={PointInfo} />
      <Stack.Screen name="SettingAssistance" component={SettingAssistance} />
      <Stack.Screen name="SettingTermList" component={SettingTermList} />
      <Stack.Screen name="SettingTerm" component={SettingTerm} />
      <Stack.Screen name="SettingVersion" component={SettingVersion} />
      <Stack.Screen name="SettingAccountList" component={SettingAccountList} />
      <Stack.Screen name="SettingAccount" component={SettingAccount} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ViewInterest" component={ViewInterest} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
