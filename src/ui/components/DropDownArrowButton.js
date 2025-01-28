import React from 'react'
import styled from 'styled-components'

import drop_down_arrow_icon from '../../../assets/drop_down_arrow_icon.png';
import drop_down_icon_white from '../../../assets/drop_down_icon_white.png';

const DropDownArrowButton = ({size, handleArrowButton, color}) => {
  return (
    <DropDownArrowButtonBody onPress={handleArrowButton}>
      <DropDownArrowImage source={color === "white" ? drop_down_icon_white : drop_down_arrow_icon} size={size}/>
    </DropDownArrowButtonBody>
  )
}

export default DropDownArrowButton


const DropDownArrowButtonBody = styled.TouchableOpacity`
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:3;
`

const DropDownArrowImage = styled.Image`
  width:${(props) => props.size}px;
  height:${(props) => props.size}px;
  z-index:3;
`