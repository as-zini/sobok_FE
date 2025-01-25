import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Modal from 'react-native-modal';
import BlurComponent from './BlurComponent';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { size } from '../styles/size';

import calandar_modal_bg from '../../../assets/caladar_modal_bg.png';
import SmallButton from './SmallButton';
import Calandar from './Calandar';
import MarginVertical from './MarginVertical';


const CalandarModal = ({isCalandarModalVisible, setIsCalandarModalVisible}) => {
  return (
    <SafeAreaView>
      <Modal
        isVisible={isCalandarModalVisible} 
        animationIn={'slideInUp'}
        animationInTiming={1000} 
        animationOut={'slideOutDown'} 
        animationOutTiming={1000}
        onBackdropPress={() => setIsCalandarModalVisible(false)}
      >
      <View style={{width:size.width, height:540, position:'absolute', bottom:-100, left:-19}}>
        <CalandarModalBody>
          {/* 캘린더 컴포넌트 */}
          <MarginVertical top={45}/>
          <Calandar/>
          <MarginVertical top={20}/>
          <View style={{display:'flex', flexDirection:'row'}}>
            <View style={{flexGrow:1}}>
              <SelectedPeriodText>2024년 10월 10일 <Text style={{fontSize:14, fontWeight:500, color:colors.fontMain80}}>부터</Text></SelectedPeriodText>
              <SelectedPeriodText>2024년 10월 18일 <Text style={{fontSize:14, fontWeight:500, color:colors.fontMain80}}>까지</Text></SelectedPeriodText>
            </View>
            <SmallButton text={"확인"} width={100} height={40} bgColor={colors.indigoBlue50} fontColor={"#fff"} handleButton={() => setIsCalandarModalVisible(false)}/>
          </View>
          
        </CalandarModalBody>
        <CalandarModalBg source={calandar_modal_bg}/>
      </View>
      </Modal>
    </SafeAreaView>
  )
}

export default CalandarModal


const CalandarModalBody = styled.View`
  width:${size.width}px;
  height:540px;
  padding:0 40px;
`

const CalandarModalBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const SelectedPeriodText = styled.Text`
  font-weight:500;
  font-size:16px;
  color:${colors.fontMain80};
  line-height:24px;

`

