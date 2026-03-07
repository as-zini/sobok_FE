import React from 'react';
import styled from '@emotion/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DropDownArrowButton = ({ size, handleArrowButton, color }) => {
  return (
    <Container onPress={handleArrowButton}>
       <MaterialIcons name="keyboard-arrow-down" size={24} color={color === "white" ? "#fff" : "#777"} />
    </Container>
  );
};

export default DropDownArrowButton;

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const Icon = styled.Image`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  z-index: 3;
`;
