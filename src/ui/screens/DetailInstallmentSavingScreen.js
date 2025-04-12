import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import installment_icon from '../../../assets/save_icon.png';
import MarginVertical from '../components/MarginVertical';
import { Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native';
import BackArrowButton from '../components/BackArrowButton';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import LinkIcon from '../components/LinkIcon';
import ShortAlertArea from '../components/ShortAlertArea';
import DoubleButton from '../components/DoubleButton';
import ProgressBar from '../components/ProgressBar';
import { BlurView } from 'expo-blur';
import BlurComponent from '../components/BlurComponent';
import DropDownArrowButton from '../components/DropDownArrowButton';
import AssetEl from '../components/AssetEl';
import CalandarModal from '../components/CalandarModal';
import axios from 'axios';
import { minToHour } from '../../util';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SavingAlerteModal from '../components/SavingAlertModal';
import Ionicons from '@expo/vector-icons/Ionicons';


const DetailInstallmentSavingScreen = ({route}) => {
  const [isCalandarModalVisible, setIsCalandarModalVisible] = useState(false);
  const {id} = route.params;
  const {getSavingLog, getSavingDetail, handleDeleteSaving} = useInstallmentSaving();
  const [savingInfo, setSavingInfo] = useState([]);
  const navigation = useNavigation();
  const [selectedRange, setSelectedRange] = useState({startDate:dayjs().startOf('month').format("YYYY-MM-DD"), endDate:dayjs().endOf('month').format("YYYY-MM-DD")});
  const [savingLog, setSavingLog] = useState([]);
  const [isAlertModal, setIsAlertModal] = useState(false);


  

  useEffect(() => {
    getSavingDetail(id, setSavingInfo);
    getSavingLog(id, selectedRange.startDate, selectedRange.endDate, setSavingLog)
    
    
  }, [selectedRange])

  useEffect(() => {
    if(!savingInfo.is_valid)setIsAlertModal(true)
    
    
  }, [savingInfo])
  // const startedAt = dayjs(new Date(Number(savingInfo.created_at.slice(0,4)),Number(savingInfo.created_at.slice(5,7))-1,Number(savingInfo.created_at.slice(8,10))+1))
  const startedAt = dayjs(`${savingInfo.created_at} 00:00`)

  const BlurChild = () => {
    return(
      <ScrollView>
      <View style={{paddingHorizontal:30, paddingVertical:40}}>
        <View style={{display:'flex', flexDirection:'row', gap:4}}>
          <SettingPeriodText>{`${selectedRange.startDate?.slice(5,7)}월 ${selectedRange.startDate?.slice(8,10)}일 - ${selectedRange.endDate?.slice(5,7)}월 ${selectedRange.endDate?.slice(8,10)}일`}</SettingPeriodText>
          <DropDownArrowButton size={16} handleArrowButton={() => setIsCalandarModalVisible(true)}/>
        </View>
        <MarginVertical top={32}/>
        {/* <SectionList
            sections={Data}
            keyExtractor={(item, index) => item + index}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <LenderItem item={item} index={index}></LenderItem>
            )}
            renderSectionHeader={({section: {title}}) => (
              <ListHeader title={title}/>
            )}
          >
        </SectionList> */}
        
        {savingLog.map((el,index) => {
          return(
            <View key={index}>
              <Text style={{color:"#707172", fontWeight:500, fontSize:14}}>{`${dayjs(el.created_at).format("YYYY년 M월 D일")}`}</Text>
              <MarginVertical top={20}/>
              <AssetEl item={[`${savingLog.length-index}회차`, `${dayjs(el.created_at).format("HH:MM")}`, `${minToHour(el.depositTime)}`, `${minToHour(el.balance)}`]} index={index} isLink={false} isTouchable={false}/>
              <MarginVertical top={40}/>
            </View>

          )
        })}
       </View>
      <MarginVertical top={500}/>
      </ScrollView>
    )
  }

  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaProvider style={{paddingTop:insets.top}}>
      <View>
      <ScrollView>
      <DetailInstallmentSavingBody>
        <DetailInstallmentSavingHeader>
          <View >
            <BackArrowButton/>
          </View>
          <Text style={{fontWeight:600, fontSize:18, color:colors.fontSub}}>적금</Text>
          <TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteSaving(id)}>
              <Ionicons name="trash-outline" size={24} color={colors.fontMain80} />
            </TouchableOpacity>
          </TouchableOpacity>
        </DetailInstallmentSavingHeader>
        <MarginVertical top={47}/>
        <SavingIntroArea>
          <Image source={installment_icon} style={{width:48, height:34}}/>
          <MarginVertical top={18}/>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}}>
            <LinkedRoutineText>{savingInfo.title}</LinkedRoutineText>
            <TouchableOpacity style={{width:24, height:24}}>
              <MaterialIcons name="mode-edit" size={20} color="rgba(20, 36, 72, 0.3)"/>
            </TouchableOpacity>
          </View>
          <MarginVertical top={5}/>
          <TotalSavingTitle>{minToHour(savingInfo.balance)}</TotalSavingTitle>
          <MarginVertical top={32}/>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <InterestText>{`월 ${savingInfo.interest}%`}</InterestText>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={22} color="rgba(20, 36, 72, 0.4)" />
            </TouchableOpacity>
          </View>
          <PushPeriodText>{`매주 ${minToHour(savingInfo.time)}`}</PushPeriodText>
        </SavingIntroArea>
        <MarginVertical top={24}/>
        
        <ShortAlertArea text={`${savingInfo.duration-(dayjs().get('month')-startedAt.get('month'))}개월 남았어요!`} width={114} height={30}/>
        {/* 기간바 */}
        <MarginVertical top={36}/>
        <ProgressBar startedAt={startedAt} duration={savingInfo.duration} version={"Time"}/>
        <MarginVertical top={48}/>
        <DoubleButton
          text1={"연결 루틴 보기"}
          text2={"채우기"}
          handleLeftButton={() => navigation.navigate('ViewLinkedRoutine', {title:savingInfo.title, routines:savingInfo.routines})}
          handleRightButton={() => navigation.navigate("TodayTodo")}
        />
        <MarginVertical top={40}/>
        <BlurComponent child={BlurChild}/>
      </DetailInstallmentSavingBody>
      <CalandarModal
        isCalandarModalVisible={isCalandarModalVisible} 
        setIsCalandarModalVisible={setIsCalandarModalVisible} 
        selectedRange={selectedRange} 
        setSelectedRange={setSelectedRange} 
        id={id}
        setSavingLog={setSavingLog}/>
      </ScrollView>
      <SavingAlerteModal isPauseModalVisible={isAlertModal} setIsPauseModalVisible={setIsAlertModal} id={id}/>
      </View>
      <DetailInstallmentSavingBg source={installment_saving_bg}/>
    </SafeAreaProvider>
  )
}

export default DetailInstallmentSavingScreen;

const DetailInstallmentSavingBody = styled.View`
  display:flex;
  align-items:center;
  width:${size.width}px;
  height:1000px;
`

const DetailInstallmentSavingBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  z-index:-1;
`

const DetailInstallmentSavingHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  width:${size.width};
  padding: 0 30px;
  height:50px;
`

const SavingIntroArea = styled.View`
  width:310px;
`

const LinkedRoutineText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain90};
`

const TotalSavingTitle = styled.Text`
  font-size:50px;
  font-weight:600;
  color:${colors.fontMain};
`

const InterestText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain70};
  line-height:24px;
`

const PushPeriodText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain70};
  line-height:25px;
`



const SettingPeriodText = styled.Text`
  color:#4A5660;
  font-weight:600;
  font-size:16px;
`





