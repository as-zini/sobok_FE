import axios from "axios"
import baseUrl from "../api/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useInstallmentSaving = () => {

  const getSavingList = async(setOnGoingAccountList, version) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get(
        version === "onGoing" ? "/account/list/ongoing" : version === 'expired' ? "/account/list/expired" : '/account/list/ended',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data.account_list);
      setOnGoingAccountList(response.data.account_list)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavingLog = async(id, startDate, endDate, setSavingLog) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get(`https://sobok-app.com/account/log?accountId=${id}&startDate=${startDate}&endDate=${endDate}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      const reverse = response.data.account_logs.reverse()
      setSavingLog(reverse)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavingCount = async(setSavingCount) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get("https://sobok-app.com/account/list/ongoing",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      // console.log(response.data);
      setSavingCount(response.data.account_list.length);
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddSaving = async(newSavingData, isCreateComplete) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.post("/account/create",{
          title : newSavingData.title,
          target : newSavingData.target,
          isPublic : newSavingData.isPublic,
          time : newSavingData.time,
          duration : newSavingData.duration
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      isCreateComplete(true);
    } catch (error) {
      console.log(error)
    }
  }

  const getInvalidSavingList = async(setInvalidSavingList) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get("/account/list/invalid",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("invalid",response.data)
      setInvalidSavingList(response.data.account_list)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavingDetail = async(id,setSavingInfo) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get(`https://sobok-app.com/account/details?accountId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      setSavingInfo(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleConnectAsset = async(id, routines) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.put(`/routine/account?accountId=${id}`,{
        routineId:routines
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
      console.log(id, routines)
    }
  }

  return {
    getSavingList,
    getSavingLog,
    getSavingCount,
    handleAddSaving,
    getInvalidSavingList,
    getSavingDetail,
    handleConnectAsset
  }
}

