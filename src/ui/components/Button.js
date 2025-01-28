import React from 'react'
import styled from 'styled-components'
import login_button_bg from '../../../assets/login_button_bg.png';
import unchecked_button_bg from '../../../assets/unchecked_button_bg.png';


const Button = ({text, handleButton, unChecked}) => {
  return (
    <ButtonBody onPress={handleButton}>
      
      <ButtonText>{text}</ButtonText>
    <ButtonBg source={unChecked === true ? unchecked_button_bg : login_button_bg}/>
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
  z-index:3;
`

const ButtonBg = styled.Image`
  width:100%;
  height:100%;
  z-index:-1;
`

const ButtonText = styled.Text`
  color:#fff;
  font-weight:600;
  font-size:18px;
  position:absolute;
`