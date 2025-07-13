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
import step0Icon from '../../../assets/save_icon.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import MaterialDesignIcons from 'react-native-vector-icons/MaterialDesignIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SnowFlakeIcon from './SnowFlakeIcon';
import TimeSliderBar from './TimeSliderBar';
import { minToHour } from '../../util';
import Button from './Button';

const CompleteSavingModal = ({ isCompleteModalVisible, setIsCompleteModalVisible, id, title, time}) => {
  const navigation = useNavigation();
  const { handleRoutineDelete } = useRoutine();
  const { handleDeleteSaving, handleAccountEnd, handleAccountExtend } = useInstallmentSaving();
  const [step, setStep] = useState(0)
  const [extendData, setExtendData] = useState({})
  const interest = time < 600 ? .3 : time < 1200 ? .4 : time < 2400 ? .5 : .7

  const titleText =
    step === 0
      ? '적금이\n만기되었어요!'
      : step === 1
      ? `${title} 적금\n완료!`
      : step === 3
      ? `${title} 적금\n연장 완료!`
      :"";

  const bodyText =
    step === 0
    ? '해당 적금을 완료하거나\n연장하여 계속 모을 수 있습니다.'
    : step === 1
    ? `수고하셨습니다!\n우리는 또 새로운 적금으로\n다시 만나게 되겠죠?`
    : step === 3
    ? `잘 부탁드려요!\n이번에도 꾸준히 시간을 모아볼게요!`
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
      {step === 2 ?
      <Container style={{height:600}}>
        <Title style={{fontSize:16, color:colors.fontMain}}>연장 기간 선택하기</Title>
        <Text style={{fontWeight:500, fontSize:14, lineHeight:18, color:colors.fontMain70, textAlign:'center'}}>{"적금을 얼마동안\n연장할까요?"}</Text>
        <MarginVertical top={36}/>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>              
                <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80, marginBottom:5}}>{`${extendData.duration}개월 뒤에`}</Text>
                <Text style={{fontWeight:600, fontSize:26, color:colors.fontMain90}}>{`+${minToHour(time*extendData.duration)}`}</Text>
                <MarginVertical top={20}/>
                <Text style={{fontSize:18, fontWeight:600, color:colors.fontMain80,marginBottom:5}}>{`월 ${interest*10}%`}</Text>
                <Text style={{fontWeight:600, fontSize:26, color:colors.indigoBlue}}>{`+${Math.floor(time*extendData.duration*interest)}P`}</Text>
              <MarginVertical top={50}/>
              {/* <Text style={{fontSize:18, fontWeight:500, color:colors.fontMain80, marginBottom:5}}>한 달에</Text>
              <TimeSliderBar text={"씩"} setOutValue={setExtendData} type={"savingtime"}/>
              <MarginVertical top={65}/> */}
              <TimeSliderBar text={"동안"} setOutValue={setExtendData} type={"duration"}/>
              <MarginVertical top={60}/>
              <Button text={"연장하기"} handleButton={() => handleAccountExtend(id, extendData.duration, setStep)}/>
            </View>
      <Background source={routine_pause_bg} style={{height:600}}/>
    </Container>
      :
      <Container style={{height:step === 0 ? 500 : 330}}>
        <MarginVertical top={50}/>
        {
          step === 0 ?
          <Image source={step0Icon} style={{width:40, height:28, resizeMode:'contain'}}/>
          :
          step === 1 ?
          // <MaterialDesignIcons name="hand-clap" size={40} color={colors.indigoBlue}/>
          <Fontisto name='check' size={20} color={colors.indigoBlue}/>
          :
          step === 3 ?
          <Fontisto name='check' size={20} color={colors.indigoBlue}/>
          :
          <></>
        }
        
        <MarginVertical top={15} />
        <Title>{titleText}</Title>
        <MarginVertical top={step === 3 ? 30 : 20} />
        {step === 0 ?
        <>
          <Text style={{textAlign:'center', fontSize:16, lineHeight:22, color:colors.fontMain70}}>
            {"축하드립니다!\n포기하지 않고 끝까지 모아주셨네요!"}
          </Text>
          <MarginVertical top={48}/>
          <SnowFlakeIcon size={16} color={"indigo"}/>
          <MarginVertical top={12}/>
        </> : <></>}
        <Body>{bodyText}</Body>
        <MarginVertical top={ step === 0 ? 50 : 30} />
        {step === 0 ?
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
        :
        step === 1 ?
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <MaterialIcons name="info" size={12} color={colors.fontMain50}/>
          <Text style={{fontWeight:500, fontSize:14, color:colors.fontMain50}}>
            완료한 적금은 보관함에서 다시 볼 수 있어요!
          </Text>
        </View>
        :
        <></>
        }
        <MarginVertical top={36} />
        <Background source={routine_pause_bg} style={{height:step === 0 ? 500 :330}}/>
      </Container>
      }
      
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
`;

const Background = styled.Image`
  position: absolute;
  top:0;
  width: ${() => `${size.width}px`};
  border-radius: 24px;
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
