import React from 'react'
import baseUrl from '../api/baseURL'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSaveTime = () => {
  const navigation = useNavigation()

  const handleSaveSpareTime = async(data) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      
      const response = await baseUrl.post("/spare-time",{
        title:data.title,
        startTime:data.startTime,
        endTime:data.endTime,
        days:data.days
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const getSpareTimeByDay = async(day, setSpareTimeList) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get(`/spare-time/by-day?day=${day}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setSpareTimeList(response.data.spareTimeList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditSpareTime = async(data) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.put("/spare-time",{
        id:data.id,
        title:data.title,
        startTime:data.startTime,
        endTime:data.endTime,
        days:data.days
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.goBack()
    } catch (error) {
      console.log(error)
      console.log(data)
    }
  }

  const handleDeleteSpareTime = async(id) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.delete(`/spare-time?spareTimeId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response)
      navigation.goBack()
    } catch (error) {
      // console.log(error)
      // console.log(id)
      console.log("❌ 삭제 요청 실패!");
    }
  }

  const getTotalSpareTime = async(setSpareTimeTotal) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await baseUrl.get("/spare-time/duration",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("spare",response.data)
      setSpareTimeTotal(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  
  return {
    handleSaveSpareTime,
    getSpareTimeByDay,
    handleEditSpareTime,
    handleDeleteSpareTime,
    getTotalSpareTime
  }
}

