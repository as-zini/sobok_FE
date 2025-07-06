import React from 'react';
import styled from '@emotion/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const NavigateArrowButton = ({ handleArrowButton }) => (
  <NavigateArrowButtonBody onPress={handleArrowButton}>
    <MaterialIcons
      name="keyboard-arrow-right"
      size={24}
      color={colors.indigoBlue}
    />
  </NavigateArrowButtonBody>
);

export default NavigateArrowButton;

const NavigateArrowButtonBody = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const NavigateArrowButtonImage = styled.Image`
  width: 24px;
  height: 24px;
`;
