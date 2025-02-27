import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, TextInput, View } from 'react-native'

import savetime_bg from '../../../assets/savetime_bg.png';
import time_icon from '../../../assets/time_icon.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { size } from '../styles/size';
import styled from 'styled-components';
import BackArrowButton from '../components/BackArrowButton';
import MarginVertical from '../components/MarginVertical';
import { colors } from '../styles/colors';
import WeekCalandar from '../components/WeekCalandar';
import TimeSliderBar from '../components/TimeSliderBar';
import { getTimeDifference, minToHour } from '../../util';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useSaveTime } from '../../hooks/useSaveTime';

const AddSaveTime = ({route}) => {
  const {spareTimeEl} = route.params;
  const [selectedDate, setSelectedDate] = useState(!spareTimeEl?[]:spareTimeEl.days.map(day => day.slice(0, 3)))
  const [time, setTime] = useState({})
  const navigation = useNavigation();
  const {handleSaveSpareTime, handleDeleteSpareTime, handleEditSpareTime} = useSaveTime();
  const [title, setTitle] = useState("")

  useEffect(() => {
    console.log(spareTimeEl)
    console.log(selectedDate)
  }, [])

  const handleSaveButton = () => {
    if(!spareTimeEl){handleSaveSpareTime({title:title, startTime:time.startTime, endTime:time.endTime, days:selectedDate.map((el) => el === 'MON' ? "MONDAY" : el==="TUE" ? "TUESDAY" : el==="WED" ? "WEDNESDAY" : el==="THU" ? "THURSDAY" : el=="FRI" ? "FRIDAY" : el === "SAT" ? "SATURDAY" : "SUNDAY")})}
    else{handleEditSpareTime({id:spareTimeEl.id, title:title.length === 0 ? spareTimeEl.title:title, startTime:time.startTime, endTime:time.endTime, days:selectedDate.map((el) => el === 'MON' ? "MONDAY" : el==="TUE" ? "TUESDAY" : el==="WED" ? "WEDNESDAY" : el==="THU" ? "THURSDAY" : el=="FRI" ? "FRIDAY" : el === "SAT" ? "SATURDAY" : "SUNDAY")})}
  }

  const handleDeleteButton = () => {
    handleDeleteSpareTime(spareTimeEl.id)
    console.log(spareTimeEl.id)
  }
  

  return (
    <SafeAreaView>
      <AddSaveTimeBody showsVerticalScrollIndicator={false}>
        <AddSaveTimeHeader>
          <View style={{position:'absolute',left:0}}>
            <BackArrowButton/>
          </View>
          <AddSaveTimeText>자투리 시간</AddSaveTimeText>
        </AddSaveTimeHeader>
        <MarginVertical top={30}/>
        <Image source={time_icon} style={{width:35,height:42}}/>
        <AddSaveTimeText style={{color:colors.fontMain70}}>자투리 시간 1</AddSaveTimeText>
        <MarginVertical top={10}/>
        
        <SaveTimeTitle placeholder={!spareTimeEl?'자투리 시간 이름':spareTimeEl.title} placeholderTextColor={colors.gray70} value={title} onChange={(e) => setTitle(e.nativeEvent.text)}></SaveTimeTitle>
        
        <MarginVertical top={56}/>
        <AddSaveTimeText style={{color:colors.gray70}}>반복 요일</AddSaveTimeText>
        <MarginVertical top={16}/>
        <WeekCalandar selectedDate={selectedDate} setSelectedDate={setSelectedDate} isDuplication={true} version={'day'}/>
        <MarginVertical top={65}/>
        <SetTimeArea>
          <AddSaveTimeText style={{color:colors.fontMain90}}>총 시간</AddSaveTimeText>
          <AddSaveTimeText style={{color:colors.fontMain90, fontSize:26}}>{`${getTimeDifference(time.startTime, time.endTime)}`}</AddSaveTimeText>
          <MarginVertical top={32}/>
          <TimeSliderBar text={"부터"} setOutValue={setTime} version={"start"} type={"time"} timeInit={spareTimeEl.startTime}/>
          <MarginVertical top={65}/>
          <TimeSliderBar text={"까지"} setOutValue={setTime} version={"end"} type={"time"} timeInit={spareTimeEl.endTime}/>

        </SetTimeArea>
        <MarginVertical top={105}/>
        <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
          <Button text={"저장하기"} handleButton={handleSaveButton}/>
          <MarginVertical top={25}/>
          <TrashButton onPress={handleDeleteButton}>
            <FontAwesome name="trash-o" size={24} color={colors.fontMain80} />
          </TrashButton>
          <MarginVertical top={20}/>
        </View>
      </AddSaveTimeBody>
      <AddSaveTimeBg source={savetime_bg}/>
    </SafeAreaView>
  )
}

export default AddSaveTime


const AddSaveTimeBody = styled.ScrollView`
  width:${size.width}px;
  display:flex;
  padding:0 30px;
`

const AddSaveTimeBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const AddSaveTimeHeader = styled.View`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:50px;
`

const AddSaveTimeText = styled.Text`
  font-size:18px;
  font-weight:600;

`

const SaveTimeTitle = styled.TextInput`
font-size:24px;
font-weight:600;
color:${colors.fontMain};
width:200px;
`

const AddSaveTimeTitle = styled.Text`
  font-weight:600;
  font-size:34px;
  color:${colors.fontMain};
`

const TrashButton = styled.TouchableOpacity`

`

const SetTimeArea = styled.View`
  display:flex;
  align-items:center;
`

