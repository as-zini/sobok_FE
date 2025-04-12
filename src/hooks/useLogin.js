import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useUserInfoStore, useUserTokenStore } from '../store/user';
import baseUrl from '../api/baseURL';

export const useLogin = () => {
  const navigation = useNavigation();

  const handleLogin = async(id, password, setIsLoginFail, isFirst) => {
    try {
      const response = await baseUrl.post("https://sobok-app.com/user/login/jwt",{
        username:id,
        password:password,
      })
      console.log(response.data)
      console.log(response.headers['set-cookie'])
      const refreshToken = response.headers['set-cookie'][0].match(/refreshToken=([^;]*)/)?.[1];
      const accessToken = response.data.accessToken;
      // const refreshToken = JSON.stringify(response.headers['set-cookie'])
      await AsyncStorage.setItem("access_token", accessToken);
      await AsyncStorage.setItem("refresh_token",refreshToken)
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
