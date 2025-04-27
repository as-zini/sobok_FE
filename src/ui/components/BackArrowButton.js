import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components'
import back_arrow from '../../../assets/back_arrow.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const BackArrowButton = () => {
  const navigation = useNavigation();

  return (
    <BackArrowButtonBody onPress={() => navigation.goBack()}>
      <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
    </BackArrowButtonBody>
  )
}

export default BackArrowButton

const BackArrowButtonBody = styled.TouchableOpacity`

`

const BackArrowImg = styled.Image`

`