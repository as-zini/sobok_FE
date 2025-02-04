import React from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../styles/colors'

import mypage_bg from '../../../assets/home_bg.png';
import setting_icon from '../../../assets/setting_icon.png';
import snowman_graphic from '../../../assets/snowman_graphic.png';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import { size } from '../styles/size';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';

const MyPage = () => {
  const categoryText = ["총 시간", "연속 달성일", "포인트", "적금"];
  const categoryValue = ["52H 14M", "58일", "5,824P", "3개"];
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <MyPageBody>
        <MyPageHeader>
          <View style={{flexGrow:.04}}>
            <SnowFlakeIcon color={'indigo'} size={16}/>
          </View>
          <ContinuitySuccessText>8일</ContinuitySuccessText>
          <SettingButton onPress={() => navigation.navigate("Setting")}>
            <Image source={setting_icon} style={{width:24, height:24}}/>
          </SettingButton>
        </MyPageHeader>
        <ProfileArea>
          <ProfileImageArea>
            <Image source={snowman_graphic} style={{width:40, height:40}}/>
          </ProfileImageArea>
          <MarginVertical top={12}/>
          <MyPageTitle>{`안녕하세요,\n지윤 님`}</MyPageTitle>
          <MarginVertical top={15}/>
          <MyPageText>오늘도 소복이{"\n"}시간을  쌓아볼까요?</MyPageText>
        </ProfileArea>
        <MarginVertical top={48}/>
        <MyInfoArea>
          <View style={{display:'flex', justifyContent:'center',alignItems:'center', gap:10}}>
            <SnowFlakeIcon color={"indigo"} size={16}/>
            <VerticalBorderLine/>
          </View>
          <MarginVertical top={10}/>
          <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
            {categoryText.map((el, index) => {
              return(
                <InfoEl key={index}>
                  <InfoText>{el}</InfoText>
                  <InfoText style={{fontSize:26}}>{categoryValue[index]}</InfoText>
                </InfoEl>
              )
            })}
            
          </View>
        </MyInfoArea>
        <BorderLine/>
        
      </MyPageBody>
      <MyPageBg source={mypage_bg}/>
    </SafeAreaView>
  )
}

export default MyPage

const MyPageBody = styled.View`
  width:${size.width}px;
  padding:0 36px;
  display:flex;
  justify-content:center;
`

const MyPageBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const MyPageHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  height:70px;
`

const ContinuitySuccessText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  flex-grow:1;
`

const SettingButton = styled.TouchableOpacity`

`


const ProfileArea = styled.View`

`

const ProfileImageArea = styled.View`
  width:56px;
  height:56px;
  border-radius:50%;
  background-color:#fff;
  display:flex;
  justify-content:center;
  align-items:center;
`

const MyPageTitle = styled.Text`
  font-weight:600;
  font-size:34px;
  color:${colors.fontMain};
  line-height:44px;
`

const MyPageText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain70};
  line-height:26px;
`

const MyInfoArea = styled.View`
  width:300px;
  display:flex;
  align-items:flex-start;
`

const VerticalBorderLine = styled.View`
  height:26px;
  width:.8px;
  background-color:${colors.darkGray};
`

const BorderLine = styled.View`
  width:300px;
  height:.5px;
  background-color:${colors.fontMain80};
`

const InfoEl = styled.View`
  width:150px;
  display:flex;
  gap:3px;
  margin-bottom:40px;
`

const InfoText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain90};
  line-height:28px;
`