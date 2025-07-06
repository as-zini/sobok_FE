import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styled from '@emotion/native'
import { colors } from '../styles/colors'

import mypage_bg from '../../../assets/home_bg.png';
import setting_icon from '../../../assets/setting_icon.png';
import snowman_graphic from '../../../assets/snowman_graphic.png';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import { size } from '../styles/size';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';
import { useGetInfo } from '../../hooks/useGetInfo';
import { minToHour } from '../../util';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import ticket from '../../../assets/checked_ticket_img.png';
import dayjs from 'dayjs';
import { useReport } from '../../hooks/useReport';

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
import card_icon from '../../../assets/email_icon.png';
import full from '../../../assets/full_moon_graphic.png'
import exercise from '../../../assets/exercise_graphic.png';
import globe from '../../../assets/globe_graphic.png';
import guitar from '../../../assets/guitar_graphic.png'
import fairy from '../../../assets/fairy_graphic.png';
import sun from '../../../assets/sun_graphic.png';
import present from '../../../assets/present_graphic.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const MyPage = () => {
  const {userInfo} = useUserInfoStore();
  const categoryText = ["총 시간", "적금"];
  const navigation = useNavigation();
  const {getContinuitySuccess} = useGetInfo();
  const [achieve, setAchieve] = useState(0);
  const [savingCount, setSavingCount] = useState(0)
  const {getSavingCount} = useInstallmentSaving()
  const [cardData, setCardData] = useState([])
  const {getSnowCardList} = useReport()
  const categoryValue = [minToHour(userInfo.totalAchievedTime), `${savingCount}개`];
  const [myCardData, setMyCardData] = useState([])

  const allCardData = [{type:'english',title:'알파벳 A의'},{type:'beaker',title:'비커 모양의'},{type:"donut",title:"도넛 모양의"},{type:"reading",title:"두꺼운 책 모양의"},{type:'like',title:'좋아하는 마음의'},
  {type:'quarter',title:'초승달 모양의'},{type:'half',title:'반달 모양의'},{type:'full',title:'보름달 모양의'},{type:'angel',title:'천사 날개의'},{type:'cloud',title:"구름 모양의"},{type:'hexagon',title:'육각형 모양의'},
  {type:'crab',title:'소라게 모양의'},{type:'exercise',title:'아령 모양의'},{type:'spring',title:'스프링 모양의'},{type:'rolypoly',title:'오뚝이 모양의'},{type:'pudding',title:'한 입 베어먹은\n푸딩의'},{type:'second-language',title:'지구본 모양의'},
  {type:'other',title:'기타 모양의'},{type:'fairy',title:'요정 모양의'},{type:'snake',title:'뱀 모양의'},
  {type:'self-improvement',title:'햇님 모양의'},{type:'hobby',title:'선물 상자 모양의'}
]
  const cardImgList = [top, beaker, donut, book, heart,quarter, halfMoon, full, angel, cloud, hexagon, hermitCrab,exercise, spring, rolypoly, pudding,globe,guitar,fairy, snake,sun, present]


  useEffect(() => {
    getContinuitySuccess(setAchieve)
    getSavingCount(setSavingCount)
    getSnowCardList(setCardData, setMyCardData)
  }, [])
  

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
      <MyPageBody>
        <MyPageHeader>
          <View style={{flexGrow:.04}}>
            <SnowFlakeIcon color={'indigo'} size={16}/>
          </View>
          <ContinuitySuccessText>{`${achieve}일`}</ContinuitySuccessText>
          <SettingButton onPress={() => navigation.navigate("Setting")}>
            <Fontisto name="player-settings" size={24} color={colors.fontMain60} />
          </SettingButton>
        </MyPageHeader>
        <ProfileArea>
          <ProfileImageArea>
            <Image source={snowman_graphic} style={{width:40, height:40}}/>
          </ProfileImageArea>
          <MarginVertical top={12}/>
          <MyPageTitle>{`안녕하세요,\n${userInfo.displayName} 님`}</MyPageTitle>
          <MarginVertical top={15}/>
          <MyPageText>오늘도 소복이{"\n"}시간을  쌓아볼까요?</MyPageText>
        </ProfileArea>
        <MarginVertical top={48}/>
        <MyInfoArea>
          <View style={{display:'flex', justifyContent:'center',alignItems:'center', gap:10}}>
            <SnowFlakeIcon color={"indigo"} size={16}/>
            <VerticalBorderLine/>
          </View>
          <MarginVertical top={10}/>
          <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
            {categoryText.map((el, index) => {
              return(
                <InfoEl key={index}>
                  <InfoText>{el}</InfoText>
                  <InfoText style={{fontSize:26}}>{categoryValue[index]}</InfoText>
                </InfoEl>
              )
            })}
            <View style={{width:"100%",height:140,borderRadius:16,backgroundColor:"#fff",paddingVertical:22,paddingHorizontal:28}}>
              <Image source={ticket} style={{width:40,height:21}}/>
              <MarginVertical top={10}/>
              <View style={{flexDirection:'row'}}>
                <Text style={{flexGrow:1, fontWeight:500,fontSize:18,color:colors.fontMain80}}>{userInfo.isPremium ? `${dayjs().get('month')+1}월\n구독권 사용중` : "프리미엄 구독권\n미사용중"}</Text>
                <InfoText style={{fontSize:26}}>{userInfo.isPremium ? `D-${dayjs().endOf('month').get('date')-dayjs().get('date')}` : `D-${dayjs().endOf('month').get('date')-dayjs().get('date')}`}</InfoText>
              </View>
              <MarginVertical top={10}/>
              <BorderLine style={{width:'100%'}}/>
              <MarginVertical top={7}/>
              <Text style={{fontWeight:500,fontSize:14,color:colors.darkGray,textAlign:'right'}}>{dayjs().endOf('month').format("M월 DD일까지")}</Text>
            </View>
          </View>
        </MyInfoArea>
        <MarginVertical top={42}/>
        <SnowCardArea >
          <View style={{flexDirection:'row',width:'95%', alignItems:'flex-end'}}>
            <Text style={{fontWeight:600,fontSize:22,color:colors.darkGray,flexGrow:1}}>{`눈카드 ${cardData.length}개`}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SnowCardBook', {version:""})} style={{width:50,height:50,display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.fontMains} />
            </TouchableOpacity>
          </View>
          <MarginVertical top={16}/>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {myCardData.map((el,index) => {
            return(
              <CardEl key={index}>
                <Text style={{fontWeight:600,fontSize:18,color:colors.gray77}}>{`${allCardData.find((card) => card.type === el)?.title}\n눈조각`}</Text>
                <Image source={cardImgList[allCardData.findIndex((card) => card.type === el)]} style={{resizeMode:'contain',width:60,height:60, position:'absolute',bottom:16,right:16}}/>
              </CardEl>
            )
          })}
          </ScrollView>
        </SnowCardArea>
        <MarginVertical top={100}/>
      </MyPageBody>
      </ScrollView>
      <MyPageBg source={mypage_bg}/>
    </SafeAreaView>
  )
}

export default MyPage

const MyPageBody = styled.View`
  width:${() => `${size.width}px`};
  padding:0 36px;
  display:flex;
  justify-content:center;
`

const MyPageBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
`

const MyPageHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  height:70px;
`

const ContinuitySuccessText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  flex-grow:1;
`

const SettingButton = styled.TouchableOpacity`
  width:50px;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`


const ProfileArea = styled.View`

`

const ProfileImageArea = styled.View`
  width:56px;
  height:56px;
  border-radius:28px;
  background-color:#fff;
  display:flex;
  justify-content:center;
  align-items:center;
`

const MyPageTitle = styled.Text`
  font-weight:600;
  font-size:34px;
  color:${colors.fontMain};
  line-height:44px;
`

const MyPageText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain70};
  line-height:26px;
`

const MyInfoArea = styled.View`
  width:300px;
  display:flex;
  align-items:flex-start;
`

const VerticalBorderLine = styled.View`
  height:26px;
  width:.8px;
  background-color:${colors.darkGray};
`

const BorderLine = styled.View`
  width:300px;
  height:.5px;
  background-color:${colors.fontMain80};
`

const InfoEl = styled.View`
  width:150px;
  display:flex;
  gap:3px;
  margin-bottom:40px;
`

const InfoText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain90};
  line-height:28px;
`

const SnowCardArea = styled.View`

`

const CardEl = styled.View`
  width:140px;
  height:140px;
  background-color:#fff;
  border-radius:16px;
  margin-right:12px;
  padding:16px;
`