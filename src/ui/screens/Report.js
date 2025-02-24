import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, SectionList, Text, View } from 'react-native'
import styled from 'styled-components'

import report_bg from '../../../assets/report_bg.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import SnowCardEl from '../components/SnowCardEl';
import MarginVertical from '../components/MarginVertical';
import report_arrive_icon from '../../../assets/report_arrive_icon.png';
import calandar_icon from '../../../assets/calandar_icon.png';
import time_icon from '../../../assets/time_icon.png';
import down_navigate_icon from '../../../assets/down_navigate_icon.png';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import TodoEl from '../components/TodoEl';
import TimeSliderBar from '../components/TimeSliderBar';
import Calandar from '../components/Calandar';
import report_save_bg from '../../../assets/report_save_bg.png';
import books_graphic from '../../../assets/books_graphic.png';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useReport } from '../../hooks/useReport';
import dayjs from 'dayjs';

const Report = () => {
  const navigation = useNavigation();
  const {getReportInfo} = useReport();
  const [today, setToday] = useState(dayjs().subtract(1,'month'))

  useEffect(() => {
    getReportInfo()
  }, [])
  

  const ReportContents1 = () => {
    return(
      <ReportContentsBody>
        <ReportIcon source={report_arrive_icon}/>
        <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end', gap:10}}>
          <ReportTitle>{today.format("M월")}</ReportTitle>
          <ReportText>{today.format("YYYY년")}</ReportText>
        </View>
        <ReportTitle>리포트 도착!</ReportTitle>
        <MarginVertical top={15}/>
        <ReportText>{`지윤 님의\n${today.get('month')+1}월 눈 리포트가 도착했습니다!\n얼른 보러 가봐요!`}</ReportText>
        <MarginVertical top={20}/>
        <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
      </ReportContentsBody>
    )
  }

  const ReportContents2 = () => {
    const data = [
      {
        title:"루틴",
        data:[["아침에는 영어 공부","5H 25M"], ["저녁에는 독서","6H 25M"]]
      },{
        title:"적금",
        data:[["영어 적금","9H 10M"]]
      }
    ]

    const RenderItem = ({item, index}) => {
      return(
        <>
        <View style={{flexDirection:'row', gap:10, justifyContent:'center', alignItems:'center'}}>
          <View style={{width:24, height:24, backgroundColor:colors.fontMain, borderRadius:'50%', justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'#fff', fontSize:14, fontWeight:600}}>{index+1}</Text>
          </View>
          <Text style={{fontSize:18, fontWeight:600, color:"#343434", flexGrow:1}}>{item[0]}</Text>
          <Text style={{fontSize:18, fontWeight:600, color:colors.indigoBlue}}>{item[1]}</Text>
        
        </View>
        <MarginVertical top={32}/>
        </>
      )
    }

    const ListHeader = ({title}) => {
      return(
        <>
        <Text style={{fontSize:18, fontWeight:500, color:colors.fontMain60}}>{title}</Text>
        <MarginVertical top={20}/>
        </>
      )
    }

    
    return(
    <ReportContentsBody>
      <ReportIcon source={calandar_icon} style={{width:40, height:45}}/>
      <MarginVertical top={16}/>
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{`${today.format("YYYY년 M월")}\n총 적설량`}</Text>
      <MarginVertical top={12}/>
      <ReportTitle>30H 40M</ReportTitle>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
      <ReportText>{"상위 10%의\n눈을 내렸어요!"}</ReportText>
      <MarginVertical top={40}/>
      <SectionList
        sections={data}
        scrollEnabled={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <RenderItem item={item} index={index}/>
        )}
        renderSectionHeader={({section: {title}}) => (
          <ListHeader title={title}/>
        )}>

      </SectionList>
      <MarginVertical top={86}/>      
      <ReportText>{"이번 달은 눈 녹을\n걱정이 없었어요!대단해요!"}</ReportText>
      <MarginVertical top={10}/>
      <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
      <MarginVertical top={140}/>
    </ReportContentsBody>
    )
  }

  const ReportContents3 = () => {
    
    return(
    <ReportContentsBody>
      <ReportIcon source={time_icon} style={{width:40, height:48}}/>
      <MarginVertical top={16}/>
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{"하루평균"}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>1H 24M</ReportTitle>
        <ReportTitle style={{color:colors.fontMain80}}> 의</ReportTitle>
      </View>
        <ReportTitle style={{color:colors.fontMain80}}>눈이 내렸어요!</ReportTitle>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
      <ReportText>{"다른 유저들보다\n14M 많이 내렸네요:)"}</ReportText>
      <MarginVertical top={40}/>
      <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <ReportText style={{fontWeight:500, textAlign:'center'}}>가장 많은 눈이{"\n"}쌓인 시각은</ReportText>
        <MarginVertical top={8}/>
        <TimeSliderBar/>
      </View>
      <MarginVertical top={86}/>      
      <ReportText>{"지윤 님 덕분에\n아침부터 예쁜 눈을 볼 수 있었어요!"}</ReportText>
      <MarginVertical top={10}/>
      
      <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
        <MarginVertical top={140}/>
    </ReportContentsBody>
    )
  }

  const ReportContents4 = () => {
    
    return(
    <ReportContentsBody>
      <ReportIcon source={calandar_icon} style={{width:40, height:45}}/>
      <MarginVertical top={16}/>
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{`${today.format("M월")}에는`}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>24일</ReportTitle>
      </View>
        <ReportText style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>눈이 내렸어요!</ReportText>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
      <ReportText>{"눈 예보 정확도\n90% 달성!"}</ReportText>
      <MarginVertical top={40}/>
      {/* <Calandar/> */}
      <MarginVertical top={86}/>      
      <ReportText>{`눈을 볼 수 있는 날이 많아\n행복했던 ${today.format("M월")}이네요!`}</ReportText>
      <MarginVertical top={10}/>
      
      <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
        <MarginVertical top={140}/>
    </ReportContentsBody>
    )
  }

  const ReportContents5 = () => {
    const continuitySuccess = ["","", "", "", "", "", "", "", "", "", ""];
    
    return(
    <ReportContentsBody>
      <ReportIcon source={calandar_icon} style={{width:40, height:45}}/>
      <MarginVertical top={16}/>
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{`${today.format("M월")}의\n최종 연속 기록은`}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>11일</ReportTitle>
      </View>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
      <ReportText>{"10일 넘게 눈이 온 적은\n처음이에요!"}</ReportText>
      <MarginVertical top={40}/>
      <View style={{flexDirection:'row', width:'100%', flexWrap:'wrap', gap:20}}>
        {continuitySuccess.map((el,index) => {
          return(
            <View key={index}>
              <SnowFlakeIcon color={"indigo"} size={40}/>
            </View>
          )
        })}
      </View>
      <MarginVertical top={86}/>      
      <ReportText>{"이제 이번 달에 모은 시간을\n더 자세히 분석해볼게요!"}</ReportText>
      <MarginVertical top={10}/>
      
      <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
        <MarginVertical top={140}/>
    </ReportContentsBody>
    )
  }

  const ReportContents6 = () => {
    return(
    <ReportContentsBody>
      <ReportIcon source={time_icon} style={{width:40, height:48}}/>
      <MarginVertical top={16}/>
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{`${today.format("YYYY년 M월")},`}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>{"어떤 적금에\n가장 많이\n쌓였을까요?"}</ReportTitle>
      </View>
      <MarginVertical top={80}/>
      <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
        <ReportText style={{textAlign:'center'}}>{"가장 많은 눈이\n쌓인 적금은"}</ReportText>
        <MarginVertical top={8}/>
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90}}>영어 적금</Text>
        <MarginVertical top={37}/>
        <SnowFlakeIcon size={16} color={"indigo"}/>
        <MarginVertical top={20}/>
        <View style={{width:200, height:200, padding:20}}>
          <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2}}>영어 적금</Text>
          <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2, position:'absolute', bottom:20, right:20}}>+18H 30M</Text>
          <Image source={report_save_bg} style={{position:'absolute', top:0, left:0}}/>
        </View>
        <MarginVertical top={43}/>
        <View style={{flexDirection:'row', width:200}}>
          <View style={{width:100, height:100}}>
            <ReportText style={{flexGrow:1}}>{today.subtract(1,'month').format("M월")}</ReportText>
            <ReportText>{"독서 적금\n+15M 24M"}</ReportText>
          </View>
          <View style={{width:100, height:100, backgroundColor:'#fff', borderRadius:8, padding:12}}>
            <ReportText>독서</ReportText>
            <Image source={books_graphic} style={{width:56, height:53, marginLeft:20}}/>
          </View>
        </View>
        <MarginVertical top={48}/>      
        <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
      </View>
      
      
        <MarginVertical top={120}/>
    </ReportContentsBody>
    )
  }

  const ReportContents7 = () => {
    return(
    <ReportContentsBody>
      <ReportIcon source={time_icon} style={{width:40, height:48}}/>
      <MarginVertical top={16}/>
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{`${today.format("M월")}의 지윤 님은`}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>{"얼마나\n성장했을까요?"}</ReportTitle>
      </View>
      <MarginVertical top={80}/>
      <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:24, height:24, borderRadius:"50%", backgroundColor:colors.fontMain, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:"#fff", fontSize:14, fontWeight:600}}>1</Text>
        </View>
        <MarginVertical top={13}/>
        <ReportText style={{textAlign:'center'}}>{`${today.subtract(1,'month').format("M월")}보다`}</ReportText>
        <MarginVertical top={8}/>
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90, textAlign:'center'}}>{"5H 14M\n더 쌓았어요!"}</Text>
        <MarginVertical top={20}/>
        <SnowFlakeIcon size={16} color={"indigo"}/>
        <MarginVertical top={20}/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{width:200, height:200, padding:20, marginRight:30}}>
            <Text style={{color:"#fff", fontSize:34, fontWeight:600, zIndex:2}}>{`${today.subtract(1,'month').format("M월")}`}</Text>
            <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2, position:'absolute', bottom:20, right:20}}>+18H 30M</Text>
            <Image source={report_save_bg} style={{position:'absolute', top:0, left:0}}/>
          </View>
          <View style={{width:200, height:200, padding:20, marginRight:100}}>
            <Text style={{color:"#fff", fontSize:34, fontWeight:600, zIndex:2}}>{today.format("M월")}</Text>
            <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2, position:'absolute', bottom:20, right:20}}>+18H 30M</Text>
            <Image source={report_save_bg} style={{position:'absolute', top:0, left:0}}/>
          </View>
        </ScrollView>
        <MarginVertical top={48}/>      
        <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
        <MarginVertical top={100}/>
        <View style={{width:24, height:24, borderRadius:"50%", backgroundColor:colors.fontMain, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:"#fff", fontSize:14, fontWeight:600}}>2</Text>
        </View>
        <MarginVertical top={13}/>
        <ReportText style={{textAlign:'center'}}>{`${today.subtract(1,'month').format("M월")} 하루 평균보다`}</ReportText>
        <MarginVertical top={8}/>
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90, textAlign:'center'}}>{"0H 15M\n더 쌓았어요!"}</Text>
        <MarginVertical top={20}/>
        <MarginVertical top={20}/>
        <TimeSliderBar/>
        <MarginVertical top={40}/>      
        <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
        <MarginVertical top={100}/>        
        <View style={{width:24, height:24, borderRadius:"50%", backgroundColor:colors.fontMain, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:"#fff", fontSize:14, fontWeight:600}}>3</Text>
        </View>
        <MarginVertical top={13}/>
        <ReportText style={{textAlign:'center'}}>{`${today.subtract(1,'month').format("M월")}보다`}</ReportText>
        <MarginVertical top={8}/>
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90, textAlign:'center'}}>{"5일 더\n내렸어요!"}</Text>
        <MarginVertical top={20}/>
        <SnowFlakeIcon size={16} color={"indigo"}/>
        <MarginVertical top={20}/>
        <ReportText>{today.format("M월")}</ReportText>
        <Text style={{fontWeight:600, fontSize:22, color:colors.fontMain90}}>총 24일</Text>
        <MarginVertical top={16}/>
        {/* <Calandar/> */}
        <MarginVertical top={76}/>     
        <Text style={{fontSize:14, fontWeight:500, color:colors.gray77, textAlign:'center'}}>{`${today.format("M월")}도 수고하셨어요!\n${today.format("M월")}의 키워드를 볼까요?`}</Text> 
        <MarginVertical top={8}/>
        <Button text={"눈 카드 만들기"} handleButton={() => navigation.navigate("CompleteSnowCard")}/>
      </View>

      
        <MarginVertical top={120}/>
    </ReportContentsBody>
    )
  }

  return (
    <SafeAreaView style={{backgroundColor:'#fff'}}>
      <ScrollView>
        <ReportBody>
          <ReportHeader>
            <View style={{position:'absolute', left:0}}>
              <BackArrowButton/>
            </View>
            <ReportHeaderText>리포트</ReportHeaderText>
          </ReportHeader>
          <MarginVertical top={40}/>
          <SnowCardEl text={`${dayjs().subtract(1,'month').format("YYYY년 M월")}의\n눈은 어떤 모양일까요?`} type={0}/>
          <MarginVertical top={60}/>
          <ReportContents1/>
          <MarginVertical top={365}/>
          <ReportContents2/>
          <ReportContents3/>
          <ReportContents4/>
          <ReportContents5/>
          <ReportContents6/>
          <ReportContents7/>
        </ReportBody>
        <ReportBg source={report_bg}/>
        

      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Report

const ReportBody = styled.View`
  width:${size.width}px;
  padding:0 30px;
  height:7400px;
  
`

const ReportBg = styled.Image`
  z-index:-1;
  width:${size.width}px;
  position:absolute;
  top:400px;

`

const ReportHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  height:50px;
  width:100%;
`

const ReportHeaderText = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.darkGray};
`

const ReportContentsBody = styled.View`

`

const ReportIcon = styled.Image`
  width:47px;
  height:44px;
`

const ReportTitle = styled.Text`
  font-size:42px;
  font-weight:600;
  color:${colors.fontMain};
`

const ReportText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain70};
  line-height:26px;
`

const ReportSubTitle = styled.Text`

`

const DownIcon = styled.View`
  display:flex;
`

const DownIconImg = styled.Image`
  width:20px;
  height:15px;
  margin-bottom:-8px;
`