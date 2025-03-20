import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import installment_icon from '../../../assets/save_icon.png';
import MarginVertical from '../components/MarginVertical';
import { Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import LinkIcon from '../components/LinkIcon';
import DoubleButton from '../components/DoubleButton';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import AssetEl from '../components/AssetEl';
import CalandarModal from '../components/CalandarModal';
import routine_icon from '../../../assets/routine_icon.png';
import trash_icon from '../../../assets/trash_icon.png';
import snow_flake_icon_white from '../../../assets/snow_flake_icon_white.png';
import RoutinePauseModal from '../components/RoutinePauseModal';
import { useRoutine } from '../../hooks/useRoutine';
import { minToHour } from '../../util';
import TodoEl from '../components/TodoEl';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import baseUrl from '../../api/baseURL';

const DetailRoutineScreen = ({route}) => {
  const [isPauseModalVisible, setIsPauseModalVisible] = useState(false);
  const {id} = route.params;
  // const {getRoutineDetail} = useRoutine();
  const {handleRoutineDelete} = useRoutine();
  const [routineDetailInfo, setRoutineDetailInfo] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const getRoutineDetail = async(id, setRoutineDetailInfo, setIsComplete) => {
    try {
      const response = await axios.get(`https://sobok-app.com/routine/detail?routineId=${id}`)
      console.log("detail",response.data)
      setRoutineDetailInfo(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
    console.log(id)
    getRoutineDetail(id, setRoutineDetailInfo, setIsComplete);
  }, [isComplete, isPauseModalVisible])
  

  const Data = [
    {
      title:"",
      data:Object.keys(routineDetailInfo).length !== 0 ?routineDetailInfo.todos.map((el) => [el.title, el.linkApp, minToHour(el.duration), `${el.startTime.slice(0,5)} - ${el.endTime.slice(0,5)}`]) : []
    }
  ]

  const ListHeader = ({title}) => {
    return(
      <>
        <Text style={{color:"#707172", fontWeight:500, fontSize:14}}>{title}</Text>
        
      </>
    )
  }

  const LenderItem = ({item, index, todoInfo, routineTitle}) => {
    return(
      <>
        <TodoEl data={item} index={index} todoInfo={todoInfo} routineTitle={routineTitle} isTouchable={true}/>
        <MarginVertical top={40}/>
      </>
    )
  }

  const BlurChild = () => {
    return(
      <View style={{paddingHorizontal:30, paddingVertical:40}}>
        <View style={{display:'flex', flexDirection:'row', gap:4}}>
          <TotalRoutineCount>총 2개의 할 일</TotalRoutineCount>
        </View>
        <MarginVertical top={32}/>
        <SectionList
            sections={Data}
            keyExtractor={(item, index) => item + index}
            scrollEnabled={false}
            renderItem={({item, index, todoInfo}) => (
              <LenderItem item={item} index={index} todoInfo={routineDetailInfo.todos[index]} routineTitle={routineDetailInfo.title}></LenderItem>
            )}
            renderSectionHeader={({section: {title}}) => (
              <ListHeader title={title}/>
            )}
          >
        </SectionList>
      </View>
    )
  }

  
  
  return (
    <>
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
      <DetailInstallmentSavingBody>
        <MarginVertical top={20}/>
        <DetailInstallmentSavingHeader>
          <View style={{position:'absolute', left:20}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.fontSub}}>{"루틴"}</Text>
          <TouchableOpacity style={{position:'absolute',right:20}} onPress={() => handleRoutineDelete(routineDetailInfo.id)}>
            <Ionicons name="trash-outline" size={24} color={colors.fontMain80} />
          </TouchableOpacity>
        </DetailInstallmentSavingHeader>
        <MarginVertical top={47}/>
        <SavingIntroArea>
          <Image source={routine_icon} style={{width:51, height:33}}/>
          <MarginVertical top={18}/>
          <LinkedRoutineText>{routineDetailInfo.title}</LinkedRoutineText>
          <MarginVertical top={5}/>
          <TotalSavingTitle>{minToHour(routineDetailInfo.duration)}</TotalSavingTitle>
          <MarginVertical top={32}/>
          <View style={{flexDirection:'row', gap:5}}>
          {Object.keys(routineDetailInfo).length !== 0 ? routineDetailInfo.days.map((el, index) => {
            return(
            <InterestText key={index}>{el === "MON" || el==="MONDAY" ? "월" : el === "TUE"|| el==="TUESDAY" ? "화" : el==="WED"|| el==="WEDNESDAY" ? "수" : el==="THU"|| el==="THURSDAY" ? "목" : el==="FRI"|| el==="FRIDAY" ? "금" : el ==="SAT"|| el==="SATURDAY" ? "토" : "일"}</InterestText>
            )
          }) : null}
          </View>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <PushPeriodText style={{flexGrow:1}}>{Object.keys(routineDetailInfo).length === 0 ? "" : `${routineDetailInfo.startTime.slice(0,5)} - ${routineDetailInfo.endTime.slice(0,5)}`}</PushPeriodText>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:8}}>
              <LinkIcon size={16}/>
              <PushPeriodText>{routineDetailInfo.accountTitle}</PushPeriodText>
            </View>
          </View>
        </SavingIntroArea>
        <MarginVertical top={40}/>
        <DoubleButton text1={"루틴 수정하기"} text2={routineDetailInfo.isSuspended ? "루틴 재개하기":"루틴 보류하기"} handleRightButton={() => setIsPauseModalVisible(true)}/>
        
        <MarginVertical top={40}/>
        
        <BlurComponent child={BlurChild}/>
        <RoutinePauseModal isPauseModalVisible={isPauseModalVisible} setIsPauseModalVisible={setIsPauseModalVisible} version={"Routine"} id={id} setRoutineDetailInfo={setRoutineDetailInfo} setIsComplete={setIsComplete} isPause={routineDetailInfo.isSuspended}/>
      </DetailInstallmentSavingBody>
      
      </ScrollView>
      
      <DetailInstallmentSavingBg source={installment_saving_bg}/>
      
    </SafeAreaView>
    <RoutineCompleteBar>
      <RoutineCompleteBg />
      <CompleteIcon source={snow_flake_icon_white}/>
      <CompleteBarText>완료하기</CompleteBarText>
  </RoutineCompleteBar>
  </>
  )
}

export default DetailRoutineScreen;

const DetailInstallmentSavingBody = styled.View`
  display:flex;
  align-items:center;
  width:${size.width}px;
  z-index:1;
  margin-bottom:30px;
`

const DetailInstallmentSavingBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const DetailInstallmentSavingHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:${size.width};
`

const SavingIntroArea = styled.View`
  width:310px;
`

const LinkedRoutineText = styled.Text`
  font-size:22px;
  font-weight:600;
  color:${colors.fontMain90};
`

const TotalSavingTitle = styled.Text`
  font-size:48px;
  font-weight:600;
  color:${colors.fontMain};
`

const InterestText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:${colors.fontMain70};
  line-height:24px;
`

const PushPeriodText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:${colors.fontMain70};
  line-height:25px;
`



const TotalRoutineCount = styled.Text`
  color:#707172;
  font-weight:600;
  font-size:20px;
`

const RoutineCompleteBar = styled.View`
  position:absolute;
  bottom:0;
  width:${size.width}px;
  height:110px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:white;
  
`

const RoutineCompleteBg = styled.TouchableOpacity`
  z-index:1;
  
  background-color:${colors.indigoBlue50};
  width:100%;
  height:100%;
  position:absolute;
  top:0;
`

const CompleteIcon = styled.Image`
  width:20px;
  height:20px;
  margin-bottom:10px;
  z-index:2;
`

const CompleteBarText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#fff;
  z-index:2;
`







