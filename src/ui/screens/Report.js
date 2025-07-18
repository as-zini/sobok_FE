import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, SectionList, Text, View } from 'react-native'
import styled from '@emotion/native'

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { minToHour } from '../../util';
import { useUserInfoStore } from '../../store/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Report = () => {
  const navigation = useNavigation();
  const {getReportInfo, getSnowCard} = useReport();
  const [today, setToday] = useState(dayjs().subtract(1,'month'))
  const [reportInfo, setReportInfo] = useState({});
  const {userInfo} = useUserInfoStore();
  const userName = userInfo.displayName;
  const [isReady, setIsReady] = useState(false);
  const insets = useSafeAreaInsets();

  const init = async() => {
    const result = await AsyncStorage.getItem(`reportOn${dayjs().get('month')+1}`)
    setReportInfo(JSON.parse(result))
    console.log(JSON.parse(result))
  
    setIsReady(true)
  }

  const getReport = async() => {
    const result = await AsyncStorage.getItem(`reportOn${dayjs().get('month')+1}`)
    result ?  init() : getReportInfo(dayjs().format("YYYY-MM")) 
  }

  useEffect(() => {
    getReport()
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
        <ReportText>{`${userName} 님의\n${today.get('month')+1}월 눈 리포트가 도착했습니다!\n얼른 보러 가봐요!`}</ReportText>
        <MarginVertical top={20}/>
        <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
      </ReportContentsBody>
    )
  }

  const ReportContents2 = () => {
    const data = ([
      {
        title:"루틴",
        data:reportInfo.routineStatistics?.map((el,index) => [el.title,minToHour(el.duration)])
      },{
        title:"적금",
        data:reportInfo.accountStatistics?.map((el,index) => [el.title,minToHour(el.duration)])
      }
    ]) ?? []

    const RenderItem = ({item, index}) => {
      return(
        <>
        <View style={{flexDirection:'row', gap:10, justifyContent:'center', alignItems:'center'}}>
          <View style={{width:24, height:24, backgroundColor:colors.fontMain, borderRadius:12, justifyContent:'center', alignItems:'center'}}>
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
      <ReportTitle>{minToHour(reportInfo?.totalTime)}</ReportTitle>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
      <ReportText>{`상위 ${reportInfo?.totalTimePercent}%의\n눈을 내렸어요!`}</ReportText>
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
      <ReportText>{reportInfo?.reportMessage1}</ReportText>
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
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{"하루 평균"}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>{minToHour(reportInfo?.averageTime)}</ReportTitle>
        <ReportTitle style={{color:colors.fontMain80}}> 의</ReportTitle>
      </View>
        <ReportTitle style={{color:colors.fontMain80}}>눈이 내렸어요!</ReportTitle>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
      <ReportText>{`다른 유저들보다\n${minToHour(reportInfo?.averageTimeCompare)} 많이 내렸네요:)`}</ReportText>
      <MarginVertical top={40}/>
      
      <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <ReportText style={{fontWeight:500, textAlign:'center'}}>가장 많은 눈이{"\n"}쌓인 시각은</ReportText>
        <MarginVertical top={8}/>
        {/* !!!!!! */}
        <Text style={{fontWeight:600, fontSize:26, color:colors.fontMain90}}>{"오전 8:00"}</Text>
        {/* !!!!!! */}
        <TimeSliderBar version={"report"}/>
      </View>
      <MarginVertical top={86}/>   
      {/* !!!!!! */}   
      <ReportText>{`지윤 님 덕분에
아침부터 예쁜 눈을 볼 수 있었어요!`}</ReportText>
      {/* !!!!!! */}
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
        <ReportTitle>{`${reportInfo?.totalAchievedCount}일`}</ReportTitle>
      </View>
        <ReportText style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>눈이 내렸어요!</ReportText>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
      <ReportText>{`눈 예보 정확도\n${reportInfo?.totalAchievedPercent}% 달성!`}</ReportText>
      <MarginVertical top={40}/>
      <Calandar version={"report"} achieveList={reportInfo?.dailyAchieve}/>
      <MarginVertical top={86}/>      
      <ReportText>{reportInfo?.reportMessage3}</ReportText>
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
    const continuitySuccess = new Array(reportInfo.consecutiveAchieveCount).fill("");
    
    return(
    <ReportContentsBody>
      <ReportIcon source={calandar_icon} style={{width:40, height:45}}/>
      <MarginVertical top={16}/>
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{`${today.format("M월")}의\n최장 연속 기록은`}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>{`${reportInfo.consecutiveAchieveCount}일`}</ReportTitle>
      </View>
      <MarginVertical top={30}/>
      <SnowFlakeIcon color={"indigo"} size={16}/>
      <MarginVertical top={10}/>
     {/* !!!!!!!!! */}
      <ReportText>{}</ReportText>
      {/* !!!!!!!!! */}
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
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90}}>{reportInfo?.mostAchievedAccount?.title}</Text>
        <MarginVertical top={37}/>
        <SnowFlakeIcon size={16} color={"indigo"}/>
        <MarginVertical top={20}/>
        <View style={{width:200, height:200, padding:20}}>
          <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2}}>{reportInfo?.mostAchievedAccount?.title}</Text>
          <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2, position:'absolute', bottom:20, right:20}}>{minToHour(reportInfo?.mostAchievedAccount?.duration)}</Text>
          <Image source={report_save_bg} style={{position:'absolute', top:0, left:0}}/>
        </View>
        <MarginVertical top={43}/>
        <View style={{flexDirection:'row', width:200}}>
          <View style={{width:100, height:100}}>
            <ReportText style={{flexGrow:1}}>{today.subtract(1,'month').format("M월")}</ReportText>
            <ReportText>{`${reportInfo?.previousMostAchievedAccount?.title} 적금`}</ReportText>
            <ReportText>{`${minToHour(reportInfo?.previousMostAchievedAccount?.duration)}`}</ReportText>
          </View>
          {/* !!!!!!!!!! */}
          <View style={{width:100, height:100, backgroundColor:'#fff', borderRadius:8, padding:12}}>
            <ReportText>독서</ReportText>
            <Image source={books_graphic} style={{width:56, height:53, marginLeft:20}}/>
          </View>
          {/* !!!!!!!!!! */}
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
      <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain80, lineHeight:34}}>{`${today.format("M월")}의 ${userInfo.displayName} 님은`}</Text>
      <MarginVertical top={12}/>
      <View style={{flexDirection:'row'}}>
        <ReportTitle>{"얼마나\n성장했을까요?"}</ReportTitle>
      </View>
      <MarginVertical top={80}/>
      <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:24, height:24, borderRadius:12, backgroundColor:colors.fontMain, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:"#fff", fontSize:14, fontWeight:600}}>1</Text>
        </View>
        <MarginVertical top={13}/>
        <ReportText style={{textAlign:'center'}}>{`${today.subtract(1,'month').format("M월")}보다`}</ReportText>
        <MarginVertical top={8}/>
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90, textAlign:'center'}}>{minToHour(Math.abs(reportInfo?.previousTotalTime - reportInfo?.totalTime))+`${reportInfo?.previousTotalTime - reportInfo?.totalTime > 0 ? "\n덜 쌓았어요" :"\n더 쌓았어요"}`}</Text>
        <MarginVertical top={20}/>
        <SnowFlakeIcon size={16} color={"indigo"}/>
        <MarginVertical top={20}/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{width:200, height:200, padding:20, marginRight:30}}>
            <Text style={{color:"#fff", fontSize:34, fontWeight:600, zIndex:2}}>{`${today.subtract(1,'month').format("M월")}`}</Text>
            <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2, position:'absolute', bottom:20, right:20}}>{minToHour(reportInfo?.previousTotalTime)}</Text>
            <Image source={report_save_bg} style={{position:'absolute', top:0, left:0}}/>
          </View>
          <View style={{width:200, height:200, padding:20, marginRight:100}}>
            <Text style={{color:"#fff", fontSize:34, fontWeight:600, zIndex:2}}>{today.format("M월")}</Text>
            <Text style={{color:"#fff", fontSize:22, fontWeight:600, zIndex:2, position:'absolute', bottom:20, right:20}}>{minToHour(reportInfo.totalTime)}</Text>
            <Image source={report_save_bg} style={{position:'absolute', top:0, left:0}}/>
          </View>
        </ScrollView>
        <MarginVertical top={48}/>      
        <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
        <MarginVertical top={100}/>
        <View style={{width:24, height:24, borderRadius:12, backgroundColor:colors.fontMain, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:"#fff", fontSize:14, fontWeight:600}}>2</Text>
        </View>
        <MarginVertical top={13}/>
        <ReportText style={{textAlign:'center'}}>{`${today.subtract(1,'month').format("M월")} 하루 평균보다`}</ReportText>
        <MarginVertical top={8}/>
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90, textAlign:'center'}}>{minToHour(Math.abs(reportInfo?.previousAverageTime - reportInfo?.averageTime))+`${reportInfo?.previousAverageTime - reportInfo?.averageTime > 0 ? "\n덜 쌓았어요" :"\n더 쌓았어요"}`}</Text>
        <MarginVertical top={20}/>
        <MarginVertical top={20}/>
        <View style={{width:"100%", opacity:.5}}>
        <View style={{position:'absolute', top:8,left:-10}}>
          <Text>{dayjs().subtract(2,'month').format("M월")}</Text>
          <View style={{justifyContent:'center', alignItems:'center', backgroundColor:colors.indigoBlue50, borderRadius:15, paddingVertical:7, paddingHorizontal:17}}>
            <Text style={{color:"#fff", fontWeight:600, fontSize:16}}>{minToHour(reportInfo?.previousAverageTime)}</Text>
          </View>
        </View>
        </View>
        <View style={{width:size.width, height:50, position:'absolute', top:830, zIndex:3}}></View>
        <TimeSliderBar version={"reportCompare"} compareValue1={reportInfo.averageTime} compareValue2={50}/>
        
        <MarginVertical top={40}/>      
        <DownIcon>
          <DownIconImg source={down_navigate_icon}/>
          <DownIconImg source={down_navigate_icon}/>
        </DownIcon>
        <MarginVertical top={100}/>        
        <View style={{width:24, height:24, borderRadius:12, backgroundColor:colors.fontMain, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:"#fff", fontSize:14, fontWeight:600}}>3</Text>
        </View>
        <MarginVertical top={13}/>
        <ReportText style={{textAlign:'center'}}>{`${today.subtract(1,'month').format("M월")}보다`}</ReportText>
        <MarginVertical top={8}/>
        <Text style={{fontSize:26, fontWeight:600, color:colors.fontMain90, textAlign:'center'}}>{`${Math.abs(reportInfo?.previousTotalAchievedCount - reportInfo?.totalAchievedCount)} 일`+ `${reportInfo?.previousTotalAchievedCount - reportInfo?.totalAchievedCount > 0 ? "\n덜 내렸어요" :"\n더 내렸어요"}`}</Text>
        <MarginVertical top={20}/>
        <SnowFlakeIcon size={16} color={"indigo"}/>
        <MarginVertical top={20}/>
        
        <ScrollView horizontal={true} inverted showsHorizontalScrollIndicator={false}>
          <View style={{marginRight:15}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <ReportText>{today.subtract(1,'month').format("M월")}</ReportText>
            <Text style={{fontWeight:600, fontSize:22, color:colors.fontMain90}}>{`총 ${reportInfo.previousTotalAchievedCount}일`}</Text>
            </View>
            <MarginVertical top={16}/>
            <Calandar version={"report"} achieveList={reportInfo.previousDailyAchieve}/>
          </View>
          <View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <ReportText>{today.format("M월")}</ReportText>
            <Text style={{fontWeight:600, fontSize:22, color:colors.fontMain90}}>{`총 ${reportInfo.totalAchievedCount}일`}</Text>
            </View>
            <MarginVertical top={16}/>
            <Calandar version={"report"} achieveList={reportInfo.dailyAchieve}/>
          </View>
        
        </ScrollView>
        <MarginVertical top={76}/>     
        <Text style={{fontSize:14, fontWeight:500, color:colors.gray77, textAlign:'center'}}>{`${today.format("M월")}도 수고하셨어요!\n${today.format("M월")}의 키워드를 볼까요?`}</Text> 
        <MarginVertical top={8}/>
        <Button text={"눈 카드 만들기"} handleButton={() => {getSnowCard(today.format('YYYY-MM'))}}/>
      </View>

      
        <MarginVertical top={120}/>
    </ReportContentsBody>
    )
  }

  return (
    <View style={{backgroundColor:'#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {isReady ? 
        <ReportBody>
          <MarginVertical top={insets.top}/>
          <ReportHeader>
            <View style={{position:'absolute', left:0}}>
              <BackArrowButton/>
            </View>
            <ReportHeaderText>리포트</ReportHeaderText>
          </ReportHeader>
          <MarginVertical top={40}/>
          <SnowCardEl text={`${dayjs().subtract(1,'month').format("YYYY년 M월")}의\n눈은 어떤 모양일까요?`} type={1}/>
          <MarginVertical top={60}/>
          <ReportContents1/>
          <MarginVertical top={365}/>
          {/* <ReportContents2/> */}
          <ReportContents3/>
          <ReportContents4/>
          <ReportContents5/>
          <ReportContents6/>
          <ReportContents7/>
        </ReportBody>
        :
        <></>
        }

        <ReportBg source={report_bg} style={{marginTop:insets.top}}/>
        

      </ScrollView>
      
    </View>
  )
}

export default Report

const ReportBody = styled.View`
  width:${() => `${size.width}px`};
  padding:0 30px;
  
`

const ReportBg = styled.Image`
  z-index:-1;
  width:${() => `${size.width}px`};
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