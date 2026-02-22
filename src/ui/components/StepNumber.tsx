import React from 'react';
import styled from '@emotion/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { colors } from '../styles/colors';

const StepNumber = ({ step, marginBottom, indexColor, stepColor, isChecked }) => {
  const backgroundColor =
    indexColor === 'black'
      ? colors.fontMain
      : stepColor === 'red'
      ? '#FF4848'
      : colors.indigoBlue;

  return (
    <Circle style={{ marginBottom, backgroundColor }}>
      {isChecked ? (
        <Fontisto name="check" size={12} color="#fff" />
      ) : (
        <Number>{step}</Number>
      )}
    </Circle>
  );
};

export default StepNumber;

const Circle = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const Number = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;
