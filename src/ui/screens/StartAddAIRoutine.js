import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components'

import add_ai_routine_bg from '../../../assets/add_ai_routine_bg.png';
import add_ai_routine_button from '../../../assets/add_ai_routine_button.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';

const StartAddAIRoutine = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StartAddAiRoutineBody>
        <StartAddAiRoutineTitle>AI 루틴 추가하기</StartAddAiRoutineTitle>
        <StartAddAiRoutineText>
          AI가 당신의 맞춤 루틴을 만들어드립니다!{"\n"}
          다양한 질문에 답변만 하면{"\n"}
          고민 없이 루틴 완성!
        </StartAddAiRoutineText>
        <MarginVertical top={330}/>
        <StartAddAiRoutineButton>
          <StartAddAiRoutineButtonEl>
            <StartAddAiRoutineButtonText>
              내 맞춤 정보로 루틴 만들기
            </StartAddAiRoutineButtonText>
            
          </StartAddAiRoutineButtonEl>
          <BorderLine/>
          <StartAddAiRoutineButtonEl onPress={() => navigation.navigate("TestStart")}>
            <StartAddAiRoutineButtonText>
              맞춤 검사 진행하기
            </StartAddAiRoutineButtonText>
          </StartAddAiRoutineButtonEl>
          <StartAddAiRoutineButtonBg source={add_ai_routine_button}/>
        </StartAddAiRoutineButton>
      </StartAddAiRoutineBody>
      <StartAddAiRoutineBg source={add_ai_routine_bg}/>
    </SafeAreaView>
  )
}

export default StartAddAIRoutine


const StartAddAiRoutineBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const StartAddAiRoutineBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const StartAddAiRoutineTitle = styled.Text`
  font-size:34px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:16px;
`

const StartAddAiRoutineText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain60};
  text-align:center;
  line-height:24px;
`

const StartAddAiRoutineButton = styled.View`
  width:285px;
  height:120px;
  display:flex;
  justify-content:center;
  align-items:center;
`
const StartAddAiRoutineButtonBg = styled.Image`
  width:100%;
  height:100%;
  position:absolute;
  top:0;
`

const StartAddAiRoutineButtonEl = styled.TouchableOpacity`
  z-index:3;
  width:285px;
  height:50%;
  padding:20px 0;
  display:flex;
  justify-content:center;
  align-items:center;
`

const StartAddAiRoutineButtonText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:#fff;
  z-index:3;
`

const BorderLine = styled.View`
  width:237px;
  height:.7px;
  background-color:#fff;
  z-index:3;
`

