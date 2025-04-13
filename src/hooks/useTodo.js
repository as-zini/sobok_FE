import axios from "axios"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import baseUrl from "../api/baseURL";
import { useNowTodoStore } from "../store/todo";
import { openApp } from "../ui/components/Linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
dayjs.extend(isSameOrBefore)

export const useTodo = () => {
  const {nowTodo, setNowTodo} = useNowTodoStore();
  const navigation = useNavigation();

  const getTodayTodo = async(setTodayTodo,setIsReady) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get("/todo/today",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setTodayTodo(response.data)
      setIsReady(true)


    } catch (error) {
      console.log(error)
    }
  }

  const getNotCompletedTodo = async(setNotCompletedTodo, setIsReady) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get('/routine/today/not-completed',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("notCompletedTodo",response.data)
      setNotCompletedTodo(response.data)
      setIsReady(true)
    } catch (error) {
      console.log(error)
    }
  }

  const startTodo = async(id, setLogId, linkApp) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.post(`/todo/start?todoId=${id}`,{},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      setLogId(response.data.todoLogId)
      
        openApp("산타")
      
    } catch (error) {
      console.log(error)
      console.log(linkApp)
    }
  }

  const completeTodo = async(id, time) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.post(`/todo/end?todoLogId=${id}&duration=${time}`,{},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getNowTodo = async() => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get("/todo/closest",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("getNow",response.data);
      setNowTodo(response.data.message === '오늘의 할 일이 없습니다.' ? false : response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTodaySaveTime = async(setSaveTime) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get("/routine/today/completed-time",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(response.data);
      setSaveTime(response.data.totalTime)
    } catch (error) {
      console.log(error)
    }
  }

  // const handleTodoDelete = async() => {
  //   try {
  //     const token = await AsyncStorage.getItem("access_token")

  //     const response = await baseUrl.delete('/')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleTodoEdit = async(editedTodoInfo) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.put("/todo/update",{
        "id": editedTodoInfo.id,
        "title": editedTodoInfo.title,
        "category": editedTodoInfo.category,
        "startTime": editedTodoInfo.startTime,
        "endTime": editedTodoInfo.endTime,
        "linkApp": editedTodoInfo.linkApp
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response)
      navigation.goBack()
    } catch (error) {
      console.log(error)
      console.log(editedTodoInfo)
    }
  }

  const checkDuplicatedTodo = async(time, setIsDuplicated) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get(`/todo/overlap?startTime=${time.startTime}&endTime=${time}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
      console.log(response.data)
      if(!response.data.isOverlaped)setIsDuplicated(true)
      else{setIsDuplicated(false)}
    } catch (error) {
      console.log(error)
      
    }
  }

  const handleDeleteTodo = async(id) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.delete(`/todo/delete?todoId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getTodayTodo,
    getNotCompletedTodo,
    completeTodo,
    getNowTodo,
    getTodaySaveTime,
    startTodo,
    handleTodoEdit,
    checkDuplicatedTodo,
    handleDeleteTodo
  }
}
