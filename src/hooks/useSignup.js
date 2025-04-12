import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import baseUrl from "../api/baseURL";


export const useSignup = () => {
  const navigation = useNavigation();

  const handleSignup = async(values, setStep) => {
    try {
      const response = await baseUrl.post("/user/create", {
          "username" : values.username,
          "password" : values.password,
          "name" : values.name,
          "displayName" : values.displayName,
          "email" : values.email,
          "phoneNumber" : values.phoneNumber,
          "birth" : values.birth
      })
      console.log(response.data);
      setStep(prev => prev + 1);
    } catch (error) {
      console.log(error)
    }
  }

  const checkAvailability = async(value, type) => {
    try {
      const response = await baseUrl.get(type !== "display-name" ? `/user/is-duplicated/${type}?${type}=${value}` : 
      `/user/is-duplicated/${type}?displayName=${value}`)
      // console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleSmsSend = async(phone, setPhoneChecked) => {
    try {
      const response = await baseUrl.post('/sms/send',{
        phoneNumber:phone
      })
      console.log(response.data)
      setPhoneChecked(true);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSmsVarify = async(phone,code, setIsVarified) => {
    try {
      const response = await baseUrl.post('/sms/verify',{
        phoneNumber:phone,
        code:code
      })
      console.log(response)
      setIsVarified(true)
    } catch (error) {
      console.log(error)
    }
  }


  return {
    handleSignup,
    checkAvailability,
    handleSmsSend,
    handleSmsVarify
  }
}
