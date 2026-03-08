import styled from '@emotion/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

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

const HeaderBody = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonBody = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  left: 24px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #4c4c4c;
`;
