import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';

import continuity_bg from '../../../assets/continuity_bg.png';
import snow_flake_icon_white from '../../../assets/snow_flake_icon_white.png';
import { useGetInfo } from '../../hooks/useGetInfo';

const ContinuitySuccess = () => {
  const [achieve, setAchieve] = useState(0);
  const { getContinuitySuccess } = useGetInfo();

  useEffect(() => {
    getContinuitySuccess(setAchieve);
  }, []);

  return (
    <Container>
      <Body>
        <Icon source={snow_flake_icon_white} />
        <TextStyled>{`${achieve}일`}</TextStyled>
      </Body>
      <Background source={continuity_bg} />
    </Container>
  );
};

export default ContinuitySuccess;

const Container = styled.View`
  position: relative;
`;

const Body = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 30px;
  gap: 5px;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Icon = styled.Image`
  width: 16px;
  height: 16px;
  z-index: 1;
`;

const TextStyled = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  z-index: 1;
`;
