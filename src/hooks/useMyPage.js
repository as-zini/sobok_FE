import AsyncStorage from "@react-native-async-storage/async-storage"
import baseUrl from "../api/baseURL"


export const useMyPage = () => {

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
 
  return {
    getUserLinkedApp,
    handleSetLinkedApp,
    getTodosByLinkApp
  }
}

