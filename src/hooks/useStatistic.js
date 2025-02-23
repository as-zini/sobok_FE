import axios from "axios"
import baseUrl from "../api/baseURL"

export const useStatistic = () => {

  const getStatisticInfo = async(startDate, endDate) => {
    try {
      const response = await axios.get('https://sobok-app.com/statistics/date/count',{
        startDate:startDate,
        endDate:endDate
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStatisticDate = async() => {
    try {
      const response = await baseUrl.get('/statistics/date',{
        startDate:"2025-02-01",
        endDeate:'2025-02-28'
      })
      console.log(response)
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
    getStatisticLog
  }
}
