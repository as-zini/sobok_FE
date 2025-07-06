import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import installment_icon from '../../../assets/save_icon.png';
import MarginVertical from '../components/MarginVertical';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import LinkIcon from '../components/LinkIcon';
import ShortAlertArea from '../components/ShortAlertArea';
import DoubleButton from '../components/DoubleButton';
import ProgressBar from '../components/ProgressBar';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import AssetEl from '../components/AssetEl';
import CalandarModal from '../components/CalandarModal';
import { minToHour } from '../../util';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SavingAlertModal from '../components/SavingAlertModal';

const DetailInstallmentSavingScreen = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const { getSavingLog, getSavingDetail, handleDeleteSaving } = useInstallmentSaving();
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [savingInfo, setSavingInfo] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [savingLog, setSavingLog] = useState([]);
  const [selectedRange, setSelectedRange] = useState({
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
  });
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [isDeleteAlertModalVisible, setIsDeleteAlertModalVisible] = useState(false);
  const hasAlertShown = useRef(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getSavingDetail(id, setSavingInfo, setIsReady);
  }, [id]);

  useEffect(() => {
    getSavingLog(id, selectedRange.startDate, selectedRange.endDate, setSavingLog);
  }, [id, selectedRange]);

  useEffect(() => {
    if (savingInfo.is_valid === false && !hasAlertShown.current) {
      setIsAlertModal(true);
      hasAlertShown.current = true;
    }
  }, [savingInfo]);

  const startedAt = dayjs(`${savingInfo.created_at} 00:00`);

  const BlurChild = () => (
    <View style={{ paddingHorizontal: 30, paddingVertical: 40 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <SettingPeriodText>
          {selectedRange.startDate && selectedRange.endDate
            ? `${selectedRange.startDate} - ${selectedRange.endDate}`
            : '날짜를 선택해주세요'}
        </SettingPeriodText>
        <DropDownArrowButton size={16} handleArrowButton={() => setIsCalendarModalVisible(true)} />
      </View>
      <MarginVertical top={32} />
      {savingLog.map((el, index) => (
        <View key={index}>
          <Text style={{ color: '#707172', fontWeight: '500', fontSize: 14 }}>
            {dayjs(el.createdAt).format('YYYY년 M월 D일')}
          </Text>
          <MarginVertical top={20} />
          <AssetEl
            item={[
              `${savingLog.length - index}회차`,
              `${dayjs(el.created_at).format('HH:MM')}`,
              `${minToHour(el.depositTime)}`,
              `${minToHour(el.balance)}`,
            ]}
            index={index}
            isLink={false}
            isTouchable={false}
          />
          <MarginVertical top={40} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaProvider style={{ paddingTop: insets.top }}>
      {isReady && (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <DetailBody>
              <DetailHeader>
                <BackArrowButton />
                <Text style={{ fontWeight: '600', fontSize: 18, color: colors.fontSub }}>적금</Text>
                <TouchableOpacity onPress={() => setIsDeleteAlertModalVisible(true)}>
                  <Ionicons name="trash-outline" size={24} color={colors.fontMain80} />
                </TouchableOpacity>
              </DetailHeader>
              <MarginVertical top={47} />
              <SavingIntro>
                <Image source={installment_icon} style={{ width: 48, height: 34 }} />
                <MarginVertical top={18} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <LinkedRoutineText>{savingInfo.title}</LinkedRoutineText>
                  <TouchableOpacity>
                    <MaterialIcons name="mode-edit" size={20} color="rgba(20,36,72,0.3)" />
                  </TouchableOpacity>
                </View>
                <MarginVertical top={5} />
                <TotalTitle>{minToHour(savingInfo.balance)}</TotalTitle>
                <MarginVertical top={32} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <InterestText>{`월 ${savingInfo.interest}%`}</InterestText>
                  <TouchableOpacity>
                    <MaterialIcons name="keyboard-arrow-right" size={22} color="rgba(20,36,72,0.4)" />
                  </TouchableOpacity>
                </View>
                <PushText>{`매주 ${minToHour(savingInfo.time)}`}</PushText>
              </SavingIntro>
              <MarginVertical top={24} />
              <ShortAlertArea
                text={`${savingInfo.duration - (dayjs().month() - startedAt.month())}개월 남았어요!`}
                width={114}
                height={30}
              />
              <MarginVertical top={36} />
              <ProgressBar startedAt={startedAt} duration={savingInfo.duration || 0} version="Time" />
              <MarginVertical top={48} />
              <DoubleButton
                text1="연결 루틴 보기"
                text2="채우기"
                handleLeftButton={() =>
                  navigation.navigate('ViewLinkedRoutine', {
                    title: savingInfo.title,
                    routines: savingInfo.routines,
                  })
                }
                handleRightButton={() => navigation.navigate('TodayTodo')}
              />
              <MarginVertical top={40} />
              <BlurComponent child={BlurChild} />
            </DetailBody>
          </ScrollView>
          <CalandarModal
            isCalandarModalVisible={isCalendarModalVisible}
            setIsCalandarModalVisible={setIsCalendarModalVisible}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            id={id}
            setSavingLog={setSavingLog}
          />
          <ShortAlertArea />
          <SavingAlertModal
            isAlertModalVisible={isAlertModal}
            setIsAlertModalVisible={setIsAlertModal}
            id={id}
            version="saving"
          />
          <SavingAlertModal
            isAlertModalVisible={isDeleteAlertModalVisible}
            setIsAlertModalVisible={setIsDeleteAlertModalVisible}
            id={id}
            version="deleteSaving"
          />
        </View>
      )}
      <DetailBg source={installment_saving_bg} />
    </SafeAreaProvider>
  );
};

export default DetailInstallmentSavingScreen;

const DetailBody = styled.View`
  align-items: center;
  width: ${size.width}px;
  padding-horizontal: 30px;
`;

const DetailBg = styled.Image`
  position: absolute;
  top: 0;
  width: ${size.width}px;
  height: ${size.height}px;
  z-index: -1;
`;

const DetailHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const SavingIntro = styled.View`
  width: 100%;
`;

const LinkedRoutineText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain90};
`;

const TotalTitle = styled.Text`
  font-size: 50px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

const InterestText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: ${colors.fontMain70};
`;

const PushText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: ${colors.fontMain70};
`;

const SettingPeriodText = styled.Text`
  color: #4A5660;
  font-weight: 600;
  font-size: 16px;
`;
