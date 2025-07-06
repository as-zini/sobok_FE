// RoutineRepeatModal.js
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from '@emotion/native';

import routine_repeat_setting_bg from '../../../assets/routine_repeat_setting_bg.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import WeekCalandar from './WeekCalandar';
import TimeSliderBar from './TimeSliderBar';
import Button from './Button';
import MarginVertical from './MarginVertical';

const RoutineRepeatModal = ({
  isRoutineRepeatModalVisible,
  setIsRoutineRepeatModalVisible
}) => {
  return (
    <SafeAreaView>
      <Modal
        isVisible={isRoutineRepeatModalVisible}
        animationIn="slideInUp"
        animationInTiming={800}
        animationOut="slideOutDown"
        animationOutTiming={800}
        onBackdropPress={() => setIsRoutineRepeatModalVisible(false)}
      >
        <RoutineRepeatModalBody>
          <RoutineRepeatModalTitle>반복 설정하기</RoutineRepeatModalTitle>
          <MarginVertical top={48} />
          <RepeatText>월, 수, 금{"\n"}06:00 - 08:30</RepeatText>
          <MarginVertical top={30} />
          <WeekCalandar />
          <MarginVertical top={30} />
          <TimeSliderBar text="에 시작해서" />
          <MarginVertical top={40} />
          <TimeSliderBar text="까지" />
          <MarginVertical top={35} />
          <View>
            <Button
              text="확인"
              handleButton={() => setIsRoutineRepeatModalVisible(false)}
            />
          </View>
        </RoutineRepeatModalBody>
        <RoutineRepeatModalBg source={routine_repeat_setting_bg} />
      </Modal>
    </SafeAreaView>
  );
};

export default RoutineRepeatModal;

// Styled (Emotion Native)
const RoutineRepeatModalBody = styled.View`
  width: ${() => `${size.width}px`};
  height: 700px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -20px;
  bottom: -20px;
`;

const RoutineRepeatModalBg = styled.Image`
  width: ${() => `${size.width}px`};
  position: absolute;
  left: -20px;
  bottom: -20px;
  z-index: -1;
`;

const RoutineRepeatModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

const RepeatText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${colors.fontMain};
  text-align: center;
`;
