import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useUserInfoStore, useUserTokenStore } from '../store/user';

export const useLogin = () => {
  const navigation = useNavigation();

  const handleLogin = async(id, password, setIsLoginFail, isFirst) => {
    try {
      const response = await axios.post("https://sobok-app.com/user/login/jwt",{
        username:id,
        password:password,
      })
      console.log(response.data)
      // console.log(response.headers['set-cookie']);
      const token = JSON.stringify(response.data.accessToken);
      await AsyncStorage.setItem("access_token", token);
      if(!isFirst){
      navigation.reset({
        routes:[{
          name:'Tabs'
        }]
      })}
    } catch (error) {
      console.log(error)
      setIsLoginFail(true);
    }

  }

  return {
    handleLogin
  }
}
