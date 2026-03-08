import type { ImageSourcePropType } from 'react-native';
import { Image } from 'react-native';
import { size } from '../styles/size';

const Bg = ({ source }: { source: ImageSourcePropType }) => {
  return (
    <Image
      source={source}
      style={{
        width: size.width,
        height: size.height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default Bg;
