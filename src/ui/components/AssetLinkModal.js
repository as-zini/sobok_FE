import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import styled from '@emotion/native';

import asset_link_modal_bg from '../../../assets/assetLinkModalBg.png';
import search_icon from '../../../assets/search_icon.png';
import Button from './Button';
import MarginVertical from './MarginVertical';
import AssetEl from './AssetEl';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import { useRoutine } from '../../hooks/useRoutine';
import { minToHour } from '../../util';
import dayjs from 'dayjs';

const AssetLinkModal = ({
  isAssetLinkModalVisible,
  setIsAssetLinkModalVisible,
  invalidSavingList,
  setInvalidSavingList,
  setPickedSaving,
  version,
  routineList,
  setRoutineList,
  setDateInfoByRoutine,
}) => {
  const { getInvalidSavingList } = useInstallmentSaving();
  const { getRoutineByList } = useRoutine();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (version === 'Routine') {
      getRoutineByList(setRoutineList);
    } else {
      getInvalidSavingList(setInvalidSavingList);
    }
  }, []);

  const handleCompleteButton = () => {
    setIsAssetLinkModalVisible(false);
  };

  // filter helpers
  const filteredRoutines = version === 'Routine'
    ? routineList.filter(el => el.title.includes(searchValue))
    : [];
  const filteredSavings = version !== 'Routine'
    ? invalidSavingList.filter(el => el.title.includes(searchValue))
    : [];

  const activeList = searchValue
    ? (version === 'Routine' ? filteredRoutines : filteredSavings)
    : (version === 'Routine' ? routineList : invalidSavingList);

  return (
    <Modal
      isVisible={isAssetLinkModalVisible}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOut="slideOutDown"
      animationOutTiming={800}
      onBackdropPress={() => setIsAssetLinkModalVisible(false)}
    >
      <Body>
        <Title>자산 연결하기</Title>
        <Text style={{ fontSize: 16, fontWeight: '500', color: colors.fontMain70, textAlign: 'center' }}>
          루틴으로 모은 시간을{'\n'}적금에 연결할 수 있어요!
        </Text>

        <MarginVertical top={40} />

        <SearchArea>
          <SearchInput
            placeholder={version === 'Routine' ? '루틴을 검색해보세요' : '적금을 검색해보세요'}
            placeholderTextColor="#fff"
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <BorderLine />
          <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 10 }}>
            <Image source={search_icon} />
          </TouchableOpacity>
        </SearchArea>

        <MarginVertical top={55} />

        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
          {`총 ${activeList.length}개의 ${version === 'Routine' ? '루틴' : '적금'}`}
        </Text>

        <MarginVertical top={20} />

        <ScrollView style={{ height: 230 }} showsVerticalScrollIndicator={false}>
          {activeList.map((el, idx) => (
            <View key={idx}>
              {version === 'Routine' ? (
                <OptionRow onPress={() => setPickedSaving([el])}>
                  <CircleIndex>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600' }}>{idx + 1}</Text>
                  </CircleIndex>
                  <Text style={{ flex: 1, fontSize: 18, fontWeight: '600', color: '#343434' }}>
                    {el.title}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: colors.indigoBlue }}>
                    {minToHour(el.duration)}
                  </Text>
                </OptionRow>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setPickedSaving([el]);
                    setIsAssetLinkModalVisible(false);
                  }}
                >
                  <MarginVertical top={55} />
                  <AssetEl
                    item={[
                      el.title,
                      '',
                      `${minToHour(el.time)}`,
                      `D-${dayjs(el.expiredAt).diff(dayjs(), 'day')}`,
                    ]}
                    index={idx}
                    isLink={false}
                  />
                </TouchableOpacity>
              )}
              <MarginVertical top={30} />
            </View>
          ))}
        </ScrollView>

        <MarginVertical top={50} />

        <Button text="확인" handleButton={handleCompleteButton} />

        <BgImage source={asset_link_modal_bg} />
      </Body>
    </Modal>
  );
};

export default AssetLinkModal;

// Emotion styled components
const Body = styled.View`
  width: ${() => `${size.width}px`};
  position: absolute;
  left: -20px;
  bottom: -20px;
  align-items: center;
  border-radius: 20px;
  height: 550px;
  padding: 30px 0;
  overflow: hidden;
`;

const BgImage = styled.Image`
  width:${() => `${size.width}px`};
  height: 550px;
  position: absolute;
  z-index: -1;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.fontMain};
  margin-bottom: 8px;
`;

const SearchArea = styled.View`
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  width: 300px;
  height: 40px;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain};
`;

const BorderLine = styled.View`
  width: 300px;
  height: 0.8px;
  background-color: #fff;
`;

const OptionRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 300px;
  gap: 13px;
`;

const CircleIndex = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.indigoBlue};
  justify-content: center;
  align-items: center;
`;
