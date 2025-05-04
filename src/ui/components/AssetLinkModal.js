import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components'

import asset_link_modal_bg from '../../../assets/routine_repeat_setting_bg.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import MarginVertical from './MarginVertical';
import search_icon from '../../../assets/search_icon.png'
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import AssetEl from './AssetEl';
import { minToHour } from '../../util';
import { useRoutine } from '../../hooks/useRoutine';
import { useStatistic } from '../../hooks/useStatistic';
import dayjs from 'dayjs';

const AssetLinkModal = ({isAssetLinkModalVisible, setIsAssetLinkModalVisible, invalidSavingList, setInvalidSavingList, setPickedSaving, version, routineList, setRoutineList, setDateInfoByRoutine}) => {
  const {getInvalidSavingList} = useInstallmentSaving();
  const {getRoutineByList} = useRoutine();
  const [isComplete, setIsComplete] = useState(false);
  const pickedEl = [];
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    version === "Routine" ?
    getRoutineByList(setRoutineList, setIsComplete)
    : getInvalidSavingList(setInvalidSavingList);
  }, [])

  const handleCompleteButton = () => {
    setIsAssetLinkModalVisible(false)
  }
  

  return (
    <Modal
       isVisible={isAssetLinkModalVisible} 
        animationIn={'slideInUp'}
        animationInTiming={1000} 
        animationOut={'slideOutDown'} 
        animationOutTiming={1000}
        onBackdropPress={() => setIsAssetLinkModalVisible(false)}
    >
      <AssetLinkModalBody>
        <AssetLinkModalTitle>자산 연결하기</AssetLinkModalTitle>
        <AssetLinkModalText>루틴으로 모은 시간을{"\n"}적금에 연결할 수 있어요!</AssetLinkModalText>
        <MarginVertical top={40}/>
        <SearchArea>
          <SearchInput placeholder={version === "Routine" ? "루틴을 검색해보세요": "적금을 검색해보세요"} placeholderTextColor="#fff" value={searchValue} onChange={(e) => setSearchValue(e.nativeEvent.text)}/>
          <BorderLine/>
          <TouchableOpacity style={{position:'absolute', right:0, bottom:10}}>
            <Image source={search_icon}/>
          </TouchableOpacity>
        </SearchArea>
        <MarginVertical top={55}/>
        <View style={{width:300}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:600}}>{version === "Routine" && searchValue.length === 0 ? `총 ${routineList.length}개의 루틴`: version === "Routine" && searchValue.length > 0 ? `총 ${routineList.filter((el) => el.title.includes(searchValue)).length}개의 루틴`
            : version !== "Routine" && searchValue.length > 0 ? `총 ${invalidSavingList.filter((el) => el.title.includes(searchValue)).length}개의 적금` : `총 ${invalidSavingList.length}개의 적금`}</Text>
        </View>
        <MarginVertical top={20}/>
        <SavingListBody showsVerticalScrollIndicator={false}>
        

          {version === "Routine" && searchValue.length === 0 ?
          routineList.map((el,index) => {
            return(
              <View key={index}>
              <TouchableOpacity  style={{flexDirection:'row', width:300, gap:13}} onPress={() => setPickedSaving([el])}>
                <View style={{width:40, height:40, borderRadius:'50%', backgroundColor:colors.indigoBlue, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontWeight:600, fontSize:24, color:"#fff"}}>{index+1}</Text>
                </View>
                <Text style={{fontWeight:600, fontSize:18, color:"#343434", flexGrow:1}}>{el.title}</Text>
                <Text style={{color:colors.indigoBlue, fontWeight:600, fontSize:18}}>{minToHour(el.duration)}</Text>
              </TouchableOpacity>
              <MarginVertical top={30}/>
              </View>
            )
          })
          :invalidSavingList?.length > 0 && searchValue.length === 0 ?
          invalidSavingList.map((el,index) => {
            return(
              <TouchableOpacity key={index} onPress={() => {setPickedSaving([el]);setIsAssetLinkModalVisible(false)}}>
                <MarginVertical top={55}/>
                <AssetEl item={[el.title, "", `${minToHour(el.time)}`,`D-${dayjs(el.expiredAt).diff(dayjs(),'day')}`]} index={index} isLink={false}/>
              </TouchableOpacity>
            )
          })
          :
          <></>
        }
        {searchValue.length > 0 && version === "Routine"
        ? routineList.filter((el) => el[title].includes(searchValue)).map((el,index) => {
          return(
            <View key={index}>
            <TouchableOpacity  style={{flexDirection:'row', width:300, gap:13}} onPress={() => setPickedSaving([el])}>
              <View style={{width:40, height:40, borderRadius:'50%', backgroundColor:colors.indigoBlue, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontWeight:600, fontSize:24, color:"#fff"}}>{index+1}</Text>
              </View>
              <Text style={{fontWeight:600, fontSize:18, color:"#343434", flexGrow:1}}>{el.title}</Text>
              <Text style={{color:colors.indigoBlue, fontWeight:600, fontSize:18}}>{minToHour(el.duration)}</Text>
            </TouchableOpacity>
            <MarginVertical top={30}/>
            </View>
          )
        })
        : searchValue.length > 0 && invalidSavingList.length > 0 ?
          invalidSavingList.filter((el) => el.title.includes(searchValue)).map((el,index) => {
            return(
              <TouchableOpacity key={index} onPress={() => {setPickedSaving([el]);setIsAssetLinkModalVisible(false)}}>
                <MarginVertical top={55}/>
                <AssetEl item={[el.title, "", `${minToHour(el.time)}`,`D-${dayjs(el.expiredAt).diff(dayjs(),'day')}`]} index={index} isLink={false}/>
              </TouchableOpacity>
            )
          })
          :
          <></>
      }
        <MarginVertical top={50}/>
        </SavingListBody>
        <View>
          <Button text={"확인"} handleButton={handleCompleteButton}/>
        </View>
        <AssetLinkModalBg source={asset_link_modal_bg}/>
      </AssetLinkModalBody>
      
    </Modal>
  )
}

export default AssetLinkModal

const AssetLinkModalBody = styled.View`
  width:${size.width}px;
  position:absolute;
  left:-20px;
  display:flex;
  bottom:-20px;
  align-items:center;
  border-radius:20px;
  height:550px;
  padding:30px 0;
  overflow:hidden;
`

const AssetLinkModalBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  bottom:-130px;
  z-index:-1;
`

const AssetLinkModalTitle = styled.Text`
  font-size:20px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:8px;
`

const AssetLinkModalText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain70};
  text-align:center;
`

const SearchArea = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

const SearchInput = styled.TextInput`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain}
  width:300px;
  height:40px;
`

const BorderLine = styled.View`
  background-color:#fff;
  width:300px;
  height:.8px;
`

const SavingListBody = styled.ScrollView`
  height:230px;
`