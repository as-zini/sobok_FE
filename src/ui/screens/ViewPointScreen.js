import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import dayjs from 'dayjs';

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import link_icon from '../../../assets/link_icon.png';
import point_icon from '../../../assets/point_icon.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import MarginVertical from '../components/MarginVertical';
import AssetEl from '../components/AssetEl';
import SmallButton from '../components/SmallButton';
import ProgressBar from '../components/ProgressBar';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import CalandarModal from '../components/CalandarModal';
import { useUserInfoStore } from '../../store/user';
import { usePoint } from '../../hooks/usePoint';
import { useGetInfo } from '../../hooks/useGetInfo';
import { useNavigation } from '@react-navigation/native';

const ViewPointScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [isCalandarModalVisible, setIsCalandarModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
  });

  const { userInfo } = useUserInfoStore();
  const { getUserPremium, getPointLog } = usePoint();
  const { getUserInfo } = useGetInfo();

  const [userPremium, setUserPremium] = useState(0);
  const [pointLog, setPointLog] = useState([]);

  useEffect(() => {
    getUserPremium(setUserPremium);
    getUserInfo();
    getPointLog(selectedRange.startDate, selectedRange.endDate, setPointLog);
  }, [isCalandarModalVisible]);

  const BlurChild = () => (
    <View style={{ paddingHorizontal: 30, paddingVertical: 40 }}>
      <ScrollView style={{ minHeight: 200 }}>
        <View style={{ flexDirection: 'row', gap: 4, alignItems:'center' }}>
          <SettingPeriodText>
            {`${selectedRange.startDate} - ${selectedRange.endDate}`}
          </SettingPeriodText>
          <DropDownArrowButton
            size={16}
            handleArrowButton={() => setIsCalandarModalVisible(true)}
          />
        </View>
        <MarginVertical top={32} />
        {pointLog.map((el, index) => (
          <View key={index}>
            <Text
              style={{
                color: '#707172',
                fontWeight: '500',
                fontSize: 14,
              }}
            >
              {dayjs(el.createdAt).format('M월 D일')}
            </Text>
            <MarginVertical top={20} />
            <AssetEl
              item={[
                `${el.category}`,
                `${dayjs(el.createdAt).format('hh:mm')}`,
                `${el.point}P`,
                `${el.balance}P`,
              ]}
              index={index}
              isLink={false}
            />
            <MarginVertical top={40} />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaProvider style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <MarginVertical top={20} />
          <Header>
            <View style={{ position: 'absolute', left: 20 }}>
              <BackArrowButton />
            </View>
            <Title>포인트</Title>
          </Header>
          <MarginVertical top={47} />
          {userInfo.isPremium && (
            <Subscribing>
              <SubscribingText>
                {`${dayjs().format('M월')} 구독권 사용중`}
              </SubscribingText>
            </Subscribing>
          )}
          <TotalArea>
            <Image
              source={point_icon}
              style={{ width: 48, height: 46 }}
            />
            <MarginVertical top={18} />
            <TotalPointText>
              {`${userInfo.displayName} 님의 총 포인트는`}
            </TotalPointText>
            <MarginVertical top={5} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 310,
              }}
            >
              <TotalSavingTitle>
                {`${userInfo.point}P`}
              </TotalSavingTitle>
              <SmallButton
                text="사용하기"
                width={100}
                height={40}
                bgColor={colors.indigoBlue50}
                fontColor="#fff"
                handleButton={() =>
                  navigation.navigate('TicketPurchase', {
                    userPremium,
                  })
                }
              />
            </View>
          </TotalArea>
          <MarginVertical top={56} />
          <ProgressArea>
            <ProgressText>
              {userPremium <= userInfo.point
                ? `${userPremium}P 를 모두 모았어요!\n${dayjs()
                    .add(1, 'M')
                    .format('M월')} 구독권을 구매할 수 있겠군요!`
                : `${userPremium - userInfo.point}P 만 모으면\n${dayjs()
                    .add(1, 'M')
                    .format('M월')} 구독권을 구매할 수 있어요!`}
            </ProgressText>
            <MarginVertical top={20} />
            <ProgressBar
              version="Point"
              userPoint={userInfo.point}
              totalPoints={userPremium}
            />
          </ProgressArea>
          <MarginVertical top={72} />
          <BlurComponent child={BlurChild} />
        </Container>
      </ScrollView>
      <CalandarModal
        isCalandarModalVisible={isCalandarModalVisible}
        setIsCalandarModalVisible={setIsCalandarModalVisible}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        version="Point"
        setPointLog={setPointLog}
      />
      <Background source={installment_saving_bg} />
    </SafeAreaProvider>
  );
};

export default ViewPointScreen;

const Container = styled.View`
  width: ${size.width}px;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${() => `${size.width}px`};
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${colors.fontSub};
`;

const Subscribing = styled.View`
  width: 114px;
  height: 30px;
  border-radius: 15px;
  background-color: ${colors.indigoBlue50};
  justify-content: center;
  align-items: center;
`;

const SubscribingText = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #fff;
`;

const TotalArea = styled.View`
  width: 310px;
`;

const TotalPointText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain90};
`;

const TotalSavingTitle = styled.Text`
  font-size: 50px;
  font-weight: 600;
  color: ${colors.fontMain};
  flex: 1;
`;

const ProgressArea = styled.View``;

const ProgressText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain70};
  line-height: 24px;
  margin-bottom: 8px;
`;

const SettingPeriodText = styled.Text`
  color: #4A5660;
  font-weight: 600;
  font-size: 16px;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  width:  ${() => `${size.width}px`};
  height:  ${() => `${size.height}px`};
  z-index: -1;
`;
