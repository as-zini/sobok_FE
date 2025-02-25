import axios from "axios"
import { useUserInfoStore } from "../store/user";

export const useGetInfo = () => {
  const {userInfo, setUserInfo} = useUserInfoStore();

  const getUserInfo = async() => {
    try {
      const response = await axios.get("https://sobok-app.com/user/info");
      console.log(response.data);
      setUserInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getContinuitySuccess = async(setAchieve) => {
    try {
      const response = await axios.get("https://sobok-app.com/user/achieve")
      console.log(response.data);
      setAchieve(response.data.achieveCount);
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getUserInfo,
    getContinuitySuccess
  }
}

