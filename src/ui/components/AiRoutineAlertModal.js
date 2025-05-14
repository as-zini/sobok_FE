import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-native-modal';
import { Image, View } from 'react-native';

import ai_routine_alert_bg from '../../../assets/ai_routine_alert_bg.png';
import { size } from '../styles/size';
import snowflake_icon from '../../../assets/snowflak_icon.png';
import DoubleButton from './DoubleButton';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';
import alert_icon from '../../../assets/alert_icon.png';

import check_icon_indigo from '../../../assets/check_icon_indigo.png';
import { useRoutine } from '../../hooks/useRoutine';
import { useNavigation } from '@react-navigation/native';

const AiRoutineAlertModal = ({isPauseModalVisible, setIsPauseModalVisible}) => {
  const [isReturn, setIsReturn] = useState(false);
  const {handleRoutineSuspend} = useRoutine();
  const {getRoutineDetail} = useRoutine();
  const navigation = useNavigation()

  return (
    <Modal
      isVisible={isPauseModalVisible} 
      animationIn={'slideInUp'}
      animationInTiming={1000} 
      animationOut={'slideOutDown'} 
      animationOutTiming={1000}
      onBackdropPress={() => setIsPauseModalVisible(false)}
      
    >
      <RoutinePauseModalBody>
        <Image source={alert_icon}/>
        <MarginVertical top={14}/>
        <ModalTitle>
          {"이미 맞춤 검사를\n진행하셨나요?"}
        </ModalTitle>
        <MarginVertical top={27}/>
        <ModalText>
          {"새롭게 맞춤 검사를 진행하면\n기존의 맞춤 검사 데이터는\n사라집니다!"}
        </ModalText>
        <MarginVertical top={20}/>
        <View style={{width:10, height:10, backgroundColor:colors.indigoBlue, borderRadius:'50%'}}></View>
        <MarginVertical top={20}/>
        <ModalText style={{color:colors.fontMain80}}>
          새로운 맞춤 검사를 진행할까요?
        </ModalText>
        <MarginVertical top={35}/>
        <DoubleButton text1={"그만두기"} text2={"진행하기"}
          handleLeftButton={() => {setIsPauseModalVisible(false);navigation.navigate('Tabs')}}
          handleRightButton={() => {setIsPauseModalVisible(false);navigation.navigate('TestStart')}}/>
        <MarginVertical top={30}/>
        <RoutinePauseModalBg source={ai_routine_alert_bg} bottom={isReturn ? -80 : -20}/>
      </RoutinePauseModalBody>
      
    </Modal>
  )
}

export default AiRoutineAlertModal


const RoutinePauseModalBody = styled.View`
  width:${size.width}px;
  height:${(props) => props.width}px;
  display:flex;
  align-items:center;
  position:absolute;
  bottom:0;
  
  left:-20;
`

const RoutinePauseModalBg = styled.Image`
  position:absolute;
  bottom:${(props) => props.bottom}px;
  width:100%;
  z-index:-1;
  border-radius:20px;
  
`

const ModalTitle = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain};
  text-align:center;
  line-height:34px;
`

const ModalText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
  text-align:center;
  line-height:22px;
`

