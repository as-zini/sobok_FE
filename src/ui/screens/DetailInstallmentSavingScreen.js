import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import installment_icon from '../../../assets/save_icon.png';
import MarginVertical from '../components/MarginVertical';
import { Image, ScrollView, SectionList, Text, View } from 'react-native';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import LinkIcon from '../components/LinkIcon';
import ShortAlertArea from '../components/ShortAlertArea';
import DoubleButton from '../components/DoubleButton';
import ProgressBar from '../components/ProgressBar';
import { BlurView } from 'expo-blur';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import AssetEl from '../components/AssetEl';
import CalandarModal from '../components/CalandarModal';

const DetailInstallmentSavingScreen = () => {
  const [isCalandarModalVisible, setIsCalandarModalVisible] = useState(false);

  const Data = [
    {
      title:["2월 6일 - 2월 13일"],
      data:[["5회차", "09:00", "1H 30M", "7H 30M"]]
    },{
      title:["1월 30일 - 2월 5일"],
      data:[["4회차", "09:00", "1H 30M", "6H 30M"]]
    },{
      title:["1월 23일 - 1월 29일"],
      data:[["3회차", "09:00", "1H 30M", "4H 30M"]]
    }
  ]

  const ListHeader = ({title}) => {
    return(
      <>
        <Text style={{color:"#707172", fontWeight:500, fontSize:14}}>{title}</Text>
        <MarginVertical top={20}/>
      </>
    )
  }

  const LenderItem = ({item, index}) => {
    return(
      <>
        <AssetEl item={item} index={index} isLink={false}/>
        <MarginVertical top={40}/>
      </>
    )
  }

  const BlurChild = () => {
    return(
      <View style={{paddingHorizontal:30, paddingVertical:40}}>
        <View style={{display:'flex', flexDirection:'row', gap:4}}>
          <SettingPeriodText>2024.08 - 2024.10</SettingPeriodText>
          <DropDownArrowButton size={16} handleArrowButton={() => setIsCalandarModalVisible(true)}/>
        </View>
        <MarginVertical top={32}/>
        <SectionList
            sections={Data}
            keyExtractor={(item, index) => item + index}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <LenderItem item={item} index={index}></LenderItem>
            )}
            renderSectionHeader={({section: {title}}) => (
              <ListHeader title={title}/>
            )}
          >
        </SectionList>
      </View>
    )
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
      <DetailInstallmentSavingBody>
        <MarginVertical top={20}/>
        <DetailInstallmentSavingHeader>
          <View style={{position:'absolute', left:20}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.fontSub}}>적금</Text>
        </DetailInstallmentSavingHeader>
        <MarginVertical top={47}/>
        <SavingIntroArea>
          <Image source={installment_icon} style={{width:48, height:34}}/>
          <MarginVertical top={18}/>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}}>
            <LinkIcon size={16}/>
            <LinkedRoutineText>아침에는 영어 공부</LinkedRoutineText>
          </View>
          <MarginVertical top={5}/>
          <TotalSavingTitle>7H 30M</TotalSavingTitle>
          <MarginVertical top={32}/>
          <InterestText>연 3.8%</InterestText>
          <PushPeriodText>매주 1H 30M</PushPeriodText>
        </SavingIntroArea>
        <MarginVertical top={24}/>
        
        <ShortAlertArea text={"3개월 남았어요!"} width={114} height={30}/>
        {/* 기간바 */}
        <MarginVertical top={36}/>
        <ProgressBar/>
        <MarginVertical top={48}/>
        <DoubleButton text1={"연결 루틴 관리"} text2={"채우기"}/>
        <MarginVertical top={40}/>
        <BlurComponent child={BlurChild}/>
      </DetailInstallmentSavingBody>
      <CalandarModal isCalandarModalVisible={isCalandarModalVisible} setIsCalandarModalVisible={setIsCalandarModalVisible} />
      </ScrollView>
      <DetailInstallmentSavingBg source={installment_saving_bg}/>
    </SafeAreaView>
  )
}

export default DetailInstallmentSavingScreen;

const DetailInstallmentSavingBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  width:${size.width}px;
  height:1000px;
`

const DetailInstallmentSavingBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const DetailInstallmentSavingHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:${size.width};
`

const SavingIntroArea = styled.View`
  width:310px;
`

const LinkedRoutineText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain90};
`

const TotalSavingTitle = styled.Text`
  font-size:48px;
  font-weight:600;
  color:${colors.fontMain};
`

const InterestText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:${colors.fontMain70};
  line-height:24px;
`

const PushPeriodText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:${colors.fontMain70};
  line-height:25px;
`



const SettingPeriodText = styled.Text`
  color:#4A5660;
  font-weight:600;
  font-size:16px;
`





