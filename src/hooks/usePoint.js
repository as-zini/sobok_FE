import axios from "axios"

export const usePoint = () => {
  const getUserPremium = async(setUserPremium) => {
    try {
      const response = await axios.get("https://sobok-app.com/user/premium")
      console.log(response.data);
      setUserPremium(response.data.price)
    } catch (error) {
      console.log(error);
    }
  }

  const getSubscribe = async(setIsComplete) => {
    try {
      const response = await axios.put("https://sobok-app.com/user/premium")
      console.log(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log(error.data)
    }
  }

  const getPointLog = async(startDate, endDate, setPointLog) => {
    try {
      const response = await axios.get(`https://sobok-app.com/user/point/log?startDate=${startDate}&endDate=${endDate}`);
      console.log(response.data);
      !response.data.message ? setPointLog(response.data) : setPointLog([])
    } catch (error) {
      console.log(error)
    }
  }

  return{
    getUserPremium,
    getSubscribe,
    getPointLog
  }
}