import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { colors } from '../styles/colors';
import StartScreenModal from '../components/StartScreenModal';
import { useNavigation } from '@react-navigation/native';
import { size } from '../styles/size';

const StartScreen = () => {
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <StartScreenBody>
      <StartScreenBg
        source={require('../../../assets/start_bg.png')}
      />
      <StartText style={{fontFamily:'Pretendard '}}>
        안녕하세요{`\n`}환영합니다
      </StartText>
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

// Main container should fill screen to allow bg to size correctly
const StartScreenBody = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
`;

// Background image placed absolutely with pointerEvents none to let touches pass
const StartScreenBg = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:-1;
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
