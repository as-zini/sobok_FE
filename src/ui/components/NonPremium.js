import React from 'react'
import bg from '../../../assets/nonPremiumUserBg.png'
import { size } from '../styles/size'
import styled from 'styled-components/native'
import { Image, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import crown_icon from '../../../assets/crown_icon.png';
import { colors } from '../styles/colors'
import MarginVertical from './MarginVertical'
import { useNavigation } from '@react-navigation/native'

const NonPremium = () => {
  const navigation = useNavigation();
  
  return (
    <Body>
      <Bg source={bg}/>
      <View style={{flexDirection:'row', gap:7, alignItems:'center', position:'absolute', top:70}}>
      <MaterialCommunityIcons name="alert-circle" size={18} color="#fff" />
      <Text style={{fontSize:13}}>구독 시 볼 수 있는 통계 샘플 이미지입니다.</Text>
      </View>
      <View style={{justifyContent:'center', alignItems:'center', width:"100%", position:'absolute', bottom:120}}>
        <MaterialIcons name="lock-outline" size={24} color="#fff" />
        <MarginVertical top={8}/>
        <Text>{`구독권을 구매하고
  쌓인 시간을 확인해보세요!`}</Text>
        <MarginVertical top={20}/>
        <Image source={crown_icon}/>
        <MarginVertical top={8}/>
        <Button onPress={() => navigation.navigate("ViewPoint")}>
          <Text style={{color:colors.indigoBlue}}>프리미엄 구독권 구매하기</Text>
        </Button>
      </View>
    </Body>
  )
}

export default NonPremium


const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:5;
  padding:50px 30px;
  
  
`

const Bg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  
`

const Text = styled.Text`
  font-size:18px;
  font-weight:500;
  color:#fff;
  text-align:center;
`

const Button = styled.TouchableOpacity`
  width:100%;
  height:56px;
  background-color:#fff;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
`

