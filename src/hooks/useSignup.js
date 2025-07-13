import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import baseUrl from "../api/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import { login, getProfile } from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';



export const useSignup = () => {
  const navigation = useNavigation();

  const handleSignup = async(values, setStep) => {
    try {
      const response = await baseUrl.post("/user/create", {
          "username" : values.username,
          "password" : values.password,
          "name" : values.name,
          "displayName" : values.displayName,
          "email" : values.email,
          "phoneNumber" : values.phoneNumber,
          "birth" : values.birth
      })
      console.log(response.data);
      setStep(prev => prev + 1);
    } catch (error) {
      console.log(error)
    }
  }

  const checkAvailability = async(value, type) => {
    try {
      const response = await baseUrl.get(type !== "display-name" ? `/user/is-duplicated/${type}?${type}=${value}` : 
      `/user/is-duplicated/${type}?displayName=${value}`)
      // console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleSmsSend = async(phone, setPhoneChecked) => {
    try {
      const response = await baseUrl.post('/sms/send',{
        phoneNumber:phone
      })
      console.log(response.data)
      setPhoneChecked(true);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSmsVarify = async(phone,code, setIsVarified) => {
    try {
      const response = await baseUrl.post('/sms/verify',{
        phoneNumber:phone,
        code:code
      })
      console.log(response)
      setIsVarified(true)
    } catch (error) {
      console.log(error)
      setIsVarified(false)
    }
  }

  const handleAppleLogin = async(setIsSignupModalVisible) => {
    try {
      // 1) Apple 로그인 UI 호출
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
  
      // 2) ID 토큰(identityToken)과 authorizationCode 추출
      const {
        identityToken,        // JWT 형태의 ID 토큰
        authorizationCode,    // 서버 검증용 코드
        user,                 
        fullName,
        email,
      } = appleAuthRequestResponse;
  
      if (!identityToken) {
        throw new Error('Apple Sign-In failed – no identity token returned');
      }
  
      // 3) 토큰을 기기에 안전하게 저장 (예: AsyncStorage)
      await AsyncStorage.setItem('@apple_identity_token', identityToken);
      // 또는 SecureStore:
      // await SecureStore.setItemAsync('apple_identity_token', identityToken);
      console.log("id",identityToken)
      // 4) 서버로 토큰 보내서 검증/세션 생성
      const response = await baseUrl.post("/api/auth/apple/native",{
        identityToken: identityToken
      })

      console.log(response.data)
      const refreshToken = response.data.refreshToken;
      const accessToken = response.data.accessToken;
      const userInfo = response.data.user

      await AsyncStorage.setItem("access_token", accessToken);
      await AsyncStorage.setItem("refresh_token",refreshToken);

      setIsSignupModalVisible(false);
      if(response.data.user.isExistingUser){
        navigation.navigate("Tabs")
      }else{
        navigation.navigate("Signup", {email:userInfo.email, version:"apple"})
      }
      
  
      // 5) 이후 유저가 인증된 상태로 앱을 계속 사용
    } catch (error) {
      console.error('❌ Apple Sign-In Error', error);
      Alert.alert('로그인 오류', error.message);
    }
  }

  const addUserInfo= async(userInfo) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.put('/user/oauth/additional-info',{
        name:userInfo.name,
        displayName:userInfo.displayName,
        phoneNumber:userInfo.phoneNumber,
        birth:userInfo.birth
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleKakaoLogin = async (setIsSignupModalVisible) => {
    try {
      // 1) 카카오 로그인 실행
      const token = await login();
      console.log('accessToken:', token.accessToken);

      // 2) (선택) 유저 프로필 가져오기
      const profile = await getProfile();
      console.log('profile:', profile);

      const response = await baseUrl.post("/api/auth/kakao/native",{
        accessToken: token.accessToken
      })

      console.log(response.data)
      const refreshToken = response.data.refreshToken;
      const accessToken = response.data.accessToken;
      const userInfo = response.data.user

      await AsyncStorage.setItem("access_token", accessToken);
      await AsyncStorage.setItem("refresh_token",refreshToken);

      setIsSignupModalVisible(false);
      if(response.data.user.isExistingUser){
        navigation.navigate("Tabs")
      }else{
        navigation.navigate("Signup", {email:userInfo.email, version:"kakao"})
      }
    } catch (error) {
      console.error(error);
      Alert.alert('로그인 오류', error.message);
    }
  };

  const handleGoogleAuth = async (setIsSignupModalVisible) => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // 로그인 및 동의 화면
      const userData = await GoogleSignin.signIn();
      console.log(userData.data.idToken)

      const response = await baseUrl.post("/api/auth/google/native",{
        idToken: userData.data.idToken
      })

      console.log(response.data)
      const refreshToken = response.data.refreshToken;
      const accessToken = response.data.accessToken;
      const userInfo = response.data.user

      await AsyncStorage.setItem("access_token", accessToken);
      await AsyncStorage.setItem("refresh_token",refreshToken);

      setIsSignupModalVisible(false);
      if(response.data.user.isExistingUser){
        navigation.navigate("Tabs")
      }else{
        navigation.navigate("Signup", {email:userInfo.email, version:"google"})
      }
    } catch (error) {
      console.error(error);
      
    }
  }




  return {
    handleSignup,
    checkAvailability,
    handleSmsSend,
    handleSmsVarify,
    handleAppleLogin,
    addUserInfo,
    handleKakaoLogin,
    handleGoogleAuth
  }

}

  