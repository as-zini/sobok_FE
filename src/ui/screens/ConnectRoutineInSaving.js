import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import ConnectRoutine from '../components/ConnectRoutine'
import styled from 'styled-components';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import bg from '../../../assets/test_bg.png';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';

const ConnectRoutineInSaving = ({route}) => {
  const [pickedRoutines, setPickedRoutines] = useState([])
  const navigation = useNavigation();
  const {id} = route.params;
  const {handleConnectAsset} = useInstallmentSaving();

  useEffect(() => {
    console.log(pickedRoutines)
  }, [pickedRoutines])

  const handleButton = () => {
    handleConnectAsset(id, pickedRoutines.map((el) => el.id));
    navigation.goBack()
  }
  

  return (
    <SafeAreaView>
      <Body>
        <Header>
          <BackArrowButton/>
        </Header>
        <MarginVertical top={40}/>
        <ConnectRoutine pickedRoutines={pickedRoutines} setPickedRoutines={setPickedRoutines}/>
        <View style={{position:'absolute', bottom:120}}>
          <Button text={"연결하기"} handleButton={handleButton}/>
        </View>
      </Body>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default ConnectRoutineInSaving


const Body = styled.View`
  display:flex;
  align-items:center;
  width:${size.width}px;
  padding: 0 30px;
  height:${size.height}px;
`

const Header = styled.View`
  height:50px;
  display:flex;
  width:100%;
  justify-content:center;
`

const Bg = styled.Image`
  width:${size.width}px;
  height:${size.height}px;
  position:absolute;
  top:0;
  z-index:-1;

`