import React, { use, useEffect, useState } from 'react'
import Modal from 'react-native-modal';

import subscribe_bg from '../../../assets/subscribe_bg.png';
import ticket_img from '../../../assets/ticket_img.png';
import ticket_check_icon from '../../../assets/ticket_check_icon.png';
import styled from 'styled-components';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import { useUserInfoStore } from '../../store/user';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import BackArrowButton from '../components/BackArrowButton';
import { useNavigation } from '@react-navigation/native';
import PurchaseModal from '../components/PurchaseModal';
import crown_icon_indigo from '../../../assets/crown_icon_indigo.png';

const TicketPurchase = ({route}) => {
  const{userInfo} = useUserInfoStore();
  const {userPremium} = route.params;
  const navigation = useNavigation();
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false)
  
  useEffect(() => {
    console.log(route.params)
  }, [])
  
  


 
  return (
    <SafeAreaView>
      <SubscribeModalBody>
        <SubscribeHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.darkGray}}>구독권 구매하기</Text>
        </SubscribeHeader>
        <MarginVertical top={50}/>
        <Image source={crown_icon_indigo}/>
        <TouchableOpacity style={{width:140, height:35, backgroundColor:"rgba(106, 143, 246, 0.5)", borderRadius:17, justifyContent:'center', alignItems:'center'}}
          onPress={() => navigation.navigate("PointInfo")}>
          <Text style={{fontWeight:500, fontSize:14, color:"#fff"}}>'프리미엄 구독권'이란?</Text>
        </TouchableOpacity>
        <MarginVertical top={44}/>
        <TicketImageArea>
          <Image source={ticket_img} style={{zIndex:2}}/>
          <Image source={ticket_check_icon} style={{position:'relative', top:-90, left:110, zIndex:2}}/>
          <TickeText>{`${dayjs().format("M월")} 구독권\n사용중`}</TickeText>
        </TicketImageArea>
        <ExpirationText>{userInfo.isPremium ? `구독권 만료까지` : `${dayjs().get('month')+2}월 구독권 구매 가능일까지`}</ExpirationText>
        <MarginVertical top={8}/>
        <ExpirationTitle>{userInfo.isPremium ?`D-4`:`D-${dayjs().endOf('month').get('date')-dayjs().get('date')}` }</ExpirationTitle>
        <MarginVertical top={35}/>
        <ToSubscribeText>{`${userPremium-userInfo.point}P만 모으면\n${dayjs().add(1, 'month').format("M월")} 구독권을 구매할 수 있어요!`}</ToSubscribeText>
        <MarginVertical top={35}/>
        <ProgressBar version={"Point"} userPoint={userInfo.point} totalPoints={userPremium} />
        <MarginVertical top={40}/>
        <Button text={"구독권 구매하기"} handleButton={() => {
          setIsPurchaseModalVisible(true)
        }}
        />
        <PurchaseModal isPurchaseModalVisible={isPurchaseModalVisible} setIsPurchaseModalVisible={setIsPurchaseModalVisible} version={"Purchase"}/>
      </SubscribeModalBody>
      <SubscribeModalBg source={subscribe_bg}/>
    </SafeAreaView>
  )
}

export default TicketPurchase

const SubscribeModalBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  border-radius:16px;
  display:flex;
  align-items:center;
  padding: 0 30px;
`

const SubscribeModalBg = styled.Image`
  position:absolute;
  width:${size.width}px;
  top:0;
  z-index:-1;
  
`

const SubscribeHeader = styled.View`
  width:100%;
  height:50px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`

const SubscribeModalTitle = styled.Text`
  font-weight:600;
  font-size:20px;
  color:${colors.fontMain};
  z-index:2;
`

const SubscribeModalText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:${colors.fontMain70};
  text-align:center;
  z-index:2;

`

const TicketImageArea = styled.View`
  
`

const TickeText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#fff;
  position:absolute;
  left:95px;
  top:60px;
  text-align:center;
  z-index:2;

`

const ExpirationText = styled.Text`
  font-size:20px;
  font-weight:500;
  color:${colors.fontMain80};
  z-index:2;

`

const ExpirationTitle = styled.Text`
  font-size:50px;
  font-weight:600;
  color:${colors.fontMain};
  z-index:2;

`

const ToSubscribeText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain70};
  text-align:center;
  z-index:2;

`
