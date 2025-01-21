import React from 'react'
import styled from 'styled-components'
import login_button_bg from '../../../assets/login_button_bg.png';


const Button = ({text, handleButton}) => {
  return (
    <ButtonBody onPress={handleButton}>
      
      <ButtonText>{text}</ButtonText>
    <ButtonBg source={login_button_bg}/>
    </ButtonBody>
  )
}

export default Button

const ButtonBody = styled.TouchableOpacity`
  width:290px;
  height:56px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ButtonBg = styled.Image`
  width:100%;
  height:100%;
  z-index:-1;
`

const ButtonText = styled.Text`
  color:#fff;
  font-weight:500;
  font-size:16px;
  position:absolute;
`