import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from '@emotion/native';

import signup_bg from '../../../assets/signup_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import Button from '../components/Button';
import Steps from '../components/Step';
import phone_number_auth_icon from '../../../assets/phone_number_auth_icon.png';
import clock_graphic from '../../../assets/clock_graphic.png';
import { useNavigation } from '@react-navigation/native';
import StepNumber from '../components/StepNumber';
import { size } from '../styles/size';
import check_icon from '../../../assets/check_icon_indigo.png';
import { useSignup } from '../../hooks/useSignup';
import { useLogin } from '../../hooks/useLogin';
import MarginVertical from '../components/MarginVertical';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SignupScreen = ({route}) => {
  const [step, setStep] = useState(1);
  const [idChecked, setIdChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState('');
  const [isVarified, setIsVarified] = useState(false);
  const [varifyCode, setVarifyCode] = useState('');
  const { handleLogin } = useLogin();
  const {version} = route.params;
  const [values, setValues] = useState({
    username: '',
    displayName: '',
    name: '',
    password: '',
    password2: '',
    email: '',
    phoneNumber: '',
    birth: ''
  });
  const navigation = useNavigation();
  const { handleSignup, checkAvailability, handleSmsSend, handleSmsVarify, addUserInfo } = useSignup();

  const handleButton = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else if (step === 4) {
      if(version === "email"){
        handleSignup(values, setStep);
      }else{
        addUserInfo({name:values.name, displayName:values.displayName, phoneNumber:values.phoneNumber, birth:values.birth})
      }
    } else {
      if(version === "email"){
        handleLogin(values.username, values.password, '', true);
      }
      navigation.navigate('ViewSaveTime', { version: 'first', username: values.displayName });
    }
  };

  const contentsText = [
    '성함을 \n알려주세요',
    '소복에서는 \n어떻게 불러드릴까요?',
    '아이디와 \n비밀번호를 설정할게요!',
    `${values.displayName} 님에 대해 \n더 알려주세요!`,
    ''
  ];

  const placeholderText = [
    '이름을 입력해주세요',
    '닉네임을 입력해주세요',
    [
      '아이디를 입력하세요(5-15자)',
      '비밀번호를 입력하세요 (8~16글자)',
      '비밀번호를 한 번 더 입력해주세요'
    ],
    [
      '이메일을 입력해주세요',
      '전화번호를 입력해주세요',
      '인증번호를 입력해주세요',
      'ex)20000101'
    ],
    ''
  ];

  const categoryText = ['', '', ['아이디', '비밀번호'], ['이메일', '전화번호', '생년월일']];

  const isActive =
    step === 1 || step === 2
      ? (step === 1 ? values.name : values.displayName).trim() !== ''
      : step === 3
      ? values.username.trim() !== '' && values.password.trim() !== '' && values.password2.trim() !== ''
      : values.email.trim() !== '' && values.phoneNumber.trim() !== '' && values.birth.trim() !== '';

  const isSame = values.password !== values.password2 || values.password.length < 7 || values.password.length > 17;
  const checkList = [
    !isActive || nicknameChecked,
    !isActive || isSame || idChecked,
    !isActive || emailChecked || !isVarified
  ];

  useEffect(() => {
    if (step === 2) {
      checkAvailability(values.displayName, 'display-name').then(res => setNicknameChecked(res.isDuplicated));
    } else if (step === 3) {
      checkAvailability(values.username, 'username').then(res => setIdChecked(res.isDuplicated));
    } else if (step === 4) {
      checkAvailability(values.email, 'email').then(res => setEmailChecked(res.isDuplicated));
    }
  }, [values]);

  useEffect(() => {
    handleSmsVarify(values.phoneNumber, varifyCode, setIsVarified);
  }, [varifyCode]);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ContentsBody>
          <Header>
            <BackArrowButton />
          </Header>
          <Steps step={step} />
          <InputArea>
            {step !== 5 && <StepNumber step={step} marginBottom={20} />}

            {step === 1 || step === 2 ? (
              <>
                <ContentText>{contentsText[step - 1]}</ContentText>
                <Row>
                  <TextInput
                    placeholder={placeholderText[step - 1]}
                    placeholderTextColor="#fff"
                    value={step === 1 ? values.name : values.displayName}
                    onChange={e =>
                      step === 1
                        ? setValues({ ...values, name: e.nativeEvent.text })
                        : setValues({ ...values, displayName: e.nativeEvent.text })
                    }
                  />
                  {step === 2 && !nicknameChecked && values.displayName.length > 0 && (
                    <CheckIcon source={check_icon} />
                  )}
                </Row>
                <Line />
              </>
            ) : step === 3 ? (
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
              >
                <ContentText>{contentsText[2]}</ContentText>
                <CategoryText>{categoryText[2][0]}</CategoryText>
                <Row>
                  <TextInput
                    placeholder={placeholderText[2][0]}
                    placeholderTextColor="#fff"
                    value={version === "email" ? values.username : route.params.email}
                    onChange={e => setValues({ ...values, username: e.nativeEvent.text })}
                    editable={version === "email"}
                  />
                  {!idChecked && <CheckIcon source={check_icon} />}
                </Row>
                <Line />
                <CategoryText>{categoryText[2][1]}</CategoryText>
                <TextInput
                  placeholder={placeholderText[2][1]}
                  placeholderTextColor="#fff"
                  secureTextEntry
                  value={version === "email" ? values.password : 'social_password'}
                  onChange={e => setValues({ ...values, password: e.nativeEvent.text })}
                  editable={version === "email"}
                />
                <Line />
                <Row>
                  <TextInput
                    placeholder={placeholderText[2][2]}
                    placeholderTextColor="#fff"
                    secureTextEntry
                    value={ version === "email" ? values.password2 : 'apple_password' }
                    onChange={e => setValues({ ...values, password2: e.nativeEvent.text })}
                    editable={version === "email"}
                  />
                  {!isSame && <CheckIcon source={check_icon} />}
                </Row>
                <Line />
              </KeyboardAwareScrollView>
            ) : step === 4 ? (
              <View style={{height:'300%'}}>

              
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom:20}}
                style={{height:100}}
              >
                <ContentText>{contentsText[3]}</ContentText>
                <CategoryText>{categoryText[3][0]}</CategoryText>
                <Row>
                  <TextInput
                    placeholder={placeholderText[3][0]}
                    placeholderTextColor="#fff"
                    value={ version === "email" ? values.email : route.params.email }
                    editable={version === "email"}
                    onChange={e => setValues({ ...values, email: e.nativeEvent.text })}
                  />
                  {!emailChecked && <CheckIcon source={check_icon} />}
                </Row>
                <Line />
                <CategoryText>{categoryText[3][1]}</CategoryText>
                <Row>
                  <TextInput
                    placeholder={placeholderText[3][1]}
                    placeholderTextColor="#fff"
                    keyboardType="phone-pad"
                    value={values.phoneNumber}
                    onChange={e => setValues({ ...values, phoneNumber: e.nativeEvent.text })}
                  />
                  <PhoneButton onPress={() => handleSmsSend(values.phoneNumber, setPhoneChecked)}>
                    <PhoneIcon source={phone_number_auth_icon} />
                  </PhoneButton>
                </Row>
                <Line />
                <MarginVertical top={10} />
                {phoneChecked === '' ? null : !phoneChecked && (
                  <ErrorText>이미 가입된 전화번호입니다</ErrorText>
                )}
                <View style={{alignItems:'center'}}>
                <TextInput
                  placeholder={placeholderText[3][2]}
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  value={varifyCode}
                  onChange={e => setVarifyCode(e.nativeEvent.text)}
                />
                {!isVarified && <CheckIcon source={check_icon} style={{ bottom:30 }} />}
                <Line />
                </View>
                <CategoryText>{placeholderText[3][3]}</CategoryText>
                <TextInput
                  placeholder={placeholderText[3][3]}
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  value={values.birth}
                  onChange={e => setValues({ ...values, birth: e.nativeEvent.text })}
                />
                <Line />
               
              </KeyboardAwareScrollView>
              </View>
            ) : (
              <Complete body>
                <CompleteTitle>{`${values.displayName} 님\n환영합니다!`}</CompleteTitle>
                <CompleteIcon source={clock_graphic} />
                <CompleteText>{`제 ${values.displayName}님에게 딱 맞는\n자투리 시간 활용을 해볼까요?`}</CompleteText>
              </Complete>
            )}
          </InputArea>
          
          <ButtonWrapper>
            <Button text="다음 단계로" handleButton={handleButton} unChecked={step===2 ? checkList[0] : step===3 && version === "email" ? checkList[1] : step===3 && version !== "email" ? false : step === 4 ? checkList[2] : !isActive} />
          </ButtonWrapper>
          <Background source={signup_bg} />
        </ContentsBody>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignupScreen;

// Styled Components
const ContentsBody = styled.View(() => ({
  width,
  height,
  alignItems: 'center'
}));

const Background = styled.Image(() => ({
  width,
  height,
  position: 'absolute',
  zIndex: -1
}));

const Header = styled.View(() => ({
  width: size.width - 50,
  height: 50,
  justifyContent: 'center'
}));

const InputArea = styled.View`
  position: absolute;
  top: 130px;
  align-items: flex-start;
`;

const ContentText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.fontMain};
  margin-bottom: 40px;
  line-height:34px;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const TextInput = styled.TextInput`
  width: 290px;
  height: 50px;
  color: ${colors.fontMain};
  font-size: 16px;
  font-weight: 500;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 294px;
`;

const Line = styled.View`
  background-color: #fff;
  width: 290px;
  height: 0.5px;
  margin-bottom: 20px;
`;

const CheckIcon = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
`;

const PhoneButton = styled.TouchableOpacity`
  margin-left: -55px;
  width: 50px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const PhoneIcon = styled.Image`
  width: 32px;
  height: 24px;
`;

const ErrorText = styled.Text`
  color: ${colors.fontMain};
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 100px;
`;

const Complete = styled.View`
  align-items: center;
  margin-top: 60px;
`;

const CompleteTitle = styled.Text`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.fontMain};
  text-align: center;
  margin-bottom: 36px;
`;

const CompleteIcon = styled.Image`
  width: 210px;
  height: 185px;
  margin-bottom: 36px;
`;

const CompleteText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.fontMain80};
  text-align: center;
`;
