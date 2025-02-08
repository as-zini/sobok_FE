import React from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import complete_snow_card_bg from '../../../assets/complete_snow_card_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import SnowCardEl from '../components/SnowCardEl';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';

const CompleteSnowCard = () => {
  return (
    <SafeAreaView>
      <CompleteSnowCardBody>
        <CompleteSnowCardHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <CompleteSnowCardHeaderText>7월의 눈카드</CompleteSnowCardHeaderText>
        </CompleteSnowCardHeader>
        <MarginVertical top={40}/>
        <SnowCardEl text={"알파벳 A의\n눈조각"} date={"2024.07"} type={2}/>
        <MarginVertical top={25}/>
        <SnowFlakeIcon color={"indigo"} size={16}/>
        <MarginVertical top={10}/>
        <SnowCardTitle>{"알파벳 A의\n눈조각"}</SnowCardTitle>
        <MarginVertical top={15}/>
        <SnowCardText>{"어딘가 모르게\nA를 닮은 눈 조각\n영어를 열심히 하셨군요?"}</SnowCardText>
        <MarginVertical top={55}/>
        <Button text={"카드 저장하기"}/>
      </CompleteSnowCardBody>
      <CompleteSnowCardBg source={complete_snow_card_bg}/>
    </SafeAreaView>
  )
}

export default CompleteSnowCard

const CompleteSnowCardBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:0 30px;
`

const CompleteSnowCardBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const CompleteSnowCardHeader = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:row;
`

const CompleteSnowCardHeaderText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.darkGray};
`


const SnowCardTitle = styled.Text`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain};
  line-height:36px;
  text-align:center;
`

const SnowCardText = styled.Text`
  font-weight:500;
  font-size:18px;
  line-height:26px;
  color:${colors.fontMain60};
  text-align:center;
`
