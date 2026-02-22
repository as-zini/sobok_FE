// AiRoutineCompleteScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from '@emotion/native';

import CreateLoading from '../components/CreateLoading';
import airoutine_complete_bg from '../../../assets/airoutine_complete_bg.png';
import { size } from '../styles/size';
import complete_icon from '../../../assets/complete_icon.png';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useTest } from '../../hooks/useTest';
import { useUserInfoStore } from '../../store/user';

const AiRoutineCompleteScreen = ({ route }) => {
  const [isCreateComplete, setIsCreateComplete] = useState(false);
  const navigation = useNavigation();
  const {
    spareTpo,
    spareTime,
    preference1,
    preference2,
    preference3,
    likeOption,
    extraRequest,
    isComplete
  } = route.params;
  const { handleSubmitTest } = useTest();
  const { userInfo } = useUserInfoStore();
  const [aiRoutineInfo, setAiRoutineInfo] = useState({});

  useEffect(() => {
    if (!isComplete) {
      handleSubmitTest(
        spareTpo,
        spareTime,
        preference1,
        preference2,
        preference3,
        likeOption,
        extraRequest,
        setIsCreateComplete,
        setAiRoutineInfo
      );
    }
  }, []);

  return (
    <>
      {!isComplete ? (
        <CreateLoading categoryText="AI 루틴" isComplete={isComplete} />
      ) : (
        <SafeAreaView>
          <Body>
            <Icon source={complete_icon} />
            <MarginVertical top={40} />
            <Title>
              {`${userInfo.displayName} 님만의\nAI루틴 만들기 완성!`}
            </Title>
            <MarginVertical top={18} />
            <Description>
              {`이제 ${userInfo.displayName} 님에게 딱 맞는\n루틴을 보러 가요!`}
            </Description>
            <View style={{ position: 'absolute', bottom: 100 }}>
              <Button
                text="루틴 보러 가기"
                handleButton={() =>
                  navigation.reset({
                    routes: [{ name: 'Tabs' }]
                  })
                }
              />
            </View>
          </Body>
          <Background source={airoutine_complete_bg} />
        </SafeAreaView>
      )}
    </>
  );
};

export default AiRoutineCompleteScreen;

// ─── Styled (Emotion Native) ────────────────────────────────────────────────

const Body = styled.View`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.Image`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  position: absolute;
  top: 0;
  z-index: -1;
`;

const Icon = styled.Image`
  width: 96px;
  height: 62px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.fontMain};
  text-align: center;
`;

const Description = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain60};
  text-align: center;
`;
