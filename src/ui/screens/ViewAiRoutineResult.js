import React, { useEffect, useState } from 'react'
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

import ai_routine_result_bg from '../../../assets/home_bg.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import ai_routine_icon from '../../../assets/complete_icon.png';
import LinkIcon from '../components/LinkIcon';
import WeekCalandar from '../components/WeekCalandar';
import AssetEl from '../components/AssetEl';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import RoutineRepeatModal from '../components/RoutineRepeatModal';
import AssetLinkModal from '../components/AssetLinkModal';
import { useNavigation } from '@react-navigation/native';
import { minToHour } from '../../util';
import TodoEl from '../components/TodoEl';
import { useRoutine } from '../../hooks/useRoutine';

const ViewAiRoutineResult = ({route}) => {
  const data = [["영어 강의 1강","스픽", "1H 30M","06:00 - 07:00"],["영어 단어 10개 암기", "말해보카", "1H:00","07:30 - 08:30"]]
  const [isRoutineRepeatModalVisible, setIsRoutineRepeatModalVisible] = useState(false);
  const [isAssetLinkModalVisible, setIsAssetLinkModalVisible] = useState(false);
  const navigation = useNavigation();
  const {routineInfo, version} = route.params;
  const [selectedDate, setSelectedDate] = useState(version === "free" ? routineInfo.days:[]);
  const [invalidSavingList, setInvalidSavingList] = useState([]);
  const [pickedSaving, setPickedSaving] = useState(version === "free" ? [{title:routineInfo.accountTitle}]:[]);
  const {handleAddAiRoutine} = useRoutine();
  const [editRoutineTitle, setEditRoutineTitle] = useState("")
  const {handleEditRoutine} = useRoutine();

  useEffect(() => {
    // console.log(aiRoutineInfo.todos.reduce((sum,el) => sum + Number(el.duration),0))
    console.log(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    console.log({
      accountId:pickedSaving[0].id,
      title:editRoutineTitle.length === 0 ? routineInfo.title : editRoutineTitle,
      days:selectedDate,
      todos:routineInfo.todos.map((el) => ({
        title:el.title,
        startTime:el.startTime,
        endTime:el.endTime,
        linkApp:el.linkApp,
      }))
    })
  }, [selectedDate])
  



  const handleAddButton = () => {
    if(version !== "free"){
    handleAddAiRoutine({
      id:pickedSaving[0].id,
      title:routineInfo.title,
      startTime:routineInfo.todos[0].start_time,
      endTime:routineInfo.todos[routineInfo.todos.length-1].end_time,
      days:selectedDate,
      todos:routineInfo.todos.map((el) => ({
        title: el.title,
        startTime: el.start_time,
        endTime: el.end_time,
        linkApp: ""  // 기본값 설정
      }))
    });
    
    }else{
      handleEditRoutine({
        accountId:pickedSaving[0].id,
        title:editRoutineTitle.length === 0 ? routineInfo.title : editRoutineTitle,
        days:selectedDate,
      },routineInfo.id)
    }
  }
  

  return (
    <SafeAreaView>
      <ViewAiRoutineResultBody>
        <ViewAiRoutineResultHeader>
          <Text style={{fontWeight:600, fontSize:18, color:colors.darkGray}}>{version === "free" ? "루틴 수정하기":"생성된 루틴"}</Text>
        </ViewAiRoutineResultHeader>
        <MarginVertical top={44}/>
        <Image source={ai_routine_icon} style={{width:42, height:27}}/>
        <MarginVertical top={10}/>
        {version !== "free" ? <ViewAiRoutineResultTitle>{`${routineInfo.title}`}</ViewAiRoutineResultTitle>
        :<RoutineTitleInput placeholder={`${routineInfo.title}`} placeholderTextColor={colors.fontMain}
          value={editRoutineTitle} onChange={(e) => setEditRoutineTitle(e.nativeEvent.text)}
        />}
        <ViewAiRoutineResultTitle>{`${minToHour(routineInfo.todos.reduce((sum, el) => sum + Number(el.duration), 0))}`}</ViewAiRoutineResultTitle>
        <MarginVertical top={16}/>
        <TouchableOpacity style={{display:'flex', flexDirection:'row', gap:4}} onPress={() => setIsAssetLinkModalVisible(true)}>
          <LinkIcon size={16}/>
          <ViewAiRoutineResultText>{pickedSaving.length === 0 ? `적금 연결하기` : pickedSaving[0].title}</ViewAiRoutineResultText>
        </TouchableOpacity>
        <MarginVertical top={40}/>
        {/* <TouchableOpacity onPress={() => setIsRoutineRepeatModalVisible(true)}> */}
        <View>
          <WeekCalandar selectedDate={selectedDate} setSelectedDate={setSelectedDate} isDuplication={true} version={"day"}/>
        </View>
        <MarginVertical top={47}/>
        <View style={{width:310}}>
          <TodoCountText>{`총 ${routineInfo.todos.length}개의 할 일`}</TodoCountText>
        </View>
        <ScrollView style={{height:'40%'}} showsVerticalScrollIndicator={false}>
          <MarginVertical top={40}/>
          {routineInfo.todos.map((el,index) => {
            return(
              <View key={index}>
                <TodoEl data={[el.title,"", `${minToHour(el.duration)}`, version === "free" ? `${el.startTime.slice(0,6)} - ${el.endTime.slice(0,6)}`:`${el.start_time} - ${el.end_time}`]} index={index} isTouchable={false}/>
                <MarginVertical top={40}/>
              </View>
            )
        })}
        </ScrollView>

        <View>
          <Button text={version === "free" ? "루틴 수정하기":"루틴 완성하기"} handleButton={handleAddButton}/>
        </View>
      </ViewAiRoutineResultBody>
      <RoutineRepeatModal isRoutineRepeatModalVisible={isRoutineRepeatModalVisible} setIsRoutineRepeatModalVisible={setIsRoutineRepeatModalVisible}/>
      <AssetLinkModal
        isAssetLinkModalVisible={isAssetLinkModalVisible}
        setIsAssetLinkModalVisible={setIsAssetLinkModalVisible}
        invalidSavingList={invalidSavingList} 
        setInvalidSavingList={setInvalidSavingList}
        setPickedSaving={setPickedSaving}
      />
      <ViewAiRoutineResultBg source={ai_routine_result_bg}/>
    </SafeAreaView>
  )
}

export default ViewAiRoutineResult


const ViewAiRoutineResultBody = styled.View`
  width:${size.width}px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ViewAiRoutineResultBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const ViewAiRoutineResultHeader = styled.View`
  width:${size.width-60}px;
  display:flex;
  justify-content:center;
  align-items:center;
  height:40px;
  flex-direction:row;

`

const ViewAiRoutineResultTitle = styled.Text`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain};
  text-align:center;
`

const ViewAiRoutineResultText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
`

const TodoCountText = styled.Text`
  font-size:22px;
  font-weight:600;
  color:#707172;
`

const RoutineTitleInput = styled.TextInput`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain};
  text-align:center;
`

