import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import loginBg from '../../../assets/login_bg.png';
import login_icon from '../../../assets/login_icon.png'
import save_icon from '../../../assets/save_icon.png';
import auto_icon from '../../../assets/auto_icon.png';
import { colors } from '../styles/colors';
import Button from '../components/Button';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackArrowButton from '../components/BackArrowButton';
import { useLogin } from '../../hooks/useLogin';
import MarginVertical from '../components/MarginVertical';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const {handleLogin} = useLogin();
  const [isLoginFail, setIsLoginFail] = useState(false);

  const isActive = id.length > 0 && password.length>0;


  useEffect(() => {
    console.log(isLoginFail)
  }, [isLoginFail])
  

  return (
    <LoginScreenBody>
      <LoginScreenBg source={loginBg}/>
      <LoginHeader>
        <BackArrowButton/>
      </LoginHeader>
      <LoginIntroArea>
        <LoginIcon source={login_icon} />
        <LoginTitleText>로그인</LoginTitleText>
        <LoginText>또 와주셨군요!{"\n"}소복과 또 함께 시간을 모아봐요!</LoginText>
      </LoginIntroArea>
      <InputArea>
        <InputEl>
          <InputTitleText>아이디</InputTitleText>
          <InputBox
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={(e) => setId(e.nativeEvent.text)}
          ></InputBox>
          <BorderLine/>
        </InputEl>
        <InputEl>
          <InputTitleText>비밀번호</InputTitleText>
          <InputBox
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            secureTextEntry={true}
            ></InputBox>
          <BorderLine/>
          

        </InputEl>
      </InputArea>
      {/* <OptionArea>
        <OptionEl>
          <OptionIcon source={save_icon}/>
          <OptionText>아이디 저장</OptionText>
        </OptionEl>
        <OptionEl>
          <OptionIcon source={auto_icon}/>
          <OptionText>자동 로그인</OptionText>
        </OptionEl>
      </OptionArea> */}
      <View style={{position:'absolute', bottom:'80', justifyContent:'center', alignItems:'center', gap:10}}>
        {isLoginFail && <Text style={{color:colors.fontMain, fontSize:16, fontWeight:600}}>다시 시도해주세요</Text>}
        <Button text={"로그인하기"} handleButton={() => handleLogin(id, password, setIsLoginFail)} unChecked={!isActive}/>
      </View>
      <LoginErrorText>로그인에 문제가 있나요?</LoginErrorText>
    </LoginScreenBody>
  )
}

export default LoginScreen;

const LoginScreenBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`
const LoginScreenBg = styled.Image`
  width:100%;
  height:100%;
`

const LoginHeader = styled.View`
  position:absolute;
  top:70px;
  left:40px;
`



const LoginIntroArea = styled.View`
  position:absolute;
  top:150;
  display:flex;
  gap:20px;
  justify-content:center;
  align-items:center;
`

const LoginIcon = styled.Image`
  width:48px;
  height:40px;
  margin-left:8px;
`

const LoginTitleText = styled.Text`
  color:${colors.fontMain};
  font-weight:600;
  font-size:24px;
`

const LoginText = styled.Text`
  text-align:center;
  color:${colors.fontMain80};
  font-size:16px;
  font-weight:500;
`

const InputArea = styled.View`
  position:absolute;
  top:380px;
`

const InputEl = styled.View`
  margin-bottom:45px;
`

const InputTitleText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain80}
`

const InputBox = styled.TextInput`
  width:290px;
  height:50px;
  color:${colors.fontMain};
  font-size:16px;
  font-weight:500;
`

const BorderLine = styled.View`
  width:290px;
  height:.6px;
  background-color:${colors.fontMain};
  z-index:2;
`

const OptionArea = styled.View`
  position:absolute;
  bottom:200px;
  display:flex;
  flex-direction:row;
  gap:30px;
`

const OptionEl = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:7px;
`

const OptionIcon = styled.Image`
  width:32px;
  height:23px;
`

const OptionText = styled.Text`
  color:${colors.fontMain60};
  font-size:16px;
  font-weight:500;
`

const LoginErrorText = styled.Text`
  color:#707172;
  font-size:14px;
  font-weight:500;
  position:absolute;
  bottom:50px;
`



