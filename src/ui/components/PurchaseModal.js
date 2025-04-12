import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-native-modal';
import { Image } from 'react-native';

import routine_pause_bg from '../../../assets/routine_pause_bg.png';
import { size } from '../styles/size';
import snowflake_icon from '../../../assets/snowflak_icon.png';
import DoubleButton from './DoubleButton';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';
import subscribe_complete_icon from '../../../assets/subscribe_complete_icon.png';

import check_icon_indigo from '../../../assets/check_icon_indigo.png';
import dayjs from 'dayjs';
import { usePoint } from '../../hooks/usePoint';

const PurchaseModal = ({isPurchaseModalVisible, setIsPurchaseModalVisible, version}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isInsufficiency, setIsInsufficiency] = useState(false);
  const {getSubscribe} = usePoint();

  useEffect(() => {
  }, [])
  

  return (
    <Modal
      isVisible={isPurchaseModalVisible} 
      animationIn={'slideInUp'}
      animationInTiming={1000} 
      animationOut={'slideOutDown'} 
      animationOutTiming={1000}
      onBackdropPress={() => setIsPurchaseModalVisible(false)}
    >
      <RoutinePauseModalBody height={isComplete ? 310 : 400}>
        <MarginVertical top={isComplete ? 52 : 0}/>
        {
          version === "Purchase" ? 
          <Image source={isComplete ? subscribe_complete_icon:snowflake_icon} style={{width:isComplete ? 80 : 16, height: isComplete ? 42 : 16}}/>
          :
          <Image source={isComplete ? check_icon_indigo:snowflake_icon} style={{width:isComplete ? 44 : 16, height: isComplete ? 44 : 16}}/>
        }
        
        <MarginVertical top={15}/>
        {version === "Purchase"
        ?
        <>
        <RoutinePauseModalTitle>{isComplete ?`${dayjs().format("M월")} 구독권\n구매 완료!` : isInsufficiency ? "포인트가 부족해요":"프리미엄 구독권을\n구매할까요?" }</RoutinePauseModalTitle>
        <MarginVertical top={30}/>
        <RoutinePauseModalText>{isComplete ? "이번 달도 소복과 함께\n시간을 모아봐요!" : isInsufficiency ? "자투리 시간을 알차게 보내고\n포인트를 조금 더 모아봐요!":"구독권 상세 페이지의 주의사항을\n꼭 읽어보고 구매해주세요!"}</RoutinePauseModalText>
        <MarginVertical top={isComplete ? 72 : 50}/>
        </>
        :
        <>
        <RoutinePauseModalTitle>루틴을 보관함에{"\n"}{isComplete ? "넣어두었어요!" : "넣어둘까요?"}</RoutinePauseModalTitle>
        <MarginVertical top={30}/>
        <RoutinePauseModalText>{isComplete ? "루틴 페이지에서 언제든\n다시 시작할 수 있어요!" : "잠시 미뤄두었다가\n언제든 다시 시작할 수 있어요!"}</RoutinePauseModalText>
        <MarginVertical top={isComplete ? 72 : 50}/>
        </>
        }
        {isComplete ? <></>
        :
        <>
        <DoubleButton text1={"아니오"} text2={"예"} handleLeftButton={() => setIsPurchaseModalVisible(false)} handleRightButton={() => {
          if(version === "Purchase"){
            if(!isInsufficiency){getSubscribe(setIsComplete, setIsInsufficiency)}
            else{setIsPurchaseModalVisible(false)}
          }
          else{setIsComplete(true)}
        }}/>
        <MarginVertical top={36}/>
        </>
        
        }
      </RoutinePauseModalBody>
      <RoutinePauseModalBg source={routine_pause_bg} bottom={isComplete ? -80 : -20}/>
    </Modal>
  )
}

export default PurchaseModal


const RoutinePauseModalBody = styled.View`
  width:${size.width}px;
  height:${(props) => props.width}px;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  bottom:0;
  left:-20;
`

const RoutinePauseModalBg = styled.Image`
  position:absolute;
  bottom:${(props) => props.bottom}px;
  left:-20;
  z-index:-1;
  
`

const RoutinePauseModalTitle = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain};
  text-align:center;
  line-height:34px;
`

const RoutinePauseModalText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
  text-align:center;
  line-height:22px;
`

