import React from 'react'
import { View } from 'react-native'
import StepNumber from './StepNumber'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import LinkIcon from './LinkIcon'
import { colors } from '../styles/colors'
import MarginVertical from './MarginVertical'

const AssetEl = ({item, index, isLink, category}) => {
  const navigation = useNavigation();
  console.log(item)

  return (
    
    item[0] !== "" ?
    <SavingEl onPress={() => category === "Save" ? navigation.navigate('DetailSave', {id:item[4]})
                            : category === "Routine" ? navigation.navigate('DetailRoutine', {id:item[4]})
                            : navigation.navigate("DetailTodo")}>
        <View style={{flexGrow:.15}}>
          <StepNumber step={index+1}/>
        </View>
        <View style={{display:'flex', flexGrow:1}}>
          <SavingTitle>{item[0]}</SavingTitle>
          <MarginVertical top={7}/>
          <View style={{display:'flex', flexDirection:'row', gap:5}}>
            {isLink ? 
            <LinkIcon size={16}/>
            : <></>}
            <LinkedRoutineTitle LinkedRoutineTitle>{item[1]}</LinkedRoutineTitle>
          </View>
        </View>
        <View style={{display:'flex', alignItems:'flex-end'}}>
          <SavingTime>{item[2]}</SavingTime>
          <MarginVertical top={7}/>
          <SavingAtFinish>{item[3]}</SavingAtFinish>
        </View>
      </SavingEl>
      :
      <></>
    
      
  )
}

export default AssetEl;


const SavingEl = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:290px;
`

const SavingTitle = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#343434;
`

const LinkedRoutineTitle = styled.Text`
  font-size:14px;
  font-weight:500;
  color:#707172;
`

const SavingTime = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.indigoBlue}
`

const SavingAtFinish = styled.Text`
font-size:14px;
font-weight:500;
color:#707172;
`





