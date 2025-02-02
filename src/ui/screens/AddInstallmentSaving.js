import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
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
import DoubleButton from '../components/DoubleButton';
import search_icon from '../../../assets/search_icon.png';
import AssetEl from '../components/AssetEl';

const AddFreeRoutine = () => {
  const [step, setStep] = useState(1);
  const categoryText = ["이름", "기본 설정", "루틴 연결", "시간 설정"];
  const questionText = ["적금의 이름을\n지어주세요!","새로 만들 적금을\n소개해주세요!","적금에 루틴을\n연결시켜 볼까요?","얼마동안, 얼마만큼의\n시간을 모을까요?" ]
  const navigation = useNavigation();
  const data = [["영어 강의 1강", "스픽", "1H 30M", "06:00 - 07:00"], ["영어 단어 10개 암기", "말해보카", "1H 00M", "07:30 - -8:30"]]
  
  const handleNextStep = () => {
    if(step<4){
      setStep(prev => prev+1)
    } else {
      navigation.navigate("CompleteAddSaving")
    }
  }

  const Data = [
    {
      title:"총 2개의 루틴",
      data:[["영어 천재 적금", "아침에는 영어 공부","1H 25M","D-120"], ["독서 적금", "저녁에는 독서","2H 50M","D-77"]]
    },{
      title:"선택된 루틴",
      data:[["프랑스어 적금", "프랑스어 공부 루틴", "30M","D-1"]]
    }
  ]

  const RenderItem = ({item, index}) => {
    return(
      <View>
        <AssetEl item={item} index={index} isLink={true} category={"Save"}/>
        <MarginVertical top={50}/>
      </View>
    )
  }

  const ListHeader = ({title}) => {

    return(
      <>
      
      <View>
        <Text style={{fontSize:18, fontWeight:600, color:"#fff"}}>{title}</Text>
        <MarginVertical top={40}/>
      </View>
      </>
    )
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
        <MarginVertical top={12}/>
        <RoutineCategoryText style={{lineHeight:24}}>적금으로 달성하고 싶은{"\n"}목표를 추가해보세요!</RoutineCategoryText>
        <MarginVertical top={56}/>
        <Text style={{fontWeight:600, fontSize:18, color:"#fff"}}>목표</Text>
        <MarginVertical top={11}/>
        <AnswerInputArea>
          <AnswerInput
            placeholder="ex) 영어 100문장 말하기"
            placeholderTextColor="rgba(255,255,255,.8)"
          />
          <Image source={check_icon_indigo} style={{width:30, height:30, position:'absolute', right:0}}/>
        </AnswerInputArea>
        <BorderLine/>
        <MarginVertical top={100}/>
        <Text style={{fontWeight:600, fontSize:18, color:"#fff"}}>공개 범위</Text>
        <MarginVertical top={15}/>
        <DoubleButton text1={"공개"} text2={"비공개"}/>
        <MarginVertical top={30}/>
      </View>
    )
  }

  const StepThreeContents = () => {
    return(
      <>
        <MarginVertical top={12}/>
        <RoutineCategoryText style={{lineHeight:24}}>루틴으로 얻은 시간이{"\n"}자동으로 적금에 쌓여요!</RoutineCategoryText>
        <MarginVertical top={44}/>
        <AnswerInputArea>
          <AnswerInput
            placeholder="루틴을 검색해보세요"
            placeholderTextColor="rgba(255,255,255,.8)"
          />
          <Image source={search_icon} style={{width:16, height:16, position:'absolute', right:15}}/>
        </AnswerInputArea>
        <BorderLine/>
        <MarginVertical top={55}/>
        <SectionList
          sections={Data}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index}></RenderItem>
          )}
          renderSectionHeader={({section: {title}}) => (
            <ListHeader title={title}/>
          )}
        
        ></SectionList>
        <MarginVertical top={70}/>
        <TouchableOpacity style={{width:294, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontWeight:500, fontSize:14, color:colors.gray70}}>나중에 설정하기</Text>
        </TouchableOpacity>
        <MarginVertical top={10}/>
      </>
    )
  }

  const StepFourContents = () => {
    return(
      <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:294}}>
      <MarginVertical top={70}/>
      
        <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80, marginBottom:5}}>12개월 뒤에</Text>
        <Text style={{fontWeight:600, fontSize:26, color:colors.fontMain90}}>+365H 50M</Text>
        <MarginVertical top={20}/>
        <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80,marginBottom:5}}>연 3.7%</Text>
        <Text style={{fontWeight:600, fontSize:26, color:colors.indigoBlue}}>+10,800P</Text>
      <MarginVertical top={50}/>
      <Text style={{fontSize:18, fontWeight:500, color:colors.fontMain80, marginBottom:5}}>한 달에</Text>
      <TimeSliderBar text={"씩"}/>
      <MarginVertical top={65}/>
      <TimeSliderBar text={"동안"}/>
      <MarginVertical top={56}/>
      <Text style={{fontSize:14, fontWeight:500, color:colors.darkGray, textAlign:'center'}}>멋져요!{"\n"}12개월 뒤에는{"\n"}<Text style={{color:colors.indigoBlue}}>영어 100 문장</Text> 목표를 달성할 수 있어요!</Text>
      <MarginVertical top={8}/>
      </View>
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


