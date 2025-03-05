import AsyncStorage from "@react-native-async-storage/async-storage"
import baseUrl from "../api/baseURL"
import dayjs from "dayjs"

export const useReport = () => {

  const getReportInfo = async(setReportInfo) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get("/report",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      await AsyncStorage.setItem(`reportOn${dayjs().get('month')+1}`,JSON.stringify(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  const getSnowCard = async(month) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get(`/snowcard?yearMonth=${month}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.navigate("CompleteSnowCard",{type:'rolypoly'})
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getReportInfo,
    getSnowCard
  }
}
