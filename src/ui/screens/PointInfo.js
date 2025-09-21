import React from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';

import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import SnowCardEl from '../components/SnowCardEl';
import MarginVertical from '../components/MarginVertical';

import crownIcon from '../../../assets/crown_icon.png';
import pointInfoImg1 from '../../../assets/point_info_img1.png';
import pointInfoImg2 from '../../../assets/point_info_img2.png';
import calendarIcon from '../../../assets/calandar_icon.png';
import reportIcon from '../../../assets/report_arrive_icon.png';
import snowCardIcon from '../../../assets/snow_card_icon.png';

const PointInfo = () => {
  const navigation = useNavigation();
  const { userInfo } = useUserInfoStore();

  return (
    <Body>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopArea>
          <Header>
            <BackArrow onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios-new" size={20} color="#fff" />
            </BackArrow>
            <HeaderText>프리미엄 구독권</HeaderText>
          </Header>
          <MarginVertical top={170} />
          <Image source={crownIcon} style={{width:48, height:48}}/>
          <PlanButton onPress={() => navigation.goBack()}>
            <PlanText>소복 프리미엄 구독권</PlanText>
          </PlanButton>
          <MarginVertical top={16} />
          <TopTitle>
            {`${userInfo.displayName} 님께서 쌓은 시간,\n지금 보여드릴게요!`}
          </TopTitle>
          <MarginVertical top={30} />
          <SnowFlakeIcon size={16} color="white" />
          <MarginVertical top={10} />
          <HeaderText>
            {'한 달 동안 꾸준히 남겨온\n시간의 발자국을 모두 모아 보여드려요!'}
          </HeaderText>
        </TopArea>
        <InfoArea>
          <MarginVertical top={45} />
          <InfoEl>
            <NumberArea>
              <HeaderText>1</HeaderText>
            </NumberArea>
            <MarginVertical top={15} />
            <BenefitText>혜택 1</BenefitText>
            <MarginVertical top={5} />
            <InfoTitle>통계 기능 제공</InfoTitle>
            <MarginVertical top={40} />
            <SnowFlakeIcon size={16} color="indigo" />
            <MarginVertical top={7} />
            <InfoText>
              {'매달, 언제 얼마나 시간을 모았는지\n자세하게 보여드립니다!'}
            </InfoText>
            <MarginVertical top={25} />
            <Image source={pointInfoImg1} style={{width:'100%', resizeMode:'contain', height:210}}/>
            <MarginVertical top={10} />
            <Row>
              <MaterialIcons name="info" size={24} color={colors.fontMain50} />
              <CautionText>
                {'구매 시점으로부터 한 달 동안\n모든 통계를 볼 수 있습니다.'}
              </CautionText>
              <Icon source={calendarIcon} style={{ transform: [{ rotate: '15deg' }] , width:80, resizeMode:'contain'}} />
            </Row>
          </InfoEl>
          <MarginVertical top={65} />
          <InfoEl>
            <NumberArea>
              <HeaderText>2</HeaderText>
            </NumberArea>
            <MarginVertical top={15} />
            <BenefitText>혜택 2</BenefitText>
            <MarginVertical top={5} />
            <InfoTitle>리포트 기능 제공</InfoTitle>
            <MarginVertical top={40} />
            <SnowFlakeIcon size={16} color="indigo" />
            <MarginVertical top={7} />
            <InfoText>
              {'매달 1일, 한 달 동안의 자투리 시간 활용을\n꼼꼼하게 분석해 드릴게요!'}
            </InfoText>
            <MarginVertical top={25} />
            <Image source={pointInfoImg2} style={{width:'100%', resizeMode:'contain', height:260}}/>
            <MarginVertical top={10} />
            <Row>
              <MaterialIcons name="info" size={24} color={colors.fontMain50} />
              <CautionText>
                {'구독한 기간 동안의\n리포트만 볼 수 있습니다.'}
              </CautionText>
              <Icon source={reportIcon} style={{ transform: [{ rotate: '15deg' }] }} />
            </Row>
          </InfoEl>
          <MarginVertical top={65} />
          <InfoEl>
            <NumberArea>
              <HeaderText>3</HeaderText>
            </NumberArea>
            <MarginVertical top={15} />
            <BenefitText>혜택 3</BenefitText>
            <MarginVertical top={5} />
            <InfoTitle>눈카드 기능 제공</InfoTitle>
            <MarginVertical top={40} />
            <SnowFlakeIcon size={16} color="indigo" />
            <MarginVertical top={7} />
            <InfoText>
              {'매달, 언제 얼마나 시간을 모았는지\n자세하게 보여드립니다!'}
            </InfoText>
            <MarginVertical top={25} />
            <SnowCardEl text={'구름모양의 눈 조각'} type={"cloud"} date={'2025.04'} />
            <MarginVertical top={15} />
            <Row>
              <MaterialIcons name="info" size={24} color={colors.fontMain50} />
              <CautionText>{"눈카드는 리포트와 함께\n제공됩니다."}</CautionText>
              <Icon source={snowCardIcon} style={{width:92, resizeMode:'contain'}}/>
            </Row>
          </InfoEl>
          <MarginVertical top={150} />
        </InfoArea>
        <TopArea style={{ height: 340 }}>
          <MarginVertical top={60} />
          <SnowFlakeIcon size={16} color="white" />
          <MarginVertical top={10} />
          <HeaderText>
            {`${userInfo.displayName} 님의 한 달,
녹아버리지 않게 소복이 쌓아드릴게요!`}
          </HeaderText>
          <MarginVertical top={30} />
          <Image source={crownIcon} style={{ width: 20, height: 17 }} />
          <MarginVertical top={10} />
          <ActionButton onPress={() => navigation.goBack()}>
            <ActionText style={{ color: colors.indigoBlue }}>
              프리미엄 구독권 구매하기
            </ActionText>
          </ActionButton>
        </TopArea>
      </ScrollView>
    </Body>
  );
};

export default PointInfo;

const Body = styled.View`
  width: ${size.width}px;
  justify-content: center;
`;

const Header = styled.View`
  flex-direction: row;
  height: 80px;
  align-items: flex-end;
  padding-horizontal: 30px;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  text-align: center;
`;

const BackArrow = styled.TouchableOpacity``;

const TopArea = styled.View`
  background-color: ${colors.indigoBlue70};
  width: ${size.width}px;
  height: 600px;
  border-radius: 24px;
  align-items: center;
`;

const PlanButton = styled.TouchableOpacity`
  border-radius: 15px;
  border-width: 1px;
  border-color: #fff;
  width: 140px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const PlanText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

const TopTitle = styled.Text`
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  line-height: 38px;
`;

const InfoArea = styled.View`
  padding-horizontal: 30px;
  width: 100%;
`;

const InfoEl = styled.View``;

const NumberArea = styled.View`
  width: 32px;
  height: 32px;
  background-color: ${colors.indigoBlue};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const BenefitText = styled.Text`
  font-size: 22px;
  font-weight: 500;
  color: ${colors.fontMain60};
`;

const InfoTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${colors.fontMain};
  line-height: 40px;
`;

const InfoText = styled.Text`
  font-weight: 500;
  color: ${colors.fontMain70};
  font-size: 18px;
`;

const CautionText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.fontMain60};
`;

const Row = styled.View`
  flex-direction: row;
  gap: 5px;
`;

const Icon = styled.Image`
  width: 80px;
  height: 80px;
  position: absolute;
  right: 30px;
  bottom: -10px;
`;

const ActionButton = styled.TouchableOpacity`
  width: 294px;
  height: 56px;
  border-radius: 8px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const ActionText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;
