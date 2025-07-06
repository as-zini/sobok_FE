import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BackArrowButton = ({ isNotBack, direction, isReset }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (isNotBack && isReset) {
      navigation.reset({
        routes: [{ name: direction }]
      });
    } else if (isNotBack) {
      const [stack, screen] = direction.split(' ');
      navigation.navigate(stack, screen ? { screen } : {});
    } else {
      navigation.goBack();
    }
  };

  return (
    <ButtonBody onPress={handlePress}>
      <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
    </ButtonBody>
  );
};

export default BackArrowButton;

const ButtonBody = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: flex-start;
`;
