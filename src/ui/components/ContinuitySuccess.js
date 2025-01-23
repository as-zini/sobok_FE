import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

import continuity_bg from '../../../assets/continuity_bg.png';
import snow_flake_icon_white from '../../../assets/snow_flake_icon_white.png';

const ContinuitySuccess = () => {
  return (
    <View>
    <ContinuitySuccessBody>
      <ContinuitySuccessIcon source={snow_flake_icon_white}/>
      <ContinuitySuccessText>
        8일
      </ContinuitySuccessText>
    </ContinuitySuccessBody>
    <ContinuitySuccessBg source={continuity_bg}/>
    </View>
  )
}

export default ContinuitySuccess

const ContinuitySuccessBody = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:72px;
  height:30px;
  gap:5px;
`

const ContinuitySuccessBg = styled.Image`
  position:absolute;
  top:0;
  z-index:0;
`

const ContinuitySuccessIcon = styled.Image`
  width:16px;
  height:16px;
  z-index:1;
`

const ContinuitySuccessText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:#fff;
  z-index:1;

`