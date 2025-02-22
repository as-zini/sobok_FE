import React, { useEffect } from 'react'
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

const AssetLinkModal = ({isAssetLinkModalVisible, setIsAssetLinkModalVisible, invalidSavingList, setInvalidSavingList, setPickedSaving}) => {
  const {getInvalidSavingList} = useInstallmentSaving();

  useEffect(() => {
    getInvalidSavingList(setInvalidSavingList);
  }, [])
  

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
          <SearchInput placeholder={"적금을 검색해보세요"} placeholderTextColor="#fff"/>
          <BorderLine/>
          <TouchableOpacity style={{position:'absolute', right:0, bottom:10}}>
            <Image source={search_icon}/>
          </TouchableOpacity>
        </SearchArea>
        <MarginVertical top={55}/>
        <View style={{width:300}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:600}}>{`총 ${invalidSavingList.length}개의 적금`}</Text>
        </View>
        <SavingListBody>
          {invalidSavingList.length > 0 ?
          invalidSavingList.map((el,index) => {
            return(
              <TouchableOpacity key={index} onPress={() => setPickedSaving([el])}>
                <MarginVertical top={55}/>
                <AssetEl item={[el.title, "", `${minToHour(el.time)}`,`${el.time*30}`]} index={index} isLink={false}/>
              </TouchableOpacity>
            )
          })
          :
          <></>
        }
        </SavingListBody>
        <View>
          <Button text={"확인"} handleButton={() => setIsAssetLinkModalVisible(false)}/>
        </View>
      </AssetLinkModalBody>
      <AssetLinkModalBg source={asset_link_modal_bg}/>
    </Modal>
  )
}

export default AssetLinkModal

const AssetLinkModalBody = styled.View`
  width:${size.width}px;
  position:absolute;
  left:-20px;
  display:flex;
  bottom:20px;
  align-items:center;
`

const AssetLinkModalBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  left:-20px;
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
  max-height:230px;
`