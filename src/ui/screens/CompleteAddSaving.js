import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Image, Text } from 'react-native';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import CreateLoading from '../components/CreateLoading';
import BackArrowButton from '../components/BackArrowButton';
import Button from '../components/Button';
import MarginVertical from '../components/MarginVertical';
import LinkIcon from '../components/LinkIcon';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import { useUserInfoStore } from '../../store/user';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import { minToHour } from '../../util';

const mildCloud = require('../../../assets/mild_cloud_icon.png');
const snowman = require('../../../assets/snowman_graphic.png');
const snowflake = require('../../../assets/snowflak_icon.png');
const completeBg = require('../../../assets/complete_add_saving_bg.png');
const snowflakeWhite = require('../../../assets/snow_flake_icon_white.png');

const CompleteAddSaving = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { newSavingData, routineTitle } = route.params;
  const { handleAddSaving } = useInstallmentSaving();
  const { userInfo } = useUserInfoStore();

  useEffect(() => {
    handleAddSaving(newSavingData, setLoading);
  }, []);

  const interest =
    newSavingData.time < 600
      ? 0.3
      : newSavingData.time < 1200
      ? 0.4
      : newSavingData.time < 2400
      ? 0.5
      : 0.7;

  if (!loading) {
    return <CreateLoading categoryText="나만의 적금" />;
  }

  return (
    <SafeArea>
      <Container>
        <Header>
          <BackArrowButton />
        </Header>
        <MarginVertical top={55} />
        <TitleArea>
          <Image source={mildCloud} style={{ width: 48, height: 34 }} />
          <MarginVertical top={18} />
          <TitleText>
            {`${userInfo.displayName} 님의\n${newSavingData.title} 적금이\n완성되었어요!`}
          </TitleText>
        </TitleArea>
        <MarginVertical top={44} />
        <InfoArea>
          <ScrollView horizontal>
            <Spacer />
            <InfoCard>
              <Image source={snowman} style={{ width: 138, height: 138 }} />
              <MarginVertical top={20} />
              <Image source={snowflake} style={{ width: 14, height: 14 }} />
              <MarginVertical top={6} />
              <InfoText color={colors.fontMain80}>
                안녕하세요!{`\n`}만나서 기뻐요!
              </InfoText>
            </InfoCard>
            <InfoCard>
              <View style={{ width: 200 }}>
                <Image source={snowman} style={{ width: 48, height: 48 }} />
                <MarginVertical top={15} />
                <InfoText color={colors.fontMain70} align="flex-start">
                  {`일주일에\n${minToHour(
                    Math.floor(newSavingData.time / 4)
                  )}씩, ${newSavingData.duration}개월 동안`}
                </InfoText>
                {routineTitle ? (
                  <Row>
                    <LinkIcon size={16} />
                    <InfoText color={colors.fontMain70} align="flex-start">
                      {routineTitle}
                    </InfoText>
                  </Row>
                ) : (
                  <InfoText align="flex-start">선택한 루틴이 없어요</InfoText>
                )}
                <InfoText color={colors.fontMain70} align="flex-start">
                  으로 모아볼게요!
                </InfoText>
              </View>
              <MarginVertical top={20} />
              <DividerDark />
              <MarginVertical top={14} />
              <Row justify="space-between" style={{ width: 200 }}>
                <InfoText color="#959595">TOTAL</InfoText>
                <ValueText color={colors.fontMain70}>
                  {minToHour(newSavingData.time * newSavingData.duration)}
                </ValueText>
              </Row>
              <Row justify="flex-end" style={{ width: 200 }}>
                <ValueText color={colors.fontMain}>
                  {Math.floor(
                    newSavingData.time * newSavingData.duration * interest
                  )}
                  P
                </ValueText>
              </Row>
            </InfoCard>
            <InfoCard style={{ backgroundColor: 'rgba(106,143,246,0.3)' }}>
              <Image source={snowman} style={{ width: 72, height: 72 }} />
              <MarginVertical top={16} />
              <Image source={snowflakeWhite} style={{ width: 14, height: 14 }} />
              <MarginVertical top={6} />
              <InfoText color="#fff">{`목표는\n${newSavingData.target}`}</InfoText>
              <MarginVertical top={30} />
              <InfoText color="#fff">
                {`${newSavingData.title} 적금과\n소복이 모아볼게요!`}
              </InfoText>
            </InfoCard>
            <SpacerEnd />
          </ScrollView>
        </InfoArea>
        <ButtonWrap>
          <Button
            text="시간 모으러 가기"
            handleButton={() =>
              navigation.reset({ routes: [{ name: 'Tabs' }] })
            }
          />
        </ButtonWrap>
      </Container>
      <Background source={completeBg} />
    </SafeArea>
  );
};

export default CompleteAddSaving;

const SafeArea = styled.SafeAreaView``;
const Container = styled.View`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  align-items: center;
`;
const Background = styled.Image`
  position: absolute;
  top: 0;
  width: ${() => `${size.width}px`};
  z-index: -1;
`;
const Header = styled.View`
  width: ${() => `${size.width - 50}px`};
  height: 50px;
  justify-content: center;
`;
const TitleArea = styled.View`
  width: ${() => `${size.width - 80}px`};
`;
const TitleText = styled.Text`
  font-weight: 600;
  font-size: 26px;
  color: ${colors.fontMain90};
`;
const InfoArea = styled.View`
  margin-top: 20px;
`;
const InfoCard = styled.View`
  width: 240px;
  height: 280px;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
`;
const InfoText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${(props) => props.color || '#000'};
`;
const DividerDark = styled.View`
  width: 216px;
  height: 0.6px;
  background-color: rgba(20,36,72,0.4);
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.justify || 'flex-start'};
`;
const ValueText = styled.Text`
  font-weight: 600;
  font-size: 22px;
  color: ${(props) => props.color || '#000'};
`;
const ButtonWrap = styled.View`
  position: absolute;
  bottom: 100px;
  z-index: 9;
`;
const Spacer = styled.View`
  width: 30px;
`;
const SpacerEnd = styled(Spacer)`
  margin-right: 50px;
`;
