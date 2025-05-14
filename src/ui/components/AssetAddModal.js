import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Modal from 'react-native-modal';
import styled from 'styled-components';

import asset_add_bg from '../../../assets/asset_add_bg.png';
import asset_add_icon from '../../../assets/asset_add_icon.png';
import autonomy_routine_icon from '../../../assets/autonomy_routine_icon.png';
import installment_saving_icon from '../../../assets/save_icon.png';
import ai_routine_icon from '../../../assets/routine_icon.png';
import { size } from '../styles/size';
import NavigateArrowButton from './NavigateArrowButton';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';
import { useNavigation } from '@react-navigation/native';

const AssetAddModal = ({isAssetAddModalVisible, setIsAssetAddModalVisible}) => {
  const assetCategory = ['적금', 'AI 루틴', "자율루틴"];
  const assetText = ['목표 금액을 정하고\n꾸준히 시간을 모을 수 있어요', "AI가 나만의 루틴을\n만들어줘요","직접 나만의 루틴을\n만들 수 있어요"];
  const assetIcon = [installment_saving_icon, ai_routine_icon, autonomy_routine_icon];

  const navigation = useNavigation();

  const handleAddAssetButton = (index) => {
    navigation.navigate("StartAddAsset", {
      version: index===0 ? "Saving" : index === 1 ? "Ai" : "Free"
    });
    setIsAssetAddModalVisible(false);
  }
  
  return (
    <SafeAreaView style={{borderRadius:24}}>
      <Modal
        isVisible={isAssetAddModalVisible} 
        animationIn={'slideInUp'}
        animationInTiming={1000} 
        animationOut={'slideOutDown'} 
        animationOutTiming={1000}
        onBackdropPress={() => setIsAssetAddModalVisible(false)}
      >
        <AssetAddModalBody>
          <AssetAddModalIcon source={asset_add_icon}/>
          <MarginVertical top={30}/>
          <AssetAddModalTitle>새로운 자산 추가하기</AssetAddModalTitle>
          <MarginVertical top={16}/>
          <AssetAddModalText>새로운 출발은 항상 설레죠!{"\n"}어떻게 시간을 모아볼까요?</AssetAddModalText>
          <MarginVertical top={38}/>
          <AssetAddArea>
            {assetCategory.map((el, index) =>{
              return(
                <AssetAddEl style={{width:index===0?310:144}} key={index} onPress={() => handleAddAssetButton(index)}>
                  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <AssetCategory>{assetCategory[index]}</AssetCategory>
                    <NavigateArrowButton/>
                  </View>
                  {index === 0 ? 
                  <View style={{display:'flex', flexDirection:'row', marginTop:42}}>
                    <AssetText style={{flexGrow:1, fontSize:15}}>{assetText[index]}</AssetText>
                    <AssetIcon source={assetIcon[index]} style={{width:index===0? 56 : index===1 ? 40: 34, height:index===0?40:index===1 ? 25 : 35}}/>
                  </View>
                  :
                  <>
                  <AssetText style={{flexGrow:1, marginTop:12}}>{assetText[index]}</AssetText>
                  <View style={{display:'flex', alignItems:'flex-end', position:'absolute', right:10, bottom:20}}>
                    <AssetIcon source={assetIcon[index]} style={{width:index===0? 56 : index===1 ? 40: 34, height:index===0?40:index===1 ? 25 : 35}}/>
                  </View>
                  </>
                  }
                </AssetAddEl>
              )
            })}
          </AssetAddArea>
          <AssetAddModalBg source={asset_add_bg}/> 
        </AssetAddModalBody>
        

      </Modal>

    </SafeAreaView>
  )
}

export default AssetAddModal


const AssetAddModalBody = styled.View`
  width:${size.width}px;
  height:620px;
  border-radius:24px;
  position:absolute;
  bottom:-40px;
  right:-20px;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
  
`

const AssetAddModalBg = styled.Image`
  position:absolute;
  z-index:-1;
  width:100%;
  height:100%;
  resize-mode:cover;
`

const AssetAddModalIcon = styled.Image`
  width:56px;
  height:52px;
`

const AssetAddModalTitle = styled.Text`
  font-weight:700;
  font-size:28px;
  color:#fff;
`

const AssetAddModalText = styled.Text`
  font-weight:500;
  font-size:18px;
  color:#fff;
  line-height:22px;
`

const AssetAddEl = styled.TouchableOpacity`
  background-color:#fff;
  height:144px;
  border-radius:16px;
  padding:20px;
`

const AssetAddArea = styled.View`
  width:310px;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  gap:17px;
`

const AssetCategory = styled.Text`
  font-weight:600;
  font-size:24px;
  color:${colors.fontSub};
`

const AssetText = styled.Text`
  color:${colors.gray77};
  font-weight:600;
  font-size:13px;
  line-height:22px;
`

const AssetIcon = styled.Image`

`
