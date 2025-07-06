import React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import styled from '@emotion/native';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import MarginVertical from '../components/MarginVertical';
import SnowFlakeIcon from '../components/SnowFlakeIcon';

import bg from '../../../assets/savetime_bg.png';
import icon from '../../../assets/login_icon.png';

const notiArr = [
  ['10월 3일', ['알림이 왔어요!', '3시간전'], ['집가고싶다...', '3시간전']],
  ['10월 2일', ['알림이 왔어요!', '1일전'], ['알림이 왔어요!', '1일전']],
];

const Notification = () => (
  <SafeAreaView>
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <View style={{ position: 'absolute', left: 0 }}>
            <BackArrowButton />
          </View>
        </Header>
        <MarginVertical top={30} />
        <Image source={icon} style={{ width: 48, height: 40 }} />
        <MarginVertical top={20} />
        <Title>알림</Title>
        <MarginVertical top={40} />
        <SnowFlakeIcon size={16} color="indigo" />
        <MarginVertical top={8} />
        <CountText>새로운 알림 3개가 있어요!</CountText>
        <MarginVertical top={25} />
        <ContentsArea>
          {notiArr.map((section, idx) => (
            <View key={idx}>
              <SectionDate>{section[0]}</SectionDate>
              {section.slice(1).map((noti, i) => (
                <NotiEl key={i}>
                  <IconWrapper>
                    <SnowFlakeIcon size={14} color="white" />
                    <NewSign />
                  </IconWrapper>
                  <NotiTextContainer>
                    <NotiText>{noti[0]}</NotiText>
                    <NotiTime>{noti[1]}</NotiTime>
                  </NotiTextContainer>
                </NotiEl>
              ))}
            </View>
          ))}
        </ContentsArea>
      </ScrollView>
    </Container>
    <Background source={bg} />
  </SafeAreaView>
);

export default Notification;

const Container = styled.View`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  padding-horizontal: 40px;
  display: flex;
`;

const Background = styled.Image`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  position: absolute;
  top: 0;
  z-index: -1;
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 34px;
  color: ${colors.fontMain};
`;

const CountText = styled.Text`
  font-weight: 600;
  color: ${colors.fontMain90};
`;

const SectionDate = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #707172;
`;

const NotiEl = styled.View`
  flex-direction: row;
  gap: 18px;
  padding-vertical: 20px;
  align-items: center;
`;

const IconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: ${colors.fontMain};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const NewSign = styled.View`
  width: 7px;
  height: 7px;
  border-radius: 3px;
  background-color: ${colors.fontMain};
  position: absolute;
  top: -5px;
  right: -5px;
`;

const NotiTextContainer = styled.View`
  gap: 5px;
`;

const NotiText = styled.Text`
  color: ${colors.gray52};
`;

const NotiTime = styled.Text`
  font-size: 14px;
  color: rgba(112,113,114,0.7);
`;

const ContentsArea = styled.View``;
