import React from 'react'
import { View } from 'react-native'
import StepNumber from './StepNumber'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import LinkIcon from './LinkIcon'
import { colors } from '../styles/colors'
import MarginVertical from './MarginVertical'

const AssetEl = ({item, index, isLink, category, isInvalid, isTouchable, indexColor, stepColor}) => {
  const navigation = useNavigation();
  console.log(item[4])
  

  return (
    
    item[0] !== "" && isTouchable?
    <SavingEl
      onPress={() => category === "Save" ? navigation.navigate('DetailSave', {id:item[4]})
                              : category === "Routine" ? navigation.navigate('DetailRoutine', {id:item[4]})
                              : navigation.navigate("DetailTodo")}
      isTouchable={isTouchable}                   
    >
        <View>
          <StepNumber step={index+1} isInvalid={isInvalid} indexColor={indexColor} stepColor={stepColor}/>
        </View>
        <View style={{display:'flex', flexGrow:1, width:140}}>
          <SavingTitle style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : ""}}>{item[0]}</SavingTitle>
          <MarginVertical top={7}/>
          <View style={{display:'flex', flexDirection:'row', gap:5}}>
            {isLink ? 
            <LinkIcon size={16}/>
            : <></>}
            <LinkedRoutineTitle style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : ""}}>{item[1]}</LinkedRoutineTitle>
          </View>
        </View>
        <View style={{display:'flex', alignItems:'flex-end'}}>
          <SavingTime style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : colors.indigoBlue}}>{item[2]}</SavingTime>
          <MarginVertical top={7}/>
          <SavingAtFinish style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : ""}}>{item[3]}</SavingAtFinish>
        </View>
      </SavingEl>
      : item[0]!==""&&!isTouchable?
      <SavingElNotTouchable
      onPress={() => category === "Save" ? navigation.navigate('DetailSave', {id:item[4]})
                              : category === "Routine" ? navigation.navigate('DetailRoutine', {id:item[4]})
                              : navigation.navigate("DetailTodo")}
      isTouchable={isTouchable}                   
    >
        <View style={{width:60}}>
          <StepNumber step={index+1} isInvalid={isInvalid}/>
        </View>
        <View style={{display:'flex', flexGrow:1, width:155, display:'flex', alignItems:'flex-start'}}>
          <SavingTitle style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : ""}}>{item[0]}</SavingTitle>
          <MarginVertical top={7}/>
          <View style={{display:'flex', flexDirection:'row', gap:5}}>
            {isLink ? 
            <LinkIcon size={16}/>
            : <></>}
            <LinkedRoutineTitle style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : ""}}>{item[1]}</LinkedRoutineTitle>
          </View>
        </View>
        <View style={{display:'flex', alignItems:'flex-end'}}>
          <SavingTime style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : colors.indigoBlue}}>{item[2]}</SavingTime>
          <MarginVertical top={7}/>
          <SavingAtFinish style={{color:isInvalid ? "rgba(112, 113, 114, 0.8)" : ""}}>{item[3]}</SavingAtFinish>
        </View>
      </SavingElNotTouchable>
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
  gap:13px;
  width:290px;
`

const SavingElNotTouchable = styled.View`
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
  color:${colors.indigoBlue};
`

const SavingAtFinish = styled.Text`
font-size:14px;
font-weight:500;
color:#707172;
`





