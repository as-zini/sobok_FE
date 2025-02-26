import React, { useState } from 'react'
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { size } from '../styles/size'

import savetime_bg from '../../../assets/savetime_bg.png'
import BackArrowButton from '../components/BackArrowButton'
import time_icon from '../../../assets/time_icon.png';
import MarginVertical from '../components/MarginVertical'
import { colors } from '../styles/colors'
import WeekCalandar from '../components/WeekCalandar'
import dayjs from 'dayjs'
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native'

const ViewSaveTime = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('ddd').toUpperCase())
  const navigation = useNavigation();
  const timeData = [["06:00","출근 시간","06:00 - 7:40","1H 20M"],["06:00","출근 시간","06:00 - 7:40","1H 20M"],["06:00","출근 시간","06:00 - 7:40","1H 20M"]]
  

  return (
    <SafeAreaView>
      <ViewSaveTimeBody>
        <ViewSaveTimeHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <SaveTimeText style={{color:"#4c4c4c"}}>자투리 시간</SaveTimeText>
        </ViewSaveTimeHeader>
        <MarginVertical top={30}/>
        <Image source={time_icon} style={{width:40, height:48}}/>
        <MarginVertical top={15}/>
        <SaveTimeText style={{color:colors.fontMain90}}>{`화요일\n자투리 시간`}</SaveTimeText>
        <SaveTimeTitle>{`3H 15M`}</SaveTimeTitle>
        <MarginVertical top={40}/>
        <WeekCalandar selectedDate={selectedDate} setSelectedDate={setSelectedDate} version={'day'}/>
        <MarginVertical top={32}/>
        <HorizonBorderLine/>
        <MarginVertical top={26}/>
        {timeData.map((el,index) => {
          return(
            <View key={index}>
            <View style={{flexDirection:'row', gap:14, alignItems:'flex-start'}}>
              <View style={{justifyContent:'center', alignItems:'center',width:64,gap:12}}>
                <TimeLabel>
                  <SaveTimeText style={{color:"#fff"}}>{el[0]}</SaveTimeText>
                </TimeLabel>
                <VerticalBorderLine/>
              </View>
              <View style={{height:40, flexGrow:1}}>
                <MarginVertical top={5}/>
                <SaveTimeText style={{color:"#343434"}}>{el[1]}</SaveTimeText>
                <MarginVertical top={12}/>
                <SaveTimeText style={{fontSize:16, color:"rgba(112, 113, 114, 0.8)"}}>{el[2]}</SaveTimeText>
              </View>
              
              <View style={{flexDirection:'row', alignItems:'center', gap:3}}>
                <MarginVertical top={5}/>
                <Octicons name="clock" size={16} color="rgba(20, 36, 72, 0.2)" />
                <SaveTimeText style={{color:colors.indigoBlue}}>{el[3]}</SaveTimeText>
              </View>
              
            </View>
            <MarginVertical top={12}/>
            </View>
          )
        })}
        <TouchableOpacity style={{flexDirection:'row', gap:14, alignItems:'flex-start'}} onPress={() => navigation.navigate("AddSaveTime")}>
          <View style={{justifyContent:'center', alignItems:'center',width:64,gap:12}}>
            <TimeLabel>
              <SaveTimeText style={{color:"#fff"}}>+</SaveTimeText>
            </TimeLabel>
          </View>
          <View style={{height:40, flexGrow:1}}>
            <MarginVertical top={5}/>
            <SaveTimeText style={{color:"rgba(52, 52, 52, 0.6)"}}>자투리 시간 추가하기</SaveTimeText>
            <MarginVertical top={12}/>
            <SaveTimeText style={{fontSize:16, color:"rgba(112, 113, 114, 0.8)"}}></SaveTimeText>
          </View>
          
          <View style={{flexDirection:'row', alignItems:'center', gap:3}}>
            <MarginVertical top={5}/>
            <SaveTimeText style={{color:colors.indigoBlue}}></SaveTimeText>
          </View>
        </TouchableOpacity>

      </ViewSaveTimeBody>
      <ViewSaveTimeBg source={savetime_bg}/>
    </SafeAreaView>
  )
}

export default ViewSaveTime


const ViewSaveTimeBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  padding:0 30px;

`

const ViewSaveTimeBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const ViewSaveTimeHeader = styled.View`
  flex-direction:row;
  width:100%;
  justify-content:center;
  align-items:center;
  height:50px;
`

const SaveTimeText = styled.Text`
  font-weight:500;
  font-size:18px;

`

const SaveTimeTitle = styled.Text`
  font-weight:600;
  font-size:50px;
  color:${colors.fontMain};
`

const TimeLabel = styled.View`
  width:64px;
  height:32px;
  border-radius:15px;
  background-color:${colors.indigoBlue50};
  justify-content:center;
  align-items:center;
`

const HorizonBorderLine = styled.View`
  width:310px;
  height:.8px;
  background-color:#fff;
`

const VerticalBorderLine = styled.View`
  width:1px;
  height:40px;
  background-color:#fff;

`


