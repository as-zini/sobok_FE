import React from 'react'
import { Image, SafeAreaView, ScrollView, View } from 'react-native'

import snow_card_book_bg from '../../../assets/statistic_bg.png';
import styled from 'styled-components';
import snowman from '../../../assets/glass_snow_graphic.png';
import beaker from '../../../assets/beaker_graphic.png';
import donut from '../../../assets/donut_graphic.png';
import book from '../../../assets/book_graphic.png';
import victory from '../../../assets/victory_graphic.png';
import heart from '../../../assets/heart_graphic.png';
import card_icon from '../../../assets/email_icon.png';
import BackArrowButton from '../components/BackArrowButton';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';


const SnowCardBook = () => {
  const cardData = ["알파벳 A", "비커", "도넛", "두꺼운 책", "Victory", "좋아하는 마음"]
  const cardImg = [snowman, beaker, donut, book, victory, heart]

  return (
    <SafeAreaView>
      <ScrollView>
      <SnowCardBookBody>
        <BackArrowButton/>
        <MarginVertical top={50}/>
        <Image source={card_icon} style={{width:48, height:40}}/>
        <MarginVertical top={20}/>
        <SnowCardBookTitle>눈카드 도감</SnowCardBookTitle>
        <MarginVertical top={10}/>
        <SnowCardBookText>{"지윤 님이 모은 눈카드입니다!\n아주 멋있는걸요?"}</SnowCardBookText>
        <MarginVertical top={56}/>
        <SnowCardBookText style={{color:colors.fontMain60}}>{"총 20개의 눈카드"}</SnowCardBookText>
        <MarginVertical top={20}/>
        <CardContents>
          {cardData.map((el, index) => {
            return(
            <SnowCardEl key={index}>
              <SnowCardBookText>{`${el}의\n눈 조각`}</SnowCardBookText>
                <SnowCardImg
                  source={cardImg[index]}
                  style={{ width: '45%', height:90, position:'absolute', right:15, bottom:0}} 
                  resizeMode="contain"/>
            </SnowCardEl>
            )
          })}
        </CardContents>
        <MarginVertical top={30}/>
      </SnowCardBookBody>
      </ScrollView>
      <SnowCardBookBg source={snow_card_book_bg}/>
    </SafeAreaView>
  )
}

export default SnowCardBook


const SnowCardBookBody = styled.View`
  display:flex;
  
  width:${size.width}px;
  padding:0 30px;
`

const SnowCardBookBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const SnowCardBookTitle = styled.Text`
  font-size:34px;
  font-weight:600;
  color:${colors.fontMain};
`

const SnowCardBookText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain70};
  line-height:26px;
`

const CardContents = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
  gap:15px;
`

const SnowCardEl = styled.View`
  width:140px;
  height:140px;
  background-color:#fff;
  border-radius:16px;
  padding:16px;
`


const SnowCardImg = styled.Image`

`

