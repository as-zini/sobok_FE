import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import MarginVertical from './MarginVertical'
import AssetEl from './AssetEl'
import styled from 'styled-components'
import { useRoutine } from '../../hooks/useRoutine'
import { colors } from '../styles/colors'
import search_icon from '../../../assets/search_icon.png';
import { minToHour } from '../../util'


const ConnectRoutine = ({pickedRoutines, setPickedRoutines}) => {
  const {getRoutineByList} = useRoutine();
  const [routineInfo, setRoutineInfo] = useState([])
  const [isComplete, setIsComplete] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getRoutineByList(setRoutineInfo, setIsComplete);
  }, [])
  
  

  return (
    <View>
      <Body>
        <View style={{width:'100%'}}>
          <Text style={{fontWeight:600, fontSize:26, color:colors.fontMain}}>{"적금에 루틴을\n연결시켜 볼까요?"}</Text>
          <MarginVertical top={12}/>
          <Text style={{fontWeight:500, fontSize:18, color:colors.fontMain60}}>{"아직 적금이 연결되지 않은\n루틴 중 선택할 수 있어요!"}</Text>
        </View> 
              <MarginVertical top={35}/>
              <AnswerInputArea>
                <AnswerInput
                  placeholder="루틴을 검색해보세요"
                  placeholderTextColor="rgba(255,255,255,.8)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.nativeEvent.text)}
                />
                <Image source={search_icon} style={{width:16, height:16, position:'absolute', right:15}}/>
              </AnswerInputArea>
              <BorderLine/>
              <MarginVertical top={55}/>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text style={{fontSize:18, fontWeight:600, color:"#fff"}}>{`총 ${searchValue.length === 0 ? routineInfo.filter((el) => el.accountTitle.length === 0).length : routineInfo.filter((el) => el.title.includes(searchValue)).length}개의 루틴`}</Text>
                  <MarginVertical top={40}/>
                </View>
                
                {searchValue.length === 0 ? routineInfo.filter((el) => el.accountTitle.length === 0).map((el,index) => {
                  return(
                    <TouchableOpacity key={index} onPress={() => {
                      setPickedRoutines(prev => [...prev, el])
                      }}>
                      <AssetEl item={[el.title,"",minToHour(el.duration),""]} index={index} isLink={false} category={"Save"} isTouchable={false}/>
                      <MarginVertical top={50}/>
                    </TouchableOpacity>
                  )
                }) : routineInfo.filter((el) => el.title.includes(searchValue)).map((el,index) => {
                  return(
                    <TouchableOpacity key={index} onPress={() => {
                      setPickedRoutines(prev => [...prev, el])
                      }}>
                      <AssetEl item={[el.title,"",minToHour(el.duration),""]} index={index} isLink={false} category={"Save"} isTouchable={false}/>
                      <MarginVertical top={50}/>
                    </TouchableOpacity>
                  )
                })}
                
                {pickedRoutines.length > 0 ?
                  <View>
                    <BorderLine/>
                    <MarginVertical top={30}/>
                    <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
                    <Text style={{fontSize:18, fontWeight:600, color:"#fff", flexGrow:1}}>선택된 루틴</Text>
                    <Text style={{color:"#fff", fontWeight:500, fontSize:14}}>한 달</Text>
                    <Text style={{color:"#fff", fontWeight:500, fontSize:18}}>{`${minToHour(pickedRoutines.reduce((sum,el) => sum += el.duration,0))}`}</Text>
                    </View>
                    <MarginVertical top={40}/>
                  </View>
                  :
                  <></>
                }
                {pickedRoutines.map((el,index) => {
                  return(
                    <TouchableOpacity key={index} onPress={() => setPickedRoutines(pickedRoutines.filter((j) => el !== j))}>
                      <AssetEl item={[el.title,"",minToHour(el.duration),""]} index={index} isLink={false} category={"Save"} isTouchable={false}/>
                      <MarginVertical top={50}/>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
              <TouchableOpacity style={{width:294, display:'flex', justifyContent:'center', alignItems:'center'}} onPress={() => setStep(prev => prev + 1)}>
                <Text style={{fontWeight:500, fontSize:14, color:colors.gray70}}>나중에 설정하기</Text>
              </TouchableOpacity>
              <MarginVertical top={10}/>
              </Body>
              
    </View>
  )
}

export default ConnectRoutine

const Body = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:0 30px;
  height:83%;
`
const Header = styled.View`
  width:100%;
  height:50px;
  justify-content:center;
`

const Bg = styled.Image`
  width:100%;
  position:absolute;
  top:0;
  z-index:-1;
`

const RoutineCategoryText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
  line-height:34px;
  
`

const RoutineQuestionText = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain};
  line-height:34px;

`

const AnswerInputArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const AnswerInput = styled.TextInput`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain};
  width:294px;
  height:40px;
  padding:10px 0;
`

const BorderLine = styled.View`
  width:294px;
  height:.8px;
  background-color:#fff;
`