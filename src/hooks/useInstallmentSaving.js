import axios from "axios"
import baseUrl from "../api/baseURL";


export const useInstallmentSaving = () => {

  const getSavingList = async(setOnGoingAccountList, version) => {
    try {
      const response = await axios.get(version === "onGoing" ? "https://sobok-app.com/account/list/ongoing" : "https://sobok-app.com/account/list/expired")
      console.log(response.data.account_list);
      setOnGoingAccountList(response.data.account_list)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavingLog = async(id, startDate, endDate, setSavingLog) => {
    try {
      const response = await axios.get(`https://sobok-app.com/account/log?accountId=${id}&startDate=${startDate}&endDate=${endDate}`)
      console.log(response.data)
      setSavingLog(response.data.account_logs)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavingCount = async(setSavingCount) => {
    try {
      const response = await axios.get("https://sobok-app.com/account/list/ongoing")
      // console.log(response.data);
      setSavingCount(response.data.account_list.length);
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddSaving = async(newSavingData, isCreateComplete) => {
    try {
      const response = await baseUrl.post("/account/create",{
          title : newSavingData.title,
          target : newSavingData.target,
          isPublic : newSavingData.isPublic,
          time : newSavingData.time,
          duration : newSavingData.duration
      })
      console.log(response.data)
      isCreateComplete(true);
    } catch (error) {
      console.log(error)
    }
  }

  const getInvalidSavingList = async(setInvalidSavingList) => {
    try {
      const response = await baseUrl.get("/account/list/invalid")
      console.log("invalid",response.data)
      setInvalidSavingList(response.data.account_list)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getSavingList,
    getSavingLog,
    getSavingCount,
    handleAddSaving,
    getInvalidSavingList
  }
}

