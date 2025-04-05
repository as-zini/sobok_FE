import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

import test_bg from '../../../assets/test_bg.png'
import BackArrowButton from '../components/BackArrowButton'
import Steps from '../components/Step'
import { colors } from '../styles/colors'
import bus_icon from '../../../assets/bus_icon.png';
import car_icon from '../../../assets/car_icon.png';
import free_time_icon from '../../../assets/free_time_icon.png';
import game_icon from '../../../assets/game_icon.png';
import diversity_icon from '../../../assets/diversity_icon.png';
import mono_icon from '../../../assets/mono_icon.png';
import circle_graphic from '../../../assets/circle_graphic.png';
import top_graphic from '../../../assets/top_graphic.png';
import trapezoid_graphic from '../../../assets/trapezoid_graphic.png';
import plat_graphic from '../../../assets/plat_graphic.png';
import Button from '../components/Button'
import StepNumber from '../components/StepNumber'
import { useNavigation } from '@react-navigation/native'
import ChoiceModal from '../components/SpareTimeChoiceModal'
import MarginVertical from '../components/MarginVertical'
import clicked_bus_button from '../../../assets/clicked_bus_button.png';
import clicked_car_button from '../../../assets/clicked_car_button.png';
import clicked_game_button from '../../../assets/clicked_game_button.png';
import clicked_time_button from '../../../assets/clicked_time_button.png';
import SimpleTodoEl from '../components/SimpleTodoEl'
import { getTimeDifference, minToHour } from '../../util'
import selected_step1_1 from '../../../assets/selected_step1_1.png';
import selected_step1_2 from '../../../assets/selected_step1_2.png';
import selected_step2_1 from '../../../assets/selected_step2_1.png';
import selected_step2_2 from '../../../assets/selected_step2_2.png';
import selected_step3_1 from '../../../assets/selected_step3_1.png';
import selected_step3_2 from '../../../assets/selected_step3_2.png';
import { useUserInfoStore } from '../../store/user'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Test = () => {
  const [step, setStep] = useState(1);
  const [detailStep, setDetailStep] = useState(1);
  const {userInfo, setUserInfo} = useUserInfoStore()
  const [isChoiceModalVisible, setIsChoiceModalVisible] = useState(false);
  const TestCategoryTextList = ["자투리 시간", "자투리 시간", "루틴 속성", ["취향", "세부사항"], ""]
  const TestText = ["언제 자투리 시간이\n생기나요?", "자투리 시간이\n얼마나 생기나요?", [`${userInfo.displayName} 님은 무엇을\n더 선호하시나요?`,`${userInfo.displayName} 님은 어떤 계획을\n더 선호하시나요?`,`${userInfo.displayName} 님은\n집중할 때 어때요?`], [`${userInfo.displayName} 님의 관심은\n어디로 향하고 있나요?`,`${userInfo.displayName} 님,\n원하는 것을 말씀해주세요!`]];
  const iconHeight = detailStep === 2 ? 63 : 52;
  const iconWidth = detailStep === 2 ? 40 : 54;
  const navigation = useNavigation();
  const [isClicked,setIsClicked] = useState(0);
  const [time, setTime] = useState({});
  const [timeList, setTimeList] = useState([])
  const [step4Value, setStep4Value] = useState("");
  const unChecked = step === 1 && isClicked === 0 ? true: step===2 && timeList?.length === 0 ? true : step === 4 && detailStep === 2 && (step4Value.length > 30) ? true : false
  const [step3Data, setStep3Data ] = useState({step1:"", step2:"", step3:""});
  const interestCategory = ["언어", "공부"]
  const interestList = [""]
  const step3Value1 = ["여러가지를 다양하게", "느슨하고 여유로운", "오래 오래 집중하기"];
  const step3Value2 = ["하나를 진득하게", "촘촘하고 체계적인", "쉽게 질려 금방 쉬기"];
  const [step3Clicked, setStep3Clicked] = useState(0);
  const [likeOption, setLikeOption] = useState([]);
  

  

  

  const handleTestButton = () => {
    if(step <= 4){
      if(step === 3 && detailStep < 3){
      setDetailStep((prev) => prev+1)
      setStep3Clicked(0)
      }else if(step === 3 && detailStep === 3){
        setDetailStep(1);
        setStep(prev => prev+1);
      }else if(step === 4 && detailStep < 2){
        setDetailStep(2);
      }else if(step===4 && detailStep === 2){
        navigation.navigate("AiRoutineComplete", {
          spareTpo:isClicked === 1 ? "출퇴근 시간(대중교통)" : isClicked === 2 ? "출퇴근 시간(자가용)" : isClicked === 3? "쉬는 시간 및 자유 시간" : "대기 시간",
          spareTime:timeList.map((el) => `${el.startTime}-${el.endTime}`),
          preference1:step3Data.step1,
          preference2:step3Data.step2,
          preference3:step3Data.step3,
          likeOption:likeOption,
          extraRequest:step4Value,
          isComplete:false
        })
      }
      else{
      setStep((prev) => prev+1);
      console.log(detailStep)
      
      }
    }
  }

  useEffect(() => {
   console.log(step, detailStep, timeList)
  }, [step, detailStep])
  
  const DataForLang = [
      "회화", "문법","단어", "듣기", "영어", "중국어", "일본어"
  ]
  const DataForRead = [
    "소설", "에세이","인문","역사","예술","경영" , "경제과학", "자기계발서"
  ]
  const DataForExercies = [
    "수영", "헬스", "필라테스","요가", "줄넘기","골프","걷기","등산","자전거","배드민턴","축구","농구","족구","테니스"
  ]
  const DataForDevelop = [
    "자격증","학업","재테크","취업/이직","뉴스, 신문 보기","독서","운동","교양 쌓기 (철학강좌, 인문학 등)","외국어 공부","업무 관련 툴 공부"
  ]
  const DataForHabit = [
    "드로잉","베이킹","요리","공예","글쓰기","음악","사진","영상","댄스/무용","일기"
  ]
  const DataForEtc = [
    "디자인","마케팅","메이크업/뷰티","데이터사이언스","코딩","교육","명상"
  ]

  const RenderItem = ({item}) => {
    return(
      <InterestEl>
      <InterestText>{item}</InterestText>

      </InterestEl>
    )
  }

  const ListHeader = ({title}) => {
    return(
      <>
      <Text style={{fontWeight:600, fontSize:18, color:colors.fontMain}}>{title}</Text>
      <MarginVertical top={15}/>
      </>
    )
  }

  // const handleLikeOption = (el) => {
  //   if(likeOption.includes(el)){
  //     setLikeOption(prev => prev.filter((item) => item !== el))
  //   }else{
  //     setLikeOption(prev => [...prev, el])
  // }
  // }
  

  return (
    <SafeAreaView>
      <TestBody>
        <TestHeader>
          <BackArrowButton/>
        </TestHeader>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Steps step={step}/>
        </View>
        <MarginVertical top={57}/>
        <TestContentsArea>
          <StepNumber step={step}/>
          <MarginVertical top={20}/>
          <TestCategoryText>{step===4 ? TestCategoryTextList[step-1][detailStep-1] : TestCategoryTextList[step-1]}</TestCategoryText>
          <TestQuestionText>{step === 3 ? TestText[step-1][detailStep-1] : step===4 ? TestText[step-1][detailStep-1] : TestText[step-1]}</TestQuestionText>
          
          <TestCheckArea>
          {step === 1? 
          <>
            <TestCheckEl onPress={() => setIsClicked(1)}>
              <TestCheckText style={{color:isClicked === 1 ? "#fff" : colors.gray77}}>출퇴근 시간{"\n(대중교통)"}</TestCheckText>
              {isClicked !== 1 ?
              <TestCheckIcon source={bus_icon} style={{width:76, height:55}}/>:
              <Image source={clicked_bus_button} style={{zIndex:-1}}/>
              }
            </TestCheckEl>
            <TestCheckEl onPress={() => setIsClicked(2)}>
              <TestCheckText style={{color:isClicked === 2 ? "#fff" : colors.gray77}}>출퇴근 시간{"\n(자가용)"}</TestCheckText>
              {isClicked !== 2 ?
              <TestCheckIcon source={car_icon} style={{width:62, height:40}}/>
              :<Image source={clicked_car_button} style={{zIndex:-1}}/>
              } 
            </TestCheckEl>
            <TestCheckEl onPress={() => setIsClicked(3)}>
              <TestCheckText style={{color:isClicked === 3 ? "#fff" : colors.gray77}}>쉬는 시간 및{"\n"}자유 시간</TestCheckText>
              {isClicked !== 3 ?
              <TestCheckIcon source={game_icon} style={{width:61, height:48}}/>
              :<Image source={clicked_game_button} style={{zIndex:-1}}/>
                }
            </TestCheckEl>
            <TestCheckEl onPress={() => setIsClicked(4)}>
              <TestCheckText style={{color:isClicked === 4 ? "#fff" : colors.gray77}}>대기 시간</TestCheckText>
              {isClicked !== 4 ?
              <TestCheckIcon source={free_time_icon} style={{width:48, height:49}}/>
              :<Image source={clicked_time_button} style={{zIndex:-1}}/>
                }
            </TestCheckEl>
          
          </>
          : step === 2 ?
          <>
            {timeList.map((el,index) => {
              return(
                <SimpleTodoEl key={index} index={index+1} data={[`${el.startTime} - ${el.endTime}`,"",`${getTimeDifference(el.startTime, el.endTime)}`]}/>
              )
            })}
            <SpareTimeAddButton onPress={() => setIsChoiceModalVisible(true)}>
              <SpareTimeButtonText>+</SpareTimeButtonText>
            </SpareTimeAddButton>
            <ChoiceModal isChoiceModalVisible={isChoiceModalVisible} setIsChoiceModalVisible={setIsChoiceModalVisible} setTime={setTime} time={time} setTimeList={setTimeList}/>
          </>
          : step === 3 ?
          <>
            <TestCheckEl onPress={() => {setStep3Data({...step3Data, [`step${detailStep}`]:step3Value1[detailStep-1]}); setStep3Clicked(1)}}>
              <TestCheckText style={{color:step3Clicked === 1 ? "#fff" : "#777"}}> {detailStep === 1 ? "여러가지를\n다양하게" : detailStep===2 ? "느슨하고\n여유로운" : "오래 오래\n집중하기"}</TestCheckText>
              {step3Clicked === 1 ?
              <Image style={{width:'100%', height:'100%',zIndex:-1}} source={detailStep === 1 ? selected_step1_1: detailStep===2 ? selected_step2_1 : selected_step3_1}/>
              :<TestCheckIcon source={detailStep === 1 ? diversity_icon : detailStep===2 ? circle_graphic : trapezoid_graphic} style={{width:60, height:60}}/>
              } 
            </TestCheckEl>
            <TestCheckEl onPress={() => {setStep3Data({...step3Data, [`step${detailStep}`]:step3Value2[detailStep-1]}); setStep3Clicked(2)}}>
              
              <TestCheckText style={{color:step3Clicked === 2 ? "#fff" : "#777"}}>{detailStep === 1 ? "하나를\n진득하게" : detailStep===2 ? "촘촘하고\n체계적인" : "쉽게 질려\n금방 쉬기"} </TestCheckText>
              {step3Clicked === 2 ?
              <Image style={{width:'100%', height:'100%',zIndex:-1}} source={detailStep===1 ? selected_step1_2 : detailStep === 2 ? selected_step2_2 : selected_step3_2}/>
              :<TestCheckIcon source={detailStep === 1 ? mono_icon : detailStep===2 ? top_graphic : plat_graphic} style={{width:iconWidth, height:iconHeight}}/> 
              }
            </TestCheckEl>
          </>
          :
          <></>
          }
          {step===4 && detailStep === 1 ?
          <ScrollView showsVerticalScrollIndicator={false} style={{height:'40%'}}>
            <InterestCategory>언어</InterestCategory>
            <MarginVertical top={15}/>
            <InterestBody>
              {DataForLang.map((el,index) => {
                return(
                  <InterestEl
                    key={index}
                    onPress={() => 
                      setLikeOption(prev => 
                        prev.includes(el) ? prev.filter(item => item !== el) : [...prev, el]
                      )
                    }
                    style={{backgroundColor:likeOption.includes(el) ? colors.indigoBlue70:"rgba(255,255,255,.2)"}}>
                    <InterestText>{el}</InterestText>
                  </InterestEl>
                )
              })}
            </InterestBody>
            <MarginVertical top={40}/>
            <InterestCategory>독서</InterestCategory>
            <MarginVertical top={15}/>
            <InterestBody>
              {DataForRead.map((el,index) => {
                return(
                  <InterestEl
                    key={index}
                    onPress={() => 
                      setLikeOption(prev => 
                        prev.includes(el) ? prev.filter(item => item !== el) : [...prev, el]
                      )
                    }
                    style={{backgroundColor:likeOption.includes(el) ? colors.indigoBlue70:"rgba(255,255,255,.2)"}}>
                    <InterestText>{el}</InterestText>
                  </InterestEl>
                )
              })}
            </InterestBody>
            <MarginVertical top={40}/>
            <InterestCategory>운동</InterestCategory>
            <MarginVertical top={15}/>
            <InterestBody>
              {DataForExercies.map((el,index) => {
                return(
                  <InterestEl
                    key={index}
                    onPress={() => 
                      setLikeOption(prev => 
                        prev.includes(el) ? prev.filter(item => item !== el) : [...prev, el]
                      )
                    }
                    style={{backgroundColor:likeOption.includes(el) ? colors.indigoBlue70:"rgba(255,255,255,.2)"}}>
                    <InterestText>{el}</InterestText>
                  </InterestEl>
                )
              })}
            </InterestBody>
            <MarginVertical top={40}/>
            <InterestCategory>자기계발</InterestCategory>
            <MarginVertical top={15}/>
            <InterestBody>
              {DataForDevelop.map((el,index) => {
                return(
                  <InterestEl
                    key={index}
                    onPress={() => 
                      setLikeOption(prev => 
                        prev.includes(el) ? prev.filter(item => item !== el) : [...prev, el]
                      )
                    }
                    style={{backgroundColor:likeOption.includes(el) ? colors.indigoBlue70:"rgba(255,255,255,.2)"}}>
                    <InterestText>{el}</InterestText>
                  </InterestEl>
                )
              })}
            </InterestBody>
            <MarginVertical top={40}/>
            <InterestCategory>취미</InterestCategory>
            <MarginVertical top={15}/>
            <InterestBody>
              {DataForHabit.map((el,index) => {
                return(
                  <InterestEl
                    key={index}
                    onPress={() => 
                      setLikeOption(prev => 
                        prev.includes(el) ? prev.filter(item => item !== el) : [...prev, el]
                      )
                    }
                    style={{backgroundColor:likeOption.includes(el) ? colors.indigoBlue70:"rgba(255,255,255,.2)"}}>
                    <InterestText>{el}</InterestText>
                  </InterestEl>
                )
              })}
            </InterestBody>
            <MarginVertical top={40}/>
            <InterestCategory>기타</InterestCategory>
            <MarginVertical top={15}/>
            <InterestBody>
              {DataForEtc.map((el,index) => {
                return(
                  <InterestEl
                    key={index}
                    onPress={() => 
                      setLikeOption(prev => 
                        prev.includes(el) ? prev.filter(item => item !== el) : [...prev, el]
                      )
                    }
                    style={{backgroundColor:likeOption.includes(el) ? colors.indigoBlue70:"rgba(255,255,255,.2)"}}>
                    <InterestText>{el}</InterestText>
                  </InterestEl>
                )
              })}
            
            </InterestBody>
            <MarginVertical top={200}/>
          </ScrollView>
          : step===4 && detailStep === 2 ?
          <View style={{display:'flex', gap:10}}>
            <Step4Input
              placeholder={"ex)영어 강의 듣기를 포함시켜줘"}
              value={step4Value}
              onChange={(e) => setStep4Value(e.nativeEvent.text)}
              placeholderTextColor="#fff"
              style={{color:step4Value.length > 30 ? "#FF4848" : colors.fontMain}}
            />
            <View style={{width:294, height:1, backgroundColor:"#fff"}}></View>
            <Text style={{color:step4Value.length > 30 ? "#FF4848" : "#fff", fontWeight:500, fontSize:14}}>{`${step4Value.length}/30`}</Text>
          </View>
          :
          <></>
          }
          
        </TestCheckArea>
        </TestContentsArea>
        <View style={{position:'absolute', bottom:100}}>
          <Button text={"다음 단계로"} unChecked={unChecked} handleButton={handleTestButton}/>
        </View>  
      </TestBody>
      <TestBg source={test_bg}/>
    </SafeAreaView>
  )
}

export default Test


const TestBody = styled.View`
  display:flex;
  align-items:center;
  width:${width}px;
  height:${height}px;
  padding:0 30px;
`

const TestBg = styled.Image`
  position:absolute;
  top:0;
  width:${width}px;
  height:${height}px;
  z-index:-1;
`

const TestHeader = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
`

const TestContentsArea = styled.View`
  display:flex;
  width:100%;
`

const TestCategoryText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain60};
  margin-bottom:10px;
`

const TestQuestionText = styled.Text`
  font-size:24px;
  font-weight:600;
  color:${colors.fontMain};
  margin-bottom:45px; 
`

const TestCheckArea = styled.View`
  display:flex;
  flex-direction:row;
  width:${width*.9};
  flexWrap:wrap;
  gap:16px;
`

const TestCheckEl = styled.TouchableOpacity`
  width:${width*.75/2}px;
  background-color:#fff;
  height:${width*.75/2}px;
  border-radius:15px;
`

const TestCheckText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#777777;
  position:absolute;
  top:18px;
  left:16px;
  
`

const TestCheckIcon = styled.Image`
  position:absolute;
  bottom:10px;
  right:10px;
`

const SpareTimeAddButton = styled.TouchableOpacity`
  background-color:rgba(255,255,255,.4);
  width:290px;
  height:70px;
  z-index:9;
  border-radius:8px;
  display:flex
  justify-content:center;
  align-items:center;
`

const SpareTimeButtonText = styled.Text`
  color:#fff;
  font-weight:500;
  font-size:24px;
`

const InterestBody = styled.View`
  flex-direction:row;
  width:100%;
  flex-wrap:wrap;
  gap:10px;
`

const InterestEl = styled.TouchableOpacity`
  padding: 10px;
  backgroundColor:rgba(255,255,255,.2);
  borderRadius:24px;
  justifyContent:center;
  alignItems:center;
  border:1px solid rgba(255,255,255,.5);
`

const InterestText = styled.Text`
  color:#fff;
  font-weight:600;
  font-size:18px;
`

const InterestCategory = styled.Text`
  fontWeight:600;
  fontSize:18px;
  color:${colors.fontMain}
`

const Step4Input = styled.TextInput`
  color:${colors.fontMain};
  font-size:18px;
  font-weight:500;
  width:294px;
`

