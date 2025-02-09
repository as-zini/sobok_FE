import React, { useState } from 'react'
import styled from 'styled-components';
import { Image, SafeAreaView, SectionList, Text, View } from 'react-native'

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
import { useNavigation } from '@react-navigation/native';

const TodayTodo = () => {
  const [isStart, setIsStart] = useState(false);
  
  const Data = [
    {
      title:["아침에는 영어 공부", "영어 적금", "1H 25M", "09:00 - 10:25"],
      data:[["영어 강의 1강", "스픽", "1H 00M", "6:00 - 7:00"],["영어 강의 1강", "스픽", "1H 00M", "6:00 - 7:00"]]
    },{
      title:["저녁에는 독서", "독서 적금", "1H 25M", "09:00 - 10:25"],
      data:[["영어 강의 2강", "스픽", "1H 30M", "7:00 - 8:30"]]
    }
  ]


  const ListHeader = ({title}) => {
    return(
      <View style={{width:310}}>
        <SnowFlakeIcon color={"indigo"} size={16}/>
        <MarginVertical top={16}/>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <View style={{flexGrow:1}}>
            <Text style={{color:"#343434", fontWeight:600, fontSize:22}}>{title[0]}</Text>
            <MarginVertical top={7}/>
            <View style={{display:"flex", flexDirection:'row', gap:5}}>
              <LinkIcon size={16}/>
              <Text style={{fontSize:14, color:colors.gray70, fontWeight:500}}>{title[1]}</Text>
            </View>
          </View>
          <View style={{alignItems:'flex-end', gap:8}}>
            <Text style={{fontSize:22, fontWeight:600, color:colors.indigoBlue}}>{title[2]}</Text>
            <Text style={{fontSize:14, fontWeight:500, color:colors.gray70}}>{title[3]}</Text>
          </View>
        </View>
        
        <MarginVertical top={20}/>
        <View style={{width:310, height:.8, backgroundColor:"#fff"}}></View>
      </View>
    )
  }

  const LenderItem = ({item, index}) => {
    return(
      <>
        <MarginVertical top={20}/>
        <TodoEl data={item} index={index}/>
        <MarginVertical top={40}/>
      </>
    )
  }

  const BlurChild = () => {
    return(
      <View style={{paddingHorizontal:30, paddingVertical:40}}>
        <View style={{display:'flex', flexDirection:'row', gap:4}}>
          <Text>총 2개의 할 일</Text>
        </View>
        <MarginVertical top={32}/>
        <SectionList
            sections={Data}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => (
              <LenderItem item={item} index={index}></LenderItem>
            )}
            renderSectionHeader={({section: {title}}) => (
              <ListHeader title={title}/>
            )}
          >
        </SectionList>
        
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
        <TodayTotalTime>1H 25M</TodayTotalTime>
        <MarginVertical top={20}/>
        <SnowFlakeIcon color={"indigo"} size={16}/>
        <MarginVertical top={8}/>
        <View style={{display:'flex', flexDirection:'row', gap:50}}>
          <View>
            <DetailTodayTime>총 모을 시간</DetailTodayTime>
            <DetailTodayTime>3H 30M</DetailTodayTime>
          </View>
          <View>
            <DetailTodayTime>남은 모을 시간</DetailTodayTime>
            <DetailTodayTime>2H 5M</DetailTodayTime>
          </View>
        </View>
        <MarginVertical top={37}/>
        <View style={{marginLeft:-30}}>
          <BlurComponent child={BlurChild}/>
        </View>
        <StartButton onPress={() => setIsStart(true)}>
          <Image source={button_icon} style={{width:48, height:34}}/>
          <MarginVertical top={12}/>
          <StartButtonText>'영어 강의 1강' 시작하기</StartButtonText>
        </StartButton>
      </TodayTodoBody>
      <TodayTodoBg source={today_todo_bg}/>
      {isStart ? <StartCountDown/> : <></>}
    </SafeAreaView>
  )
}

export default TodayTodo


const TodayTodoBody = styled.View`
  width:${size.width-60}px;
  display:flex;
  height:${size.height}px;
`

const TodayTodoBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const TodayTodoHeader = styled.View`
  width:${size.width-60}px;
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
  width:${size.width}px;
  background-color:rgba(255,255,255,.8);
  height:130px;
  border-radius:12px;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  bottom:50;
  left:-30px;
`

const StartButtonText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain};

`



