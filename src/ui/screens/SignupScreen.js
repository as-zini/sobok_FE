import React, { useEffect, useState } from 'react'
import { Dimensions, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SignupScreen = () => {
  const [step, setStep] = useState(1);
  const [unChecked, setUnChecked] = useState(true);
  // const [idChecked, setIdChecked] = useState(false);
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
  const {handleSignup, checkAvailability} = useSignup();
  const handleButton = () => {
    if(step<4){
      setStep((prev) => prev+1);
      setUnChecked(true)
    } else if(step===4){
      handleSignup(values, setStep);
    }else{
      navigation.navigate("StartAddAsset", {version:"Saving"});
    }
  }
  const contentsText = ["성함을 \n알려주세요", "소복에서는 \n어떻게 불러드릴까요?", "아이디와 \n비밀번호를 설정할게요!", `${values.displayName} 님에 대해 \n더 알려주세요!`,""]
  const placeholderText = ["이름을 입력해주세요", "닉네임을 입력해주세요", ["아이디를 입력해주세요", "대/소문자, 숫자, 특수문자의 조합", "비밀번호를 한 번 더 입력해주세요"],["이메일을 입력해주세요", "전화번호를 입력해주세요", "인증번호를 입력해주세요", "생년월일을 입력해주세요"],""]
  const categoryText = ["","", ["아이디", "비밀번호"], ["이메일", "전화번호", "생년월일"]]
  const categoryState = ["name", "displayName", ["userName", "password", "password2"], ["email", "phoneNumber", "birth"]]
  const currentValue = values[categoryState[step-1]];

  // 하나라도 입력되었으면 버튼 활성화
  const isActive = step === 1 || step === 2 ? currentValue.trim() !== "" :
                  step === 3 ? values.username.trim() !=="" && values.password.trim() !=="" && values.password2.trim() !=="" : values.email.trim() !=="" && values.phoneNumber.trim() !== "" && values.birth.trim() !== ""
  const isSame = values.password !== values.password2
  const step3Check = !isActive && isSame
  const idCheck = checkAvailability(values.username , "username");
  

  
  useEffect(() => {
    console.log(isActive)
  }, [values])


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
        <View>
          <SignupInput 
            placeholder={placeholderText[step-1]}
            placeholderTextColor="#fff"
            value={step === 1? values.name : values.displayName}
            onChange={(e) => {
              console.log(e.nativeEvent.text);
              step === 1 ? setValues({...values,  "name" : e.nativeEvent.text}) : setValues({...values, "displayName": e.nativeEvent.text})
              if(step===1){
                
              } else{
              }
              // if(step===2 && values.displayName){
              //   setUnChecked(false)
              // }else{
              //   setUnChecked(true);
              // }
            }}
          ></SignupInput>
          <Image source={check_icon} style={{width:32, height:32, position:'absolute', right:0}}/>
        </View>
        <BorderLine />
        </>
        : step === 3 ?
        <>
        <SignupContentsText>{contentsText[step-1]}</SignupContentsText>
        <SignupCategoryText style={{marginTop:0}}>{categoryText[step-1][0]}</SignupCategoryText>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:294}}>
          <SignupInput
            placeholder={placeholderText[step-1][0]}
            placeholderTextColor="#fff"
            value={values.username}
            onChange={(e) => {
              setValues({...values, 'username':e.nativeEvent.text});
              checkAvailability(values.username, "username")
            }}
          />
          <Image source={check_icon} style={{width:32, height:32, position:'absolute', right:0}}/>
        </View>
        <BorderLine/>
        <View >
          <SignupCategoryText>{categoryText[step-1][1]}</SignupCategoryText>
          <SignupInput
            placeholder={placeholderText[step-1][1]}
            placeholderTextColor="#fff"
            value={values.password}  
            onChange={(e) => {setValues({...values, 'password':e.nativeEvent.text})}}
          />
          <BorderLine/>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:294}}>
            <SignupInput
              placeholder={placeholderText[step-1][2]}
              placeholderTextColor="#fff"
              value={values.password2}
              onChange={(e) => {setValues({...values, 'password2':e.nativeEvent.text})}}
            />
            {isSame ? <></>
            :<Image source={check_icon} style={{width:32, height:32, position:'absolute', right:0}}/>
            }
          </View>
          <BorderLine/>
        </View>
        </>
        : step === 4 ?
        <ScrollView style={{height:400}}>
          <SignupContentsText>{contentsText[step-1]}</SignupContentsText>
          <SignupCategoryText style={{marginTop:10}}>{categoryText[step-1][0]}</SignupCategoryText>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:294}}>
            <SignupInput
              placeholder={placeholderText[step-1][0]}
              value={values.email}
              onChange={(e) => {setValues({...values, "email" : e.nativeEvent.text})}}/>
            <Image source={check_icon} style={{width:32, height:32, position:'absolute', right:0}}/>
          </View>
          <BorderLine/>

          <SignupCategoryText>{categoryText[step-1][1]}</SignupCategoryText>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <SignupInput
              placeholder={placeholderText[step-1][1]}
              value={values.phoneNumber}
              onChange={(e) => {setValues({...values, "phoneNumber":e.nativeEvent.text})}}
              />
            <PhoneAuthButton>
              <PhoneAuthIcon source={phone_number_auth_icon}/>
            </PhoneAuthButton>
          </View>
          <BorderLine/>
          <SignupInput placeholder={placeholderText[step-1][2]}/>
          <BorderLine/>
          <SignupCategoryText SignupCategoryText>{categoryText[step-1][2]}</SignupCategoryText>
          <SignupInput
            placeholder={placeholderText[step-1][3]} 
            placeholderTextColor="#fff"
            value={values.birth}
            onChange={(e) => {setValues({...values, "birth":e.nativeEvent.text})}}
            />
          <BorderLine/>
        </ScrollView>
        :
        <SignupCompleteBody>
          <SignupCompleteTitle>{`${values.displayName} 님\n환영합니다!`}</SignupCompleteTitle>
          <SignupCompleteIcon source={clock_graphic}/>
          <SignupCompleteText>이제 지윤 님에게 딱 맞는{"\n"}자투리 시간 활용을 해볼까요?</SignupCompleteText>
        </SignupCompleteBody>
          }
          
        </SignupInputArea>
        <View style={{position:'absolute', bottom:100}}>
          <Button text={"다음 단계로"} handleButton={handleButton} unChecked={step!== 3? !isActive : step3Check}/>
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
  position:absolute;
  right:0;
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



