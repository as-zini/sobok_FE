import { useNavigation } from "@react-navigation/native"
import axios from "axios"


export const useSignup = () => {
  const navigation = useNavigation();

  const handleSignup = async(values, setStep) => {
    try {
      const response = await axios.post("http://Sobok-env.eba-rw35wa8t.ap-northeast-2.elasticbeanstalk.com/user/create", {
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
      const response = await axios.get(`http://Sobok-env.eba-rw35wa8t.ap-northeast-2.elasticbeanstalk.com/user/is-duplicated/${type}?${type}=${value}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return {
    handleSignup,
    checkAvailability
  }
}
