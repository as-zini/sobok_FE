import React from 'react';
import Modal from 'react-native-modal';
import { Image, View } from 'react-native';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { useRoutine } from '../../hooks/useRoutine';
import MarginVertical from './MarginVertical';
import DoubleButton from './DoubleButton';
import { colors } from '../styles/colors';
import { size } from '../styles/size';

import alertBg from '../../../assets/ai_routine_alert_bg.png';
import alertIcon from '../../../assets/alert_icon.png';

const AiRoutineAlertModal = ({ isPauseModalVisible, setIsPauseModalVisible }) => {
  const navigation = useNavigation();

  return (
    <Modal
      isVisible={isPauseModalVisible}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOut="slideOutDown"
      animationOutTiming={800}
      onBackdropPress={() => setIsPauseModalVisible(false)}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <Container>
        <Image source={alertIcon} />
        <MarginVertical top={14} />
        <Title>이미 맞춤 검사를{''}진행하셨나요?</Title>
        <MarginVertical top={27} />
        <BodyText>
          새롭게 맞춤 검사를 진행하면{''}기존의 맞춤 검사 데이터는{''}사라집니다!
        </BodyText>
        <MarginVertical top={20} />
        <Bullet />
        <MarginVertical top={20} />
        <BodyText style={{ color: colors.fontMain80 }}>
          새로운 맞춤 검사를 진행할까요?
        </BodyText>
        <MarginVertical top={35} />
        <DoubleButton
          text1="그만두기"
          text2="진행하기"
          handleLeftButton={() => {
            setIsPauseModalVisible(false);
            navigation.navigate('Tabs');
          }}
          handleRightButton={() => {
            setIsPauseModalVisible(false);
            navigation.navigate('TestStart');
          }}
        />
      </Container>
      <Background source={alertBg} />
    </Modal>
  );
};

export default AiRoutineAlertModal;

const Container = styled.View`
  width: ${size.width}px;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: -20px;
  padding-top: 40px;
`;

const Background = styled.Image`
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: ${size.width}px;
  height: auto;
  z-index: -1;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 26px;
  color: ${colors.fontMain};
  text-align: center;
  line-height: 34px;
`;

const BodyText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: ${colors.fontMain60};
  text-align: center;
  line-height: 22px;
`;

const Bullet = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${colors.indigoBlue};
  border-radius: 5px;
`;
