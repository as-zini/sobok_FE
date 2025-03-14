import AsyncStorage from "@react-native-async-storage/async-storage"
import baseUrl from "../api/baseURL"
import dayjs from "dayjs"
import { useNavigation } from "@react-navigation/native"

export const useReport = () => {
  const navigation = useNavigation()

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
      navigation.navigate("CompleteSnowCard",{type:response.data.snowCard})
    } catch (error) {
      console.log(error)
    }
  }

  const getSnowCardList = async(setCardData, setMyCardData) => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      const response = await baseUrl.get('snowcard/all',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log('cardbook',response.data)
      setCardData(response.data)
      const cardType = []
      response.data.forEach((el) => {
        cardType.push(el.snowCard)
      })
      setMyCardData(cardType)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getReportInfo,
    getSnowCard,
    getSnowCardList
  }
}
