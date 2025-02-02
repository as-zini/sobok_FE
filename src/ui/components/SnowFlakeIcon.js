import React from 'react'
import { Image } from 'react-native'

import snow_flake_icon from '../../../assets/snowflak_icon.png';
import snow_flake_white_icon from '../../../assets/snow_flake_icon_white.png';
import snow_flake_icon_black from '../../../assets/snow_flake_icon_black.png';

const SnowFlakeIcon = ({color, size}) => {
  return (
    <Image source={color==="indigo" ? snow_flake_icon : color==="white" ?  snow_flake_white_icon : snow_flake_icon_black} style={{width:size, height:size}}></Image>
  )
}

export default SnowFlakeIcon

