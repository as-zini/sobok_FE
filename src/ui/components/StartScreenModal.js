import React, { useEffect } from 'react'
import { Dimensions, SafeAreaView, Text, View } from 'react-native'
import Modal from 'react-native-modal';
import styled from 'styled-components';

import signup_modal_bg from '../../../assets/signup_modal_bg.png';
import signup_icon from '../../../assets/signup_icon.png';
import apple_icon from '../../../assets/apple.png';
import kakao_icon from '../../../assets/kakao_icon.png';
import email_icon from '../../../assets/email_icon.png';
import { useNavigation } from '@react-navigation/native';
 
const width = Dimensions.get('screen').width;

const StartScreenModal = ({isSignupModalVisible, setIsSignupModalVisible}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Modal 
        isVisible={isSignupModalVisible} 
        animationIn={'slideInUp'}
        animationInTiming={1000} 
        animationOut={'slideOutDown'} 
        animationOutTiming={1000}
        onBackdropPress={() => setIsSignupModalVisible(false)}
      >
        <ModalBody>
          <ModalBg source={signup_modal_bg} />
        </ModalBody>
        <ModalContentsArea>
          
          <SignUpIcon source={signup_icon}/>
          <SignupTitle>시작하기</SignupTitle>
          <SignupText>당신의 시작을 응원합니다!!{"\n"}어떤 경로로 시작해볼까요?</SignupText>
          <SignupPlatformArea>
            <SignupButton>
              <PlatformIcon source={apple_icon}/>
              <PlatformText>Apple로 시작하기</PlatformText>
            </SignupButton>
            <SignupButton>
              <PlatformIcon source={kakao_icon}/>
              <PlatformText>카카오로 시작하기</PlatformText>
            </SignupButton>
            <SignupButton  onPress={() => {setIsSignupModalVisible(false);navigation.navigate("Signup")} }>
              <PlatformIcon source={email_icon}/>
              <PlatformText>이메일로 시작하기</PlatformText>
            </SignupButton>
          </SignupPlatformArea>
          <GoToLoginButton onPress={() => {navigation.navigate("Login"); setIsSignupModalVisible(false)}}>
            <GoToLogin>이미 회원이신가요?</GoToLogin>
          </GoToLoginButton>
          
        </ModalContentsArea>
        
      </Modal>
    </SafeAreaView>
  )
}

export default StartScreenModal


const ModalBody = styled.View`
  width:${width};
  height:530px;
  border-radius:24px;
  background-color:rgba(255,255,255,.7);
  
  position:absolute;
  bottom:-30px;
  left:-20px;
  z-index:-1;
`

const ModalBg = styled.Image`
  width:100%;
  height:100%;
  
`

const SignUpIcon = styled.Image`
  width:56px;
  height:43px;
  margin-top:120px;
  margin-bottom:30px;
`

const ModalContentsArea = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100%;
  margin-top:130px;
`
const SignupTitle = styled.Text`
  color:#fff;
  font-weight:600;
  font-size:24px;
  margin-bottom:16px;
`

const SignupText = styled.Text`
  color:#fff;
  font-weight:500;
  font-size:16px;
  
`

const SignupPlatformArea = styled.View`
  display:flex;
  gap:10px;
  margin-top:40px;
`

const SignupButton = styled.TouchableOpacity`
  width:290px;
  height:56px;
  display:flex;
  flex-direction:row;
  background-color:#fff;
  border-radius:8px;
  justify-content:center;
  align-items:center;
`

const PlatformIcon = styled.Image`
  width:25px;
  height:25px;
  position:absolute;
  left:20px;
`

const PlatformText = styled.Text`
  flex-grow:1;
  text-align:center;
  color:#4c4c4c;
  font-size:16px;
  font-weight:500;
`

const GoToLoginButton = styled.TouchableOpacity`
  margin-top:15px;
`

const GoToLogin = styled.Text`
  font-size:14px;
  font-weight:500;
  color:#fff;
`