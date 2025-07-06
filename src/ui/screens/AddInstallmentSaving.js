import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import styled from '@emotion/native';

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
import { useRoutine } from '../../hooks/useRoutine';
import { minToHour } from '../../util';
import ConnectRoutine from '../components/ConnectRoutine';

const AddFreeRoutine = () => {
  const [step, setStep] = useState(1);
  const categoryText = ["이름", "기본 설정", "루틴 연결", "시간 설정"];
  const questionText = ["적금의 이름을\n지어주세요!","새로 만들 적금을\n소개해주세요!","적금에 루틴을\n연결시켜 볼까요?","얼마동안, 얼마만큼의\n시간을 모을까요?" ]
  const navigation = useNavigation();
  const data = [["영어 강의 1강", "스픽", "1H 30M", "06:00 - 07:00"], ["영어 단어 10개 암기", "말해보카", "1H 00M", "07:30 - -8:30"]]
  const [newSavingData, setNewSavingData] = useState({title:"",target:"", isPublic:true, time:0, duration:0, routineIds:[]});
  const [routineInfo, setRoutineInfo] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [pickedRoutines, setPickedRoutines] = useState([]);
  const {getRoutineByList} = useRoutine();
  const [savingTime, setSavingTime] = useState(0);
  const [duration,setDuration] = useState(0);
  const interest = newSavingData.time < 600 ? .3 : newSavingData.time < 1200 ? .4 : newSavingData.time < 2400 ? .5 : .7
  
  const handleNextStep = () => {
    if(step<4){
      setStep(prev => prev+1)
    } 
    else {
      navigation.navigate("CompleteAddSaving",{
        newSavingData:newSavingData,
        routineTitle:pickedRoutines.length > 0 ? `${pickedRoutines[0].title}외 ${pickedRoutines.length-1}개 루틴` : ""
      })
    }
    if(step===3){
      setNewSavingData(prev => ({...prev, routineIds:pickedRoutines.map((el) => el.id)}))
    }
  }

  useEffect(() => {
    console.log(newSavingData)
  }, [newSavingData])
  
  useEffect(() => {
    console.log(pickedRoutines)
  },[pickedRoutines])

  return (
    <SafeAreaView>
      
      {step !== 4 ?
      <AddFreeRoutineBody>
          <AddFreeRoutineHeader>
            <BackArrowButton/>
          </AddFreeRoutineHeader>
          <View style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Steps step={step}/>
          </View>
          <MarginVertical top={60}/>
          <InputArea>
            <StepNumber step={step}/>
            <MarginVertical top={20}/>
            <RoutineCategoryText>{categoryText[step-1]}</RoutineCategoryText>
            {step===3 ? <></>:<RoutineQuestionText>{questionText[step-1]}</RoutineQuestionText>}
            
            {step===1 ?
              <>
              <MarginVertical top={40}/>
              <AnswerInputArea>
                <AnswerInput
                  placeholder="이름을 입력해주세요"
                  placeholderTextColor="rgba(255,255,255,.8)"
                  value={newSavingData.title}
                  onChange={(e) => setNewSavingData({...newSavingData, title:e.nativeEvent.text})}
                />
              </AnswerInputArea>
              <BorderLine/>
              <MarginVertical top={296}/>
            </>
            : step === 2 ? 
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
                  value={newSavingData.target}
                  onChange={(e) => setNewSavingData({...newSavingData, target:e.nativeEvent.text})}
                />
              </AnswerInputArea>
              <BorderLine/>
              <MarginVertical top={180}/>
            </View>
            : step === 3 ?
            <View style={{width: '100%' }}>
              <ConnectRoutine pickedRoutines={pickedRoutines} setPickedRoutines={setPickedRoutines} setStep={setStep}/>
              <MarginVertical top={40}/>
            </View>
            :
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
              <MarginVertical top={70}/>
              
                <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80, marginBottom:5}}>{`${newSavingData.duration}개월 뒤에`}</Text>
                <Text style={{fontWeight:600, fontSize:26, color:colors.fontMain90}}>{`+${minToHour(newSavingData.time*newSavingData.duration)}`}</Text>
                <MarginVertical top={20}/>
                <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80,marginBottom:5}}>{`월 ${interest*10}%`}</Text>
                <Text style={{fontWeight:600, fontSize:26, color:colors.indigoBlue}}>{`+${Math.floor(newSavingData.time*interest)}P`}</Text>
              <MarginVertical top={50}/>
              <Text style={{fontSize:18, fontWeight:500, color:colors.fontMain80, marginBottom:5}}>한 달에</Text>
              <TimeSliderBar text={"씩"} setOutValue={setNewSavingData} type={"savingtime"}/>
              <MarginVertical top={65}/>
              <TimeSliderBar text={"동안"} setOutValue={setNewSavingData} type={"duration"}/>
              <MarginVertical top={56}/>
              <Text style={{fontSize:14, fontWeight:500, color:colors.darkGray, textAlign:'center'}}>{`멋져요!\n${newSavingData.duration}개월 뒤에 이자와 함께 찾아올게요!`}</Text>
              <MarginVertical top={8}/>
            </View>
            </ScrollView>}
            
          </InputArea>
          {step !== 4 ?
          <View style={{position:'absolute', bottom:150, justifyContent:'center', alignItems:'center'}}>
            <Button text={"다음 단계로"} handleButton={handleNextStep} unChecked={step===1&&newSavingData.title.length === 0 ? true: step===2 && newSavingData.target.length === 0 ? true:false}/>
          </View>
          :
          <View style={{marginTop: step === 3 ? 20 : 'auto', marginBottom: 40}}>
            <Button text={"다음 단계로"} handleButton={handleNextStep} unChecked={step===1&&newSavingData.title.length === 0 ? true: step===2 && newSavingData.target.length === 0 ? true:false}/>
          </View>
          }
          
        
        
        </AddFreeRoutineBody>
        :
        <ScrollView showsVerticalScrollIndicator={false}>
        <AddFreeRoutineBody>
          <AddFreeRoutineHeader>
            <BackArrowButton/>
          </AddFreeRoutineHeader>
          <View style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Steps step={step}/>
          </View>
          <MarginVertical top={60}/>
          <InputArea>
            <StepNumber step={step}/>
            <MarginVertical top={20}/>
            <RoutineCategoryText>{categoryText[step-1]}</RoutineCategoryText>
            {step===3 ? <></>:<RoutineQuestionText>{questionText[step-1]}</RoutineQuestionText>}
            
            
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
              <MarginVertical top={70}/>
              
                <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80, marginBottom:5}}>{`${newSavingData.duration}개월 뒤에`}</Text>
                <Text style={{fontWeight:600, fontSize:26, color:colors.fontMain90}}>{`+${minToHour(newSavingData.time*newSavingData.duration)}`}</Text>
                <MarginVertical top={20}/>
                <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80,marginBottom:5}}>{`월 ${interest*10}%`}</Text>
                <Text style={{fontWeight:600, fontSize:26, color:colors.indigoBlue}}>{`+${Math.floor(newSavingData.time*interest)}P`}</Text>
              <MarginVertical top={50}/>
              <Text style={{fontSize:18, fontWeight:500, color:colors.fontMain80, marginBottom:5}}>한 달에</Text>
              <TimeSliderBar text={"씩"} setOutValue={setNewSavingData} type={"savingtime"}/>
              <MarginVertical top={65}/>
              <TimeSliderBar text={"동안"} setOutValue={setNewSavingData} type={"duration"}/>
              <MarginVertical top={56}/>
              <Text style={{fontSize:14, fontWeight:500, color:colors.darkGray, textAlign:'center'}}>{`멋져요!\n${newSavingData.duration}개월 뒤에 이자와 함께 찾아올게요!`}</Text>
              <MarginVertical top={8}/>
            </View>
            
            
          </InputArea>
          {step !== 4 ?
          <View style={{position:'absolute', bottom:150, justifyContent:'center', alignItems:'center'}}>
            <Button text={"다음 단계로"} handleButton={handleNextStep} unChecked={step===1&&newSavingData.title.length === 0 ? true: step===2 && newSavingData.target.length === 0 ? true:false}/>
          </View>
          :
          <View style={{marginTop: step === 3 ? 20 : 'auto', marginBottom: 40}}>
            <Button text={"다음 단계로"} handleButton={handleNextStep} unChecked={step===1&&newSavingData.title.length === 0 ? true: step===2 && newSavingData.target.length === 0 ? true:false}/>
          </View>
          }
          
        
        
        </AddFreeRoutineBody>
        </ScrollView>
      }
      <AddFreeRoutineBg source={add_free_routine_bg}/>
    </SafeAreaView>
  )
}

export default AddFreeRoutine


const AddFreeRoutineBody = styled.View`
  width:${() => `${size.width}px`};
  display:flex;
  align-items:center;
  min-height:${() => `${size.height}px`}px;
  padding:0 30px;
  position:relative;
`

const AddFreeRoutineBg = styled.Image`
  position:absolute;
  top:0;
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  z-index:-1;
`

const AddFreeRoutineHeader = styled.View`
  width:${() => `${size.width-50}px`};
  height:50px;
  display:flex;
  justify-content:center;
`

const InputArea = styled.View`
  display:flex;
  align-items:flex-start;
  width:100%;
  padding:0 10px;
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
  display:flex;
  justify-content:center;
  align-items:center;
`

const SpareTimeButtonText = styled.Text`
  color:#fff;
  font-weight:500;
  font-size:24px;
`