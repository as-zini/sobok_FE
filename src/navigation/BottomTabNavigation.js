import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../ui/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import home_icon from '../../assets/home_icon.png';
import today_icon from '../../assets/today_icon.png';
import report_icon from '../../assets/report_icon.png';
import my_icon from '../../assets/my_icon.png';
import { Image, View } from 'react-native';
import { size } from '../ui/styles/size';
import Today from '../ui/screens/Today';

const Tab = createBottomTabNavigator();

function TabBarIcon({ iconPath, focused, routeName }) {
  const iconSize = routeName === 'Mypage' ? { width: 35, height: 35 } : { width: 25, height: 25 };
  const focusOn =
    routeName === 'Mypage'
      ? { top: 2, right: -1, width: 19, height: 19 }
      : { top: -2, right: -5, width: 18, height: 18 };

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={iconPath} style={iconSize} resizeMode="contain" />
    </View>
  );
}

const BottomTabNavigation = () => {

  return (
    
      <Tab.Navigator 
        screenOptions={({route}) => ({
          headerShown:false,
          tabBarIcon:({ focused }) => {
            let iconPath;
  
            if (route.name === 'HOME') {
              iconPath = focused===true ?require( '../../assets/home_icon_focused.png') : require('../../assets/home_icon.png');
            } else if (route.name === 'TODAY') { // ChatList -> Chat 변경
              iconPath = focused===true ?require( '../../assets/today_icon_focused.png') : require('../../assets/today_icon.png');
            } else if (route.name === 'REPORT') {
              iconPath = focused===true ?require( '../../assets/report_icon_focused.png') : require('../../assets/report_icon.png');
            } else if (route.name === 'MY') {
              iconPath = focused===true ?require( '../../assets/my_icon_focused.png') : require('../../assets/my_icon.png');
            } 
  
            return <TabBarIcon iconPath={iconPath} focused={focused} routeName={route.name} />;
          },
          tabBarActiveTintColor:'black',
          tabBarBackground: () => (
            <BlurView
              style={{width:size.width, height:"100%"}} // BlurView를 탭바 전체 크기로 확장
              intensity={50} // 블러 강도
              tint="light" // light, dark, default
            />
          ),
          tabBarStyle: {
            position: 'absolute', // 탭바를 화면에 고정
            backgroundColor: 'transparent', // 블러 적용을 위해 투명 설정
            borderTopWidth: 0, // 테두리 제거
          }
        }
          
        )}
      >
        <Tab.Screen name="HOME" component={Home} />
        <Tab.Screen name="TODAY" component={Today}/>
        <Tab.Screen name="REPORT" component={Home}/>
        <Tab.Screen name="MY" component={Home} />
      </Tab.Navigator>
    
  )
}

export default BottomTabNavigation