import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import BackArrowButton from '../components/BackArrowButton';
import LinkIcon from '../components/LinkIcon';
import DoubleButton from '../components/DoubleButton';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import AssetEl from '../components/AssetEl';
import CalandarModal from '../components/CalandarModal';
import RoutinePauseModal from '../components/RoutinePauseModal';
import SavingAlertModal from '../components/SavingAlertModal';
import TodoEl from '../components/TodoEl';
import Ionicons from 'react-native-vector-icons/Ionicons';
import routine_icon from '../../../assets/routine_icon.png';
import snow_flake_icon_white from '../../../assets/snow_flake_icon_white.png';
import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import { useNavigation } from '@react-navigation/native';
import { useRoutine } from '../../hooks/useRoutine';
import { minToHour } from '../../util';
import baseUrl from '../../api/baseURL';

const DetailRoutineScreen = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const { handleRoutineDelete } = useRoutine();

  const [routineDetailInfo, setRoutineDetailInfo] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [isPauseModalVisible, setIsPauseModalVisible] = useState(false);
  const [isCompleteModalVisible, setIsCompleteModalVisible] = useState(false);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

  const getRoutineDetail = async (routineId) => {
    try {
      const response = await baseUrl.get(`/routine/detail?routineId=${routineId}`);
      setRoutineDetailInfo(response.data);
      setIsComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoutineDetail(id);
  }, [id, isComplete, isPauseModalVisible]);

  const todos = routineDetailInfo.todos || [];
  const Data = [{ title: '', data: todos.map(todo => [todo.title, todo.linkApp, minToHour(todo.duration), `${todo.startTime.slice(0,5)} - ${todo.endTime.slice(0,5)}`]) }];

  const BlurChild = () => (
    <View style={{ paddingHorizontal: 30, paddingVertical: 40 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <TotalRoutineCount>{`총 ${todos.length}개의 할 일`}</TotalRoutineCount>
      </View>
      <MarginVertical top={32} />
      <SectionList
        sections={Data}
        keyExtractor={(item, index) => `${item}-${index}`}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <>
            <TodoEl
              data={item}
              index={index}
              todoInfo={routineDetailInfo.todos[index]}
              routineTitle={routineDetailInfo.title}
              isTouchable
              days={routineDetailInfo.days}
            />
            <MarginVertical top={40} />
          </>
        )}
        renderSectionHeader={() => null}
      />
    </View>
  );

  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <MarginVertical top={20} />
            <Header>
              <View style={{ position: 'absolute', left: 20 }}>
                <BackArrowButton />
              </View>
              <TitleText>루틴</TitleText>
              <TouchableOpacity style={{ position: 'absolute', right: 20 }} onPress={() => setIsAlertModalVisible(true)}>
                <Ionicons name="trash-outline" size={24} color={colors.fontMain80} />
              </TouchableOpacity>
            </Header>
            <MarginVertical top={47} />
            <SavingIntroArea>
              <Image source={routine_icon} style={{ width: 51, height: 33 }} />
              <MarginVertical top={18} />
              <LinkedRoutineText>{routineDetailInfo.title}</LinkedRoutineText>
              <MarginVertical top={5} />
              <TotalSavingTitle>{minToHour(routineDetailInfo.duration)}</TotalSavingTitle>
              <MarginVertical top={32} />
              <View style={{ flexDirection: 'row', gap: 7 }}>
                {routineDetailInfo.days?.map((el, idx) => (
                  <InterestText key={idx}>{mapDay(el)}</InterestText>
                ))}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <PushPeriodText style={{ flex: 1 }}>{`${routineDetailInfo.startTime?.slice(0,5)} - ${routineDetailInfo.endTime?.slice(0,5)}`}</PushPeriodText>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <LinkIcon size={16} />
                  <PushPeriodText>{routineDetailInfo.accountTitle}</PushPeriodText>
                </View>
              </View>
            </SavingIntroArea>

            <MarginVertical top={40} />
            <DoubleButton
              text1="루틴 수정하기"
              text2={routineDetailInfo.isSuspended ? '루틴 재개하기' : '루틴 보류하기'}
              handleLeftButton={() => navigation.navigate('ViewAiRoutine', { routineInfo: routineDetailInfo, version: 'free' })}
              handleRightButton={() => setIsPauseModalVisible(true)}
            />

            <MarginVertical top={40} />
            <BlurComponent child={BlurChild} />
          </Container>
        </ScrollView>
        <SavingAlertModal
          isAlertModalVisible={isAlertModalVisible}
          setIsAlertModalVisible={setIsAlertModalVisible}
          id={id}
          version="deleteRoutine"
        />
        <RoutinePauseModal
          isPauseModalVisible={isPauseModalVisible}
          setIsPauseModalVisible={setIsPauseModalVisible}
          version="Routine"
          id={id}
          setRoutineDetailInfo={setRoutineDetailInfo}
          setIsComplete={setIsComplete}
          isPause={routineDetailInfo.isSuspended}
        />
        <RoutinePauseModal
          isPauseModalVisible={isCompleteModalVisible}
          setIsPauseModalVisible={setIsCompleteModalVisible}
          version="Complete"
          id={id}
          setRoutineDetailInfo={setRoutineDetailInfo}
          setIsComplete={setIsComplete}
          isPause={routineDetailInfo.isSuspended}
        />
      </SafeAreaView>
      <RoutineCompleteBar>
        <RoutineCompleteBg onPress={() => setIsCompleteModalVisible(true)} />
        <CompleteIcon source={snow_flake_icon_white} />
        <CompleteBarText>완료하기</CompleteBarText>
      </RoutineCompleteBar>
      <Background source={installment_saving_bg} />
    </>
  );
};

export default DetailRoutineScreen;

// 요소 매핑 함수
const mapDay = day => {
  switch (day) {
    case 'MON': case 'MONDAY': return '월';
    case 'TUE': case 'TUESDAY': return '화';
    case 'WED': case 'WEDNESDAY': return '수';
    case 'THU': case 'THURSDAY': return '목';
    case 'FRI': case 'FRIDAY': return '금';
    case 'SAT': case 'SATURDAY': return '토';
    default: return '일';
  }
};

const Container = styled.View`
  align-items: center;
  width: ${() => `${size.width}px`};
  padding-horizontal: 30px;
  margin-bottom: 30px;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`}px;
  z-index: -1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${colors.fontSub};
`;

const SavingIntroArea = styled.View`
  width: 100%;
`;

const LinkedRoutineText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${colors.fontMain90};
`;

const TotalSavingTitle = styled.Text`
  font-size: 48px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

const InterestText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.fontMain70};
  line-height: 24px;
`;

const PushPeriodText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.fontMain70};
  line-height: 25px;
`;

const TotalRoutineCount = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #707172;
`;

const RoutineCompleteBar = styled.View`
  position: absolute;
  bottom: 0;
  width: ${size.width}px;
  height: 110px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const RoutineCompleteBg = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.indigoBlue50};
  z-index: 1;
`;

const CompleteIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
  z-index: 2;
`;

const CompleteBarText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  z-index: 2;
`;
