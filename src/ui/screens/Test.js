import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import styled from 'styled-components'

import test_bg from '../../../assets/test_bg.png'
import BackArrowButton from '../components/BackArrowButton'
import Steps from '../components/Step'
import { colors } from '../styles/colors'
import bus_icon from '../../../assets/bus_icon.png';
import car_icon from '../../../assets/car_icon.png';
import free_time_icon from '../../../assets/free_time_icon.png';
import game_icon from '../../../assets/game_icon.png';
import diversity_icon from '../../../assets/diversity_icon.png';
import mono_icon from '../../../assets/mono_icon.png';
import circle_graphic from '../../../assets/circle_graphic.png';
import top_graphic from '../../../assets/top_graphic.png';
import trapezoid_graphic from '../../../assets/trapezoid_graphic.png';
import plat_graphic from '../../../assets/plat_graphic.png';
import Button from '../components/Button'
import StepNumber from '../components/StepNumber'
import { useNavigation } from '@react-navigation/native'
import ChoiceModal from '../components/SpareTimeChoiceModal'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Test = () => {
  const [step, setStep] = useState(1);
  const [detailStep, setDetailStep] = useState(1);
  const [isChoiceModalVisible, setIsChoiceModalVisible] = useState(false);
  const TestCategoryTextList = ["자투리 시간", "자투리 시간", "루틴 속성", "취향", ""]
  const TestText = ["언제 자투리 시간이\n생기나요?", "자투리 시간이\n얼마나 생기나요?", ["지윤 님은 무엇을\n더 선호하시나요?","지윤 님은 어떤 계획을\n더 선호하시나요?","지윤 님은\n집중할 때 어때요?"], "지윤 님의 관심은\n어디로 향하고 있나요?"];
  const iconHeight = detailStep === 2 ? 63 : 52;
  const iconWidth = detailStep === 2 ? 40 : 54;
  const navigation = useNavigation();

  

  const handleTestButton = () => {
    if(step < 4){
      if(step === 3 && detailStep < 3){
      setDetailStep((prev) => prev+1)
      }else{
      setStep((prev) => prev+1);
      console.log("button!")
      
      }
    } else{
      navigation.navigate("AiRoutineComplete")
    }
  }
  

  return (
    <SafeAreaView>
      <TestBody>
        <TestHeader>
          <BackArrowButton/>
        </TestHeader>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', top:10}}>
          <Steps step={step}/>
        </View>
        <TestContentsArea style={{marginTop:step==1 ? -40 : step===2 ? -260 : -200}}>
          <StepNumber step={step}/>
          <TestCategoryText>{TestCategoryTextList[step-1]}</TestCategoryText>
          <TestQuestionText>{step === 3 ? TestText[step-1][detailStep-1] : TestText[step-1]}</TestQuestionText>
          
          <TestCheckArea>
          {step === 1? 
          <>
            <TestCheckEl>
              <TestCheckText>출퇴근 시간{"\n(대중교통)"}</TestCheckText>
              <TestCheckIcon source={bus_icon} style={{width:76, height:55}}/>
            </TestCheckEl>
            <TestCheckEl>
              <TestCheckText>출퇴근 시간{"\n(자가용)"}</TestCheckText>
              <TestCheckIcon source={car_icon} style={{width:62, height:40}}/>
            </TestCheckEl>
            <TestCheckEl>
              <TestCheckText>쉬는 시간 및{"\n"}자유 시간</TestCheckText>
              <TestCheckIcon source={game_icon} style={{width:61, height:48}}/>
            </TestCheckEl>
            <TestCheckEl>
              <TestCheckText>대기 시간</TestCheckText>
              <TestCheckIcon source={free_time_icon} style={{width:48, height:49}}/>
            </TestCheckEl>
          
          </>
          : step === 2 ?
          <>
            <SpareTimeAddButton onPress={() => setIsChoiceModalVisible(true)}>
              <SpareTimeButtonText>+</SpareTimeButtonText>
            </SpareTimeAddButton>
            <ChoiceModal isChoiceModalVisible={isChoiceModalVisible} setIsChoiceModalVisible={setIsChoiceModalVisible}/>
          </>
          : step === 3 ?
          <>
            <TestCheckEl>
              <TestCheckText> {detailStep === 1 ? "여러가지를\n다양하게" : detailStep===2 ? "느슨하고\n여유로운" : "오래 오래\n집중하기"}</TestCheckText>
              <TestCheckIcon source={detailStep === 1 ? diversity_icon : detailStep===2 ? circle_graphic : trapezoid_graphic} style={{width:60, height:60}}/>
            </TestCheckEl>
            <TestCheckEl>
              <TestCheckText>{detailStep === 1 ? "하나를\n진득하게" : detailStep===2 ? "촘촘하고\n체계적인" : "쉽게 질려\n금방 쉬기"} </TestCheckText>
              <TestCheckIcon source={detailStep === 1 ? mono_icon : detailStep===2 ? top_graphic : plat_graphic} style={{width:iconWidth, height:iconHeight}}/>
            </TestCheckEl>
          </>
          :
          <></>
          }
        </TestCheckArea>
        </TestContentsArea>
        <View style={{position:'absolute', bottom:100}}>
          <Button text={"다음 단계로"} unChecked={true} handleButton={handleTestButton}/>
        </View>  
      </TestBody>
      <TestBg source={test_bg}/>
    </SafeAreaView>
  )
}

export default Test


const TestBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  width:${width}px;
  height:${height}px;
`

const TestBg = styled.Image`
  position:absolute;
  top:0;
  width:${width}px;
  height:${height}px;
  z-index:-1;
`

const TestHeader = styled.View`
  position:absolute;
  left:25px;
  top:20px;
`

const TestContentsArea = styled.View`
  display:flex;
  justify-content:flex-start;
  align-items:flex-start;
  margin-left:40px;
  margin-top:-40px;
`

const TestCategoryText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  margin-bottom:10px;
`

const TestQuestionText = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:45px; 
`

const TestCheckArea = styled.View`
  display:flex;
  flex-direction:row;
  width:${width*.9};
  flexWrap:wrap;
  gap:16px;
`

const TestCheckEl = styled.TouchableOpacity`
  width:${width*.75/2}px;
  background-color:#fff;
  height:${width*.75/2}px;
  border-radius:15px;
`

const TestCheckText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#777777;
  position:absolute;
  top:18px;
  left:16px;
  
`

const TestCheckIcon = styled.Image`
  position:absolute;
  bottom:10px;
  right:10px;
`

const SpareTimeAddButton = styled.TouchableOpacity`
  background-color:rgba(255,255,255,.4);
  width:290px;
  height:70px;
  z-index:9;
  border-radius:8px;
  display:flex
  justify-content:center;
  align-items:center;
`

const SpareTimeButtonText = styled.Text`
  color:#fff;
  font-weight:500;
  font-size:24px;
`
