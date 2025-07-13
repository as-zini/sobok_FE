import React, { useRef, useState } from 'react'
import { SafeAreaView, ImageBackground, View, Text, ScrollView, Dimensions } from 'react-native'
import styled from '@emotion/native'

import bg from '../../../assets/interestBg.png'
import icon from '../../../assets/point_icon.png'
import { size } from '../styles/size'
import { colors } from '../styles/colors'
import BackArrowButton from '../components/BackArrowButton'
import MarginVertical from '../components/MarginVertical'
import SnowFlakeIcon from '../components/SnowFlakeIcon'

const BAR_DATA = [
  { month: '9월', value: 400, date: '2024.09', point: 400, percent: 20 },
  { month: '10월', value: 600, date: '2024.10', point: 600, percent: 40 },
  { month: '11월', value: 800, date: '2024.11', point: 800, percent: 60 },
  { month: '12월', value: 1000, date: '2024.12', point: 1000, percent: 80 },
  { month: '1월', value: 1200, date: '2025.01', point: 1200, percent: 100 },
]

const SCREEN_WIDTH = Dimensions.get('window').width
const BAR_WIDTH = 40
const BAR_MARGIN = 16

const ViewInterest = () => {
  const scrollRef = useRef(null)
  const [centerIndex, setCenterIndex] = useState(2) // 초기 중앙 인덱스

  // 스크롤 시 중앙 인덱스 계산
  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x
    // 중앙 좌표 계산 (스크롤뷰 내부 기준)
    const centerPosition = scrollX + SCREEN_WIDTH / 2
    // 각 바의 중앙 좌표 계산
    const barCenters = BAR_DATA.map((_, idx) => {
      return idx * (BAR_WIDTH + BAR_MARGIN) + BAR_WIDTH / 2 + SCREEN_WIDTH / 2 - BAR_WIDTH / 2
    })
    // 중앙에 가장 가까운 바 인덱스 찾기
    let minDiff = Infinity
    let minIdx = 0
    barCenters.forEach((barCenter, idx) => {
      const diff = Math.abs(centerPosition - barCenter)
      if (diff < minDiff) {
        minDiff = diff
        minIdx = idx
      }
    })
    setCenterIndex(minIdx)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {/* 상단 정보 */}
        <View style={{width:'100%', alignItems:'flex-start'}}>
          <BackArrowButton/>
        </View>
        <MarginVertical top={40}/>
        <TopSection>
          <PercentIcon source={icon}/>
          <MarginVertical top={20}/>
          <Title>영어천재적금 의{"\n"}총 이자</Title>
          <PointText>500P</PointText>
        </TopSection>
        <MarginVertical top={40}/>
        {/* 중간 이자 정보 */}
        <MidSection>
          <SnowFlakeIcon color={"indigo"} size={16}/>
          <MarginVertical top={12}/>
          <MidDate>{BAR_DATA[centerIndex].date}</MidDate>
          <MidPoint>{BAR_DATA[centerIndex].point}P</MidPoint>
          <MarginVertical top={20}/>
          <PercentBadge>{BAR_DATA[centerIndex].percent}%</PercentBadge>
        </MidSection>

        {/* 하단 스크롤 바 차트 */}
        <BarScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'flex-end', paddingHorizontal: SCREEN_WIDTH / 2 - BAR_WIDTH / 2 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {BAR_DATA.map((bar, idx) => (
            <BarContainer key={bar.month}>
              <Bar style={{ height: bar.value / 15, backgroundColor: idx === centerIndex ? '#4A6CF7' : '#E3E8F7' }} />
              <BarLabel>{bar.month}</BarLabel>
            </BarContainer>
          ))}
        </BarScrollView>
        
      </Container>
      <Bg source={bg}/>
    </SafeAreaView>
  )
}

export default ViewInterest

const Container = styled.View`
  width:${() => `${size.width}px`};
  align-items: center;
  padding: 0 30px;
  justify-content: flex-start;
`

const Bg = styled.Image`
  position:absolute;
  top:0;
  z-index:-1;
  width:${() => `${size.width}px`};
  height:${() => `${size.height}px`};
`

const TopSection = styled.View`
  margin-top: 40px;
  align-items: center;
`

const PercentIcon = styled.Image`
  width:49px;
  height:49px;
`

const Title = styled.Text`
  color: ${colors.fontMain80};
  font-size: 20px;
  font-weight:600;
  text-align: center;
  margin-bottom: 8px;
  line-height:28px;
`

const PointText = styled.Text`
  color: ${colors.fontMain};
  font-size: 40px;
  font-weight: 600;
  line-height:52px;
  margin-bottom: 24px;
`

const MidSection = styled.View`
  align-items: center;
  margin-bottom: 32px;
`

const Star = styled.Text`
  color: #4A6CF7;
  font-size: 24px;
  margin-bottom: 4px;
`

const MidDate = styled.Text`
  color: ${colors.fontMain60};
  font-size: 18px;
  line-height:26px;
  font-weight:500;
`

const MidPoint = styled.Text`
  color: ${colors.fontMain80};
  font-size: 20px;
  line-height:28px;
  font-weight:600;
`

const PercentBadge = styled.Text`
  background:${colors.indigoBlue70};
  color:#fff;
  font-size: 14px;
  padding: 5px 13px;
  font-weight:500;
  border-radius: 15px;
`

const BarScrollView = styled(ScrollView)`
  flex-grow: 0;
  height: 160px;
  margin-top: 16px;
`

const BarContainer = styled.View`
  align-items: center;
  margin: 0 8px;
`

const Bar = styled.View`
  width: 40px;
  border-radius: 8px;
  margin-bottom: 8px;
`

const BarLabel = styled.Text`
  color: #222;
  font-size: 14px;
  margin-top: 4px;
` 