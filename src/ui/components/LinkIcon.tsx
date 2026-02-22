import React from 'react'
import { Image } from 'react-native'
import link_icon from '../../../assets/link_icon.png';

const LinkIcon = ({size}) => {
  return (
    <Image source={link_icon} style={{width:size, height:size}}/>
  )
}

export default LinkIcon