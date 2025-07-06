import React from 'react';
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

const SavingAlertModal = ({ isAlertModalVisible, setIsAlertModalVisible, id, version }) => {
  const navigation = useNavigation();
  const { handleRoutineDelete } = useRoutine();
  const { handleDeleteSaving } = useInstallmentSaving();

  const titleText =
    version === 'saving'
      ? '비활성화 상태의\n적금입니다!'
      : version === 'deleteRoutine'
      ? '루틴을 삭제할까요?'
      : '적금을 삭제할까요?';

  const bodyText =
    version === 'saving'
      ? '적금에 연결되어 있는\n루틴의 시간이 모자라요.\n새로운 루틴을 연결해야해요!'
      : version === 'deleteRoutine'
      ? '삭제한 루틴은 되돌릴 수 없어요!\n그래도 삭제할까요?'
      : '삭제한 적금은 되돌릴 수 없어요!\n그래도 삭제할까요?';

  return (
    <Modal
      isVisible={isAlertModalVisible}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOut="slideOutDown"
      animationOutTiming={800}
      onBackdropPress={() => setIsAlertModalVisible(false)}
    >
      <Container>
        <MaterialCommunityIcons name="bell-alert" size={36} color="#FF4848" />
        <MarginVertical top={15} />
        <Title>{titleText}</Title>
        <MarginVertical top={20} />
        <Body>{bodyText}</Body>
        <MarginVertical top={50} />
        <DoubleButton
          text1={version === 'saving' ? '새로운 루틴 만들기' : '아니요'}
          text2={version === 'saving' ? '기존 루틴 연결하기' : '네'}
          handleLeftButton={() => {
            setIsAlertModalVisible(false);
            if (version === 'saving') {
              navigation.navigate('StartAddAsset', { version: 'Routine' });
            }
          }}
          handleRightButton={() => {
            setIsAlertModalVisible(false);
            if (version === 'saving') {
              navigation.navigate('ConnectRoutine', { id });
            } else if (version === 'deleteRoutine') {
              handleRoutineDelete(id);
            } else {
              handleDeleteSaving(id);
            }
          }}
        />
        <MarginVertical top={36} />
      </Container>
      <Background source={routine_pause_bg} />
    </Modal>
  );
};

export default SavingAlertModal;

const Container = styled.View`
  width: ${size.width}px;
  padding: 40px 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: -20px;
`;

const Background = styled.Image`
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: ${size.width}px;
  border-radius: 20px;
  z-index: -1;
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
