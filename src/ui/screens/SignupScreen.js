import React, { useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import styled from 'styled-components';

import signup_bg from '../../../assets/signup_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import Button from '../components/Button';
import Steps from '../components/Step';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SignupScreen = () => {
  const [step, setStep] = useState(1);
  const handleButton = () => {
    setStep((prev) => prev+1);
  }

  return (
    <>
    <SafeAreaView>
      <SignupContentsBody>
       
        <SignupHeader>
          <BackArrowButton/>
        </SignupHeader>
        <View style={{marginBottom:55, marginTop:-400}}>
          <Steps step={step}/>
        </View>
        <SignupInputArea>
        <StepNumber >
          <StepNumberText>{step}</StepNumberText>
        </StepNumber>
        <SignupContentsText>성함을{"\n"}알려주세요!</SignupContentsText>
        <SignupInput 
          placeholder="이름을 입력해주세요"
          placeholderTextColor="#fff"
          ></SignupInput>
        <BorderLine />
        </SignupInputArea>
        <View style={{position:'absolute', bottom:100}}>
          <Button text={"다음 단계로"} handleButton={handleButton} />
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
  justify-content:center;
  align-items:center;
`

const SignupBg = styled.Image`
  width:${width};
  height:${height};
  z-index:-1;
  position:absolute;
`

const SignupHeader = styled.View`
  position:absolute;
  left:30px;
  top:20px;
`

const StepNumber = styled.View`
  width:32px;
  height:32px;
  background-color:${colors.indigoBlue};
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  margin-bottom:20px;
`

const StepNumberText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:#fff;
`

const SignupContentsText = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:40px;
`

const SignupInputArea = styled.View`
  display:flex;
  align-items:flex-start;
  gap:
`

const SignupInput = styled.TextInput`
  width:290px;
  height:50px;
  z-index:9;
`

const BorderLine = styled.View`
  background-color:#fff;
  width:290px;
  height:.5;
`