import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../ui/screens/Home';
import Today from '../ui/screens/Today';
import Statistic from '../ui/screens/Statistic';
import MyPage from '../ui/screens/MyPage';
import { size } from '../ui/styles/size';
import { colors } from '../ui/styles/colors';

const Tab = createBottomTabNavigator();

function TabBarIcon({ iconPath, focused, routeName }) {
  const iconSize = routeName === 'MY' ? { width: 35, height: 35 } : { width: 25, height: 25 };

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={iconPath} style={iconSize} resizeMode="contain" />
    </View>
  );
}

const BottomTabNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        let iconPath;
        switch (route.name) {
          case 'HOME':
            iconPath = focused
              ? require('../../assets/home_icon_focused.png')
              : require('../../assets/home_icon.png');
            break;
          case 'TODAY':
            iconPath = focused
              ? require('../../assets/today_icon_focused.png')
              : require('../../assets/today_icon.png');
            break;
          case 'REPORT':
            iconPath = focused
              ? require('../../assets/report_icon.png')
              : require('../../assets/report_icon.png')
            break;
          case 'MY':
            iconPath = focused
              ? require('../../assets/my_icon_focused.png')
              : require('../../assets/my_icon.png');
            break;
        }
        if(route.name === "REPORT" && focused)return <MaterialCommunityIcons name="chart-scatter-plot" size={24} color={colors.fontMain}/>
        return <TabBarIcon iconPath={iconPath} focused={focused} routeName={route.name} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarBackground: () => (
        <BlurView
          style={{ width: size.width, height: '100%' }}
          blurType="light"
          blurAmount={50}
        />
      ),
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        zIndex: 99,
      },
    })}
  >
    <Tab.Screen name="HOME" component={Home} />
    
    <Tab.Screen name="TODAY" component={Today} />
    <Tab.Screen name="REPORT" component={Statistic} />
    <Tab.Screen name="MY" component={MyPage} />
  </Tab.Navigator>
);

export default BottomTabNavigation;
