import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components';
import { colors } from '../styles/colors';

const StepNumber = ({step, marginBottom}) => {
  return (
    <StepNumberBody style={{marginBottom:marginBottom}}>
      <StepNumberText>{step}</StepNumberText>
    </StepNumberBody>
  )
}

export default StepNumber;

const StepNumberBody = styled.View`
  width:40px;
  height:40px;
  background-color:${colors.indigoBlue};
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
`

const StepNumberText = styled.Text`
  font-size:24px;
  font-weight:600;
  color:#fff;
`