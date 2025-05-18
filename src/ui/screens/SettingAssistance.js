import React from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import { size } from '../styles/size'
import bg from '../../../assets/home_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import icon from '../../../assets/save_icon.png';
import MarginVertical from '../components/MarginVertical';
import hakjae from '../../../assets/hakjaeProfile.png';
import zini from '../../../assets/ziniProfile.png';
import jiyoon from '../../../assets/jiyoonProfile.png';
import Zocial from '@expo/vector-icons/Zocial';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SettingAssistance = () => {
  const profileData = [[hakjae,"hjkim4842@gmail.com","010-9557-4842"],[zini, "aszini@naver.com","010-2719-4828"],[jiyoon,"jyurnl0@gmail.com","010-2387-4828"]]

  return (
    <SafeAreaView>
      <Body>
        <Header>
          <View style={{position:'absolute',left:0}}>
          <BackArrowButton/>
          </View>
          <HeaderText>지원 문의</HeaderText>
        </Header>
        <MarginVertical top={33}/>
        <Image source={icon} style={{width:44, height:32}}/>
        <MarginVertical top={15}/>
        <Title>소복</Title>
        <MarginVertical top={15}/>
        <HeaderText>안녕하세요! 소복입니다!</HeaderText>
        <MarginVertical top={40}/>
        <ProfileArea>
          {profileData.map((el,index) => {
            return(
            <View key={index}>
              <Image source={el[0]}/>
              <MarginVertical top={10}/>
              <View style={{flexDirection:'row', gap:10}}>
                <Zocial name="email" size={24} color={colors.fontMain60} />
                <InfoText>{el[1]}</InfoText>
              </View>
              <View  style={{flexDirection:'row', gap:10}}>
                <FontAwesome name="phone" size={24} color={colors.fontMain60} />
                <InfoText>{el[2]}</InfoText>
              </View>
              <MarginVertical top={40}/>
            </View>
            )
          })}
        </ProfileArea>
      </Body>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default SettingAssistance


const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  padding:0 40px;
`

const Bg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  height:${size.height}px;
  z-index:-1;
`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
`

const HeaderText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#4c4c4c;
`

const Title = styled.Text`
  font-size:34px;
  font-weight:600;
  line-height:44px;
  color:${colors.fontMain};
`

const ProfileArea = styled.View`

`

const InfoText = styled.Text`
  font-size:18px;
  line-height:26px;
  color:${colors.fontMain60};
`