// SpareTimeChoiceModal.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import styled from '@emotion/native';

import { size } from '../styles/size';
import { colors } from '../styles/colors';
import TimeSliderBar from './TimeSliderBar';
import MarginVertical from './MarginVertical';
import Button from './Button';
import { getTimeDifference, hasOverlap } from '../../util';
import { useTodo } from '../../hooks/useTodo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SpareTimeChoiceModal = ({
  isChoiceModalVisible,
  setIsChoiceModalVisible,
  setTime,
  time,
  setTimeList,
  version,
  timeList,
  timeId
}) => {
  const [isDuplicated, setIsDuplicated] = useState(false);
  
  useEffect(() => {
    if(time?.startTime && time?.endTime){
      checkDuplicatedTime()
    }
  },[time])


  const handleSpareTimeModal = () => {
    if(version === "add"){
      setTimeList(prev => [...prev, time]);
      setIsChoiceModalVisible(false);
    }else{
      setTimeList(prev => {
        const newList = [...prev.slice(0,timeId), time, ...prev.slice(timeId+1)]
        return newList
      })
      setIsChoiceModalVisible(false);
    }
    
  };

  function checkDuplicatedTime(){
    if(hasOverlap(time, timeList)){
      setIsDuplicated(true)
    }else{
      setIsDuplicated(false)
    }
  }

  return (
    <SafeAreaView>
      <Modal
        isVisible={isChoiceModalVisible}
        animationIn="slideInUp"
        animationInTiming={1000}
        animationOut="slideOutDown"
        animationOutTiming={1000}
        onBackdropPress={() => setIsChoiceModalVisible(false)}
      >
        <SpareTimeModalBody>
          <SpareTimeModalTitle>{version === "add" ? "자투리 시간 설정하기" : "자투리 시간 수정하기"}</SpareTimeModalTitle>
          <SpareTimeModalText>
            {"자투리 시간이 생기는\n시각을 알려주세요"}
          </SpareTimeModalText>
          <MarginVertical top={20} />
          {isDuplicated && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <MaterialIcons name="info" size={24} color="#FF4848" />
              <Text style={{ color: "#FF4848", fontWeight: '500', fontSize: 14 }}>
                선택한 시간에 이미 할 일이 있습니다
              </Text>
            </View>
          )}
          <TotalTimeArea>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.fontMain90
              }}
            >
              총 시간
            </Text>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 26,
                color: colors.fontMain90
              }}
            >
              {getTimeDifference(time.startTime, time.endTime)}
            </Text>
          </TotalTimeArea>
          <MarginVertical top={32} />
          <TimeSliderBar
            text="에 시작해서"
            version="start"
            setOutValue={setTime}
            type="time"
          />
          <MarginVertical top={48} />
          <TimeSliderBar
            text="까지"
            version="end"
            setOutValue={setTime}
            type="time"
          />
          <MarginVertical top={55} />
          <Button
            text="다음 단계로"
            handleButton={handleSpareTimeModal}
            unChecked={isDuplicated}
          />
        </SpareTimeModalBody>
      </Modal>
    </SafeAreaView>
);
}

export default SpareTimeChoiceModal;

// ─── Styled (Emotion Native) ───────────────────────────────────────────────

const SpareTimeModalBody = styled.View`
  width: ${() => `${size.width}px`};
  height: 650px;
  background-color: rgba(255,255,255,0.8);
  position: absolute;
  bottom: -20px;
  left: -20px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

const SpareTimeModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.fontMain};
  margin-bottom: 8px;
`;

const SpareTimeModalText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.fontMain60};
  text-align: center;
`;

const TotalTimeArea = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 36px;
`;
