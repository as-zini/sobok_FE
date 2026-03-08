import React from 'react';
import { TextInput } from 'react-native';
import styled from '@emotion/native';
import { colors } from '@/common/ui/styles/colors';
import { DefaultText } from '@/common/ui/components/DefaultText';
import { size } from '@/common/ui/styles/size';

const AuthInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onFocus,
  onBlur,
}) => {
  return (
    <InputBlock>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        placeholderTextColor={colors.fontMain50}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </InputBlock>
  );
};

export default AuthInput;

const InputBlock = styled.View({
  gap: 8,
  width: size.width - 80,
});

const Label = styled(DefaultText)({
  fontSize: 16,
  color: colors.fontMain,
});

const Input = styled(TextInput)({
  width: '100%',
  height: 50,
  backgroundColor: 'rgba(255, 255, 255, .8)',
  borderRadius: 8,
  borderStyle: 'solid',
  borderWidth: 0.8,
  borderColor: '#fff',
  fontSize: 16,
  fontFamily: 'Pretendard-Medium',
  color: colors.fontMain80,
  paddingVertical: 13,
  paddingHorizontal: 18,
});
