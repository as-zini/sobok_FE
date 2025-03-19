import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-native-modal';
import { Image } from 'react-native';

import routine_pause_bg from '../../../assets/routine_pause_bg.png';
import { size } from '../styles/size';
import snowflake_icon from '../../../assets/snowflak_icon.png';
import DoubleButton from './DoubleButton';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';

import check_icon_indigo from '../../../assets/check_icon_indigo.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRoutine } from '../../hooks/useRoutine';
import { useNavigation } from '@react-navigation/native';

const SavingAlerteModal = ({isPauseModalVisible, setIsPauseModalVisible, }) => {
  const navigation = useNavigation();

  return (
    <Modal
      isVisible={isPauseModalVisible} 
      animationIn={'slideInUp'}
      animationInTiming={1000} 
      animationOut={'slideOutDown'} 
      animationOutTiming={1000}
      onBackdropPress={() => setIsPauseModalVisible(false)}
    >
      <RoutinePauseModalBody height={400}>
        <MaterialCommunityIcons name="bell-alert" size={36} color="#FF4848" />
        <MarginVertical top={15}/>
        <RoutinePauseModalTitle>비활성화 상태의{"\n"}적금입니다!</RoutinePauseModalTitle>
        <MarginVertical top={20}/>
        <RoutinePauseModalText>{"적금에 연결되어 있는\n루틴의 시간이 모자라요.\n새로운 루틴을 연결해야해요!"}</RoutinePauseModalText>
        <MarginVertical top={50}/>
        <DoubleButton
          text1={"새로운 루틴 만들기"} 
          text2={"기존 루틴 연결하기"} 
          handleLeftButton={() => {
            setIsPauseModalVisible(false);
            navigation.reset({
              routes:[{
                name:'StartAddAsset',
                params:{
                  version:"Routine"
                }
              }]
            })
          }}
          handleRightButton={() => {
            setIsPauseModalVisible(false);
            
          }}
        />
        <MarginVertical top={36}/>
      </RoutinePauseModalBody>
      <RoutinePauseModalBg source={routine_pause_bg} bottom={-20}/>
    </Modal>
  )
}

export default SavingAlerteModal


const RoutinePauseModalBody = styled.View`
  width:${size.width}px;
  height:${(props) => props.width}px;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  bottom:0;
  left:-20;
`

const RoutinePauseModalBg = styled.Image`
  position:absolute;
  bottom:${(props) => props.bottom}px;
  left:-20;
  z-index:-1;
  
`

const RoutinePauseModalTitle = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain};
  text-align:center;
  line-height:34px;
`

const RoutinePauseModalText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
  text-align:center;
  line-height:22px;
`

