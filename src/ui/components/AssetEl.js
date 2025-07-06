import React from 'react';
import { View } from 'react-native';
import StepNumber from './StepNumber';
import { useNavigation } from '@react-navigation/native';
import LinkIcon from './LinkIcon';
import MarginVertical from './MarginVertical';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import styled from '@emotion/native';

const AssetEl = ({
  item,
  index,
  isLink,
  category,
  isInvalid,
  isTouchable,
  indexColor,
  stepColor,
  isChecked,
}) => {
  const navigation = useNavigation();

  if (item[0] === '') return null;

  const content = (
    <>
      <View>
        <StepNumber
          step={index + 1}
          isInvalid={isInvalid}
          indexColor={indexColor}
          stepColor={stepColor}
          isChecked={isChecked}
        />
      </View>
      <View style={{ flexGrow: 1, width: isTouchable ? 140 : 155 }}>
        <SavingTitle invalid={isInvalid}>{item[0]}</SavingTitle>
        <MarginVertical top={7} />
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          {isLink && <LinkIcon size={16} />}
          <LinkedRoutineTitle invalid={isInvalid}>{item[1]}</LinkedRoutineTitle>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <SavingTime invalid={isInvalid}>{item[2]}</SavingTime>
        <MarginVertical top={7} />
        <SavingAtFinish invalid={isInvalid}>{item[3]}</SavingAtFinish>
      </View>
    </>
  );

  const handlePress = () => {
    if (category === 'Save') {
      navigation.navigate('DetailSave', { id: item[4] });
    } else if (category === 'Routine') {
      navigation.navigate('DetailRoutine', { id: item[4] });
    } else {
      navigation.navigate('DetailTodo');
    }
  };

  return isTouchable ? (
    <SavingElTouchable onPress={handlePress}>
      {content}
    </SavingElTouchable>
  ) : (
    <SavingElView>{content}</SavingElView>
  );
};

export default AssetEl;

const SavingElTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 13px;
  width: ${size.width - 70}px;
`;

const SavingElView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 13px;
  width: ${size.width - 70}px;
`;

const SavingTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) =>
    props.invalid ? 'rgba(112, 113, 114, 0.8)' : '#343434'};
`;

const LinkedRoutineTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.invalid ? 'rgba(112, 113, 114, 0.8)' : `${colors.gray70}`};
`;

const SavingTime = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) =>
    props.invalid ? 'rgba(112, 113, 114, 0.8)' : `${colors.indigoBlue}`};
`;

const SavingAtFinish = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.invalid ? 'rgba(112, 113, 114, 0.8)' : '#707172'};
`;
