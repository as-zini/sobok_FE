import { BlurView } from 'expo-blur'
import React from 'react'
import { View } from 'react-native'
import { size } from '../styles/size'
import styled from 'styled-components'

const BlurComponent = ({child}) => {
  return (
    <BlurComponentBody>
        <BlurView
          style={{flexGrow:1, width:"100%"}} // BlurView를 탭바 전체 크기로 확장
          intensity={100} // 블러 강도
          tint="light" // light, dark, default
        >
          {child()}
        </BlurView>
    </BlurComponentBody>
  )
}

export default BlurComponent

const BlurComponentBody = styled.View`
  width:${size.width}px;
  border-radius:16px;
  border:.5px solid rgba(204, 204, 204, 1);
`