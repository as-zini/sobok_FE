import React, { useCallback, useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, SectionList, Text, View } from 'react-native'
import styled from 'styled-components'

import routine_icon from '../../../assets/routine_icon.png';
import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import BackArrowButton from '../components/BackArrowButton';
import DropDownArrowButton from '../components/DropDownArrowButton';
import { size } from '../styles/size';
import AssetEl from '../components/AssetEl';
import WeekCalandar from '../components/WeekCalandar';
import dayjs from 'dayjs';
import { useRoutine } from '../../hooks/useRoutine';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { minToHour } from '../../util';
import { useFocusEffect } from '@react-navigation/native';

const ViewRoutineListScreen = () => {
  const[isList,setIsList] = useState(true);
  const WeekOfToday = dayjs().format("MMMM YYYY")
  const {getRoutineByList, getRoutineByCalandar} = useRoutine();
  const [routineInfo, setRoutineInfo] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().get("date"));
  const [todayRoutineList, setTodayRoutineList] = useState([])
  const [isNextMonth, setIsNextMonth] = useState(false);
  
  let totalTime = 0;
  for(let i = 0; i<routineInfo.length;i++){
    totalTime += routineInfo[i].duration
  }

  useEffect(() => {
    console.log("selecte",selectedDate)
  }, [selectedDate])
  

  useFocusEffect(
    useCallback(() => {
      if(isList)getRoutineByList(setRoutineInfo, setIsComplete)
      else getRoutineByCalandar(selectedDate, setTodayRoutineList, isNextMonth)
      
    }, [isComplete, isList, selectedDate]),
  )
  
  const ingRoutine = routineInfo.filter((el) => el.isSuspended === false);
  const suspendedRoutine = routineInfo.filter((el) => el.isSuspended === true);

  const DataForList = [
    {
      title:["진행 중인 루틴", ingRoutine.length],
      data:ingRoutine.map((el) => [el.title, el.accountTitle, minToHour(el.duration), "", el.id])
    },
    {
      title:["보류한 루틴", suspendedRoutine.length],
      data:suspendedRoutine.map((el) => [el.title, el.accountTitle, minToHour(el.duration),"", el.id])
    },
    {
      title:["완료한 루틴", 0],
      data:[]
    }
  ]


  const RenderItem = ({item, index}) => {
    return(
      
      <>
        <AssetEl item={item} index={index} isLink={item[2] === "" ? false : true} category={"Routine"} isTouchable={true}/>
        <MarginVertical top={50}/>
      </>
      
      
    )
  }

  const ListHeader = ({title, version}) => {

    return(
      
      <>
      {title[0] === "만기된 적금" ? <View style={{width:310, height:.8, backgroundColor:"white", zIndex:9, marginBottom:30}}></View> : <></>}
      <SectionEl>
        {version ? 
        <>
          <SectionTitle>{title[0]}</SectionTitle>
          <SectionCountText>{title[1]}</SectionCountText>
        </>
        :
        <>
        <Text style={{fontSize:14, fontWeight:500, color:"#707172", marginBottom:-10}}>{title}</Text>
        </>
        }
      </SectionEl>
      </>
    )
  }

  return (
    <SafeAreaView>
      <ViewRoutineListBody>
        <MarginVertical top={12}/>
        <ViewRoutineListHeader>
          <View style={{position:'absolute', left:20}}>
            <BackArrowButton/>
          </View>
          <ChangeViewMethodButton onPress={() => setIsList((prev) => !prev)}>
            <ChangeViewMethodButtonText>{isList ? "리스트" : "캘린더"}</ChangeViewMethodButtonText>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="white"/>
          </ChangeViewMethodButton>
        </ViewRoutineListHeader>
        <MarginVertical top={45}/>
        {isList ?
        <TotalRoutineArea>
          <Image source={routine_icon} style={{width:51, height:33}}/>
          <MarginVertical top={18}/>
          <TotalRoutineText>{`총 ${routineInfo.filter((el) => !el.isSuspended).length}개의 루틴`}</TotalRoutineText>
          <MarginVertical top={5}/>
          <TotalRoutineTitle>{`${minToHour(routineInfo.filter((el) => !el.isSuspended).reduce((sum,time) => sum+=time.duration,0))}`}</TotalRoutineTitle>
        </TotalRoutineArea>
        :
        <>
          <Text style={{fontWeight:600, fontSize:18, color:colors.darkGray}}>{WeekOfToday}</Text>
          <MarginVertical top={33}/>
          <WeekCalandar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setIsNextMonth={setIsNextMonth} version={"date"}/>
          <MarginVertical top={58}/>
          <View style={{display:'flex', alignItems:'flex-start', width:310}}>
            <SectionTitle>{`총 ${todayRoutineList.length}개의 루틴`}</SectionTitle>
          </View>
        </>
        }
        <MarginVertical top={isList ? 72 : 23}/>
        {isList ?
        <ScrollView style={{marginBottom:200}} showsVerticalScrollIndicator={false}>
        <SectionList
          sections={DataForList}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index}></RenderItem>
          )}
          renderSectionHeader={({section: {title}}) => (
            <ListHeader title={title} version={isList}/>
          )}
          style={{marginBottom:1000}}
        >
        </SectionList>
        </ScrollView>
        :
        <></>
          }
        <ScrollView style={{marginBottom:620}} showsVerticalScrollIndicator={false}>
        {!isList ? 
        todayRoutineList.map((el,index) => {
          return(
            <View key={index}>
            <View style={{width:'100%'}}>
              <Text style={{fontSize:14, fontWeight:500, color:"#707172", marginBottom:-10}}>{`${el.startTime} - ${el.endTime}`}</Text>
            </View>
            <MarginVertical top={24}/>
            <AssetEl item={[el.title, el.accountTitle, minToHour(el.duration),"", el.id]} index={index} isLink={true} category={"Routine"} isTouchable={true}/>
            <MarginVertical top={40}/>
            </View>
          )
        }): <></>}
        </ScrollView>
        
      </ViewRoutineListBody>
      <ViewRoutineListBg source={installment_saving_bg}/>
    </SafeAreaView>
  )
}

export default ViewRoutineListScreen


const ViewRoutineListBody = styled.View`
  display:flex;
  align-items:center;
  
  
`

const ViewRoutineListBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  height:${size.height}px;
  z-index:-1;
  
`

const ViewRoutineListHeader = styled.View`
  display:flex;
  flex-direction:row;
  width:${size.width}px;
  justify-content:center;
  align-items:center;
  
`

const ChangeViewMethodButton = styled.TouchableOpacity`
  width:90px;
  height:32px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:12px;
  padding:0 20px;
  background-color:${colors.indigoBlue50};
  border-radius:29px;
`

const ChangeViewMethodButtonText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:#fff;
  margin-right:-5px;
`

const TotalRoutineArea = styled.View`
  width:310px;
`

const TotalRoutineText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain90};
`

const TotalRoutineTitle = styled.Text`
  font-size:48px;
  font-weight:600;
  color:${colors.fontMain};
`

const SectionEl = styled.View`
  display:flex;
  flex-direction:row;
  gap:4px;
  margin-bottom:35px;
`

const SectionTitle = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#707172;
`

const SectionCountText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${colors.indigoBlue};
`



