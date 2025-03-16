import React, { useCallback, useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
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
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import save_time_bg_first from '../../../assets/report_bg.png';
import SnowFlakeIcon from '../components/SnowFlakeIcon'
import Button from '../components/Button'
import { useSaveTime } from '../../hooks/useSaveTime'
import { minToHour } from '../../util'

const ViewSaveTime = ({route}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('ddd').toUpperCase())
  const navigation = useNavigation();
  const timeData = [["06:00","출근 시간","06:00 - 7:40","1H 20M"],["06:00","출근 시간","06:00 - 7:40","1H 20M"],["06:00","출근 시간","06:00 - 7:40","1H 20M"]]
  const {version, username} = route.params;
  const {getSpareTimeByDay} = useSaveTime()
  const [spareTimeList, setSpareTimeList] = useState([]);
  const dayToKo = {SUN:'일요일',MON:'월요일',TUE:'화요일',WED:'수요일',THU:'목요일',FRI:'금요일',SAT:'토요일'}
  const [durationByDay, setDurationByDay] = useState(0);

  const getFullDay = (day) => {
    return day === 'MON' ? "MONDAY" : day==="TUE" ? "TUESDAY" : day==="WED" ? "WEDNESDAY" : day==="THU" ? "THURSDAY" : day=="FRI" ? "FRIDAY" : day === "SAT" ? "SATURDAY" : "SUNDAY"
  }


  useFocusEffect(
    useCallback(() => {
      getSpareTimeByDay(getFullDay(selectedDate), setSpareTimeList,setDurationByDay)
    }, [selectedDate]),
  )

  const handleSaveButton = () => {
    if(version==='first'){
      navigation.reset({
        routes:[{
          name:'StartAddAsset',
          params:{version:"Saving"}
        }]
      })}else{
        // navigation.reset({
        //   routes:[{
        //     name:'Tabs'
        //   }]
        // })
        navigation.goBack()
      }
    }
    
    
  

  return (
    <SafeAreaView>
      <ViewSaveTimeBody>
        <ViewSaveTimeHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          {version === "first" ? <></> :
          <SaveTimeText style={{color:"#4c4c4c"}}>자투리 시간</SaveTimeText>
          }
        </ViewSaveTimeHeader>
        <MarginVertical top={30}/>
        <Image source={time_icon} style={{width:40, height:48}}/>
        <MarginVertical top={15}/>
        <SaveTimeText style={{color:colors.fontMain90}}>{version === 'first' ? `자투리 시간`:`${dayToKo[selectedDate]}\n자투리 시간`}</SaveTimeText>
        {version === "first" ? <MarginVertical top={10}/> : <></>}
        <SaveTimeTitle style={{fontSize:version==='first' ? 26 : 50}}>{version === 'first' ? "자투리 시간이\n얼마나 생기나요?":minToHour(durationByDay)}</SaveTimeTitle>
        {version === 'first' ?
        <>
        <MarginVertical top={32}/>
        <SnowFlakeIcon color={'indigo'} size={16}/>
        <MarginVertical top={10}/>
        <Text style={{fontWeight:600, fontSize:18, color:colors.fontMain70}}>{`${username} 님의 일상에서 생기는\n모든 자투리 시간을 알려주세요!`}</Text>
        </>
        :<></>
        }
        <MarginVertical top={40}/>
        <WeekCalandar selectedDate={selectedDate} setSelectedDate={setSelectedDate} version={'day'}/>
        <MarginVertical top={32}/>
        <HorizonBorderLine/>
        <ScrollView style={{maxHeight:version==='first' ? '28%' : '38%'}} showsVerticalScrollIndicator={false}>
        <MarginVertical top={26}/>
        {spareTimeList.length > 0 ? spareTimeList.map((el,index) => {
          return(
            <View key={index}>
            <TouchableOpacity style={{flexDirection:'row', gap:14, alignItems:'flex-start'}} onPress={() => navigation.navigate('AddSaveTime', {spareTimeEl:el, length:index})}>
              <View style={{justifyContent:'center', alignItems:'center',width:64,gap:12}}>
                <TimeLabel>
                  <SaveTimeText style={{color:"#fff"}}>{el.startTime}</SaveTimeText>
                </TimeLabel>
                <VerticalBorderLine/>
              </View>
              <View style={{height:40, flexGrow:1}}>
                <MarginVertical top={5}/>
                <SaveTimeText style={{color:"#343434"}}>{el.title}</SaveTimeText>
                <MarginVertical top={8}/>
                <SaveTimeText style={{fontSize:16, color:"rgba(112, 113, 114, 0.8)"}}>{`${el.startTime} - ${el.endTime}`}</SaveTimeText>
              </View>
              
              <View style={{flexDirection:'row', alignItems:'center', gap:3}}>
                <MarginVertical top={5}/>
                <Octicons name="clock" size={16} color="rgba(20, 36, 72, 0.2)" />
                <SaveTimeText style={{color:colors.indigoBlue}}>{minToHour(el.duration)}</SaveTimeText>
              </View>
              
            </TouchableOpacity>
            <MarginVertical top={12}/>
            </View>
          )
        }) : <></>}
        <TouchableOpacity style={{flexDirection:'row', gap:14, alignItems:'flex-start'}} onPress={() => navigation.navigate("AddSaveTime",{spareTimeEl:false, length:spareTimeList.length})}>
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
        <MarginVertical top={20}/>
     </ScrollView>
      <View style={{width:size.width,height:100,position:'absolute',bottom:70,right:0, display:'flex',justifyContent:'center', alignItems:'center'}}>
        <Button text={"저장하기"} handleButton={handleSaveButton}/>
      </View>
      </ViewSaveTimeBody>
      <ViewSaveTimeBg source={version === "first" ? save_time_bg_first : savetime_bg} version={version}/>
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
  top:${props => props.version === 'first' ? -750 : 0}
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


