import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Image } from 'react-native';
import styled from '@emotion/native';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';
import DoubleButton from './DoubleButton';

import snowflakeIcon from '../../../assets/snowflak_icon.png';
import checkIcon from '../../../assets/check_icon_indigo.png';
import routinePauseBg from '../../../assets/routine_pause_bg.png';
import { useRoutine } from '../../hooks/useRoutine';
import { useUserInfoStore } from '../../store/user';
import { useLogin } from '../../hooks/useLogin';

const RoutinePauseModal = ({
  isPauseModalVisible,
  setIsPauseModalVisible,
  version,
  id,
  setRoutineDetailInfo,
  setIsComplete,
  isPause,
}) => {
  const [isReturn, setIsReturn] = useState(false);
  const { handleRoutineSuspend, getRoutineDetail, handleCompleteRoutine } = useRoutine();
  const { userInfo } = useUserInfoStore();
  const { handleLogout } = useLogin();

  const onConfirm = () => {
    if (version === 'Complete') {
      handleCompleteRoutine(id, setIsPauseModalVisible);
    } else if (version === 'Logout') {
      handleLogout(setIsReturn);
    } else {
      handleRoutineSuspend(id, setIsReturn);
    }
  };

  const titleText =
    version === 'Complete' ? '루틴을\n완료할까요?' :
    version === 'Logout' ? '로그아웃\n할까요?' :
    isPause
      ? isReturn ? '루틴이 다시\n시작되었어요!' : '루틴을 다시\n시작할까요?'
      : isReturn ? '루틴을 보관함에 넣어두었어요!' : '루틴을 보관함에 넣어둘까요?';

  const bodyText =
    version === 'Complete'
      ? `${userInfo.displayName} 님의 일상을 책임졌던 루틴!\n드디어 결실을 맺은 걸까요?`
      : version === 'Logout'
      ? '정말\n로그아웃 할까요?'
      : isPause
      ? isReturn
        ? '루틴 페이지에서\n잠시 미뤄둘 수 있어요!'
        : '돌아오셨군요!\n다시 열심히 해봐요!'
      : isReturn
      ? '루틴 페이지에서 언제든\n다시 시작할 수 있어요!'
      : '잠시 미뤄두었다가\n언제든 다시 시작할 수 있어요!';

  return (
    <Modal
      isVisible={isPauseModalVisible}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOut="slideOutDown"
      animationOutTiming={800}
      onBackdropPress={() => setIsPauseModalVisible(false)}
      onModalHide={() => getRoutineDetail(id, setRoutineDetailInfo, setIsComplete)}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <Container height={isReturn ? 310 : 400}>
        <MarginVertical top={isReturn ? 52 : 0} />
        <Icon source={isReturn ? checkIcon : snowflakeIcon} style={{ width: isReturn ? 44 : 16, height: isReturn ? 44 : 16 }} />
        <MarginVertical top={15} />
        <Title>{titleText}</Title>
        <MarginVertical top={30} />
        <Body>{bodyText}</Body>
        {!isReturn && (
          <>
            <MarginVertical top={50} />
            <DoubleButton
              text1="아니오"
              text2="예"
              handleLeftButton={() => setIsPauseModalVisible(false)}
              handleRightButton={onConfirm}
            />
            <MarginVertical top={36} />
          </>
        )}
        <Background source={routinePauseBg} bottom={isReturn ? -80 : -20} />
      </Container>
    </Modal>
  );
};

export default RoutinePauseModal;

const Container = styled.View`
  width: ${() => `${size.width}px`};
  height: ${props => `${props.height}px`};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  border-radius:20px;
  overflow: hidden;
`;

const Icon = styled(Image)`
  z-index: 1;
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

const Background = styled(Image)`
  position: absolute;
  bottom: ${props => props.bottom}px;
  left: 0px;
  width: ${() => `${size.width}px`};
  height: 100%;
  z-index: -1;
  border-radius:20px;
`;
