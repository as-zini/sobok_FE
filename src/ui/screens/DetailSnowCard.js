import React from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from '@emotion/native'
import { size } from '../styles/size'

import bg from '../../../assets/statistic_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import SnowCardEl from '../components/SnowCardEl';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import { useUserInfoStore } from '../../store/user';


const DetailSnowCard = ({route}) => {
  const {type, date, isMyCard} = route.params;
  const {userInfo} = useUserInfoStore();
  const cardInfo = [
    {type:'english',title:'알파벳 A의', text:isMyCard ? '어딘가 모르게\nA를 닮은 눈 조각\n영어를 열심히 하셨군요?' : '한 달 동안 영어 카테고리의 적금에\n가장 많은 눈이 쌓이면 받을 수 있어요!'},
    {type:'beaker',title:'비커 모양의',text:isMyCard?`실험실의 눈 조각!\n새로운 일을 시도하신\n${userInfo.displayName} 님에게 드립니다!`:"기존에 하고 있지 않은\n새로운 카테고리의 적금을 만들면\n받을 수 있어요!"},
    {type:"donut",title:"도넛 모양의",text:isMyCard ? "돌고 돌아 드디어\n적금을 완성하셨군요!\n도넛의 처음과 끝이 만났네요!" : "모으고 있던 적금이 만기되면\n받을 수 있어요!"},
    {type:"reading",title:"두꺼운 책 모양의",text:isMyCard ? `좋은 내용을 많이 담아\n두꺼운 책 모양이 된 걸까요?\n${userInfo.displayName} 님의 유익한 독서 생활을\n응원합니다!`:"한 달 동안 독서 카테고리의 적금에\n가장 많은 눈이 쌓이면\n받을 수 있어요!"},
    {type:'like',title:'좋아하는 마음의',text:isMyCard ? '너무 좋아하면\n계속 들여다 보고 싶어진다고 하죠!\n15일이나 찾아온 당신,\n사랑에 빠졌나봐요!' : "연속달성일 15일을 채우면\n받을 수 있어요!"},
    {type:'quarter',title:'초승달 모양의',text:isMyCard ? '예쁜 초승달이 떴네요!\n하루하루 쌓아가다보면\n꽉 찬 보름달로 변해있겠죠?':"한 달 동안 정해진 루틴의\n25~49%를 달성하면\n받을 수 있어요!"},
    {type:'half',title:'반달 모양의',text:isMyCard ? '반달에 소원을 빌면\n반만 이뤄줄까요~?\n내 소원을 반이나 이뤄준다니?!':"한 달 동안 정해진 루틴\n50~99%를 달성하면\n받을 수 있어요!"},
    {type:'full',title:'보름달 모양의',text:isMyCard ? '드디어 꽉 찬 보름달이 떴어요!\n보름달에 소원을 빌면\n모두 이루어 줄 거예요!':'한 달 동안 정해진 루틴을\n모두 달성하면 받을 수 있어요!'},
    {type:'angel',title:'천사 날개의',text:isMyCard ? "한없이 순수하고 깨끗한\n천사의 날개처럼!\n한 가지 목표만을 위해\n꾸준히 달려오셨네요!":"가지고 있는 적금의 카테고리 종류가\n하나일 때 받을 수 있어요!"},
    {type:'cloud',title:"구름 모양의",text:isMyCard ? '여유롭게 흘러가는 구름\n목적지가 어디인지는 잘 몰라도\n꾸준히 가고 있어요!' : "한 달 동안 정해진 루틴의\n0~24%를 달성하면 받을 수 있어요!"},
    {type:'hexagon',title:`육각형 모양의`,text:isMyCard ? `어디 하나 빠지지 않는\n완벽한 ${userInfo.displayName} 님!\n다재다능한 ${userInfo.displayName} 님의 노력이\n언젠가 빛을 발할거예요!`:"가지고 있는 적금의 카테고리 종류가\n6개 이상일 때 받을 수 있어요!"},
    {type:'crab',title:'소라게 모양의',text:isMyCard ? `자신만의 집을\n메고 다니는 소라게처럼!\n${userInfo.displayName} 님의 자율 루틴이\n안전한 집이 되어 주겠죠?`:"한 달 동안 자율 루틴만 달성하면\n받을 수 있어요!"},
    {type:'exercise',title:'아령 모양의',text:isMyCard ? '으쌰으쌰!\n이 무거운 아령 조각을 들고\n오늘도 건강에 한 발자국 ...!':"제과제빵 카테고리의 적금을 새로 시작하면\n받을 수 있어요!"},
    {type:'spring',title:'스프링 모양의',text:isMyCard ? '초보에서 전문가까지\n순식간에 점~프!\n스프링 장착한 토끼!':'한 카테고리에서 500시간 이상 달성하면\n받을 수 있어요!'},
    {type:'rolypoly',title:'오뚝이 모양의',text:isMyCard ? `넘어져도 굴하지 않는\n오뚝이처럼!\n포기하지 않은 ${userInfo.displayName} 님,\n정말 멋지네요! :)`:'14일 이상 출석하지 않았을 때\n받을 수 있어요!'},
    {type:'pudding',title:'한 입 베어먹은 푸딩의',text:isMyCard ? '어때요?\n한 입만 먹어도 행복한 맛이죠?!\n열심히 살기, 뭐 별 거 있나요?\n작고 소소하게 시작하는거죠!':'루틴 1개에 할 일이 1개만 등록되어 있으면\n받을 수 있어요!'},
    {type:'second-language',title:'지구본 모양의',text:isMyCard ? '둥근 지구본에서\n어느 곳을 찍어도\n유창하게 말할 수 있는\n그날까지!':'제2외국어 카테고리의 적금을\n새로 시작하면받을 수 있어요!'},
    {type:'other',title:'기타 모양의',text:isMyCard ? '다양한 소리가 나는 기타처럼 ...\n기타 카테고리의 다양한 할 일을\n시작하셨군요! (하 하 하!)':'기타 카테고리의 적금을\n새로 시작하면 받을 수 있어요!'},
    {type:'fairy',title:'요정 모양의',text:isMyCard ? `어디서 온 요정님일까요?\n혹시 ${userInfo.displayName} 님의\n자투리 시간을 책임지러 온 요정님?!`:'한 달 동안 AI 루틴만 달성하면\n받을 수 있어요! '},
    {type:'snake',title:'뱀 모양의',text:isMyCard ? `2025년 한정 눈 조각!\n2025년 1월 1일부터\n열심히 시간을 쌓은 ${userInfo.displayName} 님!\n올해도 화이팅!!`:' 2025년 1월 1일에 출석한 분들께\n드리는 깜짝 이벤트!'},
    {type:'self-improvement',title:'햇님 모양의',text:isMyCard ? `매일 떠오르는 햇님처럼\n꾸준히 노력하는\n${userInfo.displayName} 님이 더! 더! 성장하기를!`:'자기계발 카테고리의 적금을\n새로 시작하면 받을 수 있어요!'},
    {type:'hobby',title:'선물 상자 모양의',text:isMyCard ? '푹 빠질 수 있는\n취미를 찾으셨다구요?!\n인생의 선물을 얻으셨군요!':'취미 카테고리의 적금을\n새로 시작하면 받을 수 잇어요!'}
  ]

  const currentCard = cardInfo.find((el) => el.type === type)
  const currentIndex = cardInfo.findIndex((el) => el.type === type)

  return (
    <SafeAreaView>
      <DetailSnowCardBody>
        <DetailSnowCardHeader>
          <View>
            <BackArrowButton/>
          </View>
        </DetailSnowCardHeader>
        <MarginVertical top={100}/>
        <SnowCardEl text={`${currentCard.title}\n눈조각`} type={currentIndex} isArrow={false} date={date}/>
        <MarginVertical top={24}/>
        <SnowFlakeIcon color={'indigo'} size={16}/>
        <MarginVertical top={11}/>
        <Title>{`${currentCard.title}\n눈조각`}</Title>
        <MarginVertical top={16}/>
        <Text>{currentCard.text}</Text>
      </DetailSnowCardBody>
      <DetailSnowCardBg source={bg}/>
    </SafeAreaView>
  )
}

export default DetailSnowCard

const DetailSnowCardBody = styled.View`
  width:${() => `${size.width}px`};
  display:flex;
  justify-content:center;
  align-items:center;
  padding:0 20px;
`

const DetailSnowCardBg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
`

const DetailSnowCardHeader = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  aling-items:center;
`

const Text = styled.Text`
  font-weight:500;
  font-size:18px;
  color:${colors.fontMain60};
  text-align:center;
  line-height:26px;
`

const Title = styled.Text`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain};
  text-align:center;
  line-height:32px;
`