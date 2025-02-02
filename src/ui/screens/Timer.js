import React, { useState } from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import styled from 'styled-components'

import timer_bg from '../../../assets/timer_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { size } from '../styles/size';
import pause_button_icon from '../../../assets/save_icon.png';
import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import dayjs from 'dayjs';
import LinkIcon from '../components/LinkIcon';
import not_current_step_icon from '../../../assets/not_current_step_icon.png';
import snow_flake_icon_opacity from '../../../assets/snow_flake_icon_opacity.png';
import timer_pause_bg from '../../../assets/timer_pause_bg.png';
import timer_continue_icon from '../../../assets/timer_continue_icon.png';
import { useNavigation } from '@react-navigation/native';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [now, setNow] = useState(dayjs())
  const [isPause,setIsPause] = useState(false);
  const timeIndex = [now.subtract('30', 'm').format("h:mm"), "", now.format("A h:mm"), "", now.add('30', 'm').format("h:mm")]
  const navigation = useNavigation();



  return (
    <SafeAreaView>
      <TimerBody>
        <TimerHeader>
          <BackArrowButton/>
        </TimerHeader>
        <MarginVertical top={30}/>
        <SnowFlakeIcon color={'black'} size={20}/>
        <MarginVertical top={15}/>
        <TimerText>지금 지윤 님은{"\n"}눈 내리는 중!</TimerText>
        <MarginVertical top={25}/>
        <TimerCategory>영어 강의 1강</TimerCategory>
        <TimerTime>1H 25M 5s</TimerTime>
        <MarginVertical top={10}/>
        <View style={{display:'flex', flexDirection:'row', gap:5, justifyContent:'center', alignItems:'center'}}>
          <LinkIcon size={20}/>
          <LinkedText>스픽</LinkedText>
        </View>
        <MarginVertical top={40}/>
        <RestOfTimeText>25분만 더하면{"\n"}적금 채우기 완료!</RestOfTimeText>
        <MarginVertical top={10}/>
        <TimeBarArea>
          {timeIndex.map((el, index) => {
            return(
              <TimeBarEl key={index}>
                <CurrentTime>{el}</CurrentTime>
                {index===2 ? <SnowFlakeIcon color={'white'} size={48}/> : 
                <View style={{width:48, height:48, display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Image source={index===0 ? snow_flake_icon_opacity : index === 1 ?  not_current_step_icon : null} style={{width:24, height:24}}/>
                </View>
                  }
                {index === 2 ? <CurrentBorderLine/> : <BorderLine/>}
              </TimeBarEl>
            )
          } )}
        </TimeBarArea>
        <PauseButton onPress={() => setIsPause(prev => !prev)} onLongPress={() => navigation.navigate("CompleteTimer")}>
          <ButtonImage source={isPause ? timer_continue_button_bg : timer_pause_button_bg}/>
          <Image source={isPause ? timer_continue_icon : pause_button_icon} style={{width:48, height:34}}/>
          <MarginVertical top={12}/>
          <ButtonText>{isPause ? "계속하기" : "중지"}</ButtonText>
        </PauseButton>
      </TimerBody>
      <TimerBg source={isPause ? timer_pause_bg : timer_bg}/>
    </SafeAreaView>
  )
}

export default Timer


const TimerBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  display:flex;
  align-items:center;
`

const TimerBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const TimerHeader = styled.View`
  width:${size.width-50}px;
  height:50px;
  display:flex;
  justify-content:center;
`

const TimerText = styled.Text`
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
  color:${colors.fontMain};
`

const LinkedText = styled.Text`
  font-size:18px;
  font-weight:500,
  color:${colors.fontMain70};
`

const RestOfTimeText = styled.Text`
  font-size:14px;
  color:#fff;
  text-align:center;
  font-weight:500;
`

const TimeBarArea = styled.View`
  display:flex;
  flex-direction:row;
  gap:20px;
  align-items:center;
  
`

const TimeBarEl = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:15px;
`

const CurrentTime = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#fff;
`

const BorderLine = styled.View`
  width:.5px;
  height:300px;
  background-color:#fff;
`

const CurrentBorderLine = styled.View`
  width:2px;
  height:300px;
  background-color:#fff;
`

const PauseButton = styled.TouchableOpacity`
  width:${size.width}px;
  height:126px;
  position:absolute;
  bottom:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ButtonImage = styled.Image`
  z-index:-1;
  position:absolute;
  bottom:0;
`

const ButtonText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain};
`



