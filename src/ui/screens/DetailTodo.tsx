import React, { use, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styled from '@emotion/native';

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
import { getTimeDifference, minToHour } from '../../util';
import CategoryEl from '../components/CategoryEl';
import { useMyPage } from '../../hooks/useMyPage';
import { useNavigation } from '@react-navigation/native';
import { useTodo } from '../../hooks/useTodo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailTodo = ({route}) => {
  const {todoInfo, index, routineTitle,days} = route.params;
  const [time, setTime] = useState({startTime:todoInfo.startTime.slice(0,6), endTime:todoInfo.endTime.slice(0,6)});
  const categoryText = ["영어","제2외국어","독서","운동","취미","자기계발","기타"]
  const [selectedCategory,setSelectedCategory] = useState(todoInfo.category)
  const {getUserLinkedApp} = useMyPage();
  const [myLinkedApp, setMyLinkedApp] = useState([])
  const [selectedApp, setSelectedApp] = useState(todoInfo.linkApp)
  const [showDropDown, setShowDropDown] = useState(false)
  const navigation = useNavigation();
  const [todoTitle, setTodoTitle] = useState(todoInfo.title)
  const {handleTodoEdit, handleDeleteTodo, checkDuplicatedTodo} = useTodo()
  const [isDuplicated, setIsDuplicated] = useState(false);

  useEffect(() => {
    console.log(todoInfo)
    console.log(index)
    getUserLinkedApp(setMyLinkedApp)
    console.log("days",days)
  }, [])

  useEffect(() => {
    console.log(time)
    console.log(selectedCategory)
  },[time, selectedCategory])

  useEffect(() => {
    checkDuplicatedTodo(time, setIsDuplicated, days)
  },[time])

  
  

  const DropDownContents = ({list}) => {


    return(
      <View style={{width:295, borderRadius:8, backgroundColor:"#fff", paddingHorizontal:30, paddingVertical:10, height:170}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {list.map((el,index) => {
          return(
          <TouchableOpacity key={index} style={{width:'100%', paddingVertical:10, alignItems:'flex-start'}} onPress={() => {setSelectedApp(el);setShowDropDown(false)}}>
            <Text style={{fontSize:18, fontWeight:500}}>{el}</Text>
          </TouchableOpacity>
          )
        })}
        </ScrollView>
      </View>
    )
  }

  const handleSaveButton = () => {
    handleTodoEdit({
      id:todoInfo.id,
      title:todoTitle,
      category:selectedCategory === "영어" ? "english" : selectedCategory === "제2외국어" ? "second-language" : selectedCategory === "독서" ? "reading" : selectedCategory === "운동" ? "exercise" : selectedCategory === "취미" ? 'hobby' : selectedCategory === "자기계발" ? 'self-improvement' : "other",
      startTime:time.startTime,
      endTime:time.endTime,
      linkApp:selectedApp
    })
  }
  

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <DetailTodoTitle value={todoTitle} onChange={(e) => setTodoTitle(e.nativeEvent.text)} placeholder={`할 일의 이름 입력`}/>
        </TodoIntroArea>
        <MarginVertical top={65}/>
        <TotalTimeArea>
          <TotalTimeText>총 시간</TotalTimeText>
          <TotalTimeText style={{fontSize:26}}>{`${getTimeDifference(time.startTime,time.endTime)}`}</TotalTimeText>
          {isDuplicated ?
          <View style={{flexDirection:'row', alignItems:'center',gap:5}}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#FF4848" />
            <Text style={{fontSize:14, color:"#FF4848", fontWeight:500}}>선택한 시간에 이미 할 일이 있습니다</Text>
          </View>
          :
          <></>
          }
        </TotalTimeArea>
        <MarginVertical top={32}/>
        <TimeSliderBar text={"에 시작해서"} version={"start"} setOutValue={setTime} type={"time"} timeInit={todoInfo.startTime}/>
        <MarginVertical top={65}/>
        <TimeSliderBar text={"까지 끝내요"} version={"end"} setOutValue={setTime} type={"time"} timeInit={todoInfo.endTime}/>
        <MarginVertical top={80}/>
        <View style={{width:300}}>
          <Text style={{fontWeight:600, fontSize:18, textAlign:'left', color:colors.fontMain70}}>카테고리</Text>
        </View>
        <MarginVertical top={15}/>
        <CategoryArea>
          {categoryText.map((el,index) => {
            return(
              <View key={index}>
              <CategoryEl text={el} selected={selectedCategory} setSelected={setSelectedCategory}/>
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
        <Button text={"저장하기"} handleButton={handleSaveButton} unChecked={isDuplicated || !selectedCategory}/>
        <MarginVertical top={24}/>
        <TrashButton onPress={() => handleDeleteTodo(todoInfo.id)}>
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
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  z-index:-1;
`

const DetailTodoHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:${() => `${size.width}px`};
  height:56px;
`

const DetailTodoCategory = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontSub};

`

const TodoIntroArea = styled.View`
  display:flex;
  width:${() => `${size.width-60}px`};

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

const DetailTodoTitle = styled.TextInput`
  font-weight:600;
  font-size:34px;
  color:${colors.fontMain};
  height:40px;
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
  width:${() => `${size.width - 80}px`};
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




