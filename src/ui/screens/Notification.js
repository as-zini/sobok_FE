import React from 'react'
import { Image, SafeAreaView, ScrollView, View } from 'react-native'
import { size } from '../styles/size'
import styled from 'styled-components'
import bg from '../../../assets/savetime_bg.png';
import icon from '../../../assets/login_icon.png';
import BackArrowButton from '../components/BackArrowButton';
import MarginVertical from '../components/MarginVertical';
import { colors } from '../styles/colors';
import SnowFlakeIcon from '../components/SnowFlakeIcon';

const Notification = () => {
  const notiArr = [["10월 3일",["알림이 왔어요!","3시간전"],["집가고싶다...","3시간전"]],["10월 2일",["알림이 왔어요!", "1일전"],["알림이 왔어요!","1일전"]]]

  return (
    <SafeAreaView>
      <Body>
        <ScrollView>
        <Header>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
        </Header>
        <MarginVertical top={30}/>
        <Image source={icon} style={{width:48, height:40}}/>
        <MarginVertical top={20}/>
        <Title>알림</Title>
        <MarginVertical top={40}/>
        <SnowFlakeIcon size={16} color={"indigo"}/>
        <MarginVertical top={8}/>
        <Text style={{fontWeight:600, color:colors.fontMain90}}>{`새로운 알림 3개가 있어요!`}</Text>
        <MarginVertical top={25}/>
        <ContentsArea>
          {notiArr.map((el,index) => {
            return(
              <View key={index}>
                <Text style={{fontSize:14, fontWeight:500, color:"#707172"}}>{el[0]}</Text>
                {el.map((noti, idx) => {
                  return(
                    idx >= 1?
                    <NotiEl>
                      <View >
                      <View style={{backgroundColor:colors.fontMain, borderRadius:15, width:30, height:30, justifyContent:'center', alignItems:'center'}}>
                        <SnowFlakeIcon size={14} color={'white'}/>
                      </View>
                      <NewSign/>
                      </View>
                      <View style={{gap:5}}>
                        <Text >{noti[0]}</Text>
                        <Text style={{fontSize:14, color:"rgba(112, 113, 114, 0.7)"}}>{noti[1]}</Text>
                      </View>
                    </NotiEl>
                    :
                    <></>
                  )
                })}
              </View>
            )
          })}
        </ContentsArea>
        </ScrollView>
      </Body>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default Notification

const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  padding:0 40px;
  display:flex;
`

const Bg = styled.Image`
  width:${size.width}px;
  height:${size.height}px;
  z-index:-1;
  position:absolute;
  top:0;

`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
`

const Title = styled.Text`
  font-weight:600;
  font-size:34px;
  color:${colors.fontMain};
`

const Text = styled.Text`
  font-size:18px;
  font-weight:500;
  color:rgba(52, 52, 52, 0.8);
`

const NotiEl = styled.View`
  display:flex;
  flex-direction:row;
  gap:18px;
  justify-content:flex-start;
  padding:20px 0;
`

const NewSign = styled.View`
  width:7px;
  height:7px;
  border-radius:3px;
  background-color:${colors.fontMain};
  position:absolute;
  right:-5px;
  top:-5px;
`

const ContentsArea = styled.View`

`
