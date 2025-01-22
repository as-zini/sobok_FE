import React from 'react'
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import TimeSliderBar from './TimeSliderBar';
import MarginVertical from './marginVertical';
import Button from './Button';

const SpareTimeChoiceModal = ({isChoiceModalVisible, setIsChoiceModalVisible}) => {
  return (
    <SafeAreaView>
      <Modal 
        isVisible={isChoiceModalVisible} 
        animationIn={'slideInUp'}
        animationInTiming={1000} 
        animationOut={'slideOutDown'} 
        animationOutTiming={1000}
        onBackdropPress={() => setIsChoiceModalVisible(false)}
      >
        <SpareTimeModalBody>
          <SpareTimeModalTitle>자투리 시간 선택하기</SpareTimeModalTitle>
          <SpareTimeModalText>{"자투리 시간이 생기는\n시각을 알려주세요"}</SpareTimeModalText>
          <TotalTimeArea>
            <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain90}}>총 시간</Text>
            <Text style={{fontWeight:600, fontSize:26, color:colors.fontMain90}}>1H 00M</Text>
          </TotalTimeArea>
          <MarginVertical top={32}/>
          <TimeSliderBar text={"에 시작해서"}/>
          <MarginVertical top={48}/>
          <TimeSliderBar text={"까지"}/>
          <MarginVertical top={55}/>
          <Button text={"다음 단계로"}/>
        </SpareTimeModalBody>

      </Modal>
    </SafeAreaView>
  )
}

export default SpareTimeChoiceModal;

const SpareTimeModalBody = styled.View`
  width:${size.width}px;
  height:650px;
  background-color:rgba(255,255,255,.8);
  position:absolute;
  bottom:-20px;
  left:-20px;
  border-radius:24px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const SpareTimeModalTitle = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:8px;
`

const SpareTimeModalText = styled.Text`
  font-size:14px;
  font-weight:500;
  color:${colors.fontMain60};
  text-align:center;
`

const TotalTimeArea = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:36px;
`