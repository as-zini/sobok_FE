import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
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

const DetailTodo = ({route}) => {
  const {todoInfo, index, routineTitle} = route.params;

  useEffect(() => {
    console.log(todoInfo)
    console.log(index)
  }, [])
  

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
        <TimeSliderBar text={"에 시작해서"} version={"Todo"} time={todoInfo.startTime.slice(0,5)}/>
        <MarginVertical top={65}/>
        <TimeSliderBar text={"까지 끝내요"} version={"Todo"} time={todoInfo.endTime.slice(0,5)}/>
        <MarginVertical top={80}/>
        <LinkedAppArea>
          <LinkedAppTitle>연동앱</LinkedAppTitle>
          <LinkedAppBody>
            <LinkedAppIcon>
              <LinkIcon size={24}/>
            </LinkedAppIcon>
            <LinkedAppText>{`${todoInfo.linkApp}`}</LinkedAppText>
            <DropDownArrowButton size={24}/>
          </LinkedAppBody>
        </LinkedAppArea>
        <MarginVertical top={80}/>
        <Button text={"저장하기"}/>
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




