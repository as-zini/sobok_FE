import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import setting_linked_app_bg from '../../../assets/home_bg.png';
import linked_app_icon from '../../../assets/linked_app_icon.png';
import styled from 'styled-components';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import speack_icon from '../../../assets/speak_icon.png';
import milli_icon from '../../../assets/milli_icon.png';
import Button from '../components/Button';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import TodoEl from '../components/TodoEl';
import { useNavigation } from '@react-navigation/native';
import { openApp } from '../components/Linking';
import * as Linking from 'expo-linking'
import check_icon_black from '../../../assets/check_icon_black.png';
import { useMyPage } from '../../hooks/useMyPage';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SettingLinkedApp = () => {
  const navigation = useNavigation();
  const linkedAppTitle = ["스픽", "말해보카", "Duolingo","산타", "Cake","야나두","Netflix","YouTube","교보eBook","예스24 eBook","밀리의서재","윌라","Class101","Udemy","Notion","Goodnotes","HelloLMS","LearninX student","메가스터디 스마트러닝","대성마이맥 Player","이투스 수강앱-Smart Study","Planfit","Nike Run Club","Fleek","Melon","spotify","YouTubeMusic","지니뮤직","FLO"];
  const linkedAppImg = [speack_icon, milli_icon];
  const appListTitle = ["스픽", "말해보카", "Duolingo","산타", "Cake","야나두","Netflix","YouTube","교보eBook","예스24 eBook","밀리의서재","윌라","Class101","Udemy","Notion","Goodnotes","HelloLMS","LearninX student","메가스터디 스마트러닝","대성마이맥 Player","이투스 수강앱-Smart Study","Planfit","Nike Run Club","Fleek","Melon","spotify","YouTubeMusic","지니뮤직","FLO"];
  const appListImg = [speack_icon, milli_icon];
  const [isAppList, setIsAppList] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [todoData, setTodoData] = useState([["영어 강의 1강", "스픽", "1H 30M", "06:00 - 07:30"],["영어 단어 10개 암기", "말해보카","1H 00M", "08:00 - 09:00"]])
  const [selectedApp, setSelectedApp] = useState("");
  const {getUserLinkedApp, handleSetLinkedApp} = useMyPage()
  const [myLinkedAppList, setMyLinkedAppList] = useState([]);
  const [addLinkedAppList, setAddLinkedAppList] = useState([]);

  useEffect(() => {
    getUserLinkedApp(setMyLinkedAppList)
  }, [])
  

  const LinkedTodoList = () => {
    return(
      <>
        <View>
          <SnowFlakeIcon color={"indigo"} size={16}/>
          <MarginVertical top={11}/>
          <Text style={{fontSize:22, fontWeight:600, color:colors.fontMain80}}>{selectedApp}</Text>
          <MarginVertical top={33}/>
        </View>
        <View>
        <ScrollView>
          {todoData.map((el, index) => {
            return(
              <TouchableOpacity key={index}>
                <TodoEl data={el} index={index}/>
                <MarginVertical top={35}/>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        </View>
        
      </>
    )

  }

  useEffect(() => {
    console.log([...myLinkedAppList,...addLinkedAppList])
  }, [addLinkedAppList])
  

  const handleAddLinkButton = () => {
    
    handleSetLinkedApp([...myLinkedAppList,...addLinkedAppList])
  }

  return (
    <SafeAreaView>
      <SettingLinkedAppBody>
        <SettingLinkedAppHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <SettingLinkedAppHeaderText>연동 설정</SettingLinkedAppHeaderText>
        </SettingLinkedAppHeader>
        <MarginVertical top={36}/>
        <Image source={linked_app_icon} style={{width:40, height:40}}/>
        <MarginVertical top={16}/>
        <SettingLinkedAppTitle>{isAppList ? "무슨 앱을\n연결할까요?" : showTodoList ? "어떤 할 일과\n연결할까요?" : "연동 앱"}</SettingLinkedAppTitle>
        <MarginVertical top={16}/>
        <SettingLinkedAppText>{isAppList ? "연동하고 싶은 앱을 선택해주세요!" : showTodoList ? `${selectedApp}을 할 일과 연결하면\n자동으로 이동해요!`:"할 일을 자동으로 시작할 수 있도록\n앱을 연동시킬 수 있어요!"}</SettingLinkedAppText>
        <MarginVertical top={showTodoList ? 10:56}/>
        <SettingLinkedAppCount>{isAppList ? `총 ${linkedAppTitle.length}개의 앱` : showTodoList ? null : `총 ${myLinkedAppList?.length}개의 연동 앱`}</SettingLinkedAppCount>
        <MarginVertical top={13}/>
        <ScrollView style={{height:330}} showsVerticalScrollIndicator={false}>
          <SettingLinkedAppContentsArea>
            {isAppList ? 
            appListTitle.map((el,index) => {
              return(
                
                <LinkedAppEl key={index} onPress={() => {
                  setAddLinkedAppList(prev => [...prev, el])
                }}>
                
                  <LinkedAppImg source={isAppList ? appListImg[index] : linkedAppImg[index]}/>
                  <LinkedAppTitle>{el}</LinkedAppTitle>
                  {myLinkedAppList.includes(el) || addLinkedAppList.includes(el)? 
                  <Fontisto name="check" size={12} color={colors.fontMain} />
                  :
                  <></>
                  }
                  </LinkedAppEl>
              )
            })
            : showTodoList ?
            <LinkedTodoList/>
            :
            myLinkedAppList?.map((el, index) => {
              return(
                <LinkedAppEl key={index} onPress={() => {setSelectedApp(el);setShowTodoList(true)}}>
                  <LinkedAppImg source={isAppList ? appListImg[index] : linkedAppImg[index]}/>
                  <LinkedAppTitle>{el}</LinkedAppTitle>
                  <TouchableOpacity onPress={() => {setSelectedApp(el);setShowTodoList(true)}}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#4c4c4c" />
                  </TouchableOpacity>
                </LinkedAppEl>
              )
            })}
          </SettingLinkedAppContentsArea>

        </ScrollView>
        <View><Button text={showTodoList ? "완료하기" : isAppList ? '연동하기' :"연동앱 추가하기"} handleButton={() => {
          showTodoList ? navigation.navigate("Setting") : isAppList ? handleAddLinkButton(): setIsAppList(true)}}/></View>
      </SettingLinkedAppBody>
      <SettingLinkedAppBg source={setting_linked_app_bg}/>
    </SafeAreaView>
  )
}

export default SettingLinkedApp


const SettingLinkedAppBody = styled.View`
  width:${size.width}px;
  display:flex;
  justify-content:center;
  padding:0 40px;
`

const SettingLinkedAppBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const SettingLinkedAppHeader = styled.View`
  display:flex;
  flex-direction:row;
  height:50px;
  justify-content:center;
  align-items:center;
`

const SettingLinkedAppHeaderText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.darkGray};
`

const SettingLinkedAppTitle = styled.Text`
  font-weight:600;
  font-size:34px;
  color:${colors.fontMain};
  line-height:44px;
`

const SettingLinkedAppText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain70};
  line-height:26px;
`

const SettingLinkedAppContentsArea = styled.View`

`

const SettingLinkedAppCount = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain60};
`

const LinkedAppEl = styled.TouchableOpacity`
  width:310px;
  height:70px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:10px;
`

const LinkedAppImg = styled.Image`
  border-radius:50%;
  width:40px;
  height:40px;
`

const LinkedAppTitle = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#343434;
  flex-grow:1;
`
