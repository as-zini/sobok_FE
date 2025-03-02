import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import styled from 'styled-components';

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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SignupScreen = () => {
  const [step, setStep] = useState(1);
  const [unChecked, setUnChecked] = useState(true);
  const [idChecked, setIdChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState("");
  const [isVarified, setIsVarified] = useState(false);
  const [varifyCode, setVarifyCode] = useState("");
  const {handleLogin} = useLogin()
  const [values, setValues] = useState({
    username:"",
    displayName:"",
    name:"",
    password:"",
    password2:"",
    email: "",
    phoneNumber:"",
    birth:""
  })
  const navigation = useNavigation();
  const {handleSignup, checkAvailability, handleSmsSend, handleSmsVarify} = useSignup();
  const handleButton = () => {
    if(step<4){
      setStep((prev) => prev+1);
      setUnChecked(true)
    } else if(step===4){
      handleSignup(values, setStep);
      // setStep(prev => prev+1)
      
    }else{
      handleLogin(values.username, values.password, "", true)
      navigation.navigate("ViewSaveTime", {version:'first', username:values.displayName});
    }
  }
  const contentsText = ["성함을 \n알려주세요", "소복에서는 \n어떻게 불러드릴까요?", "아이디와 \n비밀번호를 설정할게요!", `${values.displayName} 님에 대해 \n더 알려주세요!`,""]
  const placeholderText = ["이름을 입력해주세요", "닉네임을 입력해주세요", ["아이디를 입력하세요(5-15자)", "비밀번호를 입력하세요 (8~16글자)", "비밀번호를 한 번 더 입력해주세요"],["이메일을 입력해주세요", "전화번호를 입력해주세요", "인증번호를 입력해주세요", "ex)20000101"],""]
  const categoryText = ["","", ["아이디", "비밀번호"], ["이메일", "전화번호", "생년월일"]]
  const categoryState = ["name", "displayName", ["userName", "password", "password2"], ["email", "phoneNumber", "birth"]]
  const currentValue = values[categoryState[step-1]];

  // 하나라도 입력되었으면 버튼 활성화
  const isActive = step === 1 || step === 2 ? currentValue.trim() !== "" :
                  step === 3 ? values.username.trim() !=="" && values.password.trim() !=="" && values.password2.trim() !=="" : values.email.trim() !=="" && values.phoneNumber.trim() !== "" && values.birth.trim() !== ""
  const isSame = values.password !== values.password2 || values.password.length < 7 || values.password.length >17
  const step3Check = !isActive || isSame
  const checkList = [!isActive || nicknameChecked, !isActive || isSame || idChecked, !isActive || emailChecked || !isVarified];

  const handleIdCheck = async() => {
    const response = await checkAvailability(values.username, "username");
    console.log(response);
    console.log(response.isDuplicated && (values.username.length <=4 || values.username.length >=16))
    setIdChecked(response.isDuplicated || (values.username.length <=4 || values.username.length >=16));
  }

  const handleNichnameCheck = async() => {
    const response = await checkAvailability(values.displayName, "display-name");
    console.log(response);
    setNicknameChecked(response.isDuplicated);
  }

  const handleEmailCheck = async() => {
    const response = await checkAvailability(values.email, 'email');
    console.log(response);
    setEmailChecked(response.isDuplicated);
  }



  

  
  useEffect(() => {
    // console.log(isActive)
    step===2 ? 
    handleNichnameCheck()
    :step === 3?
    handleIdCheck()
    :
    handleEmailCheck();

    console.log(idChecked);
    console.log(values);
    console.log(checkList);
  }, [values])

  useEffect(() => {
    handleSmsVarify(values.phoneNumber, varifyCode, setIsVarified)
  },[varifyCode])

  return (
    <>
    <SafeAreaView>
      <SignupContentsBody>
       
        <SignupHeader>
          <BackArrowButton/>
        </SignupHeader>
        <Steps step={step}/>
        <SignupInputArea>
        {step !== 5 ?
        <StepNumber step={step} marginBottom={20}/>
        :
        <></>
        }
        
        {step === 1 || step===2 ? 
        <>
        <SignupContentsText>{contentsText[step-1]}</SignupContentsText>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:294}}>
          <SignupInput 
            placeholder={placeholderText[step-1]}
            placeholderTextColor="#fff"
            value={step === 1? values.name : values.displayName}
            onChange={(e) => {
              console.log(e.nativeEvent.text);
              step === 1 ? setValues({...values,  "name" : e.nativeEvent.text}) : setValues({...values, "displayName": e.nativeEvent.text})
            }}
          ></SignupInput>
          {step === 2 && !nicknameChecked && values.displayName.length !== 0?<Image source={check_icon} style={{width:32, height:32, position:'absolute', right:0}}/> : <></>}
        </View>
        <BorderLine />
        </>
        : step === 3 ?
        <>
        {/* <SignupContentsText>{contentsText[step-1]}</SignupContentsText>
        <SignupCategoryText style={{marginTop:0}}>{categoryText[step-1][0]}</SignupCategoryText>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:294}}>
          <SignupInput
            placeholder={placeholderText[step-1][0]}
            placeholderTextColor="#fff"
            value={values.username}
            onChange={(e) => {
              setValues({...values, 'username':e.nativeEvent.text});
            }}
          />
          {idChecked ? <></> : <Image source={check_icon} style={{width:32, height:32, position:'absolute', right:0}}/>}
        </View>
        <BorderLine/>
        <View >
          <SignupCategoryText>{categoryText[step-1][1]}</SignupCategoryText>
          <SignupInput
            placeholder={placeholderText[step-1][1]}
            placeholderTextColor="#fff"
            value={values.password}  
            onChange={(e) => {setValues({...values, 'password':e.nativeEvent.text})}}
            secureTextEntry={true}
          />
          <BorderLine/>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:294}}>
            <SignupInput
              placeholder={placeholderText[step-1][2]}
              placeholderTextColor="#fff"
              value={values.password2}
              onChange={(e) => {setValues({...values, 'password2':e.nativeEvent.text})}}
              secureTextEntry={true}
            />
            {isSame ? <></>
            :<Image source={check_icon} style={{width:32, height:32, position:'absolute', right:0}}/>
            }
          </View>
          <BorderLine/>
        </View> */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        extraScrollHeight={0}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"  // 키보드 바깥 터치 시 닫히게 설정
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}  // 스크롤 안에서 여백 설정
      >
        {/* 첫 번째 인풋박스 */}
        <SignupContentsText>{contentsText[step - 1]}</SignupContentsText>
        <SignupCategoryText style={{ marginTop: 0 }}>
          {categoryText[step - 1][0]}
        </SignupCategoryText>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 294 }}>
          <SignupInput
            placeholder={placeholderText[step - 1][0]}
            placeholderTextColor="#fff"
            value={values.username}
            onChange={(e) => {
              setValues({ ...values, 'username': e.nativeEvent.text });
            }}
          />
          {idChecked ? null : (
            <Image source={check_icon} style={{ width: 32, height: 32, position: 'absolute', right: 0 }} />
          )}
        </View>
        <BorderLine />

        {/* 두 번째 인풋박스 */}
        <View>
          <SignupCategoryText>{categoryText[step - 1][1]}</SignupCategoryText>
          <SignupInput
            placeholder={placeholderText[step - 1][1]}
            placeholderTextColor="#fff"
            value={values.password}
            onChange={(e) => { setValues({ ...values, 'password': e.nativeEvent.text }) }}
            secureTextEntry={true}
          />
          <BorderLine />

          {/* 세 번째 인풋박스 */}
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 294 }}>
            <SignupInput
              placeholder={placeholderText[step - 1][2]}
              placeholderTextColor="#fff"
              value={values.password2}
              onChange={(e) => { setValues({ ...values, 'password2': e.nativeEvent.text }) }}
              secureTextEntry={true}
            />
            {isSame ? null : (
              <Image source={check_icon} style={{ width: 32, height: 32, position: 'absolute', right: 0 }} />
            )}
          </View>
          <BorderLine />
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
        </>
        : step === 4 ?
        
    <KeyboardAwareScrollView
      style={{ height: 400 }}
      extraScrollHeight={5}    // 키보드가 뜰 때 추가로 스크롤되는 높이
      enableOnAndroid={true}    // 안드로이드에서도 동작하게 설정
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ paddingBottom: 20 }}>
          <SignupContentsText style={{ marginBottom: 20 }}>
            {contentsText[step - 1]}
          </SignupContentsText>

          <SignupCategoryText style={{ marginTop: 10 }}>
            {categoryText[step - 1][0]}
          </SignupCategoryText>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 294 }}>
            <SignupInput
              placeholder={placeholderText[step - 1][0]}
              value={values.email}
              onChange={(e) => { setValues({ ...values, "email": e.nativeEvent.text }) }}
            />
            {emailChecked ? null : (
              <Image source={check_icon} style={{ width: 32, height: 32, position: 'absolute', right: 0 }} />
            )}
          </View>
          <BorderLine />

          <SignupCategoryText>{categoryText[step - 1][1]}</SignupCategoryText>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <SignupInput
              placeholder={placeholderText[step - 1][1]}
              value={values.phoneNumber}
              onChange={(e) => { setValues({ ...values, "phoneNumber": e.nativeEvent.text }) }}
              style={{ width: 250, marginRight: 40 }}
              keyboardType="phone-pad"
            />
            <PhoneAuthButton onPress={() => handleSmsSend(values.phoneNumber, setPhoneChecked)}>
              <PhoneAuthIcon source={phone_number_auth_icon} />
            </PhoneAuthButton>
          </View>
          <BorderLine />

          <MarginVertical top={10} />
          {phoneChecked ? null : phoneChecked.length === 0 ? null : (
            <Text style={{ color: colors.fontMain, fontWeight: '500', fontSize: 16 }}>
              이미 가입된 전화번호입니다
            </Text>
          )}

          <View>
            <SignupInput
              placeholder={placeholderText[step - 1][2]}
              value={varifyCode}
              onChange={(e) => setVarifyCode(e.nativeEvent.text)}
              keyboardType="numeric"
            />
            {isVarified ? (
              <Image source={check_icon} style={{ width: 32, height: 32, position: 'absolute', right: 0, bottom: 5 }} />
            ) : null}
          </View>
          <BorderLine />

          <SignupCategoryText>{categoryText[step - 1][2]}</SignupCategoryText>
          <SignupInput
            placeholder={placeholderText[step - 1][3]}
            placeholderTextColor="#fff"
            value={values.birth}
            onChange={(e) => { setValues({ ...values, "birth": e.nativeEvent.text }); }}
            keyboardType="numeric"
          />
          <BorderLine />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
        :
        <SignupCompleteBody>
          <SignupCompleteTitle>{`${values.displayName} 님\n환영합니다!`}</SignupCompleteTitle>
          <SignupCompleteIcon source={clock_graphic}/>
          <SignupCompleteText>{`제 ${values.displayName}님에게 딱 맞는{"\n"}자투리 시간 활용을 해볼까요?`}</SignupCompleteText>
        </SignupCompleteBody>
          }
          
        </SignupInputArea>
        <View style={{position:'absolute', bottom:100}}>
          <Button text={"다음 단계로"} handleButton={handleButton} unChecked={step===2 ? checkList[0] : step===3 ? checkList[1] : step === 4 ? checkList[2] : !isActive}/>
        </View>
        <SignupBg source={signup_bg} />
      </SignupContentsBody>
    </SafeAreaView>
    
    </>
  )
}

export default SignupScreen;

const SignupContentsBody = styled.View`
  width:${width}px;
  height:${height}px;
  display:flex;
  
  align-items:center;
`

const SignupBg = styled.Image`
  width:${width};
  height:${height};
  z-index:-1;
  position:absolute;
`

const SignupHeader = styled.View`
  width:${size.width-50}px;
  height:50px;
  display:flex;
  justify-content:center;
  
`

const SignupContentsText = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:40px;
`

const SignupCategoryText = styled.Text`
  margin-bottom:20px;
  font-size:16px;
  font-weight:500;
  color:#fff;
  margin-top:40px;
`

const SignupInputArea = styled.View`
  display:flex;
  align-items:flex-start;
  position:absolute;
  top:130px;
`

const SignupInput = styled.TextInput`
  width:290px;
  height:50px;
  z-index:9;
  color:${colors.fontMain};
  font-size:16px;
  font-weight:500;
`

const BorderLine = styled.View`
  background-color:#fff;
  width:290px;
  height:.5;
`

const PhoneAuthButton = styled.TouchableOpacity`
  z-index:2;
  margin-left:-55px;
  width:50px;
  display:flex;
  justify-content:center;
  align-items:center;
  height:30px;
  z-index:2;
`

const PhoneAuthIcon = styled.Image`
  width:32px;
  height:24px;
`

const SignupCompleteBody = styled.View`
  display:flex;
  gap:36px;
  margin-top:60px;
`

const SignupCompleteTitle = styled.Text`
  font-weight:600;
  font-size:32px;
  color:${colors.fontMain};
  text-align:center;
`

const SignupCompleteIcon = styled.Image`
  width:210px;
  height:185px;
`

const SignupCompleteText = styled.Text`
  text-align:center;
  font-size:20px;
  font-weight:500;
  color:${colors.fontMain80};
`



