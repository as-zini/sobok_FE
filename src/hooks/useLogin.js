import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export const useLogin = () => {
  const navigation = useNavigation();

  const handleLogin = async(id, password, setIsLoginFail) => {
    try {
      const response = await axios.post("http://Sobok-env.eba-rw35wa8t.ap-northeast-2.elasticbeanstalk.com/user/login/jwt",{
        username:id,
        password:password,
      })
      console.log(response.data);
      const token = JSON.stringify(response.data.accessToken);
      await AsyncStorage.setItem("access_token", token);
      navigation.navigate("Tabs");
    } catch (error) {
      console.log(error)
      setIsLoginFail(true);
    }

  }

  return {
    handleLogin
  }
}
