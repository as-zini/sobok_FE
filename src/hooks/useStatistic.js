import axios from "axios"
import baseUrl from "../api/baseURL"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useStatistic = () => {

  const getStatisticInfo = async(startDate, endDate, setDateInfo) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await baseUrl.get(`/statistics/date/count?startDate=${startDate}&endDate=${endDate}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      // console.log(response.data)
      setDateInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticInfoByRoutine = async(routineId, setDateInfoByRoutine) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await baseUrl.get(`/statistics/routine/count?routineId=${routineId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      // console.log(response.data)
      setDateInfoByRoutine(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticDate = async(startDate, endDate, setAchieveList) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await baseUrl.get(`/statistics/date?startDate=${startDate}&endDate=${endDate}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      // console.log("date",response.data)
      setAchieveList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticDateByRoutine = async(routineId, startDate, endDate,setAchieveList) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await baseUrl.get(`/statistics/routine?routineId=${routineId}&startDate=${startDate}&endDate=${endDate}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      // console.log("date",response.data)
      setAchieveList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticLog = async(date, setStatisticLog) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await baseUrl.get(`/statistics/date/log?date=${date}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("log",response.data)
      setStatisticLog(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticLogByRoutine = async(date,routineId, setStatisticLog) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await baseUrl.get(`/statistics/routine/log?date=${date}&routineId=${routineId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("log",response.data)
      setStatisticLog(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getStatisticInfo,
    getStatisticDate,
    getStatisticLog,
    getStatisticInfoByRoutine,
    getStatisticDateByRoutine,
    getStatisticLogByRoutine
  }
}
