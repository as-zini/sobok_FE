import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from '@emotion/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import signup_icon from '@/assets/signup_icon.png';
import google_icon from '@/assets/google_icon.png';
import kakao_icon from '@/assets/kakao_icon.png';
import email_icon from '@/assets/email_icon.png';
import { useNavigation } from '@react-navigation/native';
import { size } from '@/common/ui/styles/size';
import { useSignup } from '@/features/auth/hooks/useSignup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DefaultText } from './DefaultText';

const StartScreenModal = ({ isSignupModalVisible, setIsSignupModalVisible }) => {
  const navigation = useNavigation();
  const { handleAppleLogin, handleKakaoLogin, handleGoogleAuth } = useSignup();
  const categories = [
    {
      id: 1,
      name: 'Google',
      iconType: 'image',
      icon: google_icon,
      onPress: () => handleGoogleAuth(setIsSignupModalVisible),
    },
    {
      id: 2,
      name: 'Kakao',
      iconType: 'image',
      icon: kakao_icon,
      onPress: () => handleKakaoLogin(setIsSignupModalVisible),
    },
    {
      id: 3,
      name: 'Apple',
      iconType: 'component',
      icon: <AntDesign name="apple1" size={26} color="#003CFF" />,
      onPress: () => handleAppleLogin(setIsSignupModalVisible),
    },
    {
      id: 4,
      name: 'Email',
      iconType: 'image',
      icon: email_icon,
      onPress: () => {
        setIsSignupModalVisible(false);
        navigation.navigate('Signup', { version: 'email' });
      },
    },
  ];

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '927685447127-gh9fmj2vpalns39uu167gdpl66iavht5.apps.googleusercontent.com',
      iosClientId: '927685447127-a7muurhgj3me105a9vbhbklnq18at29c.apps.googleusercontent.com', // 백엔드 검증용 "웹" 클라이언트 ID
      offlineAccess: true, // 서버에서 리프레시 토큰을 받으려면 true
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
            <SignupText>당신의 시작을 응원합니다!!{'\n'}어떤 경로로 시작해볼까요?</SignupText>
            <SignupPlatformArea>
              {categories.map(category => (
                <SignupButton key={category.id} onPress={category.onPress}>
                  {category.iconType === 'image' ? (
                    <PlatformIcon source={category.icon} />
                  ) : (
                    <View style={{ position: 'absolute', left: 20 }}>{category.icon}</View>
                  )}
                  <PlatformText>{category.name}로 시작하기</PlatformText>
                </SignupButton>
              ))}
            </SignupPlatformArea>
            <GoToLoginButton
              onPress={() => {
                navigation.navigate('Login');
                setIsSignupModalVisible(false);
              }}
            >
              <GoToLogin>이미 회원이신가요?</GoToLogin>
            </GoToLoginButton>
          </ModalContentsArea>
          <ModalBg source={require('@/assets/signup_modal_bg.png')} />
        </ModalBody>
      </Modal>
    </SafeAreaView>
  );
};

export default StartScreenModal;

const ModalBody = styled.View({
  width: size.width,
  height: 600,
  borderRadius: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'absolute',
  bottom: -30,
  left: -20,
});

const ModalBg = styled.Image({
  width: '100%',
  height: '100%',
  position: 'absolute',
  borderRadius: 20,
});

const SignUpIcon = styled.Image({
  width: 56,
  height: 43,
  marginBottom: 30,
  zIndex: 2,
});

const ModalContentsArea = styled.View({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  zIndex: 2,
});

const SignupTitle = styled(DefaultText)({
  color: '#fff',
  fontWeight: '600',
  fontSize: 26,
  marginBottom: 16,
  zIndex: 2,
});

const SignupText = styled(DefaultText)({
  color: '#fff',
  fontWeight: '500',
  fontSize: 18,
  zIndex: 2,
  lineHeight: 24,
});

const SignupPlatformArea = styled.View({
  display: 'flex',
  gap: 10,
  marginTop: 40,
  zIndex: 2,
});

const SignupButton = styled.TouchableOpacity({
  width: 290,
  height: 56,
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
});

const PlatformIcon = styled.Image({
  width: 25,
  height: 25,
  position: 'absolute',
  left: 20,
  zIndex: 2,
});

const PlatformText = styled(DefaultText)({
  flexGrow: 1,
  textAlign: 'center',
  color: '#4c4c4c',
  fontSize: 18,
  fontWeight: '500',
  zIndex: 2,
});

const GoToLoginButton = styled.TouchableOpacity({
  marginTop: 15,
  zIndex: 2,
});

const GoToLogin = styled(DefaultText)({
  fontWeight: '500',
  color: '#fff',
  zIndex: 2,
});
