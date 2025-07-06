import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import styled from '@emotion/native';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import MarginVertical from './MarginVertical';
import Calandar from './Calandar';
import SmallButton from './SmallButton';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import { usePoint } from '../../hooks/usePoint';
import calandar_modal_bg from '../../../assets/caladar_modal_bg.png';

const CalandarModal = ({
  isCalandarModalVisible,
  setIsCalandarModalVisible,
  selectedRange,
  setSelectedRange,
  id,
  setSavingLog,
  version,
  setPointLog,
}) => {
  const { getSavingLog } = useInstallmentSaving();
  const { getPointLog } = usePoint();

  const handleCalandarModal = () => {
    setIsCalandarModalVisible(false);
    if (version === 'Point') {
      getPointLog(selectedRange.startDate, selectedRange.endDate, setPointLog);
    } else {
      getSavingLog(id, selectedRange.startDate, selectedRange.endDate, setSavingLog);
    }
  };

  return (
    <SafeAreaView>
      <Modal
        isVisible={isCalandarModalVisible}
        animationIn="slideInUp"
        animationInTiming={800}
        animationOut="slideOutDown"
        animationOutTiming={800}
        onBackdropPress={() => setIsCalandarModalVisible(false)}
      >
        <ModalContainer>
          <MarginVertical top={35} />
          <Calandar selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
          <MarginVertical top={20} />
          <Footer>
            <PeriodText>
              {selectedRange.startDate
                ? `${selectedRange.startDate}`
                : '날짜를 선택해주세요.'}{' '}
              {selectedRange.startDate && (
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.fontMain80 }}>
                  부터
                </Text>
              )}
            </PeriodText>
            <PeriodText>
              {selectedRange.endDate
                ? `${selectedRange.endDate}`
                : '날짜를 선택해주세요.'}{' '}
              {selectedRange.endDate && (
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.fontMain80 }}>
                  까지
                </Text>
              )}
            </PeriodText>
            <SmallButton
              text="확인"
              width={100}
              height={40}
              bgColor={colors.indigoBlue50}
              fontColor="#fff"
              handleButton={handleCalandarModal}
            />
          </Footer>
        </ModalContainer>
        <BackgroundImage source={calandar_modal_bg} />
      </Modal>
    </SafeAreaView>
  );
};

export default CalandarModal;

const ModalContainer = styled.View`
  width: ${size.width}px;
  height: 600px;
  padding-horizontal: 40px;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  width: ${size.width}px;
  height: 600px;
  top: 0;
  border-radius: 20px;
  z-index: -1;
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PeriodText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.fontMain80};
  line-height: 24px;
  flex: 1;
`;
