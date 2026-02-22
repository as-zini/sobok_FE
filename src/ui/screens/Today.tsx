import React, { useCallback, useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import styled from '@emotion/native';
import { colors } from '../styles/colors'

import today_bg from '../../../assets/home_bg.png';
import { size } from '../styles/size';
import ContinuitySuccess from '../components/ContinuitySuccess';
import dayjs from 'dayjs';
import NavigateArrowButton from '../components/NavigateArrowButton';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import MarginVertical from '../components/MarginVertical';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTodo } from '../../hooks/useTodo';
import { minToHour } from '../../util';
import timeIcon from '../../../assets/time_icon.png';
import { useRoutine } from '../../hooks/useRoutine';
import LinkIcon from '../components/LinkIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TodoEl from '../components/TodoEl';
import Fontisto from 'react-native-vector-icons/Fontisto';

const containerWidth = size.width-50;

const Today = () => {
  const [today,setToday] = useState(dayjs().format("MMMM DD, YYYY"));
  const scale = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
  const navigation = useNavigation();
  const {getNowTodo, getNotCompletedTodo} = useTodo();
  const [notCompletedTodo, setNotCompletedTodo] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [todayRoutineList, setTodayRoutineList] = useState([]);
  const {getRoutineByCalandar, getRoutineDetail} = useRoutine();
  const [toggleId, setToggleId] = useState(0); 
  const [routineDetail, setRoutineDetail] = useState([])
  const [isComplete, setIsComplete] = useState(false);

  const notCompletedTodoId = notCompletedTodo?.map((el) => el.id)

  useFocusEffect(
    useCallback(() => {
      getNowTodo();
      getNotCompletedTodo(setNotCompletedTodo, setIsReady);
      getRoutineByCalandar(dayjs().get('date'), setTodayRoutineList)
      setToggleId(0)
    }, []),
  )

  useEffect(() => {
    console.log("console",notCompletedTodo)
    console.log("length",notCompletedTodo.length)
    console.log("today", todayRoutineList);
  },[isReady])

  const getTodoData = (id) => {
    getRoutineDetail(id, setRoutineDetail, setIsComplete)
  }
  

  return (
    <SafeAreaView>
      <TodayBody>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <PlanedRoutineText>{`예정된 루틴 ${notCompletedTodo.length}개`}</PlanedRoutineText>
            <TodayTotalTime>{`${minToHour(notCompletedTodo.reduce((sum, el) => sum += el.duration,0))}`}</TodayTotalTime>
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
        <MarginVertical top={56}/>
        <PlanedRoutineText style={{color:"#777",fontWeight:700}}>오늘의 루틴</PlanedRoutineText>
        <MarginVertical top={13}/>
        <TodayRoutineArea>
            <Image source={timeIcon} style={{width:30, height:36, resizeMode:'contain' }}/>
            <MarginVertical top={10}/>
            <PlanedRoutineText style={{color:colors.fontMain80,fontWeight:600}}>오늘 모을 시간</PlanedRoutineText>
            <TodayInfoTitle style={{fontSize:34}}>2H 50M</TodayInfoTitle>
            <MarginVertical top={30}/>
            <SnowFlakeIcon size={16} color={"indigo"}/>
            <MarginVertical top={5}/>
            <PlanedRoutineText style={{color:colors.fontMain80,fontWeight:600}}>{`총 ${todayRoutineList?.length}개의 루틴`}</PlanedRoutineText>
            <MarginVertical top={25}/>
            {todayRoutineList.map((el,index) => {
              return(
                <View key={index}>
                  <Text style={{fontSize:14, color:colors.gray70, fontWeight:500}}>{`${el.startTime?.slice(0,5)} - ${el.endTime?.slice(0,5)}`}</Text>
                  <MarginVertical top={25}/>
                  <RoutineEl>
                    {!notCompletedTodoId.includes(el.id) ?
                    <NumberView style={{backgroundColor:"rgba(112, 113, 114, 0.8)"}}>
                      <Fontisto name="check" size={12} color="#fff" />
                    </NumberView>
                    :
                    <NumberView>
                      <NumText>{index+1}</NumText>
                    </NumberView>
                    }
                    <View style={{flexGrow:1}}>
                      <View style={{flexDirection:'row', alignItems:'flex-end', gap:5}}>
                        <PlanedRoutineText style={{color:"#343434",fontWeight:600}}>{el.title}</PlanedRoutineText>
                        <ToggleButton onPress={() => {
                          if(toggleId === 0){
                            getTodoData(el.id);
                            setToggleId(el.id)
                          }else{
                            setToggleId(0)
                          }
                          
                        }}>
                          <MaterialIcons name="keyboard-arrow-down" size={24} color="#AEAEB2" />
                        </ToggleButton>
                      </View>
                      <MarginVertical top={7}/>
                      <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                        <LinkIcon size={16}/>
                        <Text style={{fontSize:14, color:colors.gray70, fontWeight:500}}>{el.accountTitle}</Text>
                      </View>
                    </View>
                    <PlanedRoutineText style={{color:colors.indigoBlue,fontWeight:600}}>{`${minToHour(el.duration)}`}</PlanedRoutineText>
                  </RoutineEl>
                  
                  {
                    toggleId === el.id  ?
                    <View style={{width:"100%"}}>
                    <MarginVertical top={20}/>
                    {routineDetail?.todos?.map((todo,idx) => {
                      return(
                        <View key={idx} style={{width:"100%"}}>
                      <TodoEl data={[todo.title, todo.linkApp, minToHour(todo.duration), `${todo.startTime?.slice(0,5)} - ${todo.endTime?.slice(0,5)}`]} index={idx}/>
                      <MarginVertical top={26}/>
                      </View>
                    )
                    })}
                    <MarginVertical top={10}/>
                    
                    </View>
                    :<></>

                  }
                  
                  <MarginVertical top={40}/>
                </View>
              )
            })}
        </TodayRoutineArea>
        <MarginVertical top={100}/>
        
        </ScrollView>
      </TodayBody>
      <TodayBg source={today_bg}/>
    </SafeAreaView>
  )
}

export default Today


const TodayBody = styled.View`
  display:flex;
  width:${() => `${size.width}px`};
  align-items:center;
`

const TodayBg = styled.Image`
  width:${() => `${size.width}px`};
  position:absolute;
  top:0;
  z-index:-1;
`

const TodayInfoArea = styled.View`
  width:${() => `${containerWidth}px`};
  height:280px;
  background-color:rgba(255,255,255,.2);
  border-radius:15px;
  border:1px solid white;
  overflow:hidden;
  padding:24px 20px;
`

const TodayInfoBlueArea = styled.View`
  width:${() => `${containerWidth}px`};
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
  z-index:3;
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

const TodayRoutineArea = styled.View`
  width:${() => `${size.width-50}px`};
  padding:30px 25px;
  background-color:rgba(255,255,255,.6);
  border-radius:16px;
  
`

const RoutineEl = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:15px;
  width:100%;
`

const ToggleButton = styled.TouchableOpacity`

`

const NumberView = styled.View`
  border-radius: 18px; 
  background-color:${colors.indigoBlue};
  width:36px;
  height:36px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const NumText = styled.Text`
  color:#fff;
  font-weight:600;
  font-size:20px;
`

