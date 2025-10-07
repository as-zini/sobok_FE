import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';
import { useRoutine } from '../../hooks/useRoutine';
import { colors } from '../styles/colors';
import { minToHour } from '../../util';
import { size } from '../styles/size';
import AssetEl from '../components/AssetEl';
import MarginVertical from '../components/MarginVertical';

const searchIcon = require('../../../assets/search_icon.png');

const ConnectRoutine = ({ pickedRoutines, setPickedRoutines, setStep }) => {
  const { getRoutineByList } = useRoutine();
  const [routineInfo, setRoutineInfo] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    getRoutineByList(setRoutineInfo, setIsComplete);
  }, []);

  const filtered = searchValue
    ? routineInfo.filter(el => el.title.includes(searchValue))
    : routineInfo

  return (
    <Container>
      <HeaderText>적금에 루틴을{`\n`}연결시켜 볼까요?</HeaderText>
      <MarginVertical top={12} />
      <SubText>아직 적금이 연결되지 않은{`\n`}루틴 중 선택할 수 있어요!</SubText>
      <MarginVertical top={35} />
      <InputWrapper>
        <Input
          placeholder="루틴을 검색해보세요"
          placeholderTextColor="rgba(255,255,255,0.8)"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <SearchIcon source={searchIcon} />
      </InputWrapper>
      <Divider />
      <MarginVertical top={30} />
      <CountText>
        총 {filtered.length}개의 루틴
      </CountText>
      <MarginVertical top={40} />
      <ScrollArea showsVerticalScrollIndicator={false}>
        { filtered.map((el, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => pickedRoutines.includes(el) ? setPickedRoutines(prev => prev.filter((p) => p.id !== el.id)):setPickedRoutines(prev => [...prev, el])}
          >
            <AssetEl
              item={[el.title, '', minToHour(el.duration), '']}
              index={idx}
              isLink={false}
              category="Save"
              isTouchable={false}
            />
            <MarginVertical top={50} />
          </TouchableOpacity>
        ))}
        {pickedRoutines.length > 0 && (
          <>
            <Divider />
            <MarginVertical top={30} />
            <FooterRow>
              <Text style={{ fontSize: 18, fontWeight: 600, color: '#fff', flex: 1 }}>
                선택된 루틴
              </Text>
              <Text style={{ color: '#fff', fontWeight: 500, fontSize: 14, marginRight: 5 }}>
                한 달
              </Text>
              <Text style={{ color: '#fff', fontWeight: 500, fontSize: 18 }}>
                {minToHour(pickedRoutines.reduce((sum, el) => sum + el.duration, 0))}
              </Text>
            </FooterRow>
            <MarginVertical top={40} />
            {pickedRoutines.map((el, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setPickedRoutines(r => r.filter(item => item !== el))}
              >
                <AssetEl
                  item={[el.title, '', minToHour(el.duration), '']}
                  index={idx}
                  isLink={false}
                  category="Save"
                  isTouchable={false}
                  isChecked
                />
                <MarginVertical top={50} />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollArea>
      <LaterButton onPress={() => (setStep ? setStep(s => s + 1) : null)}>
        <LaterText>나중에 설정하기</LaterText>
      </LaterButton>
    </Container>
  );
};

export default ConnectRoutine;

const Container = styled.View`
  width: 100%;
  height: 73%;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 26px;
  color: ${colors.fontMain};
  text-align: left;
  width: 100%;
`;

const SubText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: ${colors.fontMain60};
  text-align: left;
  width: 100%;
`;

const InputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain};
  height: 40px;
  padding-horizontal: 10px;
`;

const SearchIcon = styled(Image)`
  width: 16px;
  height: 16px;
  position: absolute;
  right: 15px;
`;

const Divider = styled.View`
  width: 100%;
  height: 0.8px;
  background-color: #fff;
`;

const CountText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  width: 100%;
`;

const ScrollArea = styled(ScrollView)`
  width: 100%;
  height: 47%;
`;

const FooterRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const LaterButton = styled.TouchableOpacity`
  width: 294px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const LaterText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray70};
`;
