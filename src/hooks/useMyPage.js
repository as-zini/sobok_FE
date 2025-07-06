import AsyncStorage from "@react-native-async-storage/async-storage"
import baseUrl from "../api/baseURL"
import { useNavigation } from "@react-navigation/native"


export const useMyPage = () => {

  const navigation = useNavigation();

  const getUserLinkedApp = async(setMyLinkedAppList) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get('/user/link-app',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setMyLinkedAppList(response.data.linkApps)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetLinkedApp = async(linkAppList) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.post('/user/link-app',{
        linkApps:linkAppList
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTodosByLinkApp = async(linkApp, setTodoData) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get(`/user/link-app/todos?linkApp=${linkApp}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setTodoData(response.data.todos)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditPassword = async(oldPassword, newPassword, setIsError) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.put(`/user/update/password`,{
        oldPassword:oldPassword,
        newPassword:newPassword
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      
      navigation.reset({
        routes:[{
          name:'Start'
        }]
      })
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  const handleEditInfo = async(editValue, version) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.put(`/user/update/general`,{
        ...(version === 1 ?
          {birth: editValue}
          :version === 2?
          {email:editValue}
          :{phoneNumber:editValue}
          )
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.goBack()
    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);    // 서버가 준 자세한 에러 메시지
      } else {
        console.log(error.message);
      }
    }
  }
 
  return {
    getUserLinkedApp,
    handleSetLinkedApp,
    getTodosByLinkApp,
    handleEditPassword,
    handleEditInfo
  }
}

