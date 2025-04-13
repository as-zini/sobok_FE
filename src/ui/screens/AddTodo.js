import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

import add_todo_bg from '../../../assets/add_todo_bg.png';
import add_todo_icon from '../../../assets/add_todo_icon.png';
import trash_icon from '../../../assets/trash_icon.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import TimeSliderBar from '../components/TimeSliderBar';
import LinkIcon from '../components/LinkIcon';
import DropDownArrowButton from '../components/DropDownArrowButton';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import MarginVertical from '../components/MarginVertical';
import { useTodoStore } from '../../store/todo';
import dayjs from 'dayjs';
import { getTimeDifference } from '../../util';
import CategoryEl from '../components/CategoryEl';
import { useMyPage } from '../../hooks/useMyPage';

const AddTodo = ({route, navigation}) => {
  const {todoData, setTodoData} = useTodoStore();
  const [title, setTitle] = useState("");
  const categoryText = ["영어","제2외국어","독서","운동","취미","자기계발","기타"]
  const [selectedCategory, setSelectedCategory] = useState("")
  const {getUserLinkedApp} = useMyPage();
  const [myLinkedApp, setMyLinkedApp] = useState([])
  const [selectedApp, setSelectedApp] = useState("")
  const [showDropDown, setShowDropDown] = useState(false)
  const [time, setTime] = useState({startTime:"", endTime:""})

 
  useEffect(() => {
    getUserLinkedApp(setMyLinkedApp)
  },[])

  useEffect(() => {
    console.log(todoData)
  }, [todoData])

  const DropDownContents = ({list}) => {
    return(
      <View style={{width:295, borderRadius:8, backgroundColor:"#fff", paddingHorizontal:30, paddingVertical:10}}>
        {list.map((el,index) => {
          return(
          <TouchableOpacity key={index} style={{width:'100%', paddingVertical:10, alignItems:'flex-start', paddingVertical:15}} onPress={() => {setSelectedApp(el);setShowDropDown(false)}}>
            <Text style={{fontSize:18, fontWeight:500}}>{el}</Text>
          </TouchableOpacity>
          )
        })}

      </View>
    )
  }
  

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
      <AddTodoBody>
        <AddTodoHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <AddTodoHeaderText>할 일 추가</AddTodoHeaderText>
        </AddTodoHeader>
        <MarginVertical top={27}/>
        <View style={{width:310, display:'flex', alignItems:'flex-start'}}>
          <Image source={add_todo_icon} style={{width:48, height:36}}/>
          <MarginVertical top={24}/>
          <AddTodoText>할 일 1</AddTodoText>
          <MarginVertical top={12}/>
          <AddTodoTitle
            placeholder="할 일의 이름을 입력해주세요"
            value={title}
            onChangeText={(text) => setTitle(text)} // 함수형 업데이트
            multiline
          />
        </View>
        <MarginVertical top={40}/>
        <TotalTimeText style={{fontSize:18}}>총 시간</TotalTimeText>
        <TotalTimeText>{`${getTimeDifference(time.startTime,time.endTime)}`}</TotalTimeText>
        <MarginVertical top={32}/>
        <TimeSliderBar text={"에 시작해서"} setOutValue={setTime} version={"start"} type={"time"}/>
        <MarginVertical top={65}/>
        <TimeSliderBar text={"까지 끝내요"} setOutValue={setTime} version={'end'} type={"time"}/>
        <MarginVertical top={80}/>
        <View style={{flexDirection:'row', flexWrap:'wrap', gap:10, }}>
          {categoryText.map((el,index) => {
            return(
              <CategoryEl selected={selectedCategory} setSelected={setSelectedCategory} text={el}/>
            )
          })}
        </View>
        <MarginVertical top={50}/>
        <View style={{width:310, display:'flex', alignItems:'flex-start'}}>
          <LinkedAppTitle>연동앱</LinkedAppTitle>
        </View>
        <MarginVertical top={17}/>
        <LinkedAppArea onPress={() => {setShowDropDown(prev => !prev);console.log('호출')}}>
          <View style={{flexGrow:.1}}>
            <LinkIcon size={24}/>
          </View>
          <LinkedAppText>{selectedApp}</LinkedAppText>
          <View>
            <DropDownArrowButton size={24}/>
          </View>
        </LinkedAppArea>
        {showDropDown ? 
          <DropDownContents list={myLinkedApp}/>
          :
          <></>
          }
        <MarginVertical top={80}/>
        <Button text={"저장하기"} handleButton={() => {setTodoData({
          title:title,
          startTime:time.startTime,
          endTime:time.endTime,
          linkApp:selectedApp,
          category:selectedCategory
        });navigation.goBack()}}/>
        <MarginVertical top={20}/>
        <TrashButton onPress={() => {navigation.goBack()}}>
          <TrashButtonIcon source={trash_icon}/>
        </TrashButton>
      </AddTodoBody>
      </ScrollView>
      <AddTodoBg source={add_todo_bg}/>
    </SafeAreaView>
  )
}

export default AddTodo


const AddTodoBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:0 30px;
`

const AddTodoBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const AddTodoHeader = styled.View`
  display:flex;
  flex-direction:row;
  width:310px;
  height:50px;
  justify-content:center;
  align-items:center;
`

const AddTodoHeaderText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.darkGray};
`

const AddTodoText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain70};
`

const AddTodoTitle = styled.TextInput`
  font-size:34px;
  font-weight:600;
  color:${colors.fontMain};
  width:200px;
  height:100px;
  
`

const TotalTimeText = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain90};
`

const LinkedAppTitle = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.gray77};
`

const LinkedAppArea = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:310px;
  height:50px;
  border-radius:12px;
  background-color:rgba(255,255,255,.4);
  border:.8px solid white;
  padding:12px 16px;
`

const LinkedAppText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain90};
  flex-grow:1;
`

const TrashButton = styled.TouchableOpacity`
  width:30px;
  height:30px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:30px;
`

const TrashButtonIcon = styled.Image`
  width:24px;
  height:24px;
`



