import React from 'react'
import { Image, SafeAreaView, SectionList, Text, View } from 'react-native'
import styled from 'styled-components'

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import link_icon from '../../../assets/link_icon.png';
import installment_icon from '../../../assets/save_icon.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import MarginVertical from '../components/marginVertical';
import StepNumber from '../components/StepNumber';
import LinkIcon from '../components/LinkIcon';
import { useNavigation } from '@react-navigation/native';

const ViewInstallmentSavingScreen = () => {
  const navigation = useNavigation();

  const Data = [
    {
      title:["진행 중인 적금", 3],
      data:[["영어 천재 적금", "아침에는 영어 공부","1H 25M","D-120"], ["독서 적금", "저녁에는 독서","2H 50M","D-77"]]
    },{
      title:["만기된 적금",3],
      data:[["프랑스어 적금", "프랑스어 공부 루틴", "30M","D-1"]]
    }
  ]

  const RenderItem = ({item, index}) => {
    return(
      <>
      <SavingEl onPress={() => navigation.navigate('DetailSave')}>
        <View style={{flexGrow:.2}}>
          <StepNumber step={index+1}/>
        </View>
        <View style={{display:'flex', flexGrow:1}}>
          <SavingTitle>{item[0]}</SavingTitle>
          <MarginVertical top={7}/>
          <View style={{display:'flex', flexDirection:'row', gap:5}}>
            <LinkIcon size={16}/>
            <LinkedRoutineTitle LinkedRoutineTitle>{item[1]}</LinkedRoutineTitle>
          </View>
        </View>
        <View style={{display:'flex', alignItems:'flex-end'}}>
          <SavingTime>{item[2]}</SavingTime>
          <MarginVertical top={7}/>
          <SavingAtFinish>{item[3]}</SavingAtFinish>
        </View>
      </SavingEl>
      <MarginVertical top={50}/>
      </>
    )
  }

  const ListHeader = ({title}) => {

    return(
      <>
      {title[0] === "만기된 적금" ? <View style={{width:310, height:.8, backgroundColor:"white", zIndex:9, marginBottom:30}}></View> : <></>}
      <SectionEl>
        <SectionTitle>{title[0]}</SectionTitle>
        <SectionCountText>{title[1]}</SectionCountText>
      </SectionEl>
      </>
    )
  }
  
  return (
    <SafeAreaView>
      <ViewInstallmentSavingBody>
        <MarginVertical top={20}/>
        <ViewInstallmentSavingHeader>
          <View style={{position:'absolute', left:20}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.fontSub}}>적금</Text>
        </ViewInstallmentSavingHeader>
        <MarginVertical top={47}/>
        <TotalSavingArea>
          <Image source={installment_icon} style={{width:48, height:34}}/>
          <MarginVertical top={18}/>
          <TotalSavingText>총 5개의 적금</TotalSavingText>
          <MarginVertical top={5}/>
          <TotalSavingTitle>18H 30M</TotalSavingTitle>
        </TotalSavingArea>
        <MarginVertical top={72}/>
        <SectionList
          sections={Data}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index}></RenderItem>
          )}
          renderSectionHeader={({section: {title}}) => (
            <ListHeader title={title}/>
          )}
        
        >

        </SectionList>
      </ViewInstallmentSavingBody>
      <ViewInstallmentSavingBg source={installment_saving_bg}/>
    </SafeAreaView>
  )
}

export default ViewInstallmentSavingScreen


const ViewInstallmentSavingBody = styled.View`
  width:${size.width}px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ViewInstallmentSavingHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:${size.width};
`

const ViewInstallmentSavingBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const TotalSavingArea = styled.View`
  width:310px;
`

const TotalSavingText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain90};
`

const TotalSavingTitle = styled.Text`
  font-size:48px;
  font-weight:600;
  color:${colors.fontMain};
`

const SectionEl = styled.View`
  display:flex;
  flex-direction:row;
  gap:4px;
  margin-bottom:35px;
`

const SectionTitle = styled.Text`
  font-size:16px;
  font-weight:600;
  color:#707172;
`

const SectionCountText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${colors.indigoBlue};
`

const SavingEl = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:310px;
`

const SavingTitle = styled.Text`
  font-size:16px;
  font-weight:600;
  color:#343434;
`

const LinkedRoutineTitle = styled.Text`
  font-size:12px;
  font-weight:500;
  color:#707172;
`

const SavingTime = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${colors.indigoBlue}
`

const SavingAtFinish = styled.Text`
font-size:12px;
font-weight:500;
color:#707172;
`





