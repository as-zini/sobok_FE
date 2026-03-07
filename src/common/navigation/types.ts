import type { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Start: undefined;
  Signup: { email?: string; version?: string };
  Login: undefined;
  Tabs: { screen?: string } | undefined;
  TestStart: undefined;
  Test: undefined;
  AiRoutineComplete: { isComplete?: boolean };
  ViewSave: undefined;
  DetailSave: { id: any };
  ViewRoutine: undefined;
  DetailRoutine: { id: any };
  DetailTodo: { id?: any; todoInfo?: any; routineTitle?: string; days?: any };
  ViewPoint: undefined;
  StartAddAsset: { version?: string };
  AddFreeRoutine: undefined;
  AddTodo: { days?: any };
  CompleteAddRoutine: undefined;
  AddInstallmentSaving: undefined;
  CompleteAddSaving: { duration?: any };
  TodayTodo: undefined;
  Timer: undefined;
  CompleteTimer: { time?: string };
  Setting: undefined;
  SettingLinkedApp: undefined;
  Report: undefined;
  CompleteSnowCard: { type?: any };
  SnowCardBook: { version?: string };
  ViewLinkedRoutine: { title?: string; routines?: any };
  ViewAiRoutine: { routineInfo?: any; version?: string; time?: any };
  ViewSaveTime: { version?: string; username?: string };
  AddSaveTime: { spareTimeEl?: any; length?: number };
  DetailSnowCard: { type?: any; date?: string; isMyCard?: boolean };
  TicketPurchase: { version?: string };
  ConnectRoutine: { id?: any };
  PointInfo: undefined;
  SettingAssistance: undefined;
  SettingTermList: undefined;
  SettingTerm: { version?: number };
  SettingVersion: undefined;
  SettingAccountList: undefined;
  SettingAccount: { version?: number; title?: string };
  Notification: undefined;
  ViewInterest: { id?: any };
  NextScreen: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
