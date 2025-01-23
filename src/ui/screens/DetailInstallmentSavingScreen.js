import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import installment_icon from '../../../assets/save_icon.png';
import MarginVertical from '../components/marginVertical';
import { Image, Text, View } from 'react-native';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import LinkIcon from '../components/LinkIcon';

const DetailInstallmentSavingScreen = () => {
  return (
    <SafeAreaView>
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
          <TotalSavingTitle>18H 30M</TotalSavingTitle>
        </SavingIntroArea>
      </DetailInstallmentSavingBody>
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

