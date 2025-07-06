// TestStartScreen.js
import React from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import BackArrowButton from '../components/BackArrowButton';
import Button from '../components/Button';
import { useUserInfoStore } from '../../store/user';
import test_start_bg from '../../../assets/test_start_bg.png';
import test_start_icon from '../../../assets/save_icon.png';
import { colors } from '../styles/colors';

const { width, height } = Dimensions.get('screen');

const TestStartScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useUserInfoStore();

  return (
    <SafeAreaView>
      <Container>
        <Header>
          <BackArrowButton />
        </Header>

        <Icon source={test_start_icon} />

        <Title>
          맞춤 검사{"\n"}시작하기
        </Title>

        <Description>
          {`${userInfo.displayName} 님에게 딱 맞는\nAI추천 루틴을 만들기 위해\n다양한 질문을 드릴게요!`}
        </Description>

        <View style={{ position: 'absolute', bottom: -400 }}>
          <Button
            text="맞춤 검사 시작하기"
            handleButton={() => navigation.navigate('Test')}
          />
        </View>

        <Background source={test_start_bg} />
      </Container>
    </SafeAreaView>
  );
};

export default TestStartScreen;

const Container = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const Background = styled.Image`
  position: absolute;
  top: -45px;
  width: ${width}px;
  height: ${height}px;
  z-index: -1;
`;

const Header = styled.View`
  position: absolute;
  top: 20px;
  left: 25px;
`;

const Icon = styled.Image`
  width: 40px;
  height: 30px;
  margin-top: 125px;
  margin-bottom: 15px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.fontMain};
  text-align: center;
  margin-bottom: 12px;
`;

const Description = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain60};
  text-align: center;
`;
