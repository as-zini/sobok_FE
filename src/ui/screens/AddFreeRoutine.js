import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import styled from 'styled-components'

import add_free_routine_bg from '../../../assets/test_bg.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import StepNumber from '../components/StepNumber';
import Steps from '../components/Step';
import { colors } from '../styles/colors';
import check_icon_indigo from '../../../assets/check_icon_indigo.png';
import Button from '../components/Button';
import MarginVertical from '../components/MarginVertical';
import WeekCalandar from '../components/WeekCalandar';
import TimeSliderBar from '../components/TimeSliderBar';
import { useNavigation } from '@react-navigation/native';
import SimpleTodoEl from '../components/SimpleTodoEl';
import mild_routine_icon from '../../../assets/mild_routine_icon.png';
import LinkIcon from '../components/LinkIcon';
import TodoEl from '../components/TodoEl';

const AddFreeRoutine = () => {
  const [step, setStep] = useState(1);
  const categoryText = ["이름", "반복 시간", "할 일", "루틴 점검"];
  const questionText = ["루틴의 이름을\n지어주세요!","루틴을 언제\n반복할까요?","무엇을 해볼까요?","마지막으로\n루틴을 점검해보아요!" ]
  const navigation = useNavigation();
  const data = [["영어 강의 1강", "스픽", "1H 30M", "06:00 - 07:00"], ["영어 단어 10개 암기", "말해보카", "1H 00M", "07:30 - -8:30"]]
  
  const handleNextStep = () => {
    if(step<4){
      setStep(prev => prev+1)
    } else {
      navigation.navigate("CompleteAddRoutine")
    }
  }

  const StepOwnContents = () => {
    return(
      <>
        <MarginVertical top={40}/>
        <AnswerInputArea>
          <AnswerInput
            placeholder="이름을 입력해주세요"
            placeholderTextColor="rgba(255,255,255,.8)"
          />
          <Image source={check_icon_indigo} style={{width:30, height:30, position:'absolute', right:0}}/>
        </AnswerInputArea>
        <BorderLine/>
        <MarginVertical top={296}/>
      </>
    )
  }

  const StepTwoContents = () => {
    return(
      <View>
        <MarginVertical top={60}/>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:294}}>
          <RoutineQuestionText style={{textAlign:'center'}}>월, 수, 금{'\n'}6:00 - 7:30</RoutineQuestionText>
        </View>
        <MarginVertical top={40}/>
        <WeekCalandar/>
        <MarginVertical top={63}/>
        <TimeSliderBar text={"에 시작해서"}/>
        <TimeSliderBar text={"까지 끝내요"}/>
        <MarginVertical top={97}/>
      </View>
    )
  }

  const StepThreeContents = () => {
    return(
      <>
        <MarginVertical top={12}/>
        <RoutineCategoryText style={{lineHeight:24}}>루틴에 들어갈{"\n"}할 일을 추가해보세요!</RoutineCategoryText>
        <MarginVertical top={44}/>
        <SimpleTodoEl data={["영어강의 1강", "09:00 - 10:00", "1H 00M"]} index={1}/>
        <MarginVertical top={16}/>
        <SpareTimeAddButton onPress={() => navigation.navigate("AddTodo")}>
              <SpareTimeButtonText>+</SpareTimeButtonText>
            </SpareTimeAddButton>
        <MarginVertical top={142}/>
      </>
    )
  }

  const StepFourContents = () => {
    return(
      <>
        <MarginVertical top={12}/>
        <RoutineCategoryText style={{lineHeight:24}}>만들어진 루틴을{"\n"}수정 및 점검할 수 있어요</RoutineCategoryText>
        <MarginVertical top={88}/>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:294}}>
          <Image source={mild_routine_icon} style={{width:42, height:27}}/>
          <MarginVertical top={16}/>
          <RoutineQuestionText style={{textAlign:'center'}}>아침에는 영어 공부{"\n"}2H 30M</RoutineQuestionText>
          <MarginVertical top={12}/>
          <View style={{display:'flex', flexDirection:'row', gap:4, justifyContent:'center', alignItems:'center'}}>
            <LinkIcon size={16}/>
            <RoutineCategoryText style={{lineHeight:24}}>영어 적금</RoutineCategoryText>
          </View>
          <MarginVertical top={36}/>
          <WeekCalandar/>
          <MarginVertical top={44}/>
          <View style={{width:294, display:'flex', alignItems:'flex-start'}}>
            <Text style={{fontWeight:600, fontSize:22, color:colors.gray70}}>총 2개의 할 일</Text>  
          </View>
          <MarginVertical top={40}/>
          <TodoEl data={data[0]} index={1}/>
          <MarginVertical top={40}/>
          <TodoEl data={data[1]} index={2}/>
        </View>
        <MarginVertical top={50}/>
      </>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView
      >
        <AddFreeRoutineBody>
          <AddFreeRoutineHeader>
            <BackArrowButton/>
          </AddFreeRoutineHeader>
          <Steps step={step}/>
          <MarginVertical top={60}/>
          <InputArea>
            <StepNumber step={step}/>
            <MarginVertical top={20}/>
            <RoutineCategoryText>{categoryText[step-1]}</RoutineCategoryText>
            <RoutineQuestionText>{questionText[step-1]}</RoutineQuestionText>
            
            {step===1 ? <StepOwnContents/> : step === 2 ? <StepTwoContents/> : step === 3 ? <StepThreeContents/> : <StepFourContents/>} 
          </InputArea>
          <Button text={"다음 단계로"} handleButton={handleNextStep}/>
        </AddFreeRoutineBody>
      </ScrollView>
      <AddFreeRoutineBg source={add_free_routine_bg}/>
    </SafeAreaView>
  )
}

export default AddFreeRoutine


const AddFreeRoutineBody = styled.View`
  width:${size.width}px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const AddFreeRoutineBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const AddFreeRoutineHeader = styled.View`
  width:${size.width-50}px;
  height:50px;
  display:flex;
  justify-content:center;

`

const InputArea = styled.View`
  display:flex;
  align-items:flex-start;
  width:294px;
`

const RoutineCategoryText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
  line-height:34px;
`

const RoutineQuestionText = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain};
  line-height:34px;

`

const AnswerInputArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const AnswerInput = styled.TextInput`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain};
  width:294px;
  height:40px;
  padding:10px 0;
`

const BorderLine = styled.View`
  width:294px;
  height:.8px;
  background-color:#fff;
`

const SpareTimeAddButton = styled.TouchableOpacity`
  background-color:rgba(255,255,255,.4);
  width:294;
  height:70px;
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



