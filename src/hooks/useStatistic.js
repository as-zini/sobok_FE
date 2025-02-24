import axios from "axios"
import baseUrl from "../api/baseURL"

export const useStatistic = () => {

  const getStatisticInfo = async(startDate, endDate, setDateInfo) => {
    try {
      const response = await baseUrl.get(`/statistics/date/count?startDate=${startDate}&endDate=${endDate}`,)
      // console.log(response.data)
      setDateInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticInfoByRoutine = async(routineId, setDateInfoByRoutine) => {
    try {
      const response = await baseUrl.get(`/statistics/routine/count?routineId=${routineId}`)
      // console.log(response.data)
      setDateInfoByRoutine(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticDate = async(startDate, endDate, setAchieveList) => {
    try {
      const response = await baseUrl.get(`/statistics/date?startDate=${startDate}&endDate=${endDate}`)
      // console.log("date",response.data)
      setAchieveList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticDateByRoutine = async(routineId, startDate, endDate,setAchieveList) => {
    try {
      const response = await baseUrl.get(`/statistics/routine?routineId=${routineId}&startDate=${startDate}&endDate=${endDate}`)
      // console.log("date",response.data)
      setAchieveList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticLog = async(date, setStatisticLog) => {
    try {
      const response = await baseUrl.get(`/statistics/date/log?date=${date}`)
      console.log("log",response.data)
      setStatisticLog(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticLogByRoutine = async(date,routineId, setStatisticLog) => {
    try {
      const response = await baseUrl.get(`/statistics/routine/log?date=${date}&routineId=${routineId}`)
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
