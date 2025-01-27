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
import DoubleButton from '../components/DoubleButton';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import AssetEl from '../components/AssetEl';
import CalandarModal from '../components/CalandarModal';
import routine_icon from '../../../assets/routine_icon.png';
import trash_icon from '../../../assets/trash_icon.png';
import snow_flake_icon_white from '../../../assets/snow_flake_icon_white.png';
import RoutinePauseModal from '../components/RoutinePauseModal';

const DetailRoutineScreen = () => {
  const [isPauseModalVisible, setIsPauseModalVisible] = useState(false);

  const Data = [
    {
      title:"1번째",
      data:[["영어 강의 1강", "스픽", "1H 00M", "6:00 - 7:00"]]
    },{
      title:"2번쪠",
      data:[["영어 강의 2강", "스픽", "1H 30M", "7:00 - 8:30"]]
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
        <AssetEl item={item} index={index} isLink={true} category={"Todo"}/>
        <MarginVertical top={40}/>
      </>
    )
  }

  const BlurChild = () => {
    return(
      <View style={{paddingHorizontal:30, paddingVertical:40}}>
        <View style={{display:'flex', flexDirection:'row', gap:4}}>
          <TotalRoutineCount>총 2개의 할 일</TotalRoutineCount>
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
    <>
    <SafeAreaView>
      <ScrollView>
      <DetailInstallmentSavingBody>
        <MarginVertical top={20}/>
        <DetailInstallmentSavingHeader>
          <View style={{position:'absolute', left:20}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.fontSub}}>아침에는 영어 공부 루틴</Text>
        </DetailInstallmentSavingHeader>
        <MarginVertical top={47}/>
        <SavingIntroArea>
          <Image source={routine_icon} style={{width:51, height:33}}/>
          <MarginVertical top={18}/>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}}>
            <LinkIcon size={16}/>
            <LinkedRoutineText>영어 적금</LinkedRoutineText>
          </View>
          <MarginVertical top={5}/>
          <TotalSavingTitle>7H 30M</TotalSavingTitle>
          <MarginVertical top={32}/>
          <InterestText>월, 수, 금</InterestText>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <PushPeriodText style={{flexGrow:1}}>오전 6:00 - 7:30</PushPeriodText>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:8}}>
              <View style={{width:8, height:8, borderRadius:'50%', backgroundColor:colors.indigoBlue}}></View>
              <PushPeriodText>진행중</PushPeriodText>
            </View>
          </View>
        </SavingIntroArea>
        <MarginVertical top={40}/>
        <DoubleButton text1={"루틴 수정하기"} text2={"루틴 보류하기"} handleRightButton={() => setIsPauseModalVisible(true)}/>
        
        <MarginVertical top={40}/>
        
        <BlurComponent child={BlurChild}/>
        <RoutinePauseModal isPauseModalVisible={isPauseModalVisible} setIsPauseModalVisible={setIsPauseModalVisible} version={"Routin"}/>
      </DetailInstallmentSavingBody>
      
      </ScrollView>
      
      <DetailInstallmentSavingBg source={installment_saving_bg}/>
      
    </SafeAreaView>
    <RoutineCompleteBar>
      <RoutineCompleteBg />
      <CompleteIcon source={snow_flake_icon_white}/>
      <CompleteBarText>완료하기</CompleteBarText>
  </RoutineCompleteBar>
  </>
  )
}

export default DetailRoutineScreen;

const DetailInstallmentSavingBody = styled.View`
  display:flex;
  align-items:center;
  width:${size.width}px;
  z-index:1;
  margin-bottom:30px;
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



const TotalRoutineCount = styled.Text`
  color:#707172;
  font-weight:600;
  font-size:20px;
`

const RoutineCompleteBar = styled.View`
  position:absolute;
  bottom:0;
  width:${size.width}px;
  height:110px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:white;
  
`

const RoutineCompleteBg = styled.TouchableOpacity`
  z-index:1;
  
  background-color:${colors.indigoBlue50};
  width:100%;
  height:100%;
  position:absolute;
  top:0;
`

const CompleteIcon = styled.Image`
  width:20px;
  height:20px;
  margin-bottom:10px;
  z-index:2;
`

const CompleteBarText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#fff;
  z-index:2;
`







