import React, { useEffect } from 'react';
import { Dimensions, Platform, SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import signup_modal_bg from '../../../assets/signup_modal_bg.png';
import signup_icon from '../../../assets/signup_icon.png';
import google_icon from '../../../assets/google_icon.png';
import kakao_icon from '../../../assets/kakao_icon.png';
import email_icon from '../../../assets/email_icon.png';
import { useNavigation } from '@react-navigation/native';
import { size } from '../styles/size';
import baseUrl from '../../api/baseURL';
import { useSignup } from '../../hooks/useSignup';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StartScreenModal = ({ isSignupModalVisible, setIsSignupModalVisible }) => {
  const navigation = useNavigation();
  const {handleAppleLogin, handleKakaoLogin, handleGoogleAuth} = useSignup();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '927685447127-gh9fmj2vpalns39uu167gdpl66iavht5.apps.googleusercontent.com',
      iosClientId: "927685447127-a7muurhgj3me105a9vbhbklnq18at29c.apps.googleusercontent.com",  // 백엔드 검증용 “웹” 클라이언트 ID
      offlineAccess: true,                     // 서버에서 리프레시 토큰을 받으려면 true
    });
  }, []);


  return (
    <SafeAreaView>
      <Modal
        isVisible={isSignupModalVisible}
        animationIn="slideInUp"
        animationInTiming={800}
        animationOut="slideOutDown"
        animationOutTiming={800}
        onBackdropPress={() => setIsSignupModalVisible(false)}
      >
        <ModalBody>
          <ModalContentsArea>
            <SignUpIcon source={signup_icon} />
            <SignupTitle>시작하기</SignupTitle>
            <SignupText>당신의 시작을 응원합니다!!{"\n"}어떤 경로로 시작해볼까요?</SignupText>
            <SignupPlatformArea>
              <SignupButton onPress={() => handleGoogleAuth(setIsSignupModalVisible)}>
                <PlatformIcon source={google_icon} />
                <PlatformText>Google로 시작하기</PlatformText>
              </SignupButton>
              <SignupButton onPress={() => handleKakaoLogin(setIsSignupModalVisible)}>
                <PlatformIcon source={kakao_icon} />
                <PlatformText>카카오로 시작하기</PlatformText>
              </SignupButton>
              <SignupButton onPress={() => handleAppleLogin(setIsSignupModalVisible)}>
                <View style={{position:'absolute', left:20}}>
                <AntDesign name="apple1" size={26} color="#003CFF" />
                </View>
                <PlatformText>애플로 시작하기</PlatformText>
              </SignupButton>

              <SignupButton onPress={() => { setIsSignupModalVisible(false); navigation.navigate('Signup', {version:"email"}); }}>
                <PlatformIcon source={email_icon} />
                <PlatformText>이메일로 시작하기</PlatformText>
              </SignupButton>
            </SignupPlatformArea>
            <GoToLoginButton onPress={() => { navigation.navigate('Login'); setIsSignupModalVisible(false); }}>
              <GoToLogin>이미 회원이신가요?</GoToLogin>
            </GoToLoginButton>
          </ModalContentsArea>
          <ModalBg source={require('../../../assets/signup_modal_bg.png')} />
        </ModalBody>
      </Modal>
    </SafeAreaView>
  );
};

export default StartScreenModal;

const ModalBody = styled.View`
  width:${() => `${size.width}px`};
  height: 600px;
  border-radius: 24px;
  background-color: rgba(255,255,255,0.7);
  position: absolute;
  bottom: -30px;
  left: -20px;
`;

const ModalBg = styled.Image`
  width: 100%;
  height: 100%;
  
  position: absolute;
  border-radius: 20px;
`;

const SignUpIcon = styled.Image`
  width: 56px;
  height: 43px;
  margin-bottom: 30px;
  z-index:2;
`;

const ModalContentsArea = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index:2;
`;

const SignupTitle = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 26px;
  margin-bottom: 16px;
  z-index:2;
`;

const SignupText = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  z-index:2;
  line-height:24px;
`;

const SignupPlatformArea = styled.View`
  display: flex;
  gap: 10px;
  margin-top: 40px;
  z-index:2;
`;

const SignupButton = styled.TouchableOpacity`
  width: 290px;
  height: 56px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  z-index:2;
`;

const PlatformIcon = styled.Image`
  width: 25px;
  height: 25px;
  position: absolute;
  left: 20px;
  z-index:2;
`;

const PlatformText = styled.Text`
  flex-grow: 1;
  text-align: center;
  color: #4c4c4c;
  font-size: 18px;
  font-weight: 500;
  z-index:2;
`;

const GoToLoginButton = styled.TouchableOpacity`
  margin-top: 15px;
  z-index:2;
`;

const GoToLogin = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  z-index:2;
`;
