import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-native-modal';
import { Image } from 'react-native';

import routine_pause_bg from '../../../assets/routine_pause_bg.png';
import { size } from '../styles/size';
import snowflake_icon from '../../../assets/snowflak_icon.png';
import DoubleButton from './DoubleButton';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';

import check_icon_indigo from '../../../assets/check_icon_indigo.png';
import { useRoutine } from '../../hooks/useRoutine';
import { useUserInfoStore } from '../../store/user';
import { useLogin } from '../../hooks/useLogin';

const RoutinePauseModal = ({isPauseModalVisible, setIsPauseModalVisible, version, id, setRoutineDetailInfo, setIsComplete, isPause}) => {
  const [isReturn, setIsReturn] = useState(false);
  const {handleRoutineSuspend} = useRoutine();
  const {getRoutineDetail, handleCompleteRoutine} = useRoutine();
  const {userInfo} = useUserInfoStore();
  const {handleLogout} = useLogin();
  

  

  return (
    <Modal
      isVisible={isPauseModalVisible} 
      animationIn={'slideInUp'}
      animationInTiming={1000} 
      animationOut={'slideOutDown'} 
      animationOutTiming={1000}
      onBackdropPress={() => setIsPauseModalVisible(false)}
      onModalHide={() => getRoutineDetail(id, setRoutineDetailInfo, setIsComplete)}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <RoutinePauseModalBody height={isReturn ? 310 : 400}>
        <MarginVertical top={isReturn ? 52 : 0}/>
        <Image source={isReturn ? check_icon_indigo:snowflake_icon} style={{width:isReturn ? 44 : 16, height: isReturn ? 44 : 16}}/>
        <MarginVertical top={15}/>

        {version==="Complete" ? 
        <RoutinePauseModalTitle>{"루틴을\n완료할까요?"}</RoutinePauseModalTitle>
        : version === "Logout" ?
        <RoutinePauseModalTitle>{"로그아웃\n할까요?"}</RoutinePauseModalTitle>
        :isPause ?
        <RoutinePauseModalTitle>{!isReturn ? "루틴을 다시\n시작할까요?" : "루틴이 다시\n시작되었어요!"}</RoutinePauseModalTitle>
        : 
        <RoutinePauseModalTitle>{isReturn ? "루틴을 보관함에 넣어두었어요!" : "루틴을 보관함에 넣어둘까요?"}</RoutinePauseModalTitle>
        }
        <MarginVertical top={30}/>
        {version === "Complete" ?
        <RoutinePauseModalText>{`${userInfo.displayName} 님의 일상을 책임졌던 루틴!\n드디어 결실을 맺은 걸까요?`}</RoutinePauseModalText>
        : version === "Logout" ? 
        <RoutinePauseModalText>{"정말\n로그아웃 할까요?"}</RoutinePauseModalText>
        :
        isPause ? 
        <RoutinePauseModalText>{isReturn ? "루틴 페이지에서\n잠시 미뤄둘 수 있어요!" : "돌아오셨군요!\n다시 열심히 해봐요!"}</RoutinePauseModalText>
        :<RoutinePauseModalText>{isReturn ? "루틴 페이지에서 언제든\n다시 시작할 수 있어요!" : "잠시 미뤄두었다가\n언제든 다시 시작할 수 있어요!"}</RoutinePauseModalText>
        }
        <MarginVertical top={isReturn? 72 : 50}/>
        {isReturn ? <></>
        :
        <>
        <DoubleButton text1={"아니오"} text2={"예"}
          handleRightButton={() => version==="Complete" ? handleCompleteRoutine(id, setIsPauseModalVisible) : version === "Logout" ?  handleLogout(setIsReturn): handleRoutineSuspend(id, setIsReturn)}
          handleLeftButton={() => setIsPauseModalVisible(false)}/>
        <MarginVertical top={36}/>
        </>
        
        }
        <RoutinePauseModalBg source={routine_pause_bg} bottom={isReturn ? -80 : -20}/>
      </RoutinePauseModalBody>
      
    </Modal>
  )
}

export default RoutinePauseModal


const RoutinePauseModalBody = styled.View`
  width:${size.width}px;
  height:${(props) => props.height}px;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  bottom:0;
  border-radius:20px;
  overflow:hidden;
  background-color:red;
  
`

const RoutinePauseModalBg = styled.Image`
  position:absolute;
  
  z-index:-1;
  width:${size.width}px;
  height:100%;
  top:0
  
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

