import React from 'react'
import { Dimensions, SafeAreaView, Text } from 'react-native'
import styled from 'styled-components'

import create_loading_bg from '../../../assets/create_loading_bg.png';
import cloud_icon from '../../../assets/cloud_icon.png';
import snowflak_icon from '../../../assets/snowflak_icon.png';
import { colors } from '../styles/colors';

const width=Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CreateLoading = ({categoryText, marginTop}) => {
  return (
    <SafeAreaView>
      <CreateLoadingBody>
        <LoadingCloundIcon source={cloud_icon} style={{marginTop:120}}/>
        <LoadingSnowFlackIcon source={snowflak_icon}/>
        <PercentageText>14%</PercentageText>
        <LoadingTitle>{`${categoryText}\n만드는중`}</LoadingTitle>
        <LoadingText>{"조금만 기다리면\n지윤 님만의 맞춤 루틴 완성!"}</LoadingText>
      </CreateLoadingBody>
      <CreateLoadingBg source={create_loading_bg}/>
    </SafeAreaView>
  )
}

export default CreateLoading

const CreateLoadingBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

const CreateLoadingBg = styled.Image`
  position:absolute;
  top:0;
  width:${width}px;
  height:${height}px;
  z-index:-1;
`

const LoadingCloundIcon = styled.Image`
  width:87px;
  height:60px;
  margin-bottom:12px;
`

const LoadingSnowFlackIcon = styled.Image`
  width:28px;
  height:29px;
  margin-bottom:44px;
`

const PercentageText = styled.Text`
  font-size:32px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:70px;
`

const LoadingTitle = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
  text-align:center;
  margin-bottom:24px;
`

const LoadingText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  text-align:center;
`