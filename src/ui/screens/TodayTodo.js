import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/native';
import { Image, SafeAreaView, ScrollView, SectionList, Text, View } from 'react-native'

import today_todo_bg from '../../../assets/add_todo_bg.png';
import time_icon from '../../../assets/time_icon.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import MarginVertical from '../components/MarginVertical';
import { colors } from '../styles/colors';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import BlurComponent from '../components/BlurComponent';
import AssetEl from '../components/AssetEl';
import TodoEl from '../components/TodoEl';
import LinkIcon from '../components/LinkIcon';
import button_icon from '../../../assets/save_icon.png';
import StartCountDown from '../components/StartCountDown';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTodo } from '../../hooks/useTodo';
import { minToHour } from '../../util';
import { useRoutine } from '../../hooks/useRoutine';
import dayjs from 'dayjs';
import { useNowTodoStore } from '../../store/todo';

var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

const TodayTodo = () => {
  const [isStart, setIsStart] = useState(false);
  const {getNotCompletedTodo, getTodaySaveTime} = useTodo();
  const [notCompletedTodo, setNotCompletedTodo] = useState([]);
  const [todayRoutine, setTodayRoutine] = useState([]);
  const {getRoutineByCalandar} = useRoutine();
  const {nowTodo} = useNowTodoStore();
  //일단 true로 바꿔놓음, getNotCompletedTodo api 오류 해결되면 다시 바꿀것!
  const [isReady, setIsReady] = useState(true);
  const [saveTime, setSaveTime] = useState(0);
  const today = dayjs().format('YYYY-MM-DD');


  useEffect(() => {
    console.log("now!!!",nowTodo)
    const t2 = dayjs(`${today}T${nowTodo[0].startTime}`);
    console.log(isWithin5Minutes(t2))
  },[]) 

  

  useFocusEffect(
    useCallback(() => {
    
    getNotCompletedTodo(setNotCompletedTodo, setIsReady);
    getRoutineByCalandar(dayjs().format("DD") ,setTodayRoutine);
    getTodaySaveTime(setSaveTime);
    },[])
  )

  // useEffect(() => {
  //   findNextTodo(notCompletedTodo);
  // }, [isReady])
  

  const notCompletedTodoCount = notCompletedTodo.reduce((sum, el) => sum + el.todos.length, 0);
  const LeftTime = notCompletedTodo.reduce((sum,el) => sum + el.duration, 0);
  const TotalTime = todayRoutine.reduce((sum,el) => sum + el.duration, 0);

  function isWithin5Minutes(targetTime) {
    const now = dayjs();
    const start = now.subtract(5, 'minute');
    const end   = now.add(5, 'minute');
    // isBetween(하한, 상한, 단위, 경계포함 여부)
    // '[]'면 양쪽 포함, '()'면 양쪽 미포함
    return targetTime.isBetween(start, end, null, '[]');
  }
  


  const ListHeader = ({title}) => {
    return(
      <></>
    )
  }

  const LenderItem = ({item, index}) => {
    return(
      <>
      {item.map((el,index) => {
        return(
          <View key={index}>
          <MarginVertical top={20}/>
          <TodoEl data={[el.title, el.linkApp, minToHour(el.duration), `${el.startTime.slice(0,5)} - ${el.endTime.slice(0,5)}`]} index={index}/>
          <MarginVertical top={40}/>
          </View>
        )
      })}
        {/* <TodoEl data={item} index={index}/> */}
      </>
    )
  }

  const BlurChild = () => {
    return(
      <View style={{paddingHorizontal:30, paddingVertical:40, minHeight:"100%"}}>
        <View style={{display:'flex', flexDirection:'row', gap:4}}>
          <Text style={{fontSize:18, fontWeight:600, color:colors.gray70}}>{`총 ${notCompletedTodoCount}개의 할 일`}</Text>
        </View>
        <MarginVertical top={32}/>
        {/* <SectionList
            sections={Data}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => (
              <LenderItem item={item} index={index}></LenderItem>
            )}
            renderSectionHeader={({section: {title}}) => (
              <ListHeader title={title}/>
            )}
            style={{marginBottom:650}}
          >
        </SectionList> */}
        
        <ScrollView style={{maxHeight:250}} showsVerticalScrollIndicator={false}>
          {notCompletedTodo.map((el,index) => {
            return(
              <View key={index}>
              <View style={{width:310}}>
                <SnowFlakeIcon color={"indigo"} size={16}/>
                <MarginVertical top={16}/>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <View style={{flexGrow:1}}>
                    <Text style={{color:"#343434", fontWeight:600, fontSize:22}}>{el.title}</Text>
                    <MarginVertical top={7}/>
                    <View style={{display:"flex", flexDirection:'row', gap:5}}>
                      <LinkIcon size={16}/>
                      <Text style={{fontSize:14, color:colors.gray70, fontWeight:500}}>{el.accountTitle}</Text>
                    </View>
                  </View>
                  <View style={{alignItems:'flex-end', gap:8}}>
                    <Text style={{fontSize:22, fontWeight:600, color:colors.indigoBlue}}>{minToHour(el.duration)}</Text>
                    <Text style={{fontSize:14, fontWeight:500, color:colors.gray70}}>{`${el.startTime.slice(0,5)} - ${el.endTime.slice(0,5)}`}</Text>
                  </View>
                </View>
                
                <MarginVertical top={20}/>
                <View style={{width:310, height:.8, backgroundColor:"#fff"}}></View>
              </View>
              <LenderItem item={el.todos}/>
              {index === notCompletedTodo.length-1 ? <MarginVertical top={100}/> :<></>}
              </View>
              
            )
          })}
        </ScrollView>
        
      </View>
    )
  }


  return (
    <SafeAreaView style={{display:'flex', alignItems:'center'}}>
      <TodayTodoBody>
        <TodayTodoHeader>
          <BackArrowButton/>
        </TodayTodoHeader>
        <MarginVertical top={25}/>
        <Image source={time_icon} style={{width:40, height:48}}/>
        <MarginVertical top={20}/>
        <TodayTodoTitle>오늘 모은 시간</TodayTodoTitle>
        <TodayTotalTime>{minToHour(saveTime)}</TodayTotalTime>
        <MarginVertical top={20}/>
        <SnowFlakeIcon color={"indigo"} size={16}/>
        <MarginVertical top={8}/>
        <View style={{display:'flex', flexDirection:'row', gap:50}}>
          <View>
            <DetailTodayTime>총 모을 시간</DetailTodayTime>
            <DetailTodayTime>{minToHour(TotalTime)}</DetailTodayTime>
          </View>
          <View>
            <DetailTodayTime>남은 모을 시간</DetailTodayTime>
            <DetailTodayTime>{minToHour(LeftTime)}</DetailTodayTime>
          </View>
        </View>
        <MarginVertical top={37}/>
        <View style={{marginLeft:-30}}>
          <BlurComponent child={BlurChild}/>
        </View>
        <StartButton onPress={() => {
            const t2 = dayjs(`${today}T${nowTodo[0].startTime}`);
            if(!nowTodo[0].message && isWithin5Minutes(t2)){
              setIsStart(true)
        }
            }}>
          <Image source={button_icon} style={{width:48, height:34}}/>
          <MarginVertical top={12}/>
          <StartButtonText>{nowTodo[0].message ? "오늘 남은 할 일이 없어요!" : nowTodo.length > 0 ? `${nowTodo[0].title} 시작하기` : ""}</StartButtonText>
        </StartButton>
      </TodayTodoBody>
      <TodayTodoBg source={today_todo_bg}/>
      {isStart ? <StartCountDown/> : <></>}
    </SafeAreaView>
  )
}

export default TodayTodo


const TodayTodoBody = styled.View`
  width:${() => `${size.width}px`};
  display:flex;
  height:${() => `${size.height}px`};
  padding: 0 30px;
`

const TodayTodoBg = styled.Image`
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  position:absolute;
  top:0;
  z-index:-1;
`

const TodayTodoHeader = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
`

const TodayTodoTitle = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain80};
`

const TodayTotalTime = styled.Text`
  font-weight:600;
  font-size:42px;
  color:${colors.fontMain};
`

const DetailTodayTime = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain70};
  line-height:28px;
`

const StartButton = styled.TouchableOpacity`
  width:${() => `${size.width}px`};
  background-color:rgba(255,255,255,.8);
  height:130px;
  border-radius:12px;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  bottom:60px;
  left:0;
`

const StartButtonText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain};

`

//function findNextTodo(data) {
  //     const now = new Date();
  //     const currentTime = now.toTimeString().split(" ")[0]; // 현재 시간 HH:mm:ss 형식으로 가져오기
  
  //     let nextTodo = null;
  //     let minTimeDiff = Infinity;
  
  //     data.forEach(routine => {
  //         routine.todos.forEach(todo => {
  //             const todoStartTime = todo.startTime;
  
  //             // 현재 시간보다 큰 (미래의) startTime만 비교
  //             if (todoStartTime > currentTime) {
  //                 const timeDiff = getTimeDifference(currentTime, todoStartTime);
  
  //                 if (timeDiff < minTimeDiff) {
  //                     minTimeDiff = timeDiff;
  //                     nextTodo = todo;
  //                 }
  //             }
  //         });
  //     });
  //     console.log("now!!",nextTodo)
  //     setNowTodo(nextTodo)
  // }
  
  // // 시간 차이를 초 단위로 계산하는 함수
  // function getTimeDifference(current, target) {
  //     const [ch, cm, cs] = current.split(":").map(Number);
  //     const [th, tm, ts] = target.split(":").map(Number);
  
  //     return (th * 3600 + tm * 60 + ts) - (ch * 3600 + cm * 60 + cs);
  // }



