import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, Image } from 'react-native';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';
import Steps from './Step';
import MarginVertical from './MarginVertical';
import { colors } from '../styles/colors';
import { size } from '../styles/size';

import bgImage from '../../../assets/create_loading_bg.png';
import cloudIcon from '../../../assets/cloud_icon.png';
import snowflakeIcon from '../../../assets/snowflak_icon.png';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const CreateLoading = ({ categoryText, isComplete }) => {
  const { userInfo } = useUserInfoStore();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(1);
  const [ready, setReady] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    startProgress();
    return () => clearInterval(intervalRef.current);
  }, [isComplete]);

  useEffect(() => {
    if (progress >= 100 && isComplete) setReady(true);
  }, [progress, isComplete]);

  useEffect(() => {
    if (ready) setTimeout(() => navigation.navigate('NextScreen'), 300);
  }, [ready]);

  const startProgress = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = isComplete ? Math.min(prev + 5, 100) : Math.min(prev + 3, 99);
        return next;
      });
    }, 50);
  };

  return (
    <SafeAreaView>
      <Body>
        <MarginVertical top={75} />
        <Steps step={5} />
        <CloudIcon source={cloudIcon} />
        <SnowIcon source={snowflakeIcon} />
        <PercentText>{progress}%</PercentText>
        <Title>{`${categoryText}\n만드는 중`}</Title>
        <DescText>{`조금만 기다리면\n${userInfo.displayName} 님만의 맞춤 루틴 완성!`}</DescText>
      </Body>
      <Background source={bgImage} />
    </SafeAreaView>
  );
};

export default CreateLoading;

const Body = styled.View`
  justify-content: center;
  align-items: center;
  width: ${() => `${size.width}px`};
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  width: ${() => `${screenWidth}px`};
  height: ${() => `${screenHeight}px`};
  z-index: -1;
`;

const CloudIcon = styled(Image)`
  width: 87px;
  height: 60px;
  margin-top: 120px;
  margin-bottom: 12px;
`;

const SnowIcon = styled(Image)`
  width: 28px;
  height: 29px;
  margin-bottom: 44px;
`;

const PercentText = styled.Text`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.fontMain};
  margin-bottom: 70px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.fontMain};
  text-align: center;
  margin-bottom: 24px;
`;

const DescText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain60};
  text-align: center;
`;
