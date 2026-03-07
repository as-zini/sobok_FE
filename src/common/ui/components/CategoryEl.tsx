// CategoryEl.js
import React from 'react';
import styled from '@emotion/native';
import { View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { colors } from '../styles/colors';

const CategoryEl = ({ text, selected, setSelected }) => {
  return (
    <CategoryElBody
      activeOpacity={0.7}
      onPress={() => setSelected(text)}
      style={{
        backgroundColor:
          selected === text ? colors.indigoBlue : 'rgba(255,255,255,0.5)',
      }}
    >
      <CategoryIcon>
        {selected === text ? (
          <Fontisto name="check" size={10} color="#fff" />
        ) : (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(20, 36, 72, 0.4)',
            }}
          />
        )}
      </CategoryIcon>
      <CategoryText
        style={{
          color: selected === text ? '#fff' : 'rgba(20, 36, 72, 0.4)',
        }}
      >
        {text}
      </CategoryText>
    </CategoryElBody>
  );
};

export default CategoryEl;

const CategoryElBody = styled.TouchableOpacity`
  height: 40px;
  border-radius: 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  gap: 5px;
`;

const CategoryIcon = styled.View``;

const CategoryText = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;
