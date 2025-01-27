import React from 'react'
import Modal from 'react-native-modal';

import subscribe_bg from '../../../assets/subscribe_bg.png';
import ticket_img from '../../../assets/ticket_img.png';
import ticket_check_icon from '../../../assets/ticket_check_icon.png';
import styled from 'styled-components';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import { Image } from 'react-native';
import ProgressBar from './ProgressBar';
import Button from './Button';
import MarginVertical from './MarginVertical';

const SubscribeModal = ({isSubscribeModalVisible, setIsSubscribeModalVisible, setIsPurchaseModalVisible}) => {
  return (
    <Modal
      isVisible={isSubscribeModalVisible} 
      animationIn={'slideInUp'}
      animationInTiming={1000} 
      animationOut={'slideOutDown'} 
      animationOutTiming={1000}
      onBackdropPress={() => setIsSubscribeModalVisible(false)}
    >
      <SubscribeModalBody>
        <SubscribeModalTitle>구독권 구매하기</SubscribeModalTitle>
        <MarginVertical top={8}/>
        <SubscribeModalText>자투리 시간이 생기는{'\n'}시간을 알려주세요!</SubscribeModalText>
        <MarginVertical top={44}/>
        <TicketImageArea>
          <Image source={ticket_img} style={{zIndex:2}}/>
          <Image source={ticket_check_icon} style={{position:'relative', top:-90, left:110, zIndex:2}}/>
          <TickeText>1월 구독권{"\n"}사용중</TickeText>
        </TicketImageArea>
        <ExpirationText>구독권 만료까지</ExpirationText>
        <MarginVertical top={8}/>
        <ExpirationTitle>D-4</ExpirationTitle>
        <MarginVertical top={35}/>
        <ToSubscribeText>1500P만 모으면{"\n"}2월 구독권을 구매할 수 있어요!</ToSubscribeText>
        <MarginVertical top={35}/>
        <ProgressBar/>
        <MarginVertical top={40}/>
        <Button text={"구독권 구매하기"} handleButton={() => {setIsPurchaseModalVisible(true);setIsSubscribeModalVisible(false)}}/>
      </SubscribeModalBody>
      <SubscribeModalBg source={subscribe_bg}/>
    </Modal>
  )
}

export default SubscribeModal

const SubscribeModalBody = styled.View`
  background-color:#fff;
  width:${size.width}px;
  height:670px;
  border-radius:16px;
  position:absolute;
  bottom:-20px;
  left:-20px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const SubscribeModalBg = styled.Image`
  position:absolute;
  width:${size.width}px;
  height:670px;
  bottom:-20px;
  left:-20px;
  
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
