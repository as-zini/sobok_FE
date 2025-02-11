import React, { useEffect } from 'react'
import { Image, SafeAreaView, View } from 'react-native'

import bg from '../../../assets/installment_saving_bg.png';
import styled from 'styled-components';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import icon from '../../../assets/double_circle_icon.png';
import MarginVertical from '../components/MarginVertical';
import AssetEl from '../components/AssetEl';
import { minToHour } from '../../util';

const ViewLinkedRoutine = ({route}) => {
  const {title, routines} = route.params;
  useEffect(() => {
    console.log(title, routines)
  }, [])
  

  return (
    <SafeAreaView>
      <ViewLinkedRoutineBody>
        <BackArrowButton/>
        <MarginVertical top={50}/>
        <Image source={icon} style={{width:46, height:30}}/>
        <MarginVertical top={25}/>
        <LinkedRoutineText>연결 루틴</LinkedRoutineText>
        <MarginVertical top={5}/>
        <LinkedRoutineTitle>{title}</LinkedRoutineTitle>
        <MarginVertical top={60}/>
        <LinkedRoutineCount>{`총 ${routines.length}개의 루틴`}</LinkedRoutineCount>
        <MarginVertical top={40}/>
        {routines.map((el, index) =>
          <View key={index}>
            <AssetEl item={[el.title, "", minToHour(el.duration), `${el.startTime.slice(0,5)} - ${el.endTime.slice(0,5)}`]} index={index} isLink={false} category={"Routine"}/>
            <MarginVertical top={55}/>
          </View>)}
      </ViewLinkedRoutineBody>
      <ViewLinkedRoutineBg source={bg}/>
    </SafeAreaView>
  )
}

export default ViewLinkedRoutine


const ViewLinkedRoutineBody = styled.View`
  width:${size.width}px;
  padding:15px 30px;
`

const ViewLinkedRoutineBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const LinkedRoutineText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
`

const LinkedRoutineTitle = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain};
  line-height:36px;
`

const LinkedRoutineCount = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.darkGray};
`

