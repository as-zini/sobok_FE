import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components'
import back_arrow from '../../../assets/back_arrow.png';


const BackArrowButton = () => {
  const navigation = useNavigation();

  return (
    <BackArrowButtonBody onPress={() => navigation.goBack()}>
      <BackArrowImg source={back_arrow} />
    </BackArrowButtonBody>
  )
}

export default BackArrowButton

const BackArrowButtonBody = styled.TouchableOpacity`

`

const BackArrowImg = styled.Image`

`