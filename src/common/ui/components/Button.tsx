import React from 'react';
import styled from '@emotion/native';
import login_button_bg from '@/assets/login_button_bg.png';
import unchecked_button_bg from '@/assets/unchecked_button_bg.png';
import type { ImageSourcePropType } from 'react-native';
import { DefaultText } from './DefaultText';

const Button = ({
  text,
  handleButton,
  unChecked,
  bg,
}: {
  text: string;
  handleButton: () => void;
  unChecked?: boolean;
  bg?: ImageSourcePropType;
}) => {
  return (
    <ButtonBody onPress={() => (unChecked ? () => {} : handleButton())} disabled={unChecked}>
      <ButtonText>{text}</ButtonText>
      <ButtonBg source={unChecked ? unchecked_button_bg : bg || login_button_bg} />
    </ButtonBody>
  );
};

export default Button;

const ButtonBody = styled.TouchableOpacity(() => ({
  width: '100%',
  height: 56,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  overflow: 'hidden',
  zIndex: 3,
}));

const ButtonBg = styled.Image(() => ({
  width: '105%',
  height: '105%',
  zIndex: -1,
  position: 'absolute',
  top: -3,
  left: -3,
}));

const ButtonText = styled(DefaultText)(() => ({
  color: '#fff',
  fontSize: 16,
}));
