import React from 'react'
import styled from 'styled-components'

const SmallButton = ({text, width, height, bgColor, fontColor, handleButton}) => {
  return (
    <SmallButtonBody width={width} height={height} bgColor={bgColor} onPress={handleButton}>
      <SmallButtonText fontColor={fontColor}>{text}</SmallButtonText>
    </SmallButtonBody>
  )
}

export default SmallButton


const SmallButtonBody = styled.TouchableOpacity`
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:${(props) => props.bgColor};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius:8px;

`

const SmallButtonText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${(props) => props.fontColor}
`