
import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from 'styled-components';
import MarginVertical from '../components/MarginVertical';
import { size } from '../styles/size';
import { colors } from '../styles/colors';

import mild_complete_routine_icon from '../../../assets/mild_complete_routine_icon.png';
import Button from '../components/Button';
import complete_add_routine_bg from '../../../assets/airoutine_complete_bg.png';
import { useNavigation } from '@react-navigation/native';

const CompleteAddFreeRoutine = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
        <AiRoutineCompleteBody>
          <AiRoutineCompleteIcon source={mild_complete_routine_icon}/>
          <MarginVertical top={40}/>
          <AiRoutingCompleteTitle>지윤 님만의{"\n"}자율루틴 만들기 완성!</AiRoutingCompleteTitle>
          <MarginVertical top={18}/>
          <AiRoutineCompleteText>자율루틴과 함께라면{"\n"}자투리 시간 100%{"\n"}모을 수 있어요!</AiRoutineCompleteText>
          <View style={{position:'absolute', bottom:100}}>
            <Button text={"루틴 시작하러 가기"} handleButton={() => navigation.navigate("Tabs")}/>
          </View>
        </AiRoutineCompleteBody>
        <AiRoutineCompleteBg source={complete_add_routine_bg}/>
      </SafeAreaView>
  )
}

export default CompleteAddFreeRoutine

const AiRoutineCompleteBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;  
  display:flex;
  justify-content:center;
  align-items:center;
`

const AiRoutineCompleteBg = styled.Image`
  width:${size.width}px;
  height:${size.height}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const AiRoutineCompleteIcon = styled.Image`
  width:96px;
  height:100px;
`

 const AiRoutingCompleteTitle = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
  text-align:center;
 `

 const AiRoutineCompleteText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  text-align:center;

 `

