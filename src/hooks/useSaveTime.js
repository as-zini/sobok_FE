import React from 'react'
import baseUrl from '../api/baseURL'
import { useNavigation } from '@react-navigation/native'

export const useSaveTime = () => {
  const navigation = useNavigation()

  const handleSaveSpareTime = async(data) => {
    try {
      const response = await baseUrl.post("/spare-time",{
        title:data.title,
        startTime:data.startTime,
        endTime:data.endTime,
        days:data.days
      })
      console.log(response.data)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const getSpareTimeByDay = async(day, setSpareTimeList) => {
    try {
      const response = await baseUrl.get(`/spare-time/by-day?day=${day}`)
      console.log(response.data)
      setSpareTimeList(response.data.spareTimeList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditSpareTime = async(data) => {
    try {
      const response = await baseUrl.put("/spare-time",{
        id:data.id,
        title:data.title,
        startTime:data.startTime,
        endTime:data.endTime,
        days:data.days
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
      const response = await baseUrl.delete(`/spare-time?spareTimeId=${id}`)
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
      const response = await baseUrl.get("/spare-time/duration")
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

