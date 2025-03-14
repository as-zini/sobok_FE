import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import complete_snow_card_bg from '../../../assets/complete_snow_card_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import SnowCardEl from '../components/SnowCardEl';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import MarginVertical from '../components/MarginVertical';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

const CompleteSnowCard = ({route}) => {
  const cardInfo = [{type:'english',title:'알파벳 A의', text:'어딘가 모르게\nA를 닮은 눈 조각\n영어를 열심히 하셨군요?'},{type:'beaker',title:'비커 모양의',text:"실험실의 눈 조각!\n새로운 일을 시도하신\n지윤 님에게 드립니다!"},{type:"donut",title:"도넛 모양의",text:"돌고 돌아 드디어\n적금을 완성하셨군요!\n도넛의 처음과 끝이 만났네요!"},
  {type:"reading",title:"두꺼운 책 모양의",text:'좋은 내용을 많이 담아\n두꺼운  책 모양이 된 걸까요?\n지윤 님의 유익한 독서 생활을\n응원합니다!'},{type:'like',title:'좋아하는 마음의',text:'너무 좋아하면\n계속 들여다 보고 싶어진다고 하죠!\n15일이나 찾아온 당신,\n사랑에 빠졌나봐요!'},
  {type:'quarter',title:'초승달 모양의',text:'예쁜 초승달이 떴네요!\n하루하루 쌓아가다보면\n꽉 찬 보름달로 변해있겠죠?'},{type:'half',title:'반달 모양의',text:'반달에 소원을 빌면\n반만 이뤄줄까요~?\n내 소원을 반이나 이뤄준다니?!'},{type:'full',title:'보름달 모양의',text:'드디어 꽉 찬 보름달이 떴어요!\n보름달에 소원을 빌면\n모두 이루어 줄 거예요!'},
  {type:'angel',title:'천사 날개의',text:"한없이 순수하고 깨끗한\n천사의 날개처럼!\n한 가지 목표만을 위해\n꾸준히 달려오셨네요!"},{type:'cloud',title:"구름 모양의",text:'여유롭게 흘러가는 구름\n목적지가 어디인지는 잘 몰라도\n꾸준히 가고 있어요!'},{type:'hexagon',title:'육각형 모양의',text:'어디 하나 빠지지 않는\n완벽한 지윤 님!\n다재다능한 지윤 님의 노력이\n언젠가 빛을 발할거예요!'},
  {type:'crab',title:'소라게 모양의',text:'자신만의 집을\n메고 다니는 소라게처럼!\n지윤 님의 자율 루틴이\n안전한 집이 되어 주겠죠?'},{type:'exercise',title:'아령 모양의',text:'으쌰으쌰!\n이 무거운 아령 조각을 들고\n오늘도 건강에 한 발자국 ...!'},{type:'spring',title:'스프링 모양의',text:'초보에서 전문가까지\n순식간에 점~프!\n스프링 장착한 토끼!'},
  {type:'rolypoly',title:'오뚝이 모양의',text:'넘어져도 굴하지 않는\n오뚝이처럼!\n포기하지 않은 지윤 님,\n정말 멋지네요! :)'},{type:'pudding',title:'한 입 베어먹은 푸딩의',text:'어때요?\n한 입만 먹어도 행복한 맛이죠?!\n열심히 살기, 뭐 별 거 있나요?\n작고 소소하게 시작하는거죠!'},{type:'second-language',title:'지구본 모양의',text:'둥근 지구본에서\n어느 곳을 찍어도\n유창하게 말할 수 있는\n그날까지!'},
  {type:'other',title:'기타 모양의',text:'다양한 소리가 나는 기타처럼 ...\n기타 카테고리의 다양한 할 일을\n시작하셨군요! (하 하 하!)'},{type:'fairy',title:'요정 모양의',text:'어디서 온 요정님일까요?\n혹시 지윤 님의\n자투리 시간을 책임지러 온 요정님?!'},{type:'snake',title:'뱀 모양의',text:'2025년 한정 눈 조각!\n2025년 1월 1일부터\n열심히 시간을 쌓은 지윤 님!\n올해도 화이팅!!'},
  {type:'self-improvement',title:'햇님 모양의',text:'매일 떠오르는 햇님처럼\n꾸준히 노력하는\n지윤 님이 더! 더! 성장하기를!'},{type:'hobby',title:'선물 상자 모양의',text:'푹 빠질 수 있는\n취미를 찾으셨다구요?!\n인생의 선물을 얻으셨군요!'}
]
  const {type} = route.params;

  const [card,setCard] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    setCard(cardInfo.find((el) => el.type === type))
    setIsComplete(true)
  }, [])

  
  return (
    <SafeAreaView>
      {isComplete?
      <CompleteSnowCardBody>
        <CompleteSnowCardHeader>
          <View style={{position:'absolute', left:0}}>
            <BackArrowButton/>
          </View>
          <CompleteSnowCardHeaderText>7월의 눈카드</CompleteSnowCardHeaderText>
        </CompleteSnowCardHeader>
        <MarginVertical top={40}/>
        <SnowCardEl text={`${card.title}\n눈조각`} date={dayjs().subtract(1,'month').format('YYYY.MM')} type={cardInfo.findIndex((el) => el.type === type)}/>
        <MarginVertical top={25}/>
        <SnowFlakeIcon color={"indigo"} size={16}/>
        <MarginVertical top={10}/>
        <SnowCardTitle>{`${card.title}\n눈조각`}</SnowCardTitle>
        <MarginVertical top={15}/>
        <SnowCardText>{card.text}</SnowCardText>
        <MarginVertical top={55}/>
        <Button text={"카드 저장하기"} handleButton={() => navigation.navigate('SnowCardBook')} />
      </CompleteSnowCardBody>
      :<></>}
      <CompleteSnowCardBg source={complete_snow_card_bg}/>
    </SafeAreaView>
  )
}

export default CompleteSnowCard

const CompleteSnowCardBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:0 30px;
`

const CompleteSnowCardBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
`

const CompleteSnowCardHeader = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:row;
`

const CompleteSnowCardHeaderText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.darkGray};
`


const SnowCardTitle = styled.Text`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain};
  line-height:36px;
  text-align:center;
`

const SnowCardText = styled.Text`
  font-weight:500;
  font-size:18px;
  line-height:26px;
  color:${colors.fontMain60};
  text-align:center;
`
