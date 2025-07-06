import React from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from '@emotion/native'
import { size } from '../styles/size'
import { colors } from '../styles/colors'
import BackArrowButton from '../components/BackArrowButton'
import bg from '../../../assets/setting_bg.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MarginVertical from '../components/MarginVertical'
import { useNavigation } from '@react-navigation/native'


const SettingTermList = () => {
  const categoryArr = ["개인정보 수집·이용 동의","개인정보 처리방침","서비스 이용약관"]
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Body>
        <Header>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <Text>약관 및 개인정보 처리 동의</Text>
        </Header>
        <MarginVertical top={20}/>
        {categoryArr.map((el,index) => {
          return(
            <CategoryEl key={index}>
              <Text>{el}</Text>
              <RightArrowIcon onPress={() => navigation.navigate("SettingTerm",{version:index+1})}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#4c4c4c" />
              </RightArrowIcon>
            </CategoryEl>
          )
        })}
      </Body>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default SettingTermList


const Body = styled.View`
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  padding:0 30px;
`

const Bg = styled.Image`
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  z-index:-1;
  position:absolute;
  top:0;

`

const Header = styled.View`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  height:50px;
`

const Text = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain80};
`

const RightArrowIcon = styled.TouchableOpacity`
  display:flex;
  justify-content:center;
  align-items:center;
  width:50px;
  height:50px;
`

const CategoryEl = styled.View`
  width:100%;
  height:55px;
  display:flex;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`

