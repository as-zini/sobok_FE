import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import { View } from 'react-native'

const SimpleTodoEl = ({data, index}) => {
  return (
    <SimpleTodoBody>
      <View style={{flexGrow:.2}}>
        <TodoIndex>
          <TodoIndexText>{index}</TodoIndexText>
        </TodoIndex>
      </View>
      <View style={{flexGrow:1}}>
        <TodoTitle>{data[0]}</TodoTitle>
        <TodoTime>{data[1]}</TodoTime>
      </View>
      <TodoDueTime>{data[2]}</TodoDueTime>
    </SimpleTodoBody>
  )
}

export default SimpleTodoEl


const SimpleTodoBody = styled.View`
  width:294px;
  height:70px;
  background-color:#fff;
  padding:17px 20px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  border-radius:8px;
`

const TodoIndex = styled.View`
  width:32px;
  height:32px;
  border-radius:50%;
  background-color:${colors.fontMain};
  display:flex;
  justify-content:center;
  align-items:center;
`

const TodoIndexText = styled.Text`
  color:#fff;
  font-weight:600;
  font-size:16px;
`

const TodoTitle = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain};
  margin-bottom:4px;
`

const TodoTime = styled.Text`
  font-weight:500;
  font-size:14px;
  color:${colors.gray70};
`

const TodoDueTime = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.indigoBlue};
`