import React from 'react';
import { TextInput } from 'react-native';
import styled from '@emotion/native';
import { colors } from '@/common/ui/styles/colors';
import { DefaultText } from '@/common/ui/components/DefaultText';
import { size } from '@/common/ui/styles/size';

interface DoubleAuthInputProps {
  label?: string;
  placeholders: string[];
  values: string[];
  secureTextEntrys: boolean[];
  onTopChangeText: (text: string) => void;
  onBottomChangeText: (text: string) => void;
  onTopFocus: () => void;
  onBottomFocus: () => void;
  onTopBlur: () => void;
  onBottomBlur: () => void;
  disables: boolean[];
}

const DoubleAuthInput = ({
  label,
  placeholders,
  values,
  onTopChangeText,
  onBottomChangeText,
  secureTextEntrys,
  onTopFocus,
  onBottomFocus,
  onTopBlur,
  onBottomBlur,
  disables,
}: DoubleAuthInputProps) => {
  return (
    <InputBlock>
      <Label>{label}</Label>
      <Input
        version={'top'}
        placeholder={placeholders[0]}
        placeholderTextColor={colors.fontMain50}
        secureTextEntry={secureTextEntrys[0]}
        value={values[0]}
        onChangeText={onTopChangeText}
        onFocus={onTopFocus}
        onBlur={onTopBlur}
        editable={!disables[0]}
      />
      <Input
        version={'bottom'}
        placeholder={placeholders[1]}
        placeholderTextColor={colors.fontMain50}
        secureTextEntry={secureTextEntrys[1]}
        value={values[1]}
        onChangeText={onBottomChangeText}
        onFocus={onBottomFocus}
        onBlur={onBottomBlur}
        editable={!disables[1]}
      />
    </InputBlock>
  );
};

export default DoubleAuthInput;

const InputBlock = styled.View({
  width: size.width - 80,
});

const Label = styled(DefaultText)({
  fontSize: 16,
  color: colors.fontMain,
  marginBottom: 8,
});

const Input = styled(TextInput)<{ version: 'top' | 'bottom' }>(({ version }) => ({
  width: '100%',
  height: 50,
  backgroundColor: 'rgba(255, 255, 255, .5)',
  borderTopStartRadius: version === 'top' ? 8 : 0,
  borderTopEndRadius: version === 'top' ? 8 : 0,
  borderBottomStartRadius: version === 'bottom' ? 8 : 0,
  borderBottomEndRadius: version === 'bottom' ? 8 : 0,
  borderStyle: 'solid',
  borderWidth: 0.8,
  borderColor: '#fff',
  fontSize: 16,
  fontFamily: 'Pretendard-Medium',
  color: colors.fontMain80,
  paddingVertical: 13,
  paddingHorizontal: 18,
}));
