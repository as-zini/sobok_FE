import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'


import { size } from '../styles/size';
import { colors } from '../styles/colors';
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
import quarter from '../../../assets/quarter_moon_graphic.png';
import { useReport } from '../../hooks/useReport';
import styled from 'styled-components';
import BackArrowButton from '../components/BackArrowButton';
import MarginVertical from '../components/MarginVertical';
import snow_card_book_bg from '../../../assets/statistic_bg.png';
import card_icon from '../../../assets/email_icon.png';
import full from '../../../assets/full_moon_graphic.png'
import exercise from '../../../assets/exercise_graphic.png';
import globe from '../../../assets/globe_graphic.png';
import guitar from '../../../assets/guitar_graphic.png'
import fairy from '../../../assets/fairy_graphic.png';
import sun from '../../../assets/sun_graphic.png';
import present from '../../../assets/present_graphic.png';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';


const SnowCardBook = () => {
  const [cardData, setCardData] = useState([])
  const allCardData = [{type:'english',title:'알파벳 A의'},{type:'beaker',title:'비커 모양의'},{type:"donut",title:"도넛 모양의"},{type:"reading",title:"두꺼운 책 모양의"},{type:'like',title:'좋아하는 마음의'},
  {type:'quarter',title:'초승달 모양의'},{type:'half',title:'반달 모양의'},{type:'full',title:'보름달 모양의'},{type:'angel',title:'천사 날개의'},{type:'cloud',title:"구름 모양의"},{type:'hexagon',title:'육각형 모양의'},
  {type:'crab',title:'소라게 모양의'},{type:'exercise',title:'아령 모양의'},{type:'spring',title:'스프링 모양의'},{type:'rolypoly',title:'오뚝이 모양의'},{type:'pudding',title:'한 입 베어먹은\n푸딩의'},{type:'second-language',title:'지구본 모양의'},
  {type:'other',title:'기타 모양의'},{type:'fairy',title:'요정 모양의'},{type:'snake',title:'뱀 모양의'},
  {type:'self-improvement',title:'햇님 모양의'},{type:'hobby',title:'선물 상자 모양의'}
]
  const cardImgList = [top, beaker, donut, book, heart,quarter, halfMoon, full, angel, cloud, hexagon, hermitCrab,exercise, spring, rolypoly, pudding,globe,guitar,fairy, snake,sun, present]
  const {getSnowCardList} = useReport();
  const [myCardData, setMyCardData] = useState([])
  const navigation = useNavigation();
  const {userInfo} = useUserInfoStore();

  useEffect(() => {
    getSnowCardList(setCardData, setMyCardData)
    console.log("my",myCardData, cardData)

  }, [])

  

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
      <SnowCardBookBody>
        <BackArrowButton/>
        <MarginVertical top={50}/>
        <Image source={card_icon} style={{width:48, height:40}}/>
        <MarginVertical top={20}/>
        <SnowCardBookTitle>눈카드 도감</SnowCardBookTitle>
        <MarginVertical top={10}/>
        <SnowCardBookText>{`${userInfo.displayName} 님이 모은 눈카드입니다!\n아주 멋있는걸요?`}</SnowCardBookText>
        <MarginVertical top={56}/>
        <SnowCardBookText style={{color:colors.fontMain60}}>{`총 ${cardData.length}개의 눈카드`}</SnowCardBookText>
        <MarginVertical top={20}/>
        <CardContents>
          {allCardData.map((el, index) => {
            return(
            <SnowCardEl key={index} onPress={() => {navigation.navigate('DetailSnowCard',{type:el.type, date:cardData.filter((card) => card.snowCard === el.type)[0].yearMonth})}}>
              <SnowCardBookText style={{color:!myCardData.includes(el.type) ? '#fff' : colors.fontMain70, zIndex:!myCardData.includes(el.type) ? 9 : 1}}>{`${el.title}\n눈 조각`}</SnowCardBookText>
                <SnowCardImg
                  source={cardImgList[index]}
                  style={{ width: '45%', height:90, position:'absolute', right:15, bottom:0}} 
                  resizeMode="contain"/>
              {!myCardData.includes(el.type) ?
              <View style={{width:140, height:140, backgroundColor:"rgba(0,0,0,.7)", position:'absolute', borderRadius:16}}>
                <SnowCardBookText style={{color:'#fff', position:'absolute',bottom:16, right:16}}>+50P</SnowCardBookText>
              </View> : <></>}
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
  width:${size.width}px;
  height:${size.height}px;
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

const SnowCardEl = styled.TouchableOpacity`
  width:140px;
  height:140px;
  background-color:#fff;
  border-radius:16px;
  padding:16px;
`


const SnowCardImg = styled.Image`

`

