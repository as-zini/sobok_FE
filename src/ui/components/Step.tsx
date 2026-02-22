import React from 'react';
import styled from '@emotion/native';

import current_step_icon from '../../../assets/current_step_icon.png';
import not_current_step_icon from '../../../assets/not_current_step_icon.png';

const Steps = ({ step }) => {
  const totalStep = 5;
  const totalArray = Array.from({ length: totalStep }, (_, i) => i < step);

  return (
    <StepsBody>
      {totalArray.map((isCurrent, index) => (
        <StepEl key={index}>
          <StepIcon source={isCurrent ? current_step_icon : not_current_step_icon} />
        </StepEl>
      ))}
    </StepsBody>
  );
};

export default Steps;

const StepsBody = styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10
}));

const StepEl = styled.View``;

const StepIcon = styled.Image(() => ({
  width: 24,
  height: 24
}));