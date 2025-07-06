import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import StepNumber from '../components/StepNumber';
import Steps from '../components/Step';
import Button from '../components/Button';
import MarginVertical from '../components/MarginVertical';
import WeekCalandar from '../components/WeekCalandar';
import TimeSliderBar from '../components/TimeSliderBar';
import SimpleTodoEl from '../components/SimpleTodoEl';
import LinkIcon from '../components/LinkIcon';
import TodoEl from '../components/TodoEl';
import AssetLinkModal from '../components/AssetLinkModal';
import { useTodoStore } from '../../store/todo';
import { getTimeDifference } from '../../util';
import { useRoutine } from '../../hooks/useRoutine';

const bg = require('../../../assets/test_bg.png');
const mildIcon = require('../../../assets/mild_routine_icon.png');

const AddFreeRoutine = () => {
  const [step, setStep] = useState(1);
  const categoryText = ['이름', '반복 시간', '할 일', '루틴 점검'];
  const questionText = [
    '루틴의 이름을\n지어주세요!',
    '루틴을 언제\n반복할까요?',
    '무엇을 해볼까요?',
    '마지막으로\n루틴을 점검해보아요!'
  ];
  const navigation = useNavigation();
  const { todoData } = useTodoStore();
  const { handleAddRoutine } = useRoutine();
  const [selectedDate, setSelectedDate] = useState([]);
  const [routineTitle, setRoutineTitle] = useState('');
  const [isAssetLinkModalVisible, setIsAssetLinkModalVisible] = useState(false);
  const [invalidSavingList, setInvalidSavingList] = useState([]);
  const [pickedSaving, setPickedSaving] = useState([]);

  const DateForEng = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  const sortDays = (days) => days.sort((a, b) => DateForEng.indexOf(a) - DateForEng.indexOf(b));

  const EngDayToKor = (day) => {
    switch (day) {
      case 'SUNDAY': return '일';
      case 'MONDAY': return '월';
      case 'TUESDAY': return '화';
      case 'WEDNESDAY': return '수';
      case 'THURSDAY': return '목';
      case 'FRIDAY': return '금';
      case 'SATURDAY': return '토';
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('todo', todoData);
    }, [todoData])
  );

  const handleNextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      handleAddRoutine({
        accountId: pickedSaving[0]?.id || null,
        title: routineTitle,
        days: selectedDate,
        todos: todoData
      });
    }
  };

  const StepThreeContents = () => (
    <ScrollSection>
      <MarginVertical top={12} />
      <CategoryText style={{ lineHeight: 24 }}>
        루틴에 들어갈{`\n`}할 일을 추가해보세요!
      </CategoryText>
      <MarginVertical top={44} />
      {todoData.map((el, i) => (
        <View key={i}>
          <SimpleTodoEl
            data={[el.title, `${el.startTime} - ${el.endTime}`, `${getTimeDifference(el.startTime, el.endTime)}`]}
            index={i + 1}
          />
          <MarginVertical top={16} />
        </View>
      ))}
      <AddButton onPress={() => navigation.navigate('AddTodo', { days: selectedDate })}>
        <AddButtonText>+</AddButtonText>
      </AddButton>
      <MarginVertical top={30} />
    </ScrollSection>
  );

  const StepFourContents = () => (
    <View style={{ alignItems: 'center' }}>
      <MarginVertical top={12} />
      <CategoryText style={{ lineHeight: 24 }}>
        만들어진 루틴을{`\n`}수정 및 점검할 수 있어요
      </CategoryText>
      <MarginVertical top={88} />
      <Image source={mildIcon} style={{ width: 42, height: 27 }} />
      <MarginVertical top={16} />
      <QuestionText style={{ textAlign: 'center' }}>{routineTitle}</QuestionText>
      <MarginVertical top={12} />
      <AssetLink onPress={() => setIsAssetLinkModalVisible(true)}>
        <LinkIcon size={16} />
        <CategoryText>{pickedSaving[0]?.title}</CategoryText>
      </AssetLink>
      <MarginVertical top={36} />
      <WeekCalandar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isDuplication
        version="day"
      />
      <MarginVertical top={44} />
      <Text style={{ fontWeight: 600, fontSize: 22, color: colors.gray70, width: '100%' }}>
        총 {todoData.length}개의 할 일
      </Text>
      <MarginVertical top={40} />
      {todoData.map((el, i) => (
        <View key={i} style={{ width: '100%' }}>
          <TodoEl
            data={[el.title, el.linkApp, `${el.startTime} - ${el.endTime}`, `${getTimeDifference(el.startTime, el.endTime)}`]}
            index={i}
          />
          <MarginVertical top={40} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>
          <Header>
            <BackArrowButton />
          </Header>
          <Steps step={step} />
          <MarginVertical top={60} />
          <InputArea>
            <StepNumber step={step} />
            <MarginVertical top={20} />
            <CategoryText>{categoryText[step - 1]}</CategoryText>
            <QuestionText>{questionText[step - 1]}</QuestionText>
            {step === 1 && (
              <>
                <MarginVertical top={40} />
                <AnswerInputArea>
                  <AnswerInput
                    placeholder="이름을 입력해주세요"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    value={routineTitle}
                    onChange={(e) => setRoutineTitle(e.nativeEvent.text)}
                  />
                </AnswerInputArea>
                <Divider />
                <MarginVertical top={296} />
              </>
            )}
            {step === 2 && (
              <View style={{ alignItems: 'center', width: '100%' }}>
                <MarginVertical top={60} />
                <View style={{ width: 294, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                  <QuestionText>
                    {selectedDate.length > 0
                      ? sortDays([...selectedDate]).map((d) => EngDayToKor(d))
                      : '루틴을 반복할 요일을\n선택해주세요'}
                  </QuestionText>
                </View>
                <MarginVertical top={40} />
                <WeekCalandar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  isDuplication
                  version="day"
                />
                <MarginVertical top={150} />
              </View>
            )}
            {step === 3 && <StepThreeContents />}
            {step === 4 && <StepFourContents />}
          </InputArea>
          <Button
            text="다음 단계로"
            handleButton={handleNextStep}
            unChecked={
              (step === 1 && !routineTitle) ||
              (step === 2 && selectedDate.length === 0) ||
              (step === 3 && todoData.length === 0)
            }
          />
          <AssetLinkModal
            isAssetLinkModalVisible={isAssetLinkModalVisible}
            setIsAssetLinkModalVisible={setIsAssetLinkModalVisible}
            invalidSavingList={invalidSavingList}
            setInvalidSavingList={setInvalidSavingList}
            setPickedSaving={setPickedSaving}
          />
        </Body>
      </ScrollView>
      <Background source={bg} />
    </SafeArea>
  );
};

export default AddFreeRoutine;

const SafeArea = styled.SafeAreaView``;

const Body = styled.View`
  width: ${() => `${size.width}px`};
  align-items: center;
  padding: 0 40px;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  z-index: -1;
`;

const Header = styled.View`
  width: ${() => `${size.width - 50}px`};
  height: 50px;
  justify-content: center;
`;

const InputArea = styled.View`
  width: 100%;
  align-items: flex-start;
`;

const CategoryText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: ${colors.fontMain60};
  line-height: 34px;
`;

const QuestionText = styled.Text`
  font-weight: 600;
  font-size: 26px;
  color: ${colors.fontMain};
  line-height: 34px;
`;

const AnswerInputArea = styled.View`
  flex-direction: row;
  align-items: center;
  width: 294px;
`;

const AnswerInput = styled.TextInput`
  flex: 1;
  height: 40px;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain};
  padding: 10px 0;
`;

const Divider = styled.View`
  width: 294px;
  height: 0.8px;
  background-color: #fff;
`;

const ScrollSection = styled(View)`
  height: 400px;
`;

const AddButton = styled.TouchableOpacity`
  width: 294px;
  height: 70px;
  border-radius: 8px;
  background-color: rgba(255,255,255,0.4);
  justify-content: center;
  align-items: center;
`;

const AddButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 24px;
`;

const AssetLink = styled.TouchableOpacity`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Spacer = styled(MarginVertical)`
  flex: 1;
`;

const SpareTimeAddButton = styled.TouchableOpacity``;

const SpareTimeButtonText = styled.Text``;
