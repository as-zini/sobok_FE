import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from 'styled-components';

import CreateLoading from '../components/CreateLoading'
import airoutine_complete_bg from '../../../assets/airoutine_complete_bg.png';
import { size } from '../styles/size';
import complete_icon from '../../../assets/complete_icon.png';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const AiRoutineCompleteScreen = () => {
  const [isCreateComplete, setIsCreateComplete] = useState(false);
  const navigation = useNavigation();

  return (
    <>
    {!isCreateComplete
      ? <CreateLoading/>
      :
      <SafeAreaView>
        <AiRoutineCompleteBody>
          <AiRoutineCompleteIcon source={complete_icon}/>
          <MarginVertical top={40}/>
          <AiRoutingCompleteTitle>지윤 님만의{"\n"}AI루틴 만들기 완성!</AiRoutingCompleteTitle>
          <MarginVertical top={18}/>
          <AiRoutineCompleteText>이제 지윤 님에게 딱 맞는{"\n"}루틴을 보러 가요!</AiRoutineCompleteText>
          <View style={{position:'absolute', bottom:100}}>
            <Button text={"루틴 보러 가기"} handleButton={() => navigation.navigate("Tabs")}/>
          </View>
        </AiRoutineCompleteBody>
        <AiRoutineCompleteBg source={airoutine_complete_bg}/>
      </SafeAreaView>
    }
    </>
  )
}

export default AiRoutineCompleteScreen


const AiRoutineCompleteBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;  
  display:flex;
  justify-content:center;
  align-items:center;
`

const AiRoutineCompleteBg = styled.Image`
  width:${size.width}px;
  height:${size.height}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const AiRoutineCompleteIcon = styled.Image`
  width:96px;
  height:62px;
`

 const AiRoutingCompleteTitle = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
  text-align:center;
 `

 const AiRoutineCompleteText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  text-align:center;

 `

