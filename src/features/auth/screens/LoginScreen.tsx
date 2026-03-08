import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, Animated, SafeAreaView } from 'react-native';
import styled from '@emotion/native';

import loginBg from '@/assets/login_bg.png';
import login_icon from '@/assets/login_icon.png';
import { colors } from '@/common/ui/styles/colors';
import Button from '@/common/ui/components/Button';
import { useLogin } from '@/common/hooks/useLogin';
import Bg from '@/common/ui/components/Bg';
import AuthInput from '../components/AuthInput';
import Header from '@/common/ui/components/Header';
import { verticalScale } from '@/common/utils/moderateScale';
import { DefaultText } from '@/common/ui/components/DefaultText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { size } from '@/common/ui/styles/size';

const LoginScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useLogin();
  const [isLoginFail, setIsLoginFail] = useState(false);
  const isActive = id.length > 0 && password.length > 0;
  const insets = useSafeAreaInsets();

  const translateY = useState(new Animated.Value(0))[0];

  const handleFocusPassword = () => {
    Animated.timing(translateY, {
      toValue: -30,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBlurPassword = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Bg source={loginBg} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <Container>
          <Header isBack={true} />
          <IntroArea>
            <LoginIcon source={login_icon} />
            <Title>로그인</Title>
            <Subtitle>또 와주셨군요!{`\n`}소복과 또 함께 시간을 모아봐요!</Subtitle>
          </IntroArea>

          <Animated.View style={{ transform: [{ translateY }] }}>
            <InputArea>
              <AuthInput
                label="아이디"
                placeholder="아이디를 입력해주세요"
                value={id}
                onChangeText={setId}
                secureTextEntry={false}
                onBlur={() => {}}
                onFocus={() => {}}
              />
              <AuthInput
                label={'비밀번호'}
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={false}
                onBlur={() => {
                  handleBlurPassword();
                }}
                onFocus={() => {
                  handleFocusPassword();
                }}
              />
            </InputArea>
          </Animated.View>
          <ButtonArea bottomInset={insets.bottom}>
            {isLoginFail && <ErrorText>다시 시도해주세요</ErrorText>}
            <Button
              text="로그인하기"
              handleButton={() => handleLogin(id, password, setIsLoginFail)}
              unChecked={!isActive}
            />
          </ButtonArea>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

// Styled Components
const Container = styled.View({
  flex: 1,
  alignItems: 'center',
  backgroundColor: 'transparent',
});

const IntroArea = styled.View({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: verticalScale(40),
  marginBottom: verticalScale(65),
});

const LoginIcon = styled.Image({
  width: 48,
  height: 40,
  marginLeft: 8,
  marginBottom: verticalScale(11),
});

const Title = styled(DefaultText)({
  fontWeight: 600,
  fontSize: 24,
  marginBottom: verticalScale(15),
});

const Subtitle = styled(DefaultText)({
  textAlign: 'center',
  color: colors.fontMain80,
  fontSize: 16,
  fontFamily: 'Pretendard-Medium',
  fontWeight: 500,
  lineHeight: 24,
});

const InputArea = styled.View({
  gap: 36,
});

const ButtonArea = styled.View<{ bottomInset: number }>(({ bottomInset }) => ({
  position: 'absolute',
  bottom: bottomInset,
  alignItems: 'center',
  gap: 10,
  width: size.width - 80,
}));

const ErrorText = styled(DefaultText)({
  color: colors.fontMain,
  fontSize: 16,
  fontWeight: 600,
});
