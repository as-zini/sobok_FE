import React, { useState } from 'react';
import styled from '@emotion/native';
import { colors } from '@/common/ui/styles/colors';
import StartScreenModal from '@/common/ui/components/StartScreenModal';
import { size } from '@/common/ui/styles/size';
import bg from '@/assets/start_bg.png';
import Bg from '../components/Bg';

const StartScreen = () => {
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  return (
    <StartScreenBody>
      <Bg source={bg} />
      <StartText style={{ fontFamily: 'Pretendard ' }}>안녕하세요{`\n`}환영합니다</StartText>
      <StartButton onPress={() => setIsSignupModalVisible(true)}>
        <StartButtonText>시작하기</StartButtonText>
      </StartButton>
      <StartScreenModal
        isSignupModalVisible={isSignupModalVisible}
        setIsSignupModalVisible={setIsSignupModalVisible}
      />
    </StartScreenBody>
  );
};

export default StartScreen;

const StartScreenBody = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
`;

const StartText = styled.Text`
  position: absolute;
  font-size: 24px;
  bottom: 150px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

const StartButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 60px;
  background-color: ${colors.fontMain};
  width: 290px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const StartButtonText = styled.Text`
  font-weight: 600;
  color: #fff;
  font-size: 20px;
`;
