import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import CreateLoading from '../components/CreateLoading';
import styled from 'styled-components';

import complete_add_saving_bg from '../../../assets/complete_add_saving_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { size } from '../styles/size';
import MarginVertical from '../components/MarginVertical';
import mild_cloud_icon from '../../../assets/mild_cloud_icon.png';
import snowman_graphic from '../../../assets/snowman_graphic.png';
import { colors } from '../styles/colors';
import snow_flake_icon from '../../../assets/snowflak_icon.png';
import Button from '../components/Button';
import LinkIcon from '../components/LinkIcon';
import snowflake_white from '../../../assets/snow_flake_icon_white.png';
import { useNavigation } from '@react-navigation/native';

const CompleteAddSaving = () => {
  const [isCreateComplete, setIsCreateComplete] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setIsCreateComplete(true);
    }, 3000);
  }, [])
  

  return (
    <SafeAreaView>
      {!isCreateComplete
      ? <CreateLoading categoryText={"나만의 적금"}/>
      :
      <>
        <CompleteAddSavingBody>
          <CompleteAddSavingHeader>
            <View>
              <BackArrowButton/>
            </View>
          </CompleteAddSavingHeader>
          <MarginVertical top={55}/>
          <CompleteAddSavingTitleArea>
            <Image source={mild_cloud_icon} style={{width:48, height:34}}/>
            <MarginVertical top={18}/>
            <CompleteAddSavingTitle>지윤 님의{"\n"}영어 천재 적금이{"\n"}완성되었어요!</CompleteAddSavingTitle>
          </CompleteAddSavingTitleArea>
          <MarginVertical top={44}/>
          
          <SavingInfoArea>
            <ScrollView
              horizontal={true}
              >
              <View style={{marginLeft:30}}></View>
              <SavingInfoEl>
                <Image source={snowman_graphic} style={{width:138, height:138}}/>
                <MarginVertical top={20}/>
                <Image source={snow_flake_icon} style={{width:14, height:14}}/>
                <MarginVertical top={6}/>
                <SavingInfoText style={{color:colors.fontMain80}}>안녕하세요!{"\n"}만나서 기뻐요!</SavingInfoText>
              </SavingInfoEl>
              <SavingInfoEl>
                <View style={{display:'flex', width:200}}>
                  <Image source={snowman_graphic} style={{width:48, height:48}}/>
                  <MarginVertical top={15}/>
                  <SavingInfoText style={{color:colors.fontMain70, textAlign:'start'}}>일주일에{"\n"}5H 50M 씩, 12개월 동안</SavingInfoText>
                  <View style={{display:'flex', flexDirection:'row', gap:5}}>
                    <LinkIcon size={16}/>
                    <SavingInfoText style={{color:colors.fontMain70, textAlign:'start'}}>아침에는 영어 공부 루틴</SavingInfoText>
                  </View>
                  <SavingInfoText style={{color:colors.fontMain70, textAlign:'start'}}>으로 모아볼게요!</SavingInfoText>
                </View>
                <MarginVertical top={20}/>
                <View style={{width:216, height:.6, backgroundColor:"rgba(20, 36, 72, 0.4)"}}></View>
                <MarginVertical top={14}/>
                <View style={{width:200, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                  <SavingInfoText style={{color:"#959595"}}>TOTAL</SavingInfoText>
                  <Text style={{fontWeight:600, fontSize:22, color:colors.fontMain70}}>363H 50M</Text>
                </View>
                <View style={{width:200, display:'flex', alignItems:'flex-end'}}>
                  <Text style={{fontWeight:600, fontSize:22, color:colors.fontMain}}>+ 10,800P</Text>
                </View>
              </SavingInfoEl>
              <SavingInfoEl style={{backgroundColor:"rgba(106, 143, 246, 0.3)"}}>
                <Image source={snowman_graphic} style={{width:72, height:72}}/>
                <MarginVertical top={16}/>
                <Image source={snowflake_white} style={{width:14, height:14}}/>
                <MarginVertical top={6}/>
                <SavingInfoText style={{color:"#fff"}}>목표는{"\n"}영어 1000문장 말하기!</SavingInfoText>
                <MarginVertical top={30}/>
                <SavingInfoText style={{color:"#fff"}}>영어 천재 적금과{"\n"}소복이 모아볼게요!</SavingInfoText>
              </SavingInfoEl>
              <View style={{marginRight:50}}></View>
            </ScrollView>
          </SavingInfoArea>
          <View style={{zIndex:9, position:'absolute', bottom:100}}>
            <Button text={"시간 모으러 가기"} handleButton={() => navigation.navigate("Tabs")}/>
          </View>
        </CompleteAddSavingBody>
        <CompleteAddSavingBg source={complete_add_saving_bg}/>
      </>
      }
    </SafeAreaView>
  )
}

export default CompleteAddSaving


const CompleteAddSavingBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  display:flex;
  align-items:center;
`

const CompleteAddSavingBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const CompleteAddSavingHeader = styled.View`
  width:${size.width-50}px;
  height:50px;
  display:flex;
  justify-content:center;
`

const CompleteAddSavingTitleArea = styled.View`
  width:${size.width-80}px;
  display:flex;
`

const CompleteAddSavingTitle = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain90};
`

const SavingInfoArea = styled.View`

`

const SavingInfoEl = styled.View`
  width:240px;
  height:280px;
  background-color:#fff;
  border-radius:8px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-left:30px;

`

const SavingInfoText = styled.Text`
  text-align:center;
  font-size:18px;
  font-weight:600;
  line-height:24px;
`