import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../styles/colors'

import today_bg from '../../../assets/home_bg.png';
import { size } from '../styles/size';
import ContinuitySuccess from '../components/ContinuitySuccess';
import dayjs from 'dayjs';
import NavigateArrowButton from '../components/NavigateArrowButton';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';
import { useTodo } from '../../hooks/useTodo';
import { minToHour } from '../../util';

const containerWidth = size.width-50;

const Today = () => {
  const [today,setToday] = useState(dayjs().format("MMMM DD, YYYY"));
  const scale = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
  const navigation = useNavigation();
  const {getNowTodo, getNotCompletedTodo} = useTodo();
  const [notCompletedTodo, setNotCompletedTodo] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getNowTodo();
    getNotCompletedTodo(setNotCompletedTodo, setIsReady);
  }, [])
  

  return (
    <SafeAreaView>
      <TodayBody>
        <View style={{width:containerWidth, display:'flex', alignItems:'flex-end', marginTop:20}}>
          <ContinuitySuccess/>
        </View>
        <MarginVertical top={38}/>
        <TodayInfoArea>
          <TodayDate>{today}</TodayDate>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:4}}>
            <TodayInfoTitle>오늘의 적설량</TodayInfoTitle>
            <NavigateArrowButton handleArrowButton={() => navigation.navigate("TodayTodo")}/>
          </View>
          <TodayInfoBlueArea>
            <SnowFlakeIcon color={"white"} size={16}/>
            <PlanedRoutineText>{`예정된 루틴 ${notCompletedTodo?.length}개`}</PlanedRoutineText>
            <TodayTotalTime>{`${minToHour(notCompletedTodo.reduce((sum, el) => sum + el.duration,0))}`}</TodayTotalTime>
          </TodayInfoBlueArea>
          <ScaleArea>
            {scale.map((el, index) => {
              
                if((index+1) % 7 !== 0){
                  return(
                    <View key={index}>
                      <BorderLine/>
                    </View>
                  )
                }else{
                  return(
                    <View key={index}>
                      <BoldBorderLine/>
                    </View>
                  )
                }
              
            })}
          </ScaleArea>
        </TodayInfoArea>
      </TodayBody>
      <TodayBg source={today_bg}/>
    </SafeAreaView>
  )
}

export default Today


const TodayBody = styled.View`
  display:flex;
  width:${size.width}px;
  align-items:center;
`

const TodayBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const TodayInfoArea = styled.View`
  width:${containerWidth}px;
  height:280px;
  background-color:rgba(255,255,255,.2);
  border-radius:15px;
  border:1px solid white;
  overflow:hidden;
  padding:24px 20px;
`

const TodayInfoBlueArea = styled.View`
  width:${containerWidth}px;
  height:200px;
  background-color:rgba(106, 143, 246, 0.38);
  position:absolute;
  bottom:-30px;
  padding:24px 20px;

`

const TodayDate = styled.Text`
  font-weight:700;
  font-size:18px;
  color:${colors.darkGray};
  margin-bottom:5px;
`

const TodayInfoTitle = styled.Text`
  font-weight:700;
  font-size:26px;
  color:${colors.fontMain};
`

const PlanedRoutineText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:#fff;
  margin-top:8px;
`

const TodayTotalTime = styled.Text`
  font-weight:500;
  font-size:50px;
  color:#fff;
  line-height:58px;
  margin-top:8px;

  `

const ScaleArea = styled.View`
  display:flex;
  align-items:flex-end;
  gap:12px;
  position:absolute;
  right:0;
  bottom:0;
`

const BorderLine = styled.View`
  width:17px;
  height:.3px;
  background-color:#fff;
`

const BoldBorderLine = styled.View`
  width:37px;
  height:1px;
  background-color:#fff;
`