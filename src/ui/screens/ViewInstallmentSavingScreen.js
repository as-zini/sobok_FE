import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, SectionList, Text, View } from 'react-native';
import styled from '@emotion/native';

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import link_icon from '../../../assets/link_icon.png';
import installment_icon from '../../../assets/save_icon.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AssetEl from '../components/AssetEl';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import { minToHour } from '../../util';

const ViewInstallmentSavingScreen = () => {
  const navigation = useNavigation();
  const { getSavingList } = useInstallmentSaving();
  const [onGoingAccountList, setOnGoingAccountList] = useState([]);
  const [expiredAccountList, setExpiredAccountList] = useState([]);
  const [endedAccountList, setEndedAccountList] = useState([]);

  const Data = [
    {
      title: ['진행 중인 적금', onGoingAccountList.length],
      data: onGoingAccountList.map(el => [el.title, '', minToHour(el.time), `D-${el.duration * 30}`, el.id, el.isValid]),
    },
    {
      title: ['만기된 적금', expiredAccountList.length],
      data: expiredAccountList.map(el => [el.title, '', minToHour(el.time), 'D-0', el.id]),
    },
    {
      title: ['완료된 적금', endedAccountList.length],
      data: endedAccountList.map(el => [el.title, '', minToHour(el.time), 'D-0', el.id]),
    },
  ];

  const RenderItem = ({ item, index }) => (
    <>
      <AssetEl
        item={item}
        index={index}
        isLink={false}
        category="Save"
        isTouchable
        stepColor={!item[5] ? 'red' : 'indigo'}
        isInvalid={!item[5]}
      />
      <MarginVertical top={50} />
    </>
  );

  const ListHeader = ({ title }) => (
    <>
      {title[0] === '만기된 적금' && <Divider />}
      <SectionEl>
        <SectionTitle>{title[0]}</SectionTitle>
        <SectionCountText>{title[1]}</SectionCountText>
      </SectionEl>
    </>
  );

  useFocusEffect(
    useCallback(() => {
      getSavingList(setOnGoingAccountList, 'onGoing');
      getSavingList(setExpiredAccountList, 'expired');
      getSavingList(setEndedAccountList, 'ended');
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ViewInstallmentSavingBody>
          <MarginVertical top={20} />
          <ViewInstallmentSavingHeader>
            <View style={{ position: 'absolute', left: 20 }}>
              <BackArrowButton />
            </View>
            <Text style={{ fontWeight: '600', fontSize: 18, color: colors.fontSub }}>적금</Text>
          </ViewInstallmentSavingHeader>
          <MarginVertical top={47} />
          <TotalSavingArea>
            <Image source={installment_icon} style={{ width: 48, height: 34 }} />
            <MarginVertical top={18} />
            <TotalSavingText>{`총 ${onGoingAccountList.filter(el => el.isValid).length}개의 적금`}</TotalSavingText>
            <MarginVertical top={5} />
            <TotalSavingTitle>
              {minToHour(onGoingAccountList.filter(el => el.isValid).reduce((sum, time) => sum + time, 0))}
            </TotalSavingTitle>
          </TotalSavingArea>
          <MarginVertical top={72} />
          <SectionList
            sections={Data}
            scrollEnabled={false}
            keyExtractor={(item, idx) => `${item}-${idx}`}
            renderItem={RenderItem}
            renderSectionHeader={({ section: { title } }) => <ListHeader title={title} />}
          />
        </ViewInstallmentSavingBody>
      </ScrollView>
      <ViewInstallmentSavingBg source={installment_saving_bg} />
    </SafeAreaView>
  );
};

export default ViewInstallmentSavingScreen;

const ViewInstallmentSavingBody = styled.View`
  width: ${() => `${size.width}px`};
  justify-content: center;
  align-items: center;
`;

const ViewInstallmentSavingHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${() => `${size.width}px`};
`;

const ViewInstallmentSavingBg = styled.Image`
  width: ${() => `${size.width}px`};
  position: absolute;
  top: 0;
  z-index: -1;
`;

const TotalSavingArea = styled.View`
  width: 310px;
`;

const TotalSavingText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain90};
`;

const TotalSavingTitle = styled.Text`
  font-size: 48px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

const Divider = styled.View`
  width: 310px;
  height: 0.8px;
  background-color: white;
  z-index: 9;
  margin-bottom: 30px;
`;

const SectionEl = styled.View`
  flex-direction: row;
  gap: 4px;
  margin-bottom: 35px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #707172;
`;

const SectionCountText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.indigoBlue};
`;
