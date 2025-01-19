import React, { useEffect } from 'react'
import styled from 'styled-components';

import current_step_icon from '../../../assets/current_step_icon.png';
import not_current_step_icon from '../../../assets/not_current_step_icon.png';

const Steps = ({step}) => {
  const totalStep = 5;
  const currentArray = Array(step).fill(true);
  const notCurrentArray = Array(totalStep-step).fill(false);
  const totalArray = [...currentArray, ...notCurrentArray];

  useEffect(() => {
    console.log(currentArray);
    console.log(totalStep-step);
  },[])

  return (
    <StepsBody>
      
        {totalArray.map((el, index) => {
          return(
          el === true ? <StepEl key={index}><StepIcon source={current_step_icon}/></StepEl> : <StepEl key={index}><StepIcon source={not_current_step_icon}/></StepEl> 
          )
        })}
        
    </StepsBody>
  )
}

export default Steps;

const StepsBody = styled.View`
  display:flex;
  flex-direction:row;
  gap:10px;
`

const StepEl = styled.View`

`

const StepIcon = styled.Image`
  width:24px;
  height:24px;
`

