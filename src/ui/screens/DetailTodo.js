import React, { use, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components';

import todo_bg from '../../../assets/home_bg.png';
import todo_icon from '../../../assets/todo_icon.png';
import trash_icon from '../../../assets/trash_icon.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import TimeSliderBar from '../components/TimeSliderBar';
import LinkIcon from '../components/LinkIcon';
import DropDownArrowButton from '../components/DropDownArrowButton';
import Button from '../components/Button';
import { minToHour } from '../../util';
import CategoryEl from '../components/CategoryEl';
import { useMyPage } from '../../hooks/useMyPage';
import { useNavigation } from '@react-navigation/native';

const DetailTodo = ({route}) => {
  const {todoInfo, index, routineTitle} = route.params;
  const [time, setTime] = useState({});
  const categoryText = ["영어","제2외국어","독서","운동","취미","자기계발","기타"]
  const [selected,setSelected] = useState("")
  const {getUserLinkedApp} = useMyPage();
  const [myLinkedApp, setMyLinkedApp] = useState(['하이하이','하이하이'])
  const [selectedApp, setSelectedApp] = useState(todoInfo.linkApp)
  const [showDropDown, setShowDropDown] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    console.log(todoInfo)
    console.log(index)
    getUserLinkedApp(setMyLinkedApp)
  }, [])

  const DropDownContents = ({list}) => {


    return(
      <View style={{width:295, borderRadius:8, backgroundColor:"#fff", paddingHorizontal:30, paddingVertical:10}}>
        {list.map((el,index) => {
          return(
          <TouchableOpacity key={index} style={{width:'100%', paddingVertical:10, alignItems:'flex-start'}} onPress={() => {setSelectedApp(el);setShowDropDown(false)}}>
            <Text style={{fontSize:18, fontWeight:500}}>{el}</Text>
          </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  

  return (
    <SafeAreaView>
      <ScrollView>
      <DetailTodoBody>
        <DetailTodoHeader>
          <View style={{position:'absolute', left:20}}>
            <BackArrowButton/>
          </View>
          <DetailTodoCategory>{`${routineTitle}`}</DetailTodoCategory>
        </DetailTodoHeader>
        <TodoIntroArea>
          <DetailTodoIcon source={todo_icon}/>
          <MarginVertical top={25}/>
          <DetailTodoText>{`할 일 ${index+1}`}</DetailTodoText>
          <MarginVertical top={12}/>
          <DetailTodoTitle>{`${todoInfo.title}`}</DetailTodoTitle>
        </TodoIntroArea>
        <MarginVertical top={65}/>
        <TotalTimeArea>
          <TotalTimeText>총 시간</TotalTimeText>
          <TotalTimeText style={{fontSize:26}}>{`${minToHour(todoInfo.duration)}`}</TotalTimeText>
        </TotalTimeArea>
        <MarginVertical top={32}/>
        <TimeSliderBar text={"에 시작해서"} version={"Start"} setOutValue={setTime} type={"time"}/>
        <MarginVertical top={65}/>
        <TimeSliderBar text={"까지 끝내요"} version={"End"} setOutValue={setTime} type={"time"}/>
        <MarginVertical top={80}/>
        <View style={{width:300}}>
          <Text style={{fontWeight:600, fontSize:18, textAlign:'left', color:colors.fontMain70}}>카테고리</Text>
        </View>
        <MarginVertical top={15}/>
        <CategoryArea>
          {categoryText.map((el,index) => {
            return(
              <View key={index}>
              <CategoryEl text={el} selected={selected} setSelected={setSelected}/>
              </View>
            )
          })}
        </CategoryArea>
        <MarginVertical top={50}/>
        <LinkedAppArea>
          <LinkedAppTitle>연동앱</LinkedAppTitle>
          <LinkedAppBody>
            <LinkedAppIcon>
              <LinkIcon size={24}/>
            </LinkedAppIcon>
            <LinkedAppText>{`${selectedApp}`}</LinkedAppText>
            <DropDownArrowButton size={24} handleArrowButton={() => setShowDropDown(prev => !prev)}/>
          </LinkedAppBody>
          {showDropDown ? 
          <DropDownContents list={myLinkedApp}/>
          :
          <></>
          }
        </LinkedAppArea>
        <MarginVertical top={80}/>
        <Button text={"저장하기"} handleButton={() => navigation.goBack()}/>
        <MarginVertical top={24}/>
        <TrashButton>
          <TrashButtonImage source={trash_icon}/>
        </TrashButton>
      </DetailTodoBody>
      </ScrollView>
      <DetailTodoBg source={todo_bg}/>
    </SafeAreaView>
  )
}

export default DetailTodo;


const DetailTodoBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:30px;
`

const DetailTodoBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  height:${size.height}px;
  z-index:-1;
`

const DetailTodoHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:${size.width}px;
  height:56px;
`

const DetailTodoCategory = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontSub};

`

const TodoIntroArea = styled.View`
  display:flex;
  width:${size.width-60}px;

`

const DetailTodoIcon = styled.Image`
  width:48px;
  height:36px;
`

const DetailTodoText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain70};
`

const DetailTodoTitle = styled.Text`
  font-weight:600;
  font-size:34px;
  color:${colors.fontMain};
`

const TotalTimeArea = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

const TotalTimeText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain90};
`

const LinkedAppArea = styled.View`
  width:${size.width - 80}px;
  display:flex;
  gap:20px;
`

const LinkedAppTitle = styled.Text`
  font-size: 18px;
  font-weight:600;
  color:rgba(112, 113, 114, 0.9);
`

const LinkedAppBody = styled.View`
  width:295px;
  background-color:#fff;
  border-radius:8px;
  height:55px;
  padding:15px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`

const LinkedAppIcon = styled.View`
  flex-grow:.1;
`

const LinkedAppText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain90};
  flex-grow:1;
`

const TrashButton = styled.TouchableOpacity`
  
`

const TrashButtonImage = styled.Image`
  width:24px;
  height:24px;
`

const CategoryArea = styled.View`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:flex-start;
  width:300px;
  gap:8px;
`




