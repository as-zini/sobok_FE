import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'

import Fontisto from '@expo/vector-icons/Fontisto';
import { View } from 'react-native';

const CategoryEl = ({text, selected, setSelected}) => {

  return (
    <CategoryElBody style={{backgroundColor:selected === text ? colors.indigoBlue : "rgba(255,255,255,.5)"}} onPress={() => setSelected(text)}>
      <CategoryIcon>
        {selected === text ? <Fontisto name="check" size={10} color="#fff" /> : <View style={{width:8, height:8, borderRadius:'50%', backgroundColor:"rgba(20, 36, 72, 0.4)"}}></View>}
      </CategoryIcon>
      <CategoryText style={{color:selected===text ? "#fff" : "rgba(20, 36, 72, 0.4)"}}>{text}</CategoryText>
    </CategoryElBody>
  )
}

export default CategoryEl


const CategoryElBody = styled.TouchableOpacity`
  height:40px;
  border-radius:24px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:5px;
  padding:0 20px;
  
`

const CategoryIcon = styled.View`

`

const CategoryText = styled.Text`
  font-size:18px;
  font-weight:500;

`