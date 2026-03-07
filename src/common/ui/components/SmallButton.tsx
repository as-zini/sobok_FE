import React from 'react';
import styled from '@emotion/native';

const SmallButton = ({ text, width, height, bgColor, fontColor, handleButton }) => (
  <ButtonContainer onPress={handleButton} style={{ width, height, backgroundColor: bgColor }}>
    <ButtonText style={{ color: fontColor }}>{text}</ButtonText>
  </ButtonContainer>
);

export default SmallButton;

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
