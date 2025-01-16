import React from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../styles/colors'

const StartScreen = () => {
  return (
    <StartScreenBody>
      <StartScreenBg source={require("../../../assets/start_bg.png")} />
      <StartText>안녕하세요{"\n"}환영합니다</StartText>
      <StartButton>
        <StartButtonText>시작하기</StartButtonText>
      </StartButton>
    </StartScreenBody>
    
  )
}

export default StartScreen

const StartScreenBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`


const StartScreenBg = styled.Image`
  width:100%;
  height:100%;
`

const StartText = styled.Text`
  position:absolute;
  font-size:24px;
  bottom:150px;
  font-weight:600;
  color: ${colors.fontMain}
`

const StartButton = styled.TouchableOpacity`
  position:absolute;
  bottom:60px;
  background-color:${colors.fontMain};
  width:290px;
  height:60px;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:8px;
`

const StartButtonText = styled.Text`
  font-weight:600;
  color:#fff;
  font-size:20px;
`


