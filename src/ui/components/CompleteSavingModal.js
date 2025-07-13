import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import MarginVertical from './MarginVertical';
import DoubleButton from './DoubleButton';
import routine_pause_bg from '../../../assets/routine_pause_bg.png';
import { useRoutine } from '../../hooks/useRoutine';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';

const CompleteSavingModal = ({ isCompleteModalVisible, setIsCompleteModalVisible, id, title}) => {
  const navigation = useNavigation();
  const { handleRoutineDelete } = useRoutine();
  const { handleDeleteSaving, handleAccountEnd, handleAccountExtend } = useInstallmentSaving();
  const [step, setStep] = useState(0)

  const titleText =
    step === 0
      ? '적금이\n만기되었어요!'
      : step === 1
      ? `${title} 적금\n완료`
      : step === 3
      ? `${title} 적금\n연장 완료`
      :"";

  const bodyText =
    step === 0
    ? '해당 적금을 완료하거나\n연장하여 계속 모을 수 있습니다.'
    : step === 1
    ? `수고하셨습니다!\n우리는 또 새로운 적금으로\n다시 만나게 되겠죠?`
    : step === 3
    ? `잘 부탁드려요!\n이번에도 꾸준히 시간을 모아볼게요!ㅌ   `
    :"";
  
  return (
    <Modal
      isVisible={isCompleteModalVisible}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOut="slideOutDown"
      animationOutTiming={800}
      onBackdropPress={() => setIsCompleteModalVisible(false)}
    >
      <Container>
        <MaterialCommunityIcons name="bell-alert" size={36} color="#FF4848" />
        <MarginVertical top={15} />
        <Title>{titleText}</Title>
        <MarginVertical top={20} />
        <Body>{bodyText}</Body>
        <MarginVertical top={50} />
        <DoubleButton
          text1={"완료하기"}
          text2={"연장하기"}
          handleLeftButton={() => {
            handleAccountEnd(id)
            
          }}
          handleRightButton={() => {
            setStep(2)
          }}
        />
        <MarginVertical top={36} />
        <Background source={routine_pause_bg} />
      </Container>
      
    </Modal>
  );
};

export default CompleteSavingModal;

const Container = styled.View`
  width: ${() => `${size.width}px`};
  padding: 40px 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -20px;
  left: -20px;
  height:450px;
`;

const Background = styled.Image`
  position: absolute;
  top:0;
  width: ${() => `${size.width}px`};
  border-radius: 24px;
  z-index: -1;
  height:450px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 26px;
  color: ${colors.fontMain};
  text-align: center;
  line-height: 34px;
`;

const Body = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: ${colors.fontMain60};
  text-align: center;
  line-height: 22px;
`;
