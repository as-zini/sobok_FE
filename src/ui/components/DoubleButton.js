import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from '@emotion/native';
import { colors } from '../styles/colors';

const DoubleButton = ({ text1, text2, handleLeftButton, handleRightButton }) => (
  <Container>
    <HalfButton onPress={handleLeftButton} style={{ backgroundColor: '#fff' }}>
      <ButtonText style={{ color: '#777' }}>{text1}</ButtonText>
    </HalfButton>
    <HalfButton onPress={handleRightButton} style={{ backgroundColor: colors.indigoBlue70 }}>
      <ButtonText style={{ color: '#fff' }}>{text2}</ButtonText>
    </HalfButton>
  </Container>
);

export default DoubleButton;

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const HalfButton = styled.TouchableOpacity`
  width: 148px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
