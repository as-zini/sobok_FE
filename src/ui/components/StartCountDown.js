import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components'
import { size } from '../styles/size'
import SnowFlakeIcon from './SnowFlakeIcon'
import MarginVertical from './MarginVertical'
import { useNavigation } from '@react-navigation/native'
import { useNowTodoStore } from '../../store/todo'
import { useUserInfoStore } from '../../store/user'

const StartCountDown = () => {
  const[count, setCount] = useState(3);
  const navigation = useNavigation();
  const {nowTodo} = useNowTodoStore();
  const {userInfo} = useUserInfoStore();


  useEffect(() => {
    if(count === 3 || count===2 || count === 1){
      setTimeout(() => {
        setCount((prev) => prev-1)
      }, 1000);
    }

    if(count===0){
      setTimeout(() => {
        navigation.navigate("Timer")
      }, 1000);
    }
    
  }, [count])
  

  return (
    
      <StartBody>
        <StartText>{count === 0 ? "시작!" : `${userInfo.displayName} 님\n화이팅!`}</StartText>
        {count===0 ? <MarginVertical top={18}/> : <></>}
        {count===0 ? <SnowFlakeIcon color={'white'} size={66}/> : <StartNumber>{count}</StartNumber>}
      </StartBody>
    
  )
}

export default StartCountDown

const StartBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  background-color:rgba(0,0,0,.85);
  position:absolute;
  top:0;
  display:flex;
  justify-content:center;
  align-items:center;
`

const StartText = styled.Text`
  font-size:26px;
  font-weight:600,
  color:#fff;
  text-align:center;
  line-height:34px;
`

const StartNumber = styled.Text`
  font-size:98px;
  color:#fff;
  font-weight:700
`