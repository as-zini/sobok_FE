import { Linking, Button, Alert } from 'react-native';

export const openApp = async () => {
  const url = "airbnb://"; // 실행하려는 앱의 URL 스킴
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("앱이 설치되어 있지 않습니다.");
  }
};

