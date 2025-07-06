import React, { useState, useCallback } from 'react';
import Modal from 'react-native-modal';
import { Image } from 'react-native';
import styled from '@emotion/native';
import dayjs from 'dayjs';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';
import DoubleButton from './DoubleButton';
import { usePoint } from '../../hooks/usePoint';
import { useUserInfoStore } from '../../store/user';
import { useGetInfo } from '../../hooks/useGetInfo';

import snowflakeIcon from '../../../assets/snowflak_icon.png';
import subscribeCompleteIcon from '../../../assets/subscribe_complete_icon.png';
import checkIcon from '../../../assets/check_icon_indigo.png';
import routinePauseBg from '../../../assets/routine_pause_bg.png';

const PurchaseModal = ({ isPurchaseModalVisible, setIsPurchaseModalVisible, version }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isInsufficiency, setIsInsufficiency] = useState(false);
  const { getSubscribe, getUserPremium } = usePoint();
  const [userPremium, setUserPremium] = useState(0);
  const { userInfo } = useUserInfoStore();
  const { getUserInfo } = useGetInfo();

  useCallback(() => {
    getUserPremium(setUserPremium);
    getUserInfo();
  }, [isPurchaseModalVisible]);

  React.useEffect(() => {
    if (userPremium > userInfo.point || userInfo.isPremium) {
      setIsInsufficiency(true);
    }
  }, [userPremium, userInfo.point]);

  const titleText =
    version === 'Purchase'
      ? isComplete
        ? `${dayjs().format('M월')} 구독권
구매 완료!`
        : isInsufficiency
        ? '포인트가 부족해요'
        : '프리미엄 구독권을 구매할까요?'
      : isComplete
      ? '루틴을 보관함에 넣어두었어요!'
      : '루틴을 보관함에 넣어둘까요?';

  const bodyText =
    version === 'Purchase'
      ? isComplete
        ? '이번 달도 소복과 함께 시간을 모아봐요!'
        : isInsufficiency
        ? '자투리 시간을 알차게 보내고 포인트를 조금 더 모아봐요!'
        : '구독권 상세 페이지의 주의사항을 꼭 읽어보고 구매해주세요!'
      : isComplete
      ? '루틴 페이지에서 언제든 다시 시작할 수 있어요!'
      : '잠시 미뤄두었다가 언제든 다시 시작할 수 있어요!';

  return (
    <Modal
      isVisible={isPurchaseModalVisible}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOut="slideOutDown"
      animationOutTiming={800}
      onBackdropPress={() => setIsPurchaseModalVisible(false)}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <Container height={isComplete ? 310 : 400}>
        <MarginVertical top={isComplete ? 52 : 0} />
        <Icon
          source={
            version === 'Purchase'
              ? isComplete
                ? subscribeCompleteIcon
                : snowflakeIcon
              : isComplete
              ? checkIcon
              : snowflakeIcon
          }
          style={{ width: isComplete ? (version === 'Purchase' ? 80 : 44) : 16, height: isComplete ? (version === 'Purchase' ? 42 : 44) : 16 }}
        />
        <MarginVertical top={15} />
        <Title>{titleText}</Title>
        <MarginVertical top={30} />
        <Body>{bodyText}</Body>
        {!isComplete && (
          <>
            <MarginVertical top={50} />
            <DoubleButton
              text1="아니오"
              text2="예"
              handleLeftButton={() => setIsPurchaseModalVisible(false)}
              handleRightButton={() => {
                if (version === 'Purchase') {
                  if (!isInsufficiency) {
                    getSubscribe(setIsComplete, setIsInsufficiency);
                  } else {
                    setIsPurchaseModalVisible(false);
                  }
                } else {
                  setIsComplete(true);
                }
              }}
            />
            <MarginVertical top={36} />
          </>
        )}
      </Container>
      <Background bottom={isComplete ? -80 : -20} source={routinePauseBg} />
    </Modal>
  );
};

export default PurchaseModal;

const Container = styled.View`
  width: ${size.width}px;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  border-radius: 20px;
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
  width: ${size.width}px;
  height: 100%;
  z-index: -1;
`;
