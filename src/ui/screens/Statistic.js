import React, { useState } from 'react'
import styled from 'styled-components';
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
import { useNavigation } from '@react-navigation/native';

const Statistic = () => {
  const [mode, setMode] = useState("월별");
  const [showDropDown, setShowDropDown] = useState(false);
  const navigation = useNavigation();

  const DropDown = () => {
    return(
      <View style={{width:90, height:80, backgroundColor:colors.indigoBlue50, position:'absolute', bottom:-85, borderRadius:14, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={{width:'100%', height:40, borderRadius:14, display:'flex', justifyContent:'center', alignItems:'center'}} onPress={() => {setMode("주별");setShowDropDown(false)}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:600}}>주별</Text>
        </TouchableOpacity>
        <View style={{width:80, height:.7, backgroundColor:"#fff"}}></View>
        <TouchableOpacity style={{width:'100%', height:40, borderRadius:14, display:'flex', justifyContent:'center', alignItems:'center'}} onPress={() => {setMode("루틴별");setShowDropDown(false)}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:600}}>루틴별</Text>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <SafeAreaView>
      <ScrollView>
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
            <ContinuitySuccessText>8일</ContinuitySuccessText>
          </ContinuitySuccessArea>
          <MarginVertical top={30}/>
          <Image source={calandar_icon} style={{width:40, height:45}}/>
          <MarginVertical top={23}/>
          <>
          {mode === "루틴별" ? (
            <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
              <StatisticTitle>{`아침에는\n영어 공부`}</StatisticTitle>
              <DropDownArrowButton size={40} color={""}/>
            </View>
          ) : (
            <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end', gap:7, height:50}}>
              <StatisticTitle>7월</StatisticTitle>
              <YearText>2025년</YearText>
            </View>
          )}

          {mode === "주별" && <StatisticTitle>첫째주</StatisticTitle>}
          </>

          <MarginVertical top={40}/>
          <DuringText>07.01 - 07.31</DuringText>
          <TotalTimeText>30H 40M</TotalTimeText>
          <MarginVertical top={10}/>
          <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
            <StatisticText>
            {`15일 동안\n눈이 내렸어요`}</StatisticText>
            <GotoReportButton onPress={() => navigation.navigate("Report")}>
              <GotoReportText>리포트 보러가기</GotoReportText>
              <NavigateArrowButton/>
            </GotoReportButton>
          </View>
          <MarginVertical top={60}/>
          <Calandar/>
          <MarginVertical top={100}/>
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

