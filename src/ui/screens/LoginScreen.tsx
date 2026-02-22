import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Text,
  TextInput,
  View
} from 'react-native';
import styled from '@emotion/native';

import loginBg from '../../../assets/login_bg.png';
import login_icon from '../../../assets/login_icon.png';
import { colors } from '../styles/colors';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import BackArrowButton from '../components/BackArrowButton';
import { useLogin } from '../../hooks/useLogin';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useLogin();
  const [isLoginFail, setIsLoginFail] = useState(false);
  const isActive = id.length > 0 && password.length > 0;

  // 애니메이션 값
  const translateY = useState(new Animated.Value(0))[0];

  const handleFocusPassword = () => {
    Animated.timing(translateY, {
      toValue: -30,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleBlurPassword = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <BgImage source={loginBg} />
        <Header>
          <BackArrowButton />
        </Header>
        <IntroArea>
          <LoginIcon source={login_icon} />
          <Title>로그인</Title>
          <Subtitle>또 와주셨군요!{`\n`}소복과 또 함께 시간을 모아봐요!</Subtitle>
        </IntroArea>

        <Animated.View style={{ transform: [{ translateY }] }}>
          <InputArea>
            <InputBlock>
              <Label>아이디</Label>
              <Input
                placeholder="아이디를 입력해주세요"
                placeholderTextColor="#fff"
                value={id}
                onChangeText={setId}
              />
              <Line />
            </InputBlock>
            <InputBlock>
              <Label>비밀번호</Label>
              <Input
                placeholder="비밀번호를 입력해주세요"
                placeholderTextColor="#fff"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={handleFocusPassword}
                onBlur={handleBlurPassword}
              />
              <Line />
            </InputBlock>
          </InputArea>
        </Animated.View>

        <ButtonArea>
          {isLoginFail && <ErrorText>다시 시도해주세요</ErrorText>}
          <Button
            text="로그인하기"
            handleButton={() => handleLogin(id, password, setIsLoginFail)}
            unChecked={!isActive}
          />
        </ButtonArea>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

// Styled Components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const BgImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Header = styled.View`
  position: absolute;
  top: 70px;
  left: 40px;
`;

const IntroArea = styled.View`
  position: absolute;
  top: 150px;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const LoginIcon = styled.Image`
  width: 48px;
  height: 40px;
  margin-left: 8px;
`;

const Title = styled.Text`
  color: ${colors.fontMain};
  font-weight: 600;
  font-size: 24px;
`;

const Subtitle = styled.Text`
  text-align: center;
  color: ${colors.fontMain80};
  font-size: 16px;
  font-weight: 500;
  line-height:26px;
`;

const InputArea = styled.View`
  margin-top: 50px;
`;

const InputBlock = styled.View`
  margin-bottom: 45px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain80};
`;

const Input = styled(TextInput)`
  width: 290px;
  height: 50px;
  color: ${colors.fontMain};
  font-size: 16px;
  font-weight: 500;
`;

const Line = styled.View`
  width: 290px;
  height: 0.6px;
  background-color: ${colors.fontMain};
`;

const ButtonArea = styled.View`
  position: absolute;
  bottom: 80px;
  align-items: center;
  gap: 10px;
`;

const ErrorText = styled.Text`
  color: ${colors.fontMain};
  font-size: 16px;
  font-weight: 600;
`;
