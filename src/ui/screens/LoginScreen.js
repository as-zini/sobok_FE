// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
// import loginBg from '../../../assets/login_bg.png';
// import login_icon from '../../../assets/login_icon.png'
// import save_icon from '../../../assets/save_icon.png';
// import auto_icon from '../../../assets/auto_icon.png';
// import { colors } from '../styles/colors';
// import Button from '../components/Button';
// import { Text, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import BackArrowButton from '../components/BackArrowButton';
// import { useLogin } from '../../hooks/useLogin';
// import MarginVertical from '../components/MarginVertical';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const {handleLogin} = useLogin();
//   const [isLoginFail, setIsLoginFail] = useState(false);

//   const isActive = id.length > 0 && password.length>0;


//   useEffect(() => {
//     console.log(isLoginFail)
//   }, [isLoginFail])
  

//   return (
//     <LoginScreenBody>
//       <LoginScreenBg source={loginBg}/>
//       <LoginHeader>
//         <BackArrowButton/>
//       </LoginHeader>
//       <LoginIntroArea>
//         <LoginIcon source={login_icon} />
//         <LoginTitleText>로그인</LoginTitleText>
//         <LoginText>또 와주셨군요!{"\n"}소복과 또 함께 시간을 모아봐요!</LoginText>
//       </LoginIntroArea>
//       <InputArea>
//         <InputEl>
//           <InputTitleText>아이디</InputTitleText>
//           <InputBox
//             placeholder="아이디를 입력해주세요"
//             value={id}
//             onChange={(e) => setId(e.nativeEvent.text)}
//           ></InputBox>
//           <BorderLine/>
//         </InputEl>
//         <InputEl>
//           <InputTitleText>비밀번호</InputTitleText>
//           <InputBox
//             placeholder="비밀번호를 입력해주세요"
//             value={password}
//             onChange={(e) => setPassword(e.nativeEvent.text)}
//             secureTextEntry={true}
//             ></InputBox>
//           <BorderLine/>
          

//         </InputEl>
//       </InputArea>
//       {/* <OptionArea>
//         <OptionEl>
//           <OptionIcon source={save_icon}/>
//           <OptionText>아이디 저장</OptionText>
//         </OptionEl>
//         <OptionEl>
//           <OptionIcon source={auto_icon}/>
//           <OptionText>자동 로그인</OptionText>
//         </OptionEl>
//       </OptionArea> */}
//       <View style={{position:'absolute', bottom:'80', justifyContent:'center', alignItems:'center', gap:10}}>
//         {isLoginFail && <Text style={{color:colors.fontMain, fontSize:16, fontWeight:600}}>다시 시도해주세요</Text>}
//         <Button text={"로그인하기"} handleButton={() => handleLogin(id, password, setIsLoginFail)} unChecked={!isActive}/>
//       </View>
//       <LoginErrorText>로그인에 문제가 있나요?</LoginErrorText>
//     </LoginScreenBody>
//   )
// }

// export default LoginScreen;

// const LoginScreenBody = styled.View`
//   display:flex;
//   justify-content:center;
//   align-items:center;
// `
// const LoginScreenBg = styled.Image`
//   width:100%;
//   height:100%;
// `

// const LoginHeader = styled.View`
//   position:absolute;
//   top:70px;
//   left:40px;
// `



// const LoginIntroArea = styled.View`
//   position:absolute;
//   top:150;
//   display:flex;
//   gap:20px;
//   justify-content:center;
//   align-items:center;
// `

// const LoginIcon = styled.Image`
//   width:48px;
//   height:40px;
//   margin-left:8px;
// `

// const LoginTitleText = styled.Text`
//   color:${colors.fontMain};
//   font-weight:600;
//   font-size:24px;
// `

// const LoginText = styled.Text`
//   text-align:center;
//   color:${colors.fontMain80};
//   font-size:16px;
//   font-weight:500;
// `

// const InputArea = styled.View`
//   position:absolute;
//   top:380px;
// `

// const InputEl = styled.View`
//   margin-bottom:45px;
// `

// const InputTitleText = styled.Text`
//   font-size:16px;
//   font-weight:500;
//   color:${colors.fontMain80}
// `

// const InputBox = styled.TextInput`
//   width:290px;
//   height:50px;
//   color:${colors.fontMain};
//   font-size:16px;
//   font-weight:500;
// `

// const BorderLine = styled.View`
//   width:290px;
//   height:.6px;
//   background-color:${colors.fontMain};
//   z-index:2;
// `

// const OptionArea = styled.View`
//   position:absolute;
//   bottom:200px;
//   display:flex;
//   flex-direction:row;
//   gap:30px;
// `

// const OptionEl = styled.TouchableOpacity`
//   display:flex;
//   flex-direction:row;
//   justify-content:center;
//   align-items:center;
//   gap:7px;
// `

// const OptionIcon = styled.Image`
//   width:32px;
//   height:23px;
// `

// const OptionText = styled.Text`
//   color:${colors.fontMain60};
//   font-size:16px;
//   font-weight:500;
// `

// const LoginErrorText = styled.Text`
//   color:#707172;
//   font-size:14px;
//   font-weight:500;
//   position:absolute;
//   bottom:50px;
// `


// import React, { useEffect, useState } from 'react';
// import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
// import styled from 'styled-components';
// import loginBg from '../../../assets/login_bg.png';
// import login_icon from '../../../assets/login_icon.png';
// import { colors } from '../styles/colors';
// import Button from '../components/Button';
// import { Text, TextInput, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import BackArrowButton from '../components/BackArrowButton';
// import { useLogin } from '../../hooks/useLogin';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');
//   const { handleLogin } = useLogin();
//   const [isLoginFail, setIsLoginFail] = useState(false);
//   const isActive = id.length > 0 && password.length > 0;

//   // 🔥 키보드가 열릴 때 InputArea 위치를 올리기 위한 애니메이션 값
//   const translateY = new Animated.Value(0);

//   useEffect(() => {
//     // 키보드가 열릴 때 InputArea를 위로 올림
//     const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//       Animated.timing(translateY, {
//         toValue: -30, // 🔥 원하는 만큼 올릴 값 (조절 가능)
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     });

//     // 키보드가 닫힐 때 원래 위치로 되돌림
//     const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//       Animated.timing(translateY, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     });

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <Container>
//         <LoginScreenBg source={loginBg} />
//         <LoginHeader>
//           <BackArrowButton />
//         </LoginHeader>
//         <LoginIntroArea>
//           <LoginIcon source={login_icon} />
//           <LoginTitleText>로그인</LoginTitleText>
//           <LoginText>또 와주셨군요!{"\n"}소복과 또 함께 시간을 모아봐요!</LoginText>
//         </LoginIntroArea>

//         {/* 🔥 InputArea만 키보드가 올라오면 살짝 위로 이동 */}
//         <Animated.View style={{ transform: [{ translateY }] }}>
//           <InputArea>
//             <InputEl>
//               <InputTitleText>아이디</InputTitleText>
//               <InputBox
//                 placeholder="아이디를 입력해주세요"
//                 value={id}
//                 onChangeText={setId}
//               />
//               <BorderLine />
//             </InputEl>
//             <InputEl>
//               <InputTitleText>비밀번호</InputTitleText>
//               <InputBox
//                 placeholder="비밀번호를 입력해주세요"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={true}
//               />
//               <BorderLine />
//             </InputEl>
//           </InputArea>
//         </Animated.View>

//         {/* 👇 로그인 버튼은 화면 아래 고정 */}
//         <ButtonContainer>
//           {isLoginFail && <ErrorText>다시 시도해주세요</ErrorText>}
//           <Button text={"로그인하기"} handleButton={() => handleLogin(id, password, setIsLoginFail)} unChecked={!isActive} />
//         </ButtonContainer>
//         <LoginErrorText>로그인에 문제가 있나요?</LoginErrorText>
//       </Container>
//     </TouchableWithoutFeedback>
//   );
// };

// export default LoginScreen;

// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: #fff;
// `;

// const LoginScreenBg = styled.Image`
//   width: 100%;
//   height: 100%;
//   position: absolute;
// `;

// const LoginHeader = styled.View`
//   position: absolute;
//   top: 70px;
//   left: 40px;
// `;

// const LoginIntroArea = styled.View`
//   position: absolute;
//   top: 150px;
//   display: flex;
//   gap: 20px;
//   justify-content: center;
//   align-items: center;
// `;

// const LoginIcon = styled.Image`
//   width: 48px;
//   height: 40px;
//   margin-left: 8px;
// `;

// const LoginTitleText = styled.Text`
//   color: ${colors.fontMain};
//   font-weight: 600;
//   font-size: 24px;
// `;

// const LoginText = styled.Text`
//   text-align: center;
//   color: ${colors.fontMain80};
//   font-size: 16px;
//   font-weight: 500;
// `;

// const InputArea = styled.View`
//   margin-top: 50px;
// `;

// const InputEl = styled.View`
//   margin-bottom: 45px;
// `;

// const InputTitleText = styled.Text`
//   font-size: 16px;
//   font-weight: 500;
//   color: ${colors.fontMain80};
// `;

// const InputBox = styled(TextInput)`
//   width: 290px;
//   height: 50px;
//   color: ${colors.fontMain};
//   font-size: 16px;
//   font-weight: 500;
// `;

// const BorderLine = styled.View`
//   width: 290px;
//   height: 0.6px;
//   background-color: ${colors.fontMain};
// `;

// /* 👇 로그인 버튼이 키보드 영향을 받지 않도록 별도 배치 */
// const ButtonContainer = styled.View`
//   position: absolute;
//   bottom: 80px;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
// `;

// const ErrorText = styled.Text`
//   color: ${colors.fontMain};
//   font-size: 16px;
//   font-weight: 600;
// `;

// const LoginErrorText = styled.Text`
//   color: #707172;
//   font-size: 14px;
//   font-weight: 500;
//   position: absolute;
//   bottom: 50px;
// `;

import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import styled from 'styled-components';
import loginBg from '../../../assets/login_bg.png';
import login_icon from '../../../assets/login_icon.png';
import { colors } from '../styles/colors';
import Button from '../components/Button';
import { Text, TextInput, View } from 'react-native';
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

  // 🔥 비밀번호 입력란에 포커스될 때만 InputArea를 올리기 위한 애니메이션 값
  const translateY = new Animated.Value(0);

  const handleFocusPassword = () => {
    Animated.timing(translateY, {
      toValue: -30, // 🔥 원하는 만큼 올릴 값 (조절 가능)
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <LoginScreenBg source={loginBg} />
        <LoginHeader>
          <BackArrowButton />
        </LoginHeader>
        <LoginIntroArea>
          <LoginIcon source={login_icon} />
          <LoginTitleText>로그인</LoginTitleText>
          <LoginText>또 와주셨군요!{"\n"}소복과 또 함께 시간을 모아봐요!</LoginText>
        </LoginIntroArea>

        {/* 🔥 비밀번호 인풋에 포커스될 때만 InputArea 이동 */}
        <Animated.View style={{ transform: [{ translateY }] }}>
          <InputArea>
            <InputEl>
              <InputTitleText>아이디</InputTitleText>
              <InputBox
                placeholder="아이디를 입력해주세요"
                value={id}
                onChangeText={setId}
                placeholderTextColor="#fff"
              />
              <BorderLine />
            </InputEl>
            <InputEl>
              <InputTitleText>비밀번호</InputTitleText>
              <InputBox
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                onFocus={handleFocusPassword}  // 🔥 비밀번호 입력란 포커스 시 이동
                onBlur={handleBlurPassword}
                placeholderTextColor="#fff"    // 🔥 포커스 해제 시 원래 위치로 복귀
              />
              <BorderLine />
            </InputEl>
          </InputArea>
        </Animated.View>

        {/* 👇 로그인 버튼은 화면 아래 고정 */}
        <ButtonContainer>
          {isLoginFail && <ErrorText>다시 시도해주세요</ErrorText>}
          <Button text={"로그인하기"} handleButton={() => handleLogin(id, password, setIsLoginFail)} unChecked={!isActive} />
        </ButtonContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const LoginScreenBg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LoginHeader = styled.View`
  position: absolute;
  top: 70px;
  left: 40px;
`;

const LoginIntroArea = styled.View`
  position: absolute;
  top: 150px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const LoginIcon = styled.Image`
  width: 48px;
  height: 40px;
  margin-left: 8px;
`;

const LoginTitleText = styled.Text`
  color: ${colors.fontMain};
  font-weight: 600;
  font-size: 24px;
`;

const LoginText = styled.Text`
  text-align: center;
  color: ${colors.fontMain80};
  font-size: 16px;
  font-weight: 500;
`;

const InputArea = styled.View`
  margin-top: 50px;
`;

const InputEl = styled.View`
  margin-bottom: 45px;
`;

const InputTitleText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain80};
`;

const InputBox = styled(TextInput)`
  width: 290px;
  height: 50px;
  color: ${colors.fontMain};
  font-size: 16px;
  font-weight: 500;
`;

const BorderLine = styled.View`
  width: 290px;
  height: 0.6px;
  background-color: ${colors.fontMain};
`;

/* 👇 로그인 버튼이 키보드 영향을 받지 않도록 별도 배치 */
const ButtonContainer = styled.View`
  position: absolute;
  bottom: 80px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ErrorText = styled.Text`
  color: ${colors.fontMain};
  font-size: 16px;
  font-weight: 600;
`;

const LoginErrorText = styled.Text`
  color: #707172;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  bottom: 50px;
`;
