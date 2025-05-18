import React from 'react'
import { Image, SafeAreaView, View } from 'react-native'
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

const SettingAccount = ({route}) => {
  const {version,title} = route.params
  const {userInfo} = useUserInfoStore();
  

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
        <MarginVertical top={45}/>
        <CategoryText>아이디</CategoryText>
        <MarginVertical top={20}/>
        <InputArea>
          <Input placeholder={userInfo.username} placeholderTextColor={colors.fontMain}/>
          <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
        </InputArea>
        <BorderLine/>
        <MarginVertical top={44}/>
        <CategoryText>비밀번호</CategoryText>
         <MarginVertical top={20}/>
        <InputArea>
          <Input placeholder={"***************"} placeholderTextColor={colors.fontMain} secureTextEntry={true}/>
          <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
        </InputArea>
        
        <BorderLine/>
        <InputArea>
          <Input placeholder={"***************"} secureTextEntry={true} placeholderTextColor={colors.fontMain}/>
          <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
        </InputArea>
        <BorderLine/>
        </>
        :
        <>
          <MarginVertical top={50}/>
          <InputArea>
            <Input placeholder={version === 1 ? userInfo.birth : version === 2 ? userInfo.email : userInfo.phoneNumber}/>
            <Fontisto name="check" size={14} color={colors.fontMain} style={{position:'absolute',right:0,bottom:7}}/>
          </InputArea>
          <BorderLine/>
        </>
        }
        <View style={{position:'absolute', bottom:140, justifyContent:'center', alignItems:'center' ,width:size.width}}>
          <Button text={"저장하기"}/>
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
  height:.5px;
  background-color:${colors.fontMain50};
`