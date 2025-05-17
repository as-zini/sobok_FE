import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import statistic_bg from '../../../assets/statistic_bg.png';
import calandar_icon from '../../../assets/calandar_icon.png';
import drop_down_bg from '../../../assets/drop_down_bg.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import DropDownArrowButton from '../components/DropDownArrowButton';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import NavigateArrowButton from '../components/NavigateArrowButton';
import Calandar from '../components/Calandar';
import MarginVertical from '../components/MarginVertical';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useStatistic } from '../../hooks/useStatistic';
import AssetEl from '../components/AssetEl';
import LinkIcon from '../components/LinkIcon';
import WeekCalandar from '../components/WeekCalandar';
import AssetAddModal from '../components/AssetAddModal';
import AssetLinkModal from '../components/AssetLinkModal';
import { minToHour } from '../../util';
import { useGetInfo } from '../../hooks/useGetInfo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Statistic = () => {
  const [mode, setMode] = useState("월별");
  const [showDropDown, setShowDropDown] = useState(false);
  const navigation = useNavigation();
  const [selectedRange, setSelectedRange] = useState({}) 
  const [today, setToday] = useState(dayjs());
  const {getStatisticInfo, getStatisticDate, getStatisticLog, getStatisticInfoByRoutine, getStatisticDateByRoutine, getStatisticLogByRoutine} = useStatistic();
  const startDate = today.startOf('month').format("YYYY-MM-DD")
  const endDate = today.endOf('month').format("YYYY-MM-DD")
  const [statisticLog, setStatisticLog] = useState(["1"]);
  const [selectedDate, setSelectedDate] = useState(dayjs().get('date'));
  const [selectedRoutine, setSelectedRoutine] = useState([]);
  const [isAssetLinkModalVisible, setIsAssetLinkModalVisible] = useState(false);
  const [routineList, setRoutineList] = useState([]);
  const [pickedRoutine, setPickedRoutine] = useState([]);
  const [dateInfo, setDateInfo] = useState({});
  const [dateInfoByRoutine, setDateInfoByRoutine] = useState({});
  const [achieveList,setAchieveList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const {getContinuitySuccess} = useGetInfo();
  const [achieve, setAchieve] = useState(0);
  const [isNextMonth, setIsNextMonth] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if(mode === "루틴별"){ 
        getStatisticInfoByRoutine(pickedRoutine[0]?.id, setDateInfoByRoutine)
        getStatisticDateByRoutine(pickedRoutine[0]?.id,today.startOf('week').format("YYYY-MM-DD"),today.format("YYYY-MM-DD"), setAchieveList)
        getStatisticLogByRoutine(`${today.format("YYYY-MM")}-${selectedDate}`,pickedRoutine[0]?.id,setStatisticLog)
        }else if(mode==="월별"){
        getStatisticInfo(selectedMonth.startOf('month').format("YYYY-MM-DD"),selectedMonth.get("month")+1 === today.get("month")+1 ? today.format("YYYY-MM-DD") : selectedMonth.endOf('month').format("YYYY-MM-DD"),setDateInfo)
        getStatisticDate(selectedMonth.startOf('month').format("YYYY-MM-DD"),selectedMonth.get("month")+1 === today.get("month")+1 ? today.format("YYYY-MM-DD") : selectedMonth.endOf('month').format("YYYY-MM-DD"),setAchieveList)
        getStatisticLog(selectedRange.startDate, setStatisticLog)
        }else if(mode==="주별"){
        getStatisticInfo(today.startOf('week').format("YYYY-MM-DD"),today.format("YYYY-MM-DD"),setDateInfo)
        getStatisticDate(today.startOf('week').format("YYYY-MM-DD"),today.format("YYYY-MM-DD"), setAchieveList)
        getStatisticLog(`${today.format("YYYY-MM")}-${selectedDate}`, setStatisticLog)
        }
    }, [mode, pickedRoutine,selectedDate,selectedRange, selectedMonth]),
  )

  
  useEffect(() => {
    getContinuitySuccess(setAchieve)
  },[])

  function getWeekOfMonth() {
    const startOfMonth = today.startOf('month');
    const startDayOfWeek = startOfMonth.day(); // 0(일) ~ 6(토)
    const currentDay = today.date(); // 1 ~ 31
    return Math.ceil((currentDay + startDayOfWeek) / 7);
  }
  

  const DropDown = () => {
    return(
      <View style={{width:90, height:80, backgroundColor:colors.indigoBlue50, position:'absolute', bottom:-85, borderRadius:14, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={{width:'100%', height:40, borderRadius:14, display:'flex', justifyContent:'center', alignItems:'center'}} onPress={() => {setMode(mode==="월별" ? "주별" : "월별");setShowDropDown(false)}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:600}}>{mode==="월별" ? "주별" : "월별"}</Text>
        </TouchableOpacity>
        <View style={{width:80, height:.7, backgroundColor:"#fff"}}></View>
        <TouchableOpacity style={{width:'100%', height:40, borderRadius:14, display:'flex', justifyContent:'center', alignItems:'center'}} onPress={() => {setMode(mode==="루틴별" ? "주별" : "루틴별");setShowDropDown(false)}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:600}}>{mode==="루틴별" ? "주별" : "루틴별"}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const TodoLog = ({todo}) => {
    return(
      todo.length === 0 ? <></>:
      <>
      {todo.map((el,index) => {
        return(
        <View style={{display:'flex', flexDirection:'row', width:300, gap:13, justifyContent:'center',alignItems:'center', backgroundColor:'red'}} key={index}>
                <View style={{width:40, display:'flex', justifyContent:'center', alignItems:'center', gap:5}}>
                  <View style={{width:8, height:8, borderRadius:'50%', backgroundColor:colors.fontMain}}></View>
                  <VerticalBorderLine/>
                </View>
                <View style={{ flexGrow:1}}>
                  <TodoText>{el.title}</TodoText>
                  <MarginVertical top={10}/>
                  <View style={{flexDirection:'row'}}>
                    <LinkIcon size={16}/>
                    <LinkText>{el.linkApp}</LinkText>
                  </View>
                </View>
                <View>
                  <DurationText>{minToHour(el.duration)}</DurationText>
                </View>
          </View>
        )
      })
      
      }
      </>
    )
  }


  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatisticBody>
          <MarginVertical top={30}/>
          <StatisticHeader>
            <ModeDropDown>
              <DropDownText>{mode}</DropDownText>
              <DropDownArrowButton size={16} color={"white"} handleArrowButton={() => setShowDropDown(prev => !prev)}/>
            </ModeDropDown>
            {showDropDown ?
            <DropDown/>
            :
            <></>
            }

          </StatisticHeader>
          <MarginVertical top={36}/>
          <ContinuitySuccessArea>
            <SnowFlakeIcon size={16} color={"indigo"}/>
            <ContinuitySuccessText>{`${achieve}일`}</ContinuitySuccessText>
          </ContinuitySuccessArea>
          <MarginVertical top={30}/>
          <Image source={calandar_icon} style={{width:40, height:45}}/>
          <MarginVertical top={23}/>
          <>
          {mode === "루틴별" ? (
            <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
              <StatisticTitle>{pickedRoutine[0]?.title}</StatisticTitle>
              <TouchableOpacity onPress={() => setIsAssetLinkModalVisible(true)}>
                <MaterialIcons name="keyboard-arrow-down" size={40} color={colors.fontMain} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end', gap:7, height:50}}>
              <StatisticTitle>{mode === "월별" ? `${selectedMonth.format("M월")}` : `${today.format("M월")}`}</StatisticTitle>
              <YearText>{mode === "월별" ? `${selectedMonth.get('year')}년` : `${today.get('year')}년`}</YearText>
            </View>
          )}

          {mode === "주별" && <StatisticTitle>{`${getWeekOfMonth()}주차`}</StatisticTitle>}
          </>

          <MarginVertical top={40}/>
          <DuringText>{mode === "월별" ? `${selectedMonth.startOf('month').format('MM.DD')} - ${selectedMonth.get('month') === today.get('month') ? today.format('MM.DD') : selectedMonth.endOf('month').format("MM.DD")}` : `${today.startOf('week').format('MM.DD')} - ${today.format('MM.DD')}`}</DuringText>
          <TotalTimeText>{mode === "루틴별"&&Object.keys(dateInfoByRoutine).length > 0?minToHour(dateInfoByRoutine.totalDuration): mode!=="루틴별"&&Object.keys(dateInfo).length > 0 ? minToHour(dateInfo.totalDuration) : ""}</TotalTimeText>
          <MarginVertical top={10}/>
          <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
            <StatisticText>
            {`${mode==="루틴별"&&Object.keys(dateInfoByRoutine).length > 0 ? dateInfoByRoutine.totalAchievedCount : mode!=="루틴별"&&Object.keys(dateInfo).length > 0 ? dateInfo?.totalAchievedCount:""}일 동안\n눈이 내렸어요`}</StatisticText>
            <GotoReportButton onPress={() => navigation.navigate("Report")}>
              <GotoReportText>리포트 보러가기</GotoReportText>
              <NavigateArrowButton/>
            </GotoReportButton>
          </View>
          <MarginVertical top={60}/>
          {mode === "월별" ?
          <Calandar selectedRange={selectedRange} setSelectedRange={setSelectedRange} version={"statistic"} achieveList={achieveList} setSelectedMonth={setSelectedMonth}/>
          :
          <WeekCalandar version={"statistic"} selectedDate={selectedDate} setSelectedDate={setSelectedDate} achieveList={achieveList} setIsNextMonth={setIsNextMonth}/>
          } 
          <MarginVertical top={40}/>
          <BorderLine/>
          <MarginVertical top={25}/>
          <LogArea>
            <LogInfoText>{mode === "월별" ? `${selectedRange.startDate ? selectedRange.startDate : today.format("YYYY-MM-DD")}`:`${isNextMonth && String(selectedDate).length === 1  ? dayjs().add(1,'month').format("YYYY-MM-") : dayjs().format("YYYY-MM-")}${selectedDate}`}</LogInfoText>
            <MarginVertical top={10}/>
            <LogInfoText style={{fontSize:20}}>{`${statisticLog.length>0?minToHour(statisticLog.reduce((sum,el) => sum+ el.duration,0)) : 0} M`}</LogInfoText>
            <MarginVertical top={30}/>
            {statisticLog.map((el,index) => {
              return(
                <View key={index} style={{alignItems:'center'}}>
                  <View style={{display:'flex', justifyContent:'flex-start', width:'100%'}}>
                    <TimeText>{`${dayjs(el.startTime).format("HH:mm")} - ${dayjs(el.endTime).format("HH:mm")}`}</TimeText>
                  </View>
                  <MarginVertical top={20}/>
                  <AssetEl item={[el.title,el.accountTitle,minToHour(el.duration),""]} index={index} isLink={true} isTouchable={false} indexColor={"black"}/>
                  <MarginVertical top={20}/>
                  <TodoLog todo={el.todoLogs?.length > 0 ? el.todoLogs : []}/>
                </View>
              )
            })}
          </LogArea>
          <MarginVertical top={100}/>
          <AssetLinkModal
          isAssetLinkModalVisible={isAssetLinkModalVisible} 
          setIsAssetLinkModalVisible={setIsAssetLinkModalVisible} 
          version={"Routine"} routineList={routineList} 
          setRoutineList={setRoutineList} 
          setPickedSaving={setPickedRoutine}
          setDateInfoByRoutine={setDateInfoByRoutine}
          />
         </StatisticBody>
       </ScrollView>
       <StatisticBg source={statistic_bg}/>
     </SafeAreaView>
  )
 }

export default Statistic


const StatisticBody = styled.View`
  width:${size.width}px;
  display:flex;
  padding:0 30px;
`

const StatisticBg  = styled.Image`
  position:absolute;
  width:${size.width}px;
  height:${size.height}px;
  top:0;
  z-index:-1;
`

const StatisticHeader = styled.View`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ModeDropDown = styled.View`
  background-color:${colors.indigoBlue50};
  width:90px;
  height:32px;
  border-radius:29px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-direction:row;
  padding:5px 12px;
`

const DropDownText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:#fff;

`

const ContinuitySuccessArea = styled.View`
  width:100%;
  display:flex;
  flex-direction:row;
  gap:6px;
`

const ContinuitySuccessText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:${colors.fontMain60};
`

const StatisticTitle = styled.Text`
  font-size:50px;
  font-weight:600;
  color:${colors.fontMain};
  max-width:300px;
`

const YearText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.darkGray};
`

const DuringText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain80};
`

const TotalTimeText = styled.Text`
  font-size:34px;
  font-weight:600;
  color:${colors.fontMain80};
`

const StatisticText = styled.Text`
  font-size:18px;
  font-weight:600;
  line-height:27px;
  color:${colors.gray70};
  flex-grow:1;
`

const GotoReportButton = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const GotoReportText = styled.Text`
  font-size:14px;
  font-weight:500;
  color:${colors.fontMain80};
`

const BorderLine = styled.View`
  width:${size.width-60}px;
  height:1px;
  background-color:#fff;
`

const LogArea = styled.View`
  width:100%;
`

const LogInfoText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:#4A5660;
`

const TimeText = styled.Text`
  font-weight:500;
  font-size:14px;
  color:${colors.gray70};
`

const VerticalBorderLine = styled.View`
  width:.4px;
  height:30px;
  background-color:${colors.fontMain};
`

const TodoText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:#343434;
`

const LinkText = styled.Text`
  font-weight:500;
  font-size:14px;
  color:${colors.gray70};
`

const DurationText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.indigoBlue};
`

