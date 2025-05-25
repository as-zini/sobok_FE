import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import styled from 'styled-components'
import { size } from '../styles/size'
import bg from '../../../assets/home_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import icon from '../../../assets/login_icon.png';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import { useUserInfoStore } from '../../store/user';
import Fontisto from '@expo/vector-icons/Fontisto';
import Button from '../components/Button';
import { useMyPage } from '../../hooks/useMyPage';
import { useGetInfo } from '../../hooks/useGetInfo';
import authIcon from '../../../assets/phone_number_auth_icon.png';
import { useSignup } from '../../hooks/useSignup';

const SettingAccount = ({route}) => {
  const {version,title} = route.params
  const {userInfo} = useUserInfoStore();
  const [editValue, setEditValue] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const {handleEditPassword, handleEditInfo} = useMyPage();
  const {getUserInfo} = useGetInfo();
  const [phoneChecked, setPhoneChecked] = useState(true);
  const {handleSmsSend, handleSmsVarify} = useSignup();
  const [varifyCode, setVarifyCode] = useState("");
  const [isVarified, setIsVarified] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  const passwordRegex = /^(?=.{8,16}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  const handleEditButton = () => {
    if(version === 0){
      handleEditPassword(oldPassword, editValue, setIsError)
    }else{
      handleEditInfo(editValue, version)
    }
  }

  

  useEffect(() => {
    if(version === 3){
    handleSmsVarify(editValue, varifyCode, setIsVarified)
    }
  },[varifyCode])


  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    if(version === 0){
      setIsValid(oldPassword.length > 0 && newPassword.length>0 && editValue.length > 0 && passwordRegex.test(editValue) && editValue === newPassword)
    }else if(version === 1){
      setIsValid(editValue.length > 0)
    }else if(version === 2){
      setIsValid(editValue.length > 0 && emailRegex.test(editValue))
    }else{
      setIsValid(editValue.length > 0 && isVarified && isValid && varifyCode.length > 0)
    }
  },[oldPassword, newPassword, editValue])
  
  

  return (
    <SafeAreaView>
      <Body>
        <Header>
        <View style={{position:"absolute", left:0}}>
          <BackArrowButton/>
        </View>
        </Header>
        <MarginVertical top={40}/>
        <Image source={icon} style={{width:48, height:40}}/>
        <MarginVertical top={20}/>
        <Title>{title}</Title>
        {version === 0 ?
        <>
        <MarginVertical top={44}/>
        <CategoryText>기존 비밀번호</CategoryText>
         <MarginVertical top={20}/>
        <InputArea>
          <Input placeholder={"***************"}
            placeholderTextColor={colors.fontMain}
            secureTextEntry={true}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.nativeEvent.text)}/>
            
        </InputArea>
        
        <BorderLine/>
        <MarginVertical top={44}/>
        <CategoryText>새로운 비밀번호</CategoryText>
         <MarginVertical top={20}/>
        <InputArea>
          <Input placeholder={"8-16글자 이내 대소문자, 숫자, 특수문자 포함"} placeholderTextColor={colors.fontMain70} secureTextEntry={true}
          value={editValue}
          onChange={(e) => setEditValue(e.nativeEvent.text)}/>
          {editValue.length > 0 && passwordRegex.test(editValue)?
          <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
            :<></>}
        </InputArea>
        
        <BorderLine/>
        <InputArea>
          <Input placeholder={"비밀번호를 다시 입력해주세요"} secureTextEntry={true} placeholderTextColor={colors.fontMain70}
          value={newPassword}
          onChange={(e) => setNewPassword(e.nativeEvent.text)}/>
          {newPassword.length > 0 && editValue === newPassword ?
          <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
            :<></>}
        </InputArea>
        <BorderLine/>
        </>
        :
        <>
          <MarginVertical top={50}/>
          <InputArea>
            <Input
            placeholder={version === 1 ? userInfo.birth : version === 2 ? userInfo.email : userInfo.phoneNumber}
            placeholderTextColor={colors.fontMain}
            value={editValue}
            onChange={(e) => setEditValue(e.nativeEvent.text)}/>
            {version === 3 ?
            <PhoneAuthButton onPress={() => handleSmsSend(editValue, setPhoneChecked)}>
              <PhoneAuthIcon source={authIcon} />
            </PhoneAuthButton>
            : (version === 2 && editValue.length > 0 && emailRegex.test(editValue)) || (version !== 2 && editValue.length > 0) ?
              <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
            :<></>}
            </InputArea>
          <BorderLine/>
          
          { version !== 3 ? <></> : phoneChecked && version === 3 ? null : phoneChecked.length === 0 ? null : (
            <Text style={{ color: colors.fontMain, fontWeight: '500', fontSize: 16 }}>
              이미 가입된 전화번호입니다
            </Text>
          )}
          
          {version === 3 ? 
          <>
          <MarginVertical top={10}/>
          <InputArea>
            <Input
              
              value={varifyCode}
              onChange={(e) => setVarifyCode(e.nativeEvent.text)}
              keyboardType="numeric"
            />
            {isVarified ? (
              <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
            ) : null}
          </InputArea>
          <BorderLine/>
          </>
          :
          <></>
          }
        </>
        }
        <View style={{position:'absolute', bottom:140, justifyContent:'center', alignItems:'center' ,width:size.width}}>
          <Button text={"저장하기"} handleButton={handleEditButton} unChecked={!isValid}/>
        </View>
      </Body>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default SettingAccount

const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  padding:0 30px;
  display:flex;
`

const Bg = styled.Image`
  width:${size.width}px;
  height:${size.height}px;
  z-index:-1;
  position:absolute;
  top:0;

`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
`

const Title = styled.Text`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain};
`

const InputArea = styled.View`
  width:${size.width-60}px;
`

const Input = styled.TextInput`
  width:100%;
  height:40px;
  color:${colors.fontMain};
  font-size:18px;
`



const CategoryText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain80};
`

const BorderLine = styled.View`
  width:${size.width-60}px;
  height:1px;
  background-color:lightgray;
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
  position:absolute;
  right:0;
  
`

const PhoneAuthIcon = styled.Image`
  width:32px;
  height:24px;
`