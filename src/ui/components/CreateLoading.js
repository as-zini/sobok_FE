// import React from 'react'
// import { Dimensions, SafeAreaView, Text, View } from 'react-native'
// import styled from 'styled-components'

// import create_loading_bg from '../../../assets/create_loading_bg.png';
// import cloud_icon from '../../../assets/cloud_icon.png';
// import snowflak_icon from '../../../assets/snowflak_icon.png';
// import { colors } from '../styles/colors';
// import Steps from './Step';
// import MarginVertical from './MarginVertical';
// import { useUserInfoStore } from '../../store/user';
// import { size } from '../styles/size';

// const width=Dimensions.get('screen').width;
// const height = Dimensions.get('screen').height;

// const CreateLoading = ({categoryText, marginTop}) => {
//   const {userInfo, setUserInfo} = useUserInfoStore();

//   return (
//     <SafeAreaView>
//       <CreateLoadingBody>
//         <MarginVertical top={75}/>
//         <Steps step={5}/>
//         <LoadingCloundIcon source={cloud_icon} style={{marginTop:120}}/>
//         <LoadingSnowFlackIcon source={snowflak_icon}/>
//         <PercentageText>14%</PercentageText>
//         <LoadingTitle>{`${categoryText}\n만드는중`}</LoadingTitle>
//         <LoadingText>{`조금만 기다리면\n${userInfo.displayName} 님만의 맞춤 루틴 완성!`}</LoadingText>
//       </CreateLoadingBody>
//       <CreateLoadingBg source={create_loading_bg}/>
//     </SafeAreaView>
//   )
// }

// export default CreateLoading

// const CreateLoadingBody = styled.View`
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   width:${size.width}px;
// `

// const CreateLoadingBg = styled.Image`
//   position:absolute;
//   top:0;
//   width:${width}px;
//   height:${height}px;
//   z-index:-1;
// `

// const LoadingCloundIcon = styled.Image`
//   width:87px;
//   height:60px;
//   margin-bottom:12px;
// `

// const LoadingSnowFlackIcon = styled.Image`
//   width:28px;
//   height:29px;
//   margin-bottom:44px;
// `

// const PercentageText = styled.Text`
//   font-size:32px;
//   font-weight:600;
//   color:${colors.fontMain};
//   margin-bottom:70px;
// `

// const LoadingTitle = styled.Text`
//   font-size:24px;
//   font-weight:600;
//   color:${colors.fontMain};
//   text-align:center;
//   margin-bottom:24px;
// `

// const LoadingText = styled.Text`
//   font-size:16px;
//   font-weight:500;
//   color:${colors.fontMain60};
//   text-align:center;
// `


import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import create_loading_bg from '../../../assets/create_loading_bg.png';
import cloud_icon from '../../../assets/cloud_icon.png';
import snowflak_icon from '../../../assets/snowflak_icon.png';
import { colors } from '../styles/colors';
import Steps from './Step';
import MarginVertical from './MarginVertical';
import { useUserInfoStore } from '../../store/user';
import { size } from '../styles/size';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CreateLoading = ({ categoryText, marginTop, isComplete }) => {
  const { userInfo } = useUserInfoStore();
  const navigation = useNavigation();

  const [progress, setProgress] = useState(1);
  const intervalRef = useRef(null);
  const [isReadyToNavigate, setIsReadyToNavigate] = useState(false);

  useEffect(() => {
    startProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isComplete]); // isComplete 변경되면 다시 처리

  useEffect(() => {
    if (progress >= 100 && isComplete) {
      setIsReadyToNavigate(true);
    }
  }, [progress, isComplete]);

  useEffect(() => {
    if (isReadyToNavigate) {
      setTimeout(() => {
        navigation.navigate('NextScreen'); // 원하는 화면으로 이동
      }, 300);
    }
  }, [isReadyToNavigate]);

  const startProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        let next;

        // 완료되었으면 더 빠르게 100으로
        if (isComplete) {
          next = Math.min(prev + 5, 100); // 완료되었으면 5씩
        } else {
          next = Math.min(prev + 3, 99); // 아닐 때는 3씩, 최대 99%
        }

        return next;
      });
    }, 50); // 50ms마다 증가
  };

  return (
    <SafeAreaView>
      <CreateLoadingBody>
        <MarginVertical top={75} />
        <Steps step={5} />
        <LoadingCloundIcon source={cloud_icon} style={{ marginTop: 120 }} />
        <LoadingSnowFlackIcon source={snowflak_icon} />
        <PercentageText>{progress}%</PercentageText>
        <LoadingTitle>{`${categoryText}\n만드는중`}</LoadingTitle>
        <LoadingText>{`조금만 기다리면\n${userInfo.displayName} 님만의 맞춤 루틴 완성!`}</LoadingText>
      </CreateLoadingBody>
      <CreateLoadingBg source={create_loading_bg} />
    </SafeAreaView>
  );
};

export default CreateLoading;


const CreateLoadingBody = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${size.width}px;
`;

const CreateLoadingBg = styled.Image`
  position: absolute;
  top: 0;
  width: ${width}px;
  height: ${height}px;
  z-index: -1;
`;

const LoadingCloundIcon = styled.Image`
  width: 87px;
  height: 60px;
  margin-bottom: 12px;
`;

const LoadingSnowFlackIcon = styled.Image`
  width: 28px;
  height: 29px;
  margin-bottom: 44px;
`;

const PercentageText = styled.Text`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.fontMain};
  margin-bottom: 70px;
`;

const LoadingTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.fontMain};
  text-align: center;
  margin-bottom: 24px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain60};
  text-align: center;
`;
