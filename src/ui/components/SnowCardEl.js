import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import snow_card_bg from '../../../assets/snow_card_bg.png';
import { ImageBackground, View } from 'react-native';
import SnowFlakeIcon from './SnowFlakeIcon';

import snowman from '../../../assets/glass_snow_graphic.png';
import top from '../../../assets/top_graphic.png';
import beaker from '../../../assets/beaker_graphic.png';
import donut from '../../../assets/donut_graphic.png';
import book from '../../../assets/book_graphic.png';
import victory from '../../../assets/victory_graphic.png';
import heart from '../../../assets/heart_graphic.png';
import halfMoon from '../../../assets/half_moon_graphic.png';
import snake from '../../../assets/snake_graphic.png';
import angel from '../../../assets/angel_graphic.png';
import cloud from '../../../assets/cloud_graphic.png';
import hexagon from '../../../assets/hexagon_graphic.png';
import hermitCrab from '../../../assets/hermit_crab_graphic.png';
import spring from '../../../assets/spring_graphic.png';
import rolypoly from '../../../assets/rolypoly_graphic.png';
import pudding from '../../../assets/pudding_graphic.png';
import arrow_left from '../../../assets/calandar_arrow_left.png';
import arrow_right from '../../../assets/calandar_arrow_right.png';
import MarginVertical from './MarginVertical';
import quarter from '../../../assets/quarter_moon_graphic.png';


const SnowCardEl = ({text, type, isArrow, date}) => {
  const imgList = [top, beaker, donut, book, heart,quarter, halfMoon, snake, angel, cloud, hexagon, hermitCrab, spring, rolypoly, pudding]

  

  return (
    <SnowCardElBody>
      {isArrow ? 
      <ArrowButton>
        <ArrowButtonImg source={arrow_left}/>
      </ArrowButton>
      :
      <></>
      }
      <SnowCard>
        <SnowCardText>{date}</SnowCardText>
        <View style={{width:150,height:150, alignItems:'center',justifyContent:'center'}}>
          <SnowCardImg source={imgList[type]}/>
        </View>
        <MarginVertical top={10}/>
        <SnowFlakeIcon color={"white"} size={16}/>
        <MarginVertical top={10}/>
        <SnowCardText>{text}</SnowCardText>  
        <SnowCardBg source={snow_card_bg}/>
      </SnowCard>
      {isArrow ? 
      <ArrowButton>
        <ArrowButtonImg source={arrow_right}/>
      </ArrowButton>
      :
      <></>
      }
    </SnowCardElBody>
  )
}

export default SnowCardEl


const SnowCardElBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:row;
  gap:12px;
`

const SnowCard = styled.TouchableOpacity`
  display:flex;
  justify-content:center;
  align-items:center;
  width:240px;
  height:290px;
  border-radius:12px;
`

const SnowCardBg = styled.Image`
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
`
const SnowCardImg = styled.Image`
  width: 90%;      
  height:90%;
  resize-mode:contain;
`

const SnowCardText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:#fff;
  text-align:center;
  line-height:26px;
`

const ArrowButton = styled.TouchableOpacity`
  display:flex;
  justify-content:center;
  align-items:center;
  
`

const ArrowButtonImg = styled.Image`

`
