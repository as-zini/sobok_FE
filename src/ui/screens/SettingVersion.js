import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from '@emotion/native'
import { size } from '../styles/size'
import bg from '../../../assets/versionBg.png';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import MarginVertical from '../components/MarginVertical';

const SettingVersion = () => {
  return (
    <SafeAreaView>
      <Body>
        <SnowFlakeIcon size={56} color={"white"}/>
        <MarginVertical top={15}/>
        <MarginVertical top={30}/>
        <Text>{`앱 버전
1.0.0
(최신버전이에옹~)`}</Text>
        <Text style={{fontSize:12, position:'absolute', bottom:120}}>Copyright ⓒ SOBOK. All rights reserved.</Text>
      </Body>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default SettingVersion

const Body = styled.View`
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  padding:0 30px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const Bg = styled.Image`
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  z-index:-1;
  position:absolute;
  top:0;

`

const Text = styled.Text`
  color:#fff;
  font-size:18px;
  font-weight:500;
  text-align:center;
  line-height:26px;
`
