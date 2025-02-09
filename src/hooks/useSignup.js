import { useNavigation } from "@react-navigation/native"
import axios from "axios"


export const useSignup = () => {
  const navigation = useNavigation();

  const handleSignup = async(values, setStep) => {
    try {
      const response = await axios.post("https://sobok-app.com/user/create", {
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
      const response = await axios.get(type !== "display-name" ? `https://sobok-app.com/user/is-duplicated/${type}?${type}=${value}` : 
      `https://sobok-app.com/user/is-duplicated/${type}?displayName=${value}`)
      // console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }


  return {
    handleSignup,
    checkAvailability
  }
}
