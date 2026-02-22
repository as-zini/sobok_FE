import axios from "axios"
import { useUserInfoStore } from "../store/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../api/baseURL";

export const useGetInfo = () => {
  const {userInfo, setUserInfo} = useUserInfoStore();
  

  const getUserInfo = async(setIsReady, version) => {
    const token = await AsyncStorage.getItem("access_token")
    try {
      
      // 
      console.log(token)
      const response = await baseUrl.get("/user/info", {
        headers: {
          Authorization:`Bearer ${token}`,
         
        }
      });
      console.log("응답:", response.data);
      setUserInfo(response.data)
      if(version === "home")setIsReady(true)
      console.log(token)
    } catch (error) {
      if (error.response) {
        console.log("서버 응답 에러:", error.response.status, error.response.data);
        console.log(token);
      } else if (error.request) {
        console.log("요청은 갔는데 응답이 없음:", error.request);
      } else {
        console.log("기타 에러:", error.message);
      }
      
    }
  }

  const getContinuitySuccess = async(setAchieve) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get("/user/achieve",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      setAchieve(response.data.achieveCount);
    } catch (error) {
      if (error.response) {
        console.log("서버 응답 에러:", error.response.status, error.response.data);
      } else if (error.request) {
        console.log("요청은 갔는데 응답이 없음:", error.request);
      } else {
        console.log("연속달성일 기타 에러:", error.message);
      }
    }
  }

  return {
    getUserInfo,
    getContinuitySuccess
  }
}

