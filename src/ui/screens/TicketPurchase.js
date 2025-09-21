import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import { useUserInfoStore } from '../../store/user';
import { useNavigation } from '@react-navigation/native';

import subscribeBg from '../../../assets/subscribe_bg.png';
import ticketImg from '../../../assets/ticket_img.png';
import ticketCheckIcon from '../../../assets/ticket_check_icon.png';
import crownIconIndigo from '../../../assets/crown_icon_indigo.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import BackArrowButton from '../components/BackArrowButton';
import PurchaseModal from '../components/PurchaseModal';
import ticketUncheckIcon from '../../../assets/ticket_uncheck_icon.png'

const TicketPurchase = ({ route }) => {
  const { userInfo } = useUserInfoStore();
  const { userPremium } = route.params;
  const navigation = useNavigation();

  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);

  useEffect(() => {
    // console.log(route.params);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Body>
        <Header>
          <View style={{ position: 'absolute', left: 0 }}>
            <BackArrowButton />
          </View>
          <Title>구독권 구매하기</Title>
        </Header>
        <MarginVertical top={50}/>
        <Image source={crownIconIndigo} style={{width:20,height:20}}/>
        <TouchableOpacity
          style={{
            width: 140,
            height: 35,
            backgroundColor: 'rgba(106, 143, 246, 0.5)',
            borderRadius: 17,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('PointInfo')}
        >
          <Text style={{ fontWeight: '500', fontSize: 14, color: '#fff' }}>
            '프리미엄 구독권'이란?
          </Text>
        </TouchableOpacity>
        <MarginVertical top={44} />
        <TicketArea>
          <Image source={ticketImg} style={{ zIndex: 2 ,width:240, height:110, resizeMode:'contain'}} />
          <Image
            source={userInfo.isPremium ? ticketCheckIcon : ticketUncheckIcon}
            style={{ position: 'absolute', top:14,zIndex: 2 , width:32,height:32}}
          />
          <TicketText>
            {userInfo.isPremium
              ? `${dayjs().format('M월')} 구독권
사용중`
              : `${dayjs().format('M월')} 구독권
구매 가능`}
          </TicketText>
        </TicketArea>
        <MarginVertical top={32}/>
        <ExpirationText>
          {userInfo.isPremium
            ? '구독권 만료까지'
            : `${dayjs().month() + 2}월 구독권 구매 가능일까지`}
        </ExpirationText>
        <MarginVertical top={8} />
        <ExpirationTitle>
          {userInfo.isPremium
            ? 'D-4'
            : `D-${dayjs().endOf('month').date() - dayjs().date()}`}
        </ExpirationTitle>
        <MarginVertical top={35} />
        <SubscribeText>
          {userInfo.isPremium
            ? "구독권을 사용중이시군요!\n다음 달 구독권을 위해 열심히 시간을 모아봐요!"
            : userPremium <= userInfo.point
            ? `${userPremium}P 를 모두 모았어요!\n${dayjs()
                .add(1, 'M')
                .format('M월')} 구독권을 구매할 수 있겠군요!`
            : `${userPremium - userInfo.point}P 만 모으면\n${dayjs()
                .add(1, 'M')
                .format('M월')} 구독권을 구매할 수 있어요!`}
        </SubscribeText>
        <MarginVertical top={40} />
        <ProgressBar
          version="Point"
          userPoint={userInfo.point}
          totalPoints={userPremium}
        />
        <MarginVertical top={40} />
        <Button
          text="구독권 구매하기"
          handleButton={() => setIsPurchaseModalVisible(true)}
        />
        <PurchaseModal
          isPurchaseModalVisible={isPurchaseModalVisible}
          setIsPurchaseModalVisible={setIsPurchaseModalVisible}
          version="Purchase"
        />
      </Body>
      <Background source={subscribeBg} />
    </SafeAreaView>
  );
};

export default TicketPurchase;

const Body = styled.View`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  border-radius: 16px;
  align-items: center;
  padding-horizontal: 30px;
`;

const Background = styled.Image`
  position: absolute;
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};;
  top: 0;
  z-index: -1;
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${colors.darkGray};
`;

const TicketArea = styled.View`
  align-items:center
`;

const TicketText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  position: absolute;
  top: 50px;
  text-align: center;
  z-index: 2;
`;

const ExpirationText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.fontMain80};
  z-index: 2;
`;

const ExpirationTitle = styled.Text`
  font-size: 50px;
  font-weight: 600;
  color: ${colors.fontMain};
  z-index: 2;
`;

const SubscribeText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain70};
  text-align: center;
  z-index: 2;
`;

const PurchaseModalBg = styled.Image``;
