import React from 'react';
import { View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import styled from '@emotion/native';
import { size } from '../styles/size';

const BlurComponent = ({ child }) => (
  <Container>
    <BlurView
      style={{ flexGrow: 1, width: '100%' }}
      blurType="light"
      blurAmount={10}
    >
      {child()}
    </BlurView>
  </Container>
);

export default BlurComponent;

const Container = styled.View`
  width: ${() => `${size.width}px`};
  border-radius: 16px;
  border-width: 0.5px;
  border-color: rgba(204, 204, 204, 1);
  overflow: hidden;
`;
