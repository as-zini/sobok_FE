import React, { useState } from 'react'
import { Image, SafeAreaView } from 'react-native'
import styled from 'styled-components'

import add_ai_routine_bg from '../../../assets/add_ai_routine_bg.png';
import add_ai_routine_button from '../../../assets/add_ai_routine_button.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';
import AiRoutineCompleteScreen from './AiRoutineCompleteScreen';
import free_routine_add_bg from '../../../assets/free_routine_add_bg.png';
import add_saving_bg from '../../../assets/add_saving_bg.png';
import Button from '../components/Button';
import start_button from '../../../assets/mild_cloud_icon.png';

const StartAddAsset = ({route}) => {
  const navigation = useNavigation();
  const [isMakeRoutine, setIsMakeRoutine] = useState(false);
  const {version} = route.params;

  const assetTitle = ["적금\n추가하기","AI 루틴 추가하기", "자율루틴\n추가하기"];
  const assetText = ["지윤 님의 시간을 소복이\n쌓을 수 있도록 도와드릴게요!", "AI가 당신의 맞춤 루틴을 만들어드립니다!\n다양한 질문에 답변만 하면\n고민 없이 루틴 완성!", "나만의 루틴을\n직접 만들 수 있어요!"]
  
  const handleMakeAiRoutine = () => {
    setIsMakeRoutine(true);

    setTimeout(() => {
      navigation.navigate("AiRoutineResult");
    }, 5000);
  }


  return (
    <SafeAreaView>
      {isMakeRoutine ?
      <><AiRoutineCompleteScreen/></> 
      :
      <>
      <StartAddAiRoutineBody>
        <MarginVertical top={80}/>
        <Image source={start_button} style={{width:40, height:30}}/>
        <MarginVertical top={15}/>
        <StartAddAiRoutineTitle>{version === "Saving" ? assetTitle[0] : version === "Ai" ? assetTitle[1] : assetTitle[2]}</StartAddAiRoutineTitle>
        <StartAddAiRoutineText>
          {version === "Saving" ? assetText[0] : version === "Ai" ? assetText[1] : assetText[2]}
        </StartAddAiRoutineText>
        <MarginVertical top={version === "Ai" ? 330 : 380}/>
        {version === "Ai" ?
        <StartAddAiRoutineButton>
          <StartAddAiRoutineButtonEl onPress={handleMakeAiRoutine}>
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
        :
        <Button text={version==="Saving" ? "적금 만들기" : "자율 루틴 만들기"} handleButton={() => navigation.navigate(version === "Saving" ? "AddInstallmentSaving" : "AddFreeRoutine" )}/>
        
        }
      </StartAddAiRoutineBody>
      <StartAddAiRoutineBg source={version === "Saving" ? add_saving_bg : version === "Ai" ? add_ai_routine_bg : free_routine_add_bg}/>
      </>
      }
    </SafeAreaView>
  )
}

export default StartAddAsset;


const StartAddAiRoutineBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  display:flex;
  align-items:center;
`

const StartAddAiRoutineBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const StartAddAiRoutineTitle = styled.Text`
  font-size:34px;
  font-weight:700;
  color:${colors.fontMain};
  margin-bottom:16px;
  text-align:center;
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

