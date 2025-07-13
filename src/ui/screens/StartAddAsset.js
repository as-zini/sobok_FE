import React, { useState } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import styled from '@emotion/native';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import AiRoutineAlertModal from '../components/AiRoutineAlertModal';
import AiRoutineCompleteScreen from './AiRoutineCompleteScreen';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';

import addSavingBg from '../../../assets/add_saving_bg.png';
import addAiRoutineBg from '../../../assets/add_ai_routine_bg.png';
import freeRoutineAddBg from '../../../assets/free_routine_add_bg.png';
import startButton from '../../../assets/mild_cloud_icon.png';

const StartAddAsset = ({ route }) => {
  const navigation = useNavigation();
  const { version } = route.params;
  const { userInfo } = useUserInfoStore();

  const [isMakeRoutine, setIsMakeRoutine] = useState(false);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

  const assetTitle = ['적금\n추가하기', 'AI 루틴 추가하기', '자율루틴\n추가하기'];
  const assetText = [
    `${userInfo.displayName} 님의 시간을 소복이\n쌓을 수 있도록 도와드릴게요!`,
    'AI가 당신의 맞춤 루틴을 만들어드립니다!\n다양한 질문에 답변만 하면\n고민 없이 루틴 완성!',
    '나만의 루틴을\n직접 만들 수 있어요!'
  ];

  const handleMakeAiRoutine = () => {
    setIsMakeRoutine(true);
    setTimeout(() => {
      navigation.navigate('AiRoutineResult');
    }, 5000);
  };

  if (isMakeRoutine) {
    return <AiRoutineCompleteScreen />;
  }

  return (
    <SafeAreaView>
      <Container>
        <MarginVertical top={80} />
        <Image source={startButton} style={{ width: 40, height: 30 }} />
        <MarginVertical top={15} />
        <Title>
          {version === 'Saving' ? assetTitle[0] : version === 'Ai' ? assetTitle[1] : assetTitle[2]}
        </Title>
        <Description>
          {version === 'Saving' ? assetText[0] : version === 'Ai' ? assetText[1] : assetText[2]}
        </Description>
        <View style={{position:'absolute', bottom:120}}>
        <Button
          text={
            version === 'Saving'
              ? '적금 만들기'
              : version === 'Ai'
              ? 'AI 루틴 만들기'
              : '자율 루틴 만들기'
          }
          handleButton={() =>  navigation.navigate(version === "Saving" ? "AddInstallmentSaving" : version === "Ai" ? "Test" : "AddFreeRoutine" )}
        />
        </View>
        <AiRoutineAlertModal
          isPauseModalVisible={isAlertModalVisible}
          setIsPauseModalVisible={setIsAlertModalVisible}
        />
      </Container>
      <Background
        source={
          version === 'Saving'
            ? addSavingBg
            : version === 'Ai'
            ? addAiRoutineBg
            : freeRoutineAddBg
        }
      />
    </SafeAreaView>
  );
};

export default StartAddAsset;

const Container = styled.View`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  align-items: center;
`;

const Background = styled.Image`
  position: absolute;
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  top: 0;
  z-index: -1;
`;

const Title = styled.Text`
  font-size: 34px;
  font-weight: 700;
  color: ${colors.fontMain};
  margin-bottom: 16px;
  text-align: center;
`;

const Description = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain60};
  text-align: center;
  line-height: 24px;
`;
