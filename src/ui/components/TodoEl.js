import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import LinkIcon from './LinkIcon';
import MarginVertical from './MarginVertical';
import { colors } from '../styles/colors';
import { size } from '../styles/size';

const TodoEl = ({ data, index, todoInfo, routineTitle, isTouchable, days }) => {
  const navigation = useNavigation();

  const Container = isTouchable ? TouchableBody : StaticBody;
  const onPress = isTouchable
    ? () =>
        navigation.navigate('DetailTodo', {
          todoInfo,
          index,
          routineTitle,
          days
        })
    : undefined;

  return (
    <Container onPress={onPress}>
      <IndexCircle>
        <IndexText>{index + 1}</IndexText>
      </IndexCircle>

      <Row>
        <TitleText>{data[0]}</TitleText>
        <DueTimeText>{data[2]}</DueTimeText>
      </Row>

      <Row>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', gap: 5 }}>
          <LinkIcon size={14} />
          <AppText>{data[1]}</AppText>
        </View>
        <TimeText>{data[3]}</TimeText>
      </Row>

      <MarginVertical top={8} />
    </Container>
  );
};

export default TodoEl;

/* Emotion styled components */

const TouchableBody = styled.TouchableOpacity`
  width: 100%;
  height: 64px;
  flex-direction: column;
`;

const StaticBody = styled.TouchableOpacity`
  width: ${() => `${(size.width - 60) * 0.9}px`};
  height: 64px;
  flex-direction: column;
`;

const IndexCircle = styled.View`
  width: 18px;
  height: 18px;
  background-color: ${colors.fontMain};
  border-radius: 9px;
  justify-content: center;
  align-items: center;
`;

const IndexText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #343434;
  flex: 1;
`;

const AppText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray70};
`;

const DueTimeText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.indigoBlue};
`;

const TimeText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray70};
`;
