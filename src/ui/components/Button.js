import React from 'react';
import styled from '@emotion/native';
import login_button_bg from '../../../assets/login_button_bg.png';
import unchecked_button_bg from '../../../assets/unchecked_button_bg.png';

const Button = ({ text, handleButton, unChecked, bg }) => {
  return (
    <ButtonBody onPress={() => (unChecked ? console.log(unChecked) : handleButton())}>
      <ButtonText>{text}</ButtonText>
      <ButtonBg source={unChecked ? unchecked_button_bg : bg || login_button_bg} />
    </ButtonBody>
  );
};

export default Button;

const ButtonBody = styled.TouchableOpacity(() => ({
  width: 328,
  height: 56,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: 15,
  zIndex: 3,
}));

const ButtonBg = styled.Image(() => ({
  width: '105%',
  height: '105%',
  zIndex: -1,
}));

const ButtonText = styled.Text(() => ({
  color: '#fff',
  fontWeight: '600',
  fontSize: 18,
  position: 'absolute',
}));
