import React, { useEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, SectionList, Text, View } from 'react-native'
import styled from 'styled-components'

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import link_icon from '../../../assets/link_icon.png';
import installment_icon from '../../../assets/save_icon.png';
import { size } from '../styles/size';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import point_icon from '../../../assets/point_icon.png';

import { useNavigation } from '@react-navigation/native';
import AssetEl from '../components/AssetEl';
import SmallButton from '../components/SmallButton';
import ProgressBar from '../components/ProgressBar';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import CalandarModal from '../components/CalandarModal';
import SubscribeModal from '../components/SubscribeModal';
import RoutinePauseModal from '../components/RoutinePauseModal';
import PurchaseModal from '../components/PurchaseModal';
import dayjs from 'dayjs';
import { useUserInfoStore } from '../../store/user';
import { usePoint } from '../../hooks/usePoint';
import { useGetInfo } from '../../hooks/useGetInfo';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const ViewPointScreen = () => {
  const navigation = useNavigation();

  const [isCalandarModalVisible, setIsCalandarModalVisible] = useState(false);
  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false);
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({startDate:dayjs().startOf('month').format("YYYY-MM-DD"), endDate:dayjs().endOf('month').format("YYYY-MM-DD")});
  const {userInfo} = useUserInfoStore();
  const {getUserPremium, getPointLog} = usePoint();
  const [userPremium, setUserPremium] = useState(0);
  const [pointLog, setPointLog] = useState([]);
  const {getUserInfo} = useGetInfo();


  // const Data = [
  //   pointLog.length > 0 ?
  //   {
  //     title:["10월 2일"],
  //     data:[["자유 출금", "09:00", "-3500P", "5,824P"]]
  //   },{
  //     title:["9월 30일"],
  //     data:[["적립", "09:00", "+1200P", "9,324P"]]
  //   },{
  //     title:["8월 14일"],
  //     data:[["적립", "09:00", "+500P", "8124P"]]
  //   } :
  //   {

  //   }
  // ]

  useEffect(() => {
    console.log(isPurchaseModalVisible);
    console.log(isSubscribeModalVisible);
    getUserPremium(setUserPremium);
    getUserInfo()
    getPointLog(selectedRange.startDate, selectedRange.endDate, setPointLog)
  }, [isPurchaseModalVisible, isSubscribeModalVisible])

  const ListHeader = ({title}) => {
    return(
      <>
        <Text style={{color:"#707172", fontWeight:500, fontSize:14}}>{title}</Text>
        
      </>
    )
  }

  const LenderItem = ({item, index}) => {
    return(
      <>
        <AssetEl item={item} index={index} isLink={false}/>
        <MarginVertical top={40}/>
      </>
    )
  }

  const BlurChild = () => {
    return(
      
      <View style={{paddingHorizontal:30, paddingVertical:40}}>
        <ScrollView>
        <View style={{display:'flex', flexDirection:'row', gap:4}}>
          <SettingPeriodText>{`${selectedRange.startDate} - ${selectedRange.endDate}`}</SettingPeriodText>
          <DropDownArrowButton size={16} handleArrowButton={() => setIsCalandarModalVisible(true)}/>
        </View>
        <MarginVertical top={32}/>
        {pointLog.map((el, index) => {
          return(
          <View key={index}>
            <Text style={{color:"#707172", fontWeight:500, fontSize:14}}>{dayjs(el.createdAt).format("M월 D일")}</Text>
            <MarginVertical top={20}/>
            <AssetEl item={[`${el.category}`, `${dayjs(el.createdAt).format("hh:mm")}`, `${el.point}P`, `${el.balance}P`]} index={index} isLink={false}/>
            <MarginVertical top={40}/>
          </View>
          )
        })}
        </ScrollView>
        </View>
      
      
    )
  }

  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaProvider style={{paddingTop:insets.top}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <ViewInstallmentSavingBody>
        <MarginVertical top={20}/>
        <ViewInstallmentSavingHeader>
          <View style={{position:'absolute', left:20}}>
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.fontSub}}>포인트</Text>
        </ViewInstallmentSavingHeader>
        <MarginVertical top={47}/>
        {userInfo.isPremium ?
        <ViewSubscribing>
          <SubscribingText>{`${dayjs().format("M월")} 구독권 사용중`}</SubscribingText>
        </ViewSubscribing>
        : <></>  }
        <TotalSavingArea>
          <Image source={point_icon} style={{width:48, height:46}}/>
          <MarginVertical top={18}/>
          <TotalPointText>{`${userInfo.displayName} 님의 총 포인트는`}</TotalPointText>
          <MarginVertical top={5}/>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', width:310}}>
            <TotalSavingTitle>{`${userInfo.point}P`}</TotalSavingTitle>
            
            <SmallButton text={"사용하기"} width={100} height={40} bgColor={colors.indigoBlue50} fontColor={"#fff"} handleButton={() => navigation.navigate('TicketPurchase')}/>
            
          </View>
        </TotalSavingArea>
        <MarginVertical top={56}/>
        <ProgressBarArea>
          {userPremium < userInfo.point ? <ProgressText>{`${userPremium}P 를 모두 모았어요!\n${dayjs().add(1, 'M').format("M월")} 구독권을 구매할 수 있겠군요!`}</ProgressText>
          :<ProgressText>{`${userPremium-userInfo.point}P 만 모으면\n${dayjs().add(1, 'M').format("M월")} 구독권을 구매할 수 있어요!`}</ProgressText>
          }
          <MarginVertical top={20}/>
          <ProgressBar version={"Point"} userPoint={userInfo.point} totalPoints={userPremium}/>
        </ProgressBarArea>
        <MarginVertical top={72}/>
        <BlurComponent child={BlurChild}/>
      </ViewInstallmentSavingBody>
      </ScrollView>
      <CalandarModal isCalandarModalVisible={isCalandarModalVisible} setIsCalandarModalVisible={setIsCalandarModalVisible} selectedRange={selectedRange} setSelectedRange={setSelectedRange} version={"Point"} setPointLog={setPointLog}/>
      <PurchaseModal isPurchaseModalVisible={isPurchaseModalVisible} setIsPurchaseModalVisible={setIsPurchaseModalVisible} version={"Purchase"}/>
      <SubscribeModal isSubscribeModalVisible={isSubscribeModalVisible} setIsSubscribeModalVisible={setIsSubscribeModalVisible} setIsPurchaseModalVisible={setIsPurchaseModalVisible} userPremium={userPremium}/>
      <ViewInstallmentSavingBg source={installment_saving_bg}/>
    </SafeAreaProvider>
  )
}

export default ViewPointScreen


const ViewInstallmentSavingBody = styled.View`
  width:${size.width}px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ViewInstallmentSavingHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:${size.width};
`

const ViewInstallmentSavingBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const TotalSavingArea = styled.View`
  width:310px;
`

const TotalPointText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain90};
`

const TotalSavingTitle = styled.Text`
  font-size:50px;
  font-weight:600;
  color:${colors.fontMain};
  flex-grow:1;
`

const SectionEl = styled.View`
  display:flex;
  flex-direction:row;
  gap:4px;
  margin-bottom:35px;
`

const SectionTitle = styled.Text`
  font-size:16px;
  font-weight:600;
  color:#707172;
`

const SectionCountText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${colors.indigoBlue};
`

const ProgressBarArea = styled.View`

`

const ProgressText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain70};
  line-height:24px;
  margin-bottom:8px;
`

const SettingPeriodText = styled.Text`
  color:#4A5660;
  font-weight:600;
  font-size:16px;
`

const ViewSubscribing = styled.View`
  width:114px;
  height:30px;
  border-radius:15px;
  background-color:${colors.indigoBlue50};
  display:flex;
  justify-content:center;
  align-items:center;
`

const SubscribingText = styled.Text`
  font-weight:500;
  font-size:14px;
  color:#fff;
`