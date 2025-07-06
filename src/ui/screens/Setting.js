import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import styled from '@emotion/native'
import { size } from '../styles/size'

import setting_bg from '../../../assets/setting_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import snowman_graphic from '../../../assets/snowman_graphic.png';
import NavigateArrowButton from '../components/NavigateArrowButton';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RoutinePauseModal from '../components/RoutinePauseModal';

const Setting = () => {
  const settingCategory = ["연동 설정","지원 문의" ,"약관 및 개인정보 처리 동의", "앱 버전"]
  const goToCategory = ["LinkedApp", "Assistance", "TermList", "Version"];
  const navigation = useNavigation();
  const {userInfo} = useUserInfoStore();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <SettingBody>
        <SettingHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.darkGray}}>설정</Text>
        </SettingHeader>
        <MarginVertical top={35}/>
        <ProfileArea>
          <ProfileImageArea>
            <Image source={snowman_graphic} style={{width:40, height:40}}/>
          </ProfileImageArea>
          <View>
            <UserName>{userInfo.displayName}</UserName>
            <EditButton onPress={() => navigation.navigate("SettingAccountList")}>
              <EditText>계정 설정</EditText>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#4c4c4c" />
            </EditButton>
          </View>
        </ProfileArea>
        <MarginVertical top={12}/>
        <SettingArea>
          {settingCategory.map((el, index) => {
            return(
              <View key={index}>
              <SettingEl>
                <SettingTitle>{el}</SettingTitle>
                <TouchableOpacity onPress={() => navigation.navigate(`Setting${goToCategory[index]}`)} style={{width:60,height:70,display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="#4c4c4c" />
                </TouchableOpacity>
              </SettingEl>
              {index===0 ? <BorderLine/> : <></>}
              </View>
            )
          })}
        </SettingArea>
        <MarginVertical top={30}/>
        <LogoutArea>
          <TouchableOpacity onPress={() => setIsLogoutModalVisible(true)}>
            <LogoutText>로그아웃</LogoutText>
          </TouchableOpacity>
        </LogoutArea>
        <RoutinePauseModal isPauseModalVisible={isLogoutModalVisible} setIsPauseModalVisible={setIsLogoutModalVisible} version={"Logout"}/>
      </SettingBody>
      <SettingBg source={setting_bg}/>
    </SafeAreaView>
  )
}

export default Setting


const SettingBody = styled.View`
  width:${() => `${size.width}px`};
  padding:0 35px;
  justify-content:center;
  
`

const SettingBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
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
  border-radius:28px;
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

const SettingEl = styled.View`
  width:100%;
  display:flex;
  flex-direction:row;
  align-items:center;
`

const SettingTitle = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain80};
  flex-grow:1;
`

const BorderLine = styled.View`
  width:${() => `${size.width-70}px`};
  height:.4px;
  background-color:${colors.fontMain};
  margin:10px 0;
`

const LogoutArea = styled.View`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`

const LogoutText = styled.Text`
  font-size:14px;
  color:#707172;

`


