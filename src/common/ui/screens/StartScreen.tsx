import React, { useState } from 'react';
import styled from '@emotion/native';
import { colors } from '@/common/ui/styles/colors';
import StartScreenModal from '@/common/ui/components/StartScreenModal';
import { size } from '@/common/ui/styles/size';
import bg from '@/assets/start_bg.png';
import Bg from '../components/Bg';
import { DefaultText } from '../components/DefaultText';

const StartScreen = () => {
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  return (
    <StartScreenBody>
      <Bg source={bg} />
      <StartText>안녕하세요{`\n`}환영합니다</StartText>
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

const StartScreenBody = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: size.width,
  height: size.height,
});

const StartText = styled(DefaultText)({
  fontSize: 24,
  position: 'absolute',
  bottom: 150,
  fontFamily: 'Pretendard-SemiBold',
});

const StartButton = styled.TouchableOpacity({
  position: 'absolute',
  bottom: 60,
  backgroundColor: colors.fontMain,
  width: 290,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
});

const StartButtonText = styled(DefaultText)({
  color: '#fff',
  fontSize: 20,
  fontFamily: 'Pretendard-SemiBold',
});
