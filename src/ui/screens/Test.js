import React, { useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import styled from 'styled-components'

import test_bg from '../../../assets/test_bg.png'
import BackArrowButton from '../components/BackArrowButton'
import Steps from '../components/Step'
import { colors } from '../styles/colors'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Test = () => {
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView>
      <TestBody>
        <TestHeader>
          <BackArrowButton/>
        </TestHeader>
        <View>
          <Steps step={step}/>
        </View>
        <TestContentsArea>
          <TestCategoryText>자투리 시간</TestCategoryText>
          <TestQuestionText>언제 자투리 시간이{"\n"}생기나요?</TestQuestionText>
        </TestContentsArea>
      </TestBody>
      <TestBg source={test_bg}/>
    </SafeAreaView>
  )
}

export default Test


const TestBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

const TestBg = styled.Image`
  position:absolute;
  top:0;
  width:${width}px;
  height:${height}px;
  z-index:-1;
`

const TestHeader = styled.View`
  position:absolute;
  left:25px;
  top:20px;
`

const TestContentsArea = styled.View`
  display:flex;
  justify-content:flex-start;
  align-items:flex-start;
`

const TestCategoryText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
`

const TestQuestionText = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
`

const TestCheckEl = styled.TouchableOpacity`

`

const TestCheckText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:#777777;
`

const TestCheckIcon = styled.Image`

`
