import React from 'react';
import { View, Image } from 'react-native';
import styled from '@emotion/native';
import SnowFlakeIcon from './SnowFlakeIcon';
import MarginVertical from './MarginVertical';

// Assets
import snow_card_bg from '../../../assets/snow_card_bg.png';
import top from '../../../assets/top_graphic.png';
import beaker from '../../../assets/beaker_graphic.png';
import donut from '../../../assets/donut_graphic.png';
import book from '../../../assets/book_graphic.png';
import heart from '../../../assets/heart_graphic.png';
import quarter from '../../../assets/quarter_moon_graphic.png';
import halfMoon from '../../../assets/half_moon_graphic.png';
import full from '../../../assets/full_moon_graphic.png';
import angel from '../../../assets/angel_graphic.png';
import cloud from '../../../assets/cloud_graphic.png';
import hexagon from '../../../assets/hexagon_graphic.png';
import hermitCrab from '../../../assets/hermit_crab_graphic.png';
import spring from '../../../assets/spring_graphic.png';
import exercise from '../../../assets/exercise_graphic.png';
import rolypoly from '../../../assets/rolypoly_graphic.png';
import pudding from '../../../assets/pudding_graphic.png';
import snake from '../../../assets/snake_graphic.png';
import globe from '../../../assets/globe_graphic.png';
import guitar from '../../../assets/guitar_graphic.png'
import fairy from '../../../assets/fairy_graphic.png';
import sun from '../../../assets/sun_graphic.png';
import present from '../../../assets/present_graphic.png';
import arrowLeft from '../../../assets/calandar_arrow_left.png';
import arrowRight from '../../../assets/calandar_arrow_right.png';

const images = {
  "english":top,
  "beaker":beaker,
  "donut":donut,
  "reading":book,
  "like":heart,
  "quarter":quarter,
  "half":halfMoon,
  "full":full,
  "angel":angel,
  "cloud":cloud,
  "hexagon":hexagon,
  "crab":hermitCrab,
  "spring":spring,
  "exercise":exercise,
  "rolypoly":rolypoly,
  "pudding":pudding,
  "snake":snake,
  "other":guitar,
  "fairy":fairy,
  "second-language":globe,
  "self-improvement":sun,
  "hobby":present,
}

const SnowCardEl = ({ text, type, isArrow, date }) => {
  console.log(type)
  return(
  <Container>
    {isArrow && (
      <ArrowButton>
        <ArrowImage source={arrowLeft} />
      </ArrowButton>
    )}
    <Card>
      <DateText>{date}</DateText>
      <IconWrapper>
        <CardImage source={images[type]} />
      </IconWrapper>
      <MarginVertical top={10} />
      <SnowFlakeIcon color="white" size={16} />
      <MarginVertical top={10} />
      <ContentText>{text}</ContentText>
      <Background source={snow_card_bg} />
    </Card>
    {isArrow && (
      <ArrowButton>
        <ArrowImage source={arrowRight} />
      </ArrowButton>
    )}
  </Container>
)};

export default SnowCardEl;

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Card = styled.TouchableOpacity`
  width: 240px;
  height: 290px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const CardImage = styled.Image`
  width: 90%;
  height: 90%;
  resize-mode: contain;
`;

const IconWrapper = styled.View`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
`;

const ContentText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 26px;
`;

const DateText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 16px;
`;

const ArrowButton = styled.TouchableOpacity``;

const ArrowImage = styled.Image``;
