import React from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import styled from 'styled-components'
import { size } from '../styles/size'

import setting_bg from '../../../assets/setting_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import snowman_graphic from '../../../assets/snowman_graphic.png';
import NavigateArrowButton from '../components/NavigateArrowButton';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const settingCategory = ["계정 설정", "알림 설정", "연동 설정", "시간 모드 설정", "방해 금지 모드 설정", "공개 설정", "지원 문의", "약관 및 개인정보 처리 동의", "앱 버전"]
  const goToCategory = ["", "", "LinkedApp", "", "", "","","",""];
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <SettingBody>
        <SettingHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.darkGray}}>설정</Text>
        </SettingHeader>
        <ProfileArea>
          <ProfileImageArea>
            <Image source={snowman_graphic} style={{width:40, height:40}}/>
          </ProfileImageArea>
          <View>
            <UserName>지윤</UserName>
            <EditButton>
              <EditText>프로필 편집</EditText>
              <NavigateArrowButton/>
            </EditButton>
          </View>
        </ProfileArea>
        <MarginVertical top={12}/>
        <SettingArea>
          {settingCategory.map((el, index) => {
            return(
              <View key={index}>
              <SettingEl onPress={() => navigation.navigate(`Setting${goToCategory[index]}`)}>
                <SettingTitle>{el}</SettingTitle>
                <NavigateArrowButton/>
              </SettingEl>
              {index===0 || index ===5 ? <BorderLine/> : <></>}
              </View>
            )
          })}
        </SettingArea>
      </SettingBody>
      <SettingBg source={setting_bg}/>
    </SafeAreaView>
  )
}

export default Setting


const SettingBody = styled.View`
  width:${size.width}px;
  padding:0 35px;
  justify-content:center;
  
`

const SettingBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const SettingHeader = styled.View`
  width:100%;
  height:50px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`

const ProfileArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:10px;
`

const ProfileImageArea = styled.View`
  background-color:#fff;
  border-radius:50%;
  width:56px;
  height:56px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const UserName = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain};
`

const EditButton = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`

const EditText  = styled.Text`
  font-size:14px;
  font-weight:500;
  color:${colors.gray70};
`

const SettingArea = styled.View`

`

const SettingEl = styled.TouchableOpacity`
  width:100%;
  display:flex;
  flex-direction:row;
  padding:15px 0;
`

const SettingTitle = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain80};
  flex-grow:1;
`

const BorderLine = styled.View`
  width:300px;
  height:.4px;
  background-color:${colors.fontMain};
  margin:10px 0;
`


