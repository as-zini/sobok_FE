import React from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import BackArrowButton from '../components/BackArrowButton'
import Button from '../components/Button';
import test_start_bg from '../../../assets/test_start_bg.png';
import test_start_icon from '../../../assets/save_icon.png';
import { colors } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const TestStartScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TestStartBody>
        <TestStartHeader>
          <BackArrowButton />
        </TestStartHeader>
        <TestStartIcon source={test_start_icon}/>
        <TestStartTitle>
          맞춤 검사{"\n"}시작하기
        </TestStartTitle>
        <TestStartText>
          지윤 님에게 딱 맞는{"\n"}AI추천 루틴을 만들기 위해{"\n"}다양한 질문을 드릴게요!
        </TestStartText>
        <View style={{position:'absolute', bottom:-400}}>
          <Button text={"맞춤 검사 시작하기"} handleButton={() => {navigation.navigate('Test')}}/>
        </View>
        <TestStartBg source={test_start_bg}/>
      </TestStartBody>
    </SafeAreaView>
  )
}

export default TestStartScreen


const TestStartBody = styled.View`
  z-index:-1;
  display:flex;
  justify-content:center;
  align-items:center;
  position:relative;
`

const TestStartBg = styled.Image`
  width:${width}px;
  height:${height}px;
  z-index:-1;
  position:absolute;
  top:-45px;
`

const TestStartHeader = styled.View`
  position:absolute;
  left:25px;
  top:20px;
`

const TestStartIcon = styled.Image`
  width:40px;
  height:30px;
  margin-top:125px;
  margin-bottom:15px;
`

const TestStartTitle = styled.Text`
  font-size:32px;
  font-weight:600;
  color:${colors.fontMain};
  text-align:center;
  margin-bottom:12px;
`

const TestStartText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  text-align:center;
`



