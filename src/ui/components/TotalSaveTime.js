import React from 'react'
import styled from 'styled-components'

import total_save_time_bg from '../../../assets/total_save_time_bg.png';
import { size } from '../styles/size';
import { Image, ScrollView, SectionList, Text, View } from 'react-native';
import time_icon from '../../../assets/time_icon.png';
import SnowFlakeIcon from './SnowFlakeIcon';
import ProgressBar from './ProgressBar';
import { colors } from '../styles/colors';
import check_icon_white from '../../../assets/check_icon_white.png';
import LinkIcon from './LinkIcon';
import SmallButton from './SmallButton';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import MarginVertical from './MarginVertical';
import { useNowTodoStore } from '../../store/todo';

const TotalSaveTime = ({time}) => {
  const navigation = useNavigation();
  const {nowTodo} = useNowTodoStore();
  const Data = [
    {
      title:"09:00 - 10:25",
      data:[["아침에는 영어 공부", "영어 적금", "1H 25M"]]
    },{
      title:"10:00 - 10:25",
      data:[["아침에는 영어 공부", "영어 적금", "1H 25M"]]
    }
  ]

  const RenderItem = ({item, index}) => {
    return(
      <>
      <View style={{display:'flex', flexDirection:'row'}}>
        <View style={{flexGrow:.1}}>
          <View style={{backgroundColor:colors.fontMain, borderRadius:'50%', width:40, height:40, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Image source={check_icon_white} style={{width:30, height:26}}/>
          </View>
        </View>
        <View style={{flexGrow:1}}>
          <Text style={{fontSize:18, fontWeight:600, color:"#343434"}}>{item[0]}</Text>
          <MarginVertical top={5}/>
          <View style={{display:'flex', flexDirection:'row', gap:5}}>
            <LinkIcon size={16}/>
            <SmallText style={{textAlign:'end'}}>{item[1]}</SmallText>
          </View>
        </View>
        <Text style={{color:colors.indigoBlue, fontWeight:600, fontSize:18}}>{item[2]}</Text>
        
      </View>
      <MarginVertical top={40}/>
     </>
    )
  }

  const ListHeader = ({title}) => {
    return(
      <>
        <Text style={{fontWeight:500, fontSize:14, color:colors.gray70}}>{title}</Text>
        <MarginVertical top={24}/>
      </>
    )
  }

  return (
    <>
    <ScrollView>
    <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <TotalSaveTimeBody>
        <MarginVertical top={80}/>
        <Image source={time_icon} style={{width:40, height:48}}/>
        <MarginVertical top={15}/>
        <TotalSaveTimeText>이번에 모은 시간</TotalSaveTimeText>
        <TotalSaveTimeTitle>{time}</TotalSaveTimeTitle>
        <MarginVertical top={20}/>
        <SnowFlakeIcon color={'indigo'} size={16}/>
        <MarginVertical top={8}/>
        <CompletedTodo>총 2개의 할 일 중{"\n"}1개의 할 일 완료!</CompletedTodo>
        <MarginVertical top={40}/>
        <RestOfTime>
          <RestOfTimeText>2H 5M 남았어요!</RestOfTimeText>
        </RestOfTime>
        <MarginVertical top={36}/>
        <ProgressBar/>
        <MarginVertical top={56}/>
        <SectionList
         sections={Data}
         scrollEnabled={true}
         keyExtractor={(item, index) => item + index}
         renderItem={({item, index}) => (
           <RenderItem item={item} index={index}></RenderItem>
         )}
         renderSectionHeader={({section: {title}}) => (
           <ListHeader title={title}/>
         )}
        >

        </SectionList>
        <MarginVertical top={60}/>
        <SmallText>영어 적금에{"\n"}소복!하게 저금 완료</SmallText>
        <MarginVertical top={8}/>
        <Button text={"시간 모으러 가기"} handleButton={() => navigation.reset({
          routes:[{
            name:'Tabs'
          }]
        })}/>
      </TotalSaveTimeBody>
    </View>
    </ScrollView>
    <TotalSaveTimeBg source={total_save_time_bg}/>
    </>
    
  )
}

export default TotalSaveTime


const TotalSaveTimeBody = styled.View`
  width:${size.width-80}px;
  display:flex;
  justify-content:center;
 
`

const TotalSaveTimeBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const TotalSaveTimeText = styled.Text`
  font-weight:600;
  font-size:26px;
  color:${colors.fontMain80};
`

const TotalSaveTimeTitle = styled.Text`
  font-weight:600;
  font-size:42px;
  color:${colors.fontMain};
`

const CompletedTodo = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontMain70};
`

const RestOfTime = styled.View`
  background-color:${colors.indigoBlue50};
  width:114px;
  height:30px;
  border-radius:15px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const RestOfTimeText = styled.Text`
  font-weight:500;
  font-size:14px;
  color:#fff;
`

const SmallText = styled.Text`
  font-size:14px;
  font-weight:500;
  color:${colors.gray70};
  text-align:center;
`
