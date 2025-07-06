import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from '@emotion/native';

import short_alert_bg from '../../../assets/short_alert_bg.png';
import { colors } from '../styles/colors';

const ShortAlertArea = ({ text, width, height }) => (
  <ShortAlertAreaBody style={{ width, height }}>
    <ShortAlertText>{text}</ShortAlertText>
    {/* <ShortAlertAreaBg source={short_alert_bg} style={{ width, height }} /> */}
  </ShortAlertAreaBody>
);

export default ShortAlertArea;

const ShortAlertAreaBody = styled.View`
  border-radius: 15px;
  background-color: ${colors.indigoBlue50};
  justify-content: center;
  align-items: center;
`;

const ShortAlertAreaBg = styled.Image`
  position: absolute;
`;

const ShortAlertText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;
