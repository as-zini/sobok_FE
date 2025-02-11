import axios from "axios"


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

  return {
    getSavingList,
    getSavingLog
  }
}

