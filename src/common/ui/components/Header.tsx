import styled from '@emotion/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { size } from '../styles/size';
import { DefaultText } from './DefaultText';

const Header = ({
  title,
  isBack,
  handlePress,
}: {
  title?: string;
  isBack: boolean;
  handlePress?: () => void;
}) => {
  const navigation = useNavigation();
  return (
    <HeaderBody>
      <ButtonBody onPress={isBack ? navigation.goBack : handlePress}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      </ButtonBody>
      {title && <Title>{title}</Title>}
    </HeaderBody>
  );
};

export default Header;

const HeaderBody = styled.View({
  width: size.width,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
});

const ButtonBody = styled.TouchableOpacity({
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'flex-start',
  position: 'absolute',
  left: 24,
});

const Title = styled(DefaultText)({
  fontSize: 20,
  fontWeight: 600,
  color: '#4c4c4c',
});
