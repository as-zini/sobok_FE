import React, { useEffect, useState } from 'react';
import { Animated, Image, View, Text } from 'react-native';
import styled from '@emotion/native';
import dayjs from 'dayjs';

import snowflake_icon from '../../../assets/snowflak_icon.png';
import MarginVertical from './MarginVertical';
import { colors } from '../styles/colors';

// 분 → H M 변환 함수
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}H ${remainingMinutes}M`;
  } else if (hours > 0) {
    return `${hours}H`;
  } else {
    return `${remainingMinutes}M`;
  }
};

const ProgressBar = ({ startedAt, duration, version, userPoint, totalPoints, savedTime, totalTimeGoal }) => {
  const endDate = version === 'Time' ? dayjs(startedAt).add(duration, 'M') : null;
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const calculateProgress = () => {
      if (version === 'Time') {
        const now = new Date();
        const totalTime = endDate.toDate() - dayjs(startedAt).toDate();
        const timeElapsed = now - dayjs(startedAt).toDate();
        return Math.min((timeElapsed / totalTime) * 100, 100);
      } else if (version === 'Point') {
        return Math.min((userPoint / totalPoints) * 100, 100);
      } else if (version === 'SaveTime') {
        return Math.min((savedTime / totalTimeGoal) * 100, 100);
      }
      return 0;
    };

    const percentage = calculateProgress();
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [startedAt, duration, version, userPoint, totalPoints, savedTime, totalTimeGoal, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 280],
  });

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <>
      <Container>
        <ProgressBarContainer>
          <FilledBar style={{ width: progressBarWidth }} />
          <IconWrapper style={{ transform: [{ translateX }] }}>
            <Image source={snowflake_icon} style={{ width: 16, height: 16 }} />
          </IconWrapper>
        </ProgressBarContainer>
      </Container>
      <MarginVertical top={10} />
      {version === 'Time' ? (
        <DateContainer>
          <DateText>{dayjs(startedAt).format('YYYY년 M월 D일')}</DateText>
          <DateText>{endDate.format('YYYY년 M월 D일')}</DateText>
        </DateContainer>
      ) : version === 'Point' ? (
        <PointsContainer>
          <PointsText>{`${userPoint}P`}</PointsText>
          <PointsText>{`${totalPoints}P`}</PointsText>
        </PointsContainer>
      ) : (
        <SaveTimeContainer>
          <SaveTimeText>{formatTime(savedTime)}</SaveTimeText>
          <SaveTimeText>{formatTime(totalTimeGoal)}</SaveTimeText>
        </SaveTimeContainer>
      )}
    </>
  );
};

export default ProgressBar;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const ProgressBarContainer = styled.View`
  width: 300px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 10px;
  position: relative;
`;

const FilledBar = styled(Animated.View)`
  height: 100%;
  background-color: ${colors.indigoBlue};
  border-radius: 10px;
`;

const IconWrapper = styled(Animated.View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  top: -25px;
`;

const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  height: 30px;
`;

const DateText = styled.Text`
  color: ${colors.gray77};
  font-weight: 500;
  font-size: 14px;
`;

const PointsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  margin-top: 10px;
`;

const PointsText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.fontMain70};
`;

const SaveTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  margin-top: 10px;
`;

const SaveTimeText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.fontMain70};
`;
