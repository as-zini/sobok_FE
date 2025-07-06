import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import baseUrl from "../api/baseURL"

export const usePoint = () => {
  const getUserPremium = async(setUserPremium) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get("/user/premium",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      setUserPremium(response.data.price)
    } catch (error) {
      console.log(error);
    }
  }

  const getSubscribe = async(setIsComplete, setIsInsufficiency) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.put("/user/premium",{},{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      console.log(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log(error.response.data.message)
      if(error.response.data.message === "구독권 등록 실패: 포인트가 부족합니다.")setIsInsufficiency(true)
    }
  }

  const getPointLog = async(startDate, endDate, setPointLog) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get(`/user/point/log?startDate=${startDate}&endDate=${endDate}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(response.data);
      !response.data.message ? setPointLog(response.data) : setPointLog([])
    } catch (error) {
      console.log(error)
    }
  }

  return{
    getUserPremium,
    getSubscribe,
    getPointLog
  }
}