import React, { useEffect } from 'react'
import { View } from 'react-native'
import styled from 'styled-components';
import { colors } from '../styles/colors';

const StepNumber = ({step, marginBottom, indexColor, isValid, stepColor}) => {
  
  

  return (
    <StepNumberBody style={{marginBottom:marginBottom, backgroundColor:indexColor === "black" ? colors.fontMain :stepColor==='red' ? "#FF4848" : colors.indigoBlue}}>
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
  border-radius:20px;
`

const StepNumberText = styled.Text`
  font-size:24px;
  font-weight:600;
  color:#fff;
`