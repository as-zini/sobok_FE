import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scale = (size: number) => {
  return (width / BASE_WIDTH) * size;
};

export const verticalScale = (size: number) => {
  return (height / BASE_HEIGHT) * size;
};

export const moderateScale = (size: number, factor = 0.3) => {
  return size + (scale(size) - size) * factor;
};
