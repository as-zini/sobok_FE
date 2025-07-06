import React from 'react';
import styled from '@emotion/native';

import drop_down_arrow_icon from '../../../assets/drop_down_arrow_icon.png';
import drop_down_icon_white from '../../../assets/drop_down_icon_white.png';

const DropDownArrowButton = ({ size, handleArrowButton, color }) => {
  return (
    <Container onPress={handleArrowButton}>
      <Icon
        source={color === 'white' ? drop_down_icon_white : drop_down_arrow_icon}
        size={size}
      />
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
