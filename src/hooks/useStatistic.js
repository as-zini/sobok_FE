import axios from "axios"
import baseUrl from "../api/baseURL"

export const useStatistic = () => {

  const getStatisticInfo = async(startDate, endDate, setDateInfo) => {
    try {
      const response = await baseUrl.get(`/statistics/date/count?startDate=${startDate}&endDate=${endDate}`,)
      console.log(response.data)
      setDateInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticInfoByRoutine = async(routineId, setDateInfoByRoutine) => {
    try {
      const response = await baseUrl.get(`/statistics/routine/count?routineId=${routineId}`)
      console.log(response.data)
      setDateInfoByRoutine(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticDate = async() => {
    try {
      const response = await baseUrl.get(`/statistics/date?startDate=2025-02-01&endDate=2025-02-28`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticLog = async(date) => {
    try {
      const response = await baseUrl.get(`/statistics/date/log?date=${date}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getStatisticInfo,
    getStatisticDate,
    getStatisticLog,
    getStatisticInfoByRoutine
  }
}
