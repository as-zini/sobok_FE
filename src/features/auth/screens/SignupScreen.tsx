import React, { useEffect, useState, useMemo } from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from '@emotion/native';

import signup_bg from '@/assets/signup_bg.png';
import { colors } from '@/common/ui/styles/colors';
import Button from '@/common/ui/components/Button';
import Steps from '@/common/ui/components/Step';
import phone_number_auth_icon from '@/assets/phone_number_auth_icon.png';
import clock_graphic from '@/assets/clock_graphic.png';
import { useNavigation } from '@react-navigation/native';
import StepNumber from '@/common/ui/components/StepNumber';
import { size } from '@/common/ui/styles/size';
import check_icon from '@/assets/check_icon_indigo.png';
import { useSignup } from '@/features/auth/hooks/useSignup';
import { useLogin } from '@/features/auth/hooks/useLogin';
import MarginVertical from '@/common/ui/components/MarginVertical';
import { debouce } from '@/util';
import Header from '@/common/ui/components/Header';
import Bg from '@/common/ui/components/Bg';
import { verticalScale } from '@/common/utils/moderateScale';
import { DefaultText } from '@/common/ui/components/DefaultText';
import AuthInput from '../components/AuthInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DoubleAuthInput from '../components/DoubleAuthInput';

const SignupScreen = ({ route }) => {
  const [step, setStep] = useState(1);
  const [idChecked, setIdChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState('');
  const [isVarified, setIsVarified] = useState(false);
  const [varifyCode, setVarifyCode] = useState('');
  const { handleLogin } = useLogin();
  const { version } = route.params;
  const insets = useSafeAreaInsets();
  const [values, setValues] = useState({
    username: '',
    displayName: '',
    name: '',
    password: '',
    password2: '',
    email: '',
    phoneNumber: '',
    birth: '',
  });
  const navigation = useNavigation();
  const { handleSignup, checkAvailability, handleSmsSend, handleSmsVarify, addUserInfo } =
    useSignup();

  // 디바운스된 인증번호 설정 함수

  const debouncedVerify = useMemo(
    () =>
      debouce(code => {
        // 최신 phoneNumber로 검증
        console.log(code);
        handleSmsVarify(values.phoneNumber, code, setIsVarified);
      }, 500),
    [values.phoneNumber], // 의도적으로 phoneNumber만 의존
  );

  const handleButton = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else if (step === 4) {
      if (version === 'email') {
        handleSignup(values, setStep);
      } else {
        addUserInfo({
          name: values.name,
          displayName: values.displayName,
          phoneNumber: values.phoneNumber,
          birth: values.birth,
        });
      }
    } else {
      if (version === 'email') {
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
    '',
  ];

  const placeholderText = [
    '이름을 입력해주세요',
    '닉네임을 입력해주세요',
    [
      '아이디를 입력하세요(5-15자)',
      '비밀번호를 입력하세요 (8~16글자)',
      '비밀번호를 한 번 더 입력해주세요',
    ],
    ['이메일을 입력해주세요', '전화번호를 입력해주세요', '인증번호를 입력해주세요', 'ex)20000101'],
    '',
  ];

  const categoryText = ['', '', ['아이디', '비밀번호'], ['이메일', '전화번호', '생년월일']];

  const isActive =
    step === 1 || step === 2
      ? (step === 1 ? values.name : values.displayName).trim() !== ''
      : step === 3
      ? values.username.trim() !== '' &&
        values.password.trim() !== '' &&
        values.password2.trim() !== ''
      : values.email.trim() !== '' &&
        values.phoneNumber.trim() !== '' &&
        values.birth.trim() !== '';

  const isSame =
    values.password !== values.password2 ||
    values.password.length < 7 ||
    values.password.length > 17;
  const checkList = [
    !isActive || nicknameChecked,
    !isActive || isSame || idChecked,
    !isActive || emailChecked || !isVarified,
  ];

  useEffect(() => {
    if (step === 2) {
      checkAvailability(values.displayName, 'display-name').then(res =>
        setNicknameChecked(res.isDuplicated),
      );
    } else if (step === 3) {
      checkAvailability(values.username, 'username').then(res => setIdChecked(res.isDuplicated));
    } else if (step === 4) {
      checkAvailability(values.email, 'email').then(res => setEmailChecked(res.isDuplicated));
    }
  }, [values]);

  // useEffect(() => {
  //   debouncedVerify(varifyCode);
  // }, [varifyCode]);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ContentsBody>
          <Header isBack={true} />
          <MarginVertical top={verticalScale(10)} />
          <Steps step={step} />
          <InputArea>
            {step !== 5 && <StepNumber step={step} marginBottom={20} />}
            <ContentText>{contentsText[step - 1]}</ContentText>
            {step === 2 && <CategoryText>닉네임을 설정해주세요!</CategoryText>}
            {step === 1 || step === 2 ? (
              <AuthInput
                placeholder={'이름을 입력해주세요'}
                value={step === 1 ? values.name : values.displayName}
                onChangeText={text =>
                  step === 1
                    ? setValues({ ...values, name: text })
                    : setValues({ ...values, displayName: text })
                }
                secureTextEntry={false}
                onFocus={() => {}}
                onBlur={() => {}}
              />
            ) : step === 3 ? (
              <KeyboardAwareScrollView
                style={{ marginTop: verticalScale(32) }}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
              >
                <AuthInput
                  label="아이디"
                  placeholder="아이디를 입력하세요 (5~15자)"
                  value={version === 'email' ? values.username : route.params.email}
                  onChangeText={text => setValues({ ...values, username: text })}
                  secureTextEntry={false}
                  disabled={version !== 'email'}
                  onBlur={() => {}}
                  onFocus={() => {}}
                />
                <MarginVertical top={verticalScale(32)} />
                <DoubleAuthInput
                  label="비밀번호"
                  placeholders={[
                    '비밀번호를 입력하세요 (8~16자)',
                    '비밀번호를 한 번 더 입력해주세요',
                  ]}
                  values={[values.password, values.password2]}
                  onTopChangeText={text => setValues({ ...values, password: text })}
                  onBottomChangeText={text => setValues({ ...values, password2: text })}
                  secureTextEntrys={[true, true]}
                  disables={[version !== 'email', version !== 'email']}
                  onTopFocus={() => {}}
                  onBottomBlur={() => {}}
                  onBottomFocus={() => {}}
                  onTopBlur={() => {}}
                />
              </KeyboardAwareScrollView>
            ) : step === 4 ? (
              <View style={{ height: '300%' }}>
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps="handled"
                  enableOnAndroid
                  showsVerticalScrollIndicator={false}
                  style={{ height: 100 }}
                >
                  <CategoryText>{categoryText[3][0]}</CategoryText>
                  <Row>
                    <TextInput
                      placeholder={placeholderText[3][0]}
                      placeholderTextColor="#fff"
                      value={version === 'email' ? values.email : route.params.email}
                      editable={version === 'email'}
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
                  {phoneChecked === ''
                    ? null
                    : !phoneChecked && <ErrorText>이미 가입된 전화번호입니다</ErrorText>}
                  <View style={{ alignItems: 'center' }}>
                    <TextInput
                      placeholder={placeholderText[3][2]}
                      placeholderTextColor="#fff"
                      keyboardType="numeric"
                      value={varifyCode}
                      onChange={e => {
                        setVarifyCode(e.nativeEvent.text);
                        debouncedVerify(e.nativeEvent.text);
                      }}
                    />
                    {isVarified && <CheckIcon source={check_icon} style={{ bottom: 30 }} />}
                    <Line />
                  </View>
                  <CategoryText>{categoryText[3][2]}</CategoryText>
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

          <ButtonWrapper bottomInset={insets.bottom}>
            <Button
              text="다음 단계로"
              handleButton={handleButton}
              unChecked={
                step === 2
                  ? checkList[0]
                  : step === 3 && version === 'email'
                  ? checkList[1]
                  : step === 3 && version !== 'email'
                  ? false
                  : step === 4
                  ? checkList[2]
                  : !isActive
              }
            />
          </ButtonWrapper>
        </ContentsBody>
      </TouchableWithoutFeedback>
      <Bg source={signup_bg} />
    </SafeAreaView>
  );
};

export default SignupScreen;

const ContentsBody = styled.View(() => ({
  width: size.width,
  height: size.height,
  alignItems: 'center',
  paddingHorizontal: 40,
}));

const InputArea = styled.View({
  marginTop: verticalScale(57),
});

const ContentText = styled(DefaultText)({
  fontSize: 24,
  fontWeight: 600,
  color: colors.fontMain,
  lineHeight: 34,
});

const CategoryText = styled(DefaultText)({
  color: colors.fontMain80,
  lineHeight: 36,
});

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
  color: ${colors.error};
  font-weight: 500;
  font-size: 14px;
  margin-top: -20px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.View<{ bottomInset: number }>(({ bottomInset }) => ({
  width: '100%',
  position: 'absolute',
  bottom: bottomInset + 70,
}));

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
