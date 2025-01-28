import React from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components'

import asset_link_modal_bg from '../../../assets/routine_repeat_setting_bg.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import { Text, View } from 'react-native';
import Button from './Button';
import MarginVertical from './MarginVertical';

const AssetLinkModal = ({isAssetLinkModalVisible, setIsAssetLinkModalVisible}) => {
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
        <MarginVertical top={380}/>
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
  justify-content:center;
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


