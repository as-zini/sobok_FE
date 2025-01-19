import React from 'react'
import styled from 'styled-components'
import login_button_bg from '../../../assets/login_button_bg.png';


const Button = ({text, handleButton}) => {
  return (
    <ButtonBody onPress={handleButton}>
      <ButtonBg source={login_button_bg}/>
      <ButtonText>{text}</ButtonText>
    </ButtonBody>
  )
}

export default Button

const ButtonBody = styled.TouchableOpacity`
  width:290px;
  height:56px;
`

const ButtonBg = styled.Image`
  width:100%;
  height:100%;
`

const ButtonText = styled.Text`
  position:absolute;
  top:22px;
  left:115px;
  color:#fff;
  font-weight:500;
  font-size:16px;
`