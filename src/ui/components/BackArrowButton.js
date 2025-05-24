import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components'
import back_arrow from '../../../assets/back_arrow.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const BackArrowButton = ({isNotBack, direction, isReset}) => {
  const navigation = useNavigation();
  console.log(isNotBack, direction)

  return (
    <BackArrowButtonBody onPress={() => isNotBack ? isReset ?
      navigation.reset({
        routes:[{
          name:direction
        }]
      }): navigation.navigate(direction.split(" ")[0],{'screen':direction.split(" ")[1] ? direction.split(" ")[1] : ""}) : navigation.goBack()}>
      <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
    </BackArrowButtonBody>
  )
}

export default BackArrowButton

const BackArrowButtonBody = styled.TouchableOpacity`

`

const BackArrowImg = styled.Image`

`