import React from 'react'
import styled from 'styled-components'

import navigate_icon from '../../../assets/navigate_icon.png';

const NavigateArrowButton = ({handleArrowButton}) => {
  return (
    <NavigateArrowButtonBody onPress={handleArrowButton}>
      <NavigateArrowButtonImage source={navigate_icon}/>
    </NavigateArrowButtonBody>
  )
}

export default NavigateArrowButton


const NavigateArrowButtonBody = styled.TouchableOpacity`

`

const NavigateArrowButtonImage = styled.Image`
  width:24px;
  height:24px;
`