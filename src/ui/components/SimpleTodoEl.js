import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import { colors } from '../styles/colors';

const SimpleTodoEl = ({ data, index }) => (
  <Container>
    <IndexWrapper>
      <IndexCircle>
        <IndexText>{index}</IndexText>
      </IndexCircle>
    </IndexWrapper>
    {data[1] !== '' ? (
      <ContentWrapper>
        <Title>{data[0]}</Title>
        <Subtitle>{data[1]}</Subtitle>
      </ContentWrapper>
    ) : (
      <TitleFull>{data[0]}</TitleFull>
    )}
    <DueTime>{data[2]}</DueTime>
  </Container>
);

export default SimpleTodoEl;

const Container = styled.View`
  width: 100%;
  height: 70px;
  background-color: #fff;
  padding-vertical: 17px;
  padding-horizontal: 20px;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
`;

const IndexWrapper = styled.View`
  flex: 0.2;
`;

const IndexCircle = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.fontMain};
  justify-content: center;
  align-items: center;
`;

const IndexText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${colors.fontMain};
  margin-bottom: 4px;
`;

const Subtitle = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: ${colors.gray70};
`;

const TitleFull = styled.Text`
  flex: 1;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.fontMain};
`;

const DueTime = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${colors.indigoBlue};
`;
