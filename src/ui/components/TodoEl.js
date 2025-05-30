import React, { useEffect } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import LinkIcon from './LinkIcon'
import MarginVertical from './MarginVertical'
import { useNavigation } from '@react-navigation/native'
import { size } from '../styles/size'

const TodoEl = ({data, index, todoInfo, routineTitle, isTouchable, days}) => {
  const navigation = useNavigation();

  return(
    isTouchable ? 
    <TodoElBody onPress={() => navigation.navigate("DetailTodo", {todoInfo:todoInfo, index:index, routineTitle:routineTitle, days:days})}>
    <TodoIndex>
      <TodoIndexText>{index+1}</TodoIndexText>
    </TodoIndex>
    <SetTodoGap>
      <TodoTitle>
        {data[0]}
      </TodoTitle>
      <TodoDueTime>{data[2]}</TodoDueTime>
    </SetTodoGap>
    <SetTodoGap>
      <View style={{display:'flex', flexDirection:'row', flexGrow:1}}>
        
        <LinkIcon size={14}/>
        <LinkedAppText>{data[1]}</LinkedAppText>
      </View>
      <TodoTime>{data[3]}</TodoTime>
    </SetTodoGap>
  </TodoElBody>
  :
  <TodoElBodyNotTouchable>
    <TodoIndex>
      <TodoIndexText>{index+1}</TodoIndexText>
    </TodoIndex>
    <SetTodoGap>
      <TodoTitle>
        {data[0]}
      </TodoTitle>
      <TodoDueTime>{data[2]}</TodoDueTime>
    </SetTodoGap>
    <SetTodoGap>
      <View style={{display:'flex', flexDirection:'row', flexGrow:1}}>
        <LinkIcon size={14}/>
        <LinkedAppText>{data[1]}</LinkedAppText>
      </View>
      <TodoTime>{data[3]}</TodoTime>
    </SetTodoGap>
  </TodoElBodyNotTouchable>

  )
}

export default TodoEl


const TodoElBody = styled.TouchableOpacity`
  width:${(size.width-60)*.9}px;
  height:64px;
  display:flex;
  gap:8px;
`

const TodoElBodyNotTouchable = styled.TouchableOpacity`
  width:${(size.width-60)*.9}px;
  height:64px;
  display:flex;
  gap:8px;
`

const TodoIndex = styled.View`
  width:18px;
  height:18px;
  background-color:${colors.fontMain};
  border-radius:9px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const TodoIndexText = styled.Text`
  color:#fff;
  font-size:14px;
  font-weight:600;
`

const TodoTitle = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#343434;
  flex-grow:1;
`

const LinkedAppText = styled.Text`
  font-size:14px;
  font-weight:500;
  color:${colors.gray70};
  
`

const TodoDueTime = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.indigoBlue};
`

const TodoTime = styled.Text`
  font-size:14px;
  font-weight:500;
  color:${colors.gray70};
`

const SetTodoGap = styled.View`
  display:flex;
  width:100%;
  flex-direction:row;
  align-items:center;
`