import React from 'react';
import { Image, View, Text } from 'react-native';
import styled from '@emotion/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import bg from '../../../assets/nonPremiumUserBg.png';
import crown_icon from '../../../assets/crown_icon.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';
import { useNavigation } from '@react-navigation/native';

const NonPremium = () => {
  const navigation = useNavigation();

  return (
    <Body>
      <Bg source={bg} resizeMode="cover" />

      {/* 상단 경고 배너 */}
      <TopBanner style={{ position: 'absolute', top: 100, zIndex: 9 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
          <MaterialCommunityIcons name="alert-circle" size={18} color="#fff" />
          <View style={{ width: 7 }} />
          <MarginVertical top={0} />
          <BannerText style={{ fontSize: 13 }}>
            구독 시 볼 수 있는 통계 샘플 이미지입니다.
          </BannerText>
        </View>
      </TopBanner>

      {/* 중앙 컨텐츠 */}
      <CenterArea style={{ position: 'absolute', bottom: 120, zIndex: 9 }}>
        <MaterialIcons name="lock-outline" size={24} color="#fff" />
        <MarginVertical top={8} />
        <BannerText style={{ fontSize: 18, textAlign: 'center' }}>
          {`구독권을 구매하고\n쌓인 시간을 확인해보세요!`}
        </BannerText>
        <MarginVertical top={20} />
        <Image source={crown_icon} />
        <MarginVertical top={8} />
        <ActionButton onPress={() => navigation.navigate('ViewPoint')}>
          <ButtonText style={{ color: colors.indigoBlue }}>
            프리미엄 구독권 구매하기
          </ButtonText>
        </ActionButton>
      </CenterArea>
    </Body>
  );
};

export default NonPremium;

const Body = styled.View({
  width: size.width,
  height: size.height,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 50,
  paddingHorizontal: 30,
});

const Bg = styled.Image({
  position: 'absolute',
  top: 0,
  width: size.width,
  height: size.height,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 9,
});

const TopBanner = styled.View({
  width: size.width - 60, // 원래 패딩 감안
});

const BannerText = styled.Text({
  color: '#fff',
  fontWeight: '500',
  zIndex: 9,
});

const CenterArea = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
  width: size.width,
});

const ActionButton = styled.TouchableOpacity({
  width: '90%',
  height: 56,
  backgroundColor: '#fff',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
});

const ButtonText = styled.Text({
  fontSize: 18,
  fontWeight: '500',
});
