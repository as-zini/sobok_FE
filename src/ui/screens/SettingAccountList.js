import React from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import styled from '@emotion/native'
import { size } from '../styles/size'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import snowman from '../../../assets/snowman_graphic.png';
import { useUserInfoStore } from '../../store/user';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import bg from "../../../assets/settingAccountBg.jpg"


const SettingAccountList = () => {
  const {userInfo, setUserInfo} = useUserInfoStore();
  const categoryArr = ["비밀번호", "생년월일","이메일 주소","휴대폰 번호"]
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Body>
        <Header>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', position:'absolute', left:0}} onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <HeaderText>계정설정</HeaderText>
        </Header>
        <MarginVertical top={70}/>
        <ProfileArea>
          <ProfileImg source={snowman}/>
          <MarginVertical top={20}/>
          <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
            <ProfileName>{`${userInfo.displayName} 님`}</ProfileName>
            <EditButton>
              <MaterialIcons name="edit" size={24} color="rgba(20, 36, 72, 0.3)" />
            </EditButton>
          </View>
        </ProfileArea>
        <MarginVertical top={70}/>
        {categoryArr.map((el,index) => {
          return(
          <CategoryEl key={index}>
            <CategoryName>{el}</CategoryName>
            <RightArrowButton onPress={() => navigation.navigate("SettingAccount",{version:index, title:el})}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#959595" />
            </RightArrowButton>
          </CategoryEl>
          )
        })}
        <View style={{position:'absolute', bottom:140}}>
          <Button text={"확인"}/>
        </View>
      </Body>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default SettingAccountList

const Body = styled.View`
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  padding:0 30px;
  display:flex;
  align-items:center;
`

const Bg = styled.Image`
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
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

const HeaderText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#fff;
`

const ProfileArea = styled.View`

`

const ProfileImg = styled.Image`
  width:90px;
  height:90px;
  border-radius: 45px;
  background-color:#fff;
  padding:20px;
`

const ProfileName = styled.Text`
  font-size:26px;
  color:#fff;
  font-weight:600;
`

const EditButton = styled.TouchableOpacity`

`

const CategoryEl = styled.View`
  width:100%;
  height:60px;
  display:flex;
  flex-direction:row;
  align-items:center;
`

const CategoryName = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain80};
  flex-grow:1;
`

const RightArrowButton = styled.TouchableOpacity`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:20px;
`
