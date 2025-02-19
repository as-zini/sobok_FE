import React, { useState } from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import styled from 'styled-components'

import complete_timer_bg from '../../../assets/complete_add_saving_bg.png';
import mild_cloud_icon from '../../../assets/mild_cloud_icon.png';
import down_navigate_icon from '../../../assets/down_navigate_icon.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import TotalSaveTime from '../components/TotalSaveTime';
import { useNowTodoStore } from '../../store/todo';

const CompleteTimer = ({route}) => {
  const [isDetailView, setIsDetailView] = useState(false);
  const {time} = route.params;
  const {nowTodo} = useNowTodoStore();

  return (
    <SafeAreaView>
      {isDetailView ?
      <TotalSaveTime time={time}/>
      :
      <>
      <CompleteTimerBody>
        {/* <CompleteTimerHeader>
          <View>
            <BackArrowButton/>
          </View>
        </CompleteTimerHeader> */}
        <MarginVertical top={90}/>
        <SnowFlakeIcon color={'black'} size={20}/>
        <MarginVertical top={10}/>
        <CompleteTimerText>눈 다 내렸다!</CompleteTimerText>
        <MarginVertical top={80}/>
        <TimerCategory>{nowTodo.title}</TimerCategory>
        <MarginVertical top={5}/>
        <TimerTime>{time}</TimerTime>
        <MarginVertical top={35}/>
        <Image source={mild_cloud_icon} style={{width:96, height:69}}/>
        <MarginVertical top={17}/>
        <CompleteTimerText style={{color:colors.fontMain60}}>수고하셨어요!{"\n"}이만큼이나 모았네요!</CompleteTimerText>
        <MarginVertical top={44}/>
        <DownNavigateIcon onPress={() => setIsDetailView(true)}>
          <Image source={down_navigate_icon} style={{width:16, height:32, position:'absolute'}}/>
          <Image source={down_navigate_icon} style={{width:16, height:32,  position:'absolute', bottom:10}}/>
        </DownNavigateIcon>
      </CompleteTimerBody>
      <CompleteTimerBg source={complete_timer_bg}/>
      </>
      }
    </SafeAreaView>
  )
}

export default CompleteTimer

const CompleteTimerBody = styled.View`
 width:${size.width}px;
 display:flex;
 justify-content:center;
 align-items:center;
`

const CompleteTimerBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const CompleteTimerHeader = styled.View`
  width:${size.width-50}px;
  height:50px;
  display:flex;
  justify-content:center;
`

const CompleteTimerText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain70};
  text-align:center;
`

const TimerCategory = styled.Text`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain80};
`

const TimerTime = styled.Text`
  font-size:42px;
  font-weight:600;
  color:#263963;
`

const DownNavigateIcon = styled.TouchableOpacity`
  display:flex;
  height:32px;
  justify-content:center;
  align-items:center;
`