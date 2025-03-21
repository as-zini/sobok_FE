import React from 'react'
import styled from 'styled-components'
import login_button_bg from '../../../assets/login_button_bg.png';
import unchecked_button_bg from '../../../assets/unchecked_button_bg.png';


const Button = ({text, handleButton, unChecked, bg}) => {
  return (
    <ButtonBody onPress={() => unChecked ? console.log(unChecked) : handleButton()}>
      
      <ButtonText>{text}</ButtonText>
      <ButtonBg source={unChecked === true ? unchecked_button_bg : bg ? bg : login_button_bg}/>
    </ButtonBody>
  )
}

export default Button

const ButtonBody = styled.TouchableOpacity`
  width:328px;
  height:56px;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:3;
  border-radius:15px;
  overflow:hidden;
`

const ButtonBg = styled.Image`
  width:105%;
  height:105%;
  z-index:-1;
`

const ButtonText = styled.Text`
  color:#fff;
  font-weight:600;
  font-size:18px;
  position:absolute;
`