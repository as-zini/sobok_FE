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

const ViewAiRoutineResult = ({route}) => {
  const data = [["영어 강의 1강","스픽", "1H 30M","06:00 - 07:00"],["영어 단어 10개 암기", "말해보카", "1H:00","07:30 - 08:30"]]
  const [isRoutineRepeatModalVisible, setIsRoutineRepeatModalVisible] = useState(false);
  const [isAssetLinkModalVisible, setIsAssetLinkModalVisible] = useState(false);
  const navigation = useNavigation();
  const {aiRoutineInfo} = route.params;
  const [selectedDate, setSelectedDate] = useState([]);

  useEffect(() => {
    // console.log(aiRoutineInfo.todos.reduce((sum,el) => sum + Number(el.duration),0))
    console.log("route",aiRoutineInfo)
  }, [])
  

  return (
    <SafeAreaView>
      <ViewAiRoutineResultBody>
        <ViewAiRoutineResultHeader>
          <View style={{position:'absolute', left:0}}>
          <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.darkGray}}>생성된 루틴</Text>
        </ViewAiRoutineResultHeader>
        <MarginVertical top={44}/>
        <Image source={ai_routine_icon} style={{width:42, height:27}}/>
        <ViewAiRoutineResultTitle>{`${aiRoutineInfo.title}\n${minToHour(aiRoutineInfo.todos.reduce((sum, el) => sum + Number(el.duration), 0))}`}</ViewAiRoutineResultTitle>
        <TouchableOpacity style={{display:'flex', flexDirection:'row', gap:4}} onPress={() => setIsAssetLinkModalVisible(true)}>
          <LinkIcon size={16}/>
          <ViewAiRoutineResultText>적금 연결하기</ViewAiRoutineResultText>
        </TouchableOpacity>
        <MarginVertical top={40}/>
        <TouchableOpacity onPress={() => setIsRoutineRepeatModalVisible(true)}>
          <WeekCalandar selectedDate={selectedDate} setSelectedDate={setSelectedDate} isDuplication={true} version={"day"}/>
        </TouchableOpacity>
        <MarginVertical top={47}/>
        <View style={{width:310}}>
          <TodoCountText>{`총 ${aiRoutineInfo.todos.length}개의 할 일`}</TodoCountText>
        </View>
        <ScrollView style={{height:'40%'}} showsVerticalScrollIndicator={false}>
          <MarginVertical top={40}/>
          {aiRoutineInfo.todos.map((el,index) => {
            return(
              <View key={index}>
                <AssetEl item={[el.title,"", `${minToHour(el.duration)}`, `${el.start_time} - ${el.end_time}`]} index={index} isLink={false} isTouchable={false}/>
                <MarginVertical top={40}/>
              </View>
            )
        })}
        </ScrollView>

        <View>
          <Button text={"루틴 완성하기"} handleButton={() => navigation.navigate("AiRoutineComplete",{isComplete:true})}/>
        </View>
      </ViewAiRoutineResultBody>
      <RoutineRepeatModal isRoutineRepeatModalVisible={isRoutineRepeatModalVisible} setIsRoutineRepeatModalVisible={setIsRoutineRepeatModalVisible}/>
      <AssetLinkModal isAssetLinkModalVisible={isAssetLinkModalVisible} setIsAssetLinkModalVisible={setIsAssetLinkModalVisible} />
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
  line-height:34px;
  margin-bottom:12px;
  margin-top:16px;
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

