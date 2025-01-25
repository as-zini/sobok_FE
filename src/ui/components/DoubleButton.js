import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'

const DoubleButton = ({text1, text2, handleLeftButton, handleRightButton}) => {
  return (
    <DoubleButtonBody>
      <HalfSizeButtonEl style={{backgroundColor:"#fff"}} onPress={handleLeftButton}>
        <HalfSizeButtonText style={{color:"#777"}}>{text1}</HalfSizeButtonText>
      </HalfSizeButtonEl>
      <HalfSizeButtonEl style={{backgroundColor:colors.indigoBlue70}} onPress={handleRightButton}>
        <HalfSizeButtonText style={{color:"#fff"}}>{text2}</HalfSizeButtonText>
      </HalfSizeButtonEl>
    </DoubleButtonBody>
  )
}

export default DoubleButton

const DoubleButtonBody = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:12px;
`


const HalfSizeButtonEl = styled.TouchableOpacity`
  width:148px;
  height:48px;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:8px;
`

const HalfSizeButtonText = styled.Text`
  font-size:18px;
  font-weight:600;
`