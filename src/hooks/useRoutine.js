import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import dayjs from "dayjs";
import { useTodoStore } from "../store/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../api/baseURL";


export const useRoutine = () => {
  const navigation = useNavigation();
  const {todoData, setTodoData,resetTodoData} = useTodoStore();

  const getRoutineByList = async(setRoutineInfo, setIsComplete) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.get("/routine/by-list",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("Routine",response.data);
      setRoutineInfo(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log("routine list",error)
    }
  }

  const getRoutineByCalandar = async(selectedDate, setTodayRoutineList, isNextMonth) => {
    const year = dayjs().get("year");
    const month = String(selectedDate).length === 1 && isNextMonth === true ? dayjs().add(1,'month').format("MM") : dayjs().format("MM");
    
    
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get(`/routine/by-date?dateString=${year}-${month}-${String(selectedDate).length === 1 ? '0'+String(selectedDate) : selectedDate}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("cal",response.data)
      console.log(response.data.message)
      response.data.message ? setTodayRoutineList([]) : setTodayRoutineList(response.data)
    } catch (error) {
      console.log("cal",error)
      console.log("token",token)
      console.log("selected",`${year}-${month}-${String(selectedDate).length === 1 ? '0'+ String(selectedDate) : selectedDate}`)
    }
  }

  const getRoutineDetail = async(id, setRoutineDetailInfo, setIsComplete) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get(`/routine/detail?routineId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("detail",response.data)
      setRoutineDetailInfo(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log("detail",error)
      console.log(id)
    }
  }

  const handleRoutineSuspend = async(id, setIsComplete) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get(`/routine/suspend?routineId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      setIsComplete(true);
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddRoutine = async(newRoutineData, isAiRoutine) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.post("/routine/create/self",{
        accountId:newRoutineData.accountId,
        title: newRoutineData.title,
        days: newRoutineData.days,
        todos:todoData
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(isAiRoutine ? "AI" : "", response.data);
      resetTodoData()
      !isAiRoutine?navigation.navigate("CompleteAddRoutine"):null
    } catch (error) {
      console.log(error)
      console.log(newRoutineData.todos)
    }
  }

  const getRoutineCount = async(setRoutineCount) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.get("/routine/by-list",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(response.data)
      setRoutineCount(response.data.length)
    } catch (error) {
      if (error.response) {
        console.log("서버 응답 에러:", error.response.status, error.response.data);
      } else if (error.request) {
        console.log("요청은 갔는데 응답이 없음:", error.request);
      } else {
        console.log("기타 에러:", error.message);
      }
    }
  }

  const handleRoutineDelete = async(id) => {
    console.log("호출!!!")
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.delete(`/routine/delete?routineId=${id}`,{ // 쿼리 파라미터
        headers: { "Authorization": `Bearer ${token}`}
      })
      console.log(response.data)
      navigation.goBack()
    } catch (error) {
      console.log(error)
      console.log(id)
    }
  }

  const handleAddAiRoutine = async(newRoutineData) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const response = await baseUrl.post("/routine/create/ai",{
        accountId:newRoutineData.id,
        title: newRoutineData.title,
        startTime: newRoutineData.startTime,
        endTime: newRoutineData.endTime,
        days: newRoutineData.days,
        todos:newRoutineData.todos
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      navigation.navigate("AiRoutineComplete",{isComplete:true})
    } catch (error) {
      console.log(error)
      console.log(newRoutineData)
      console.log(newRoutineData.todos)
    }
  }

  const handleEditRoutine = async(editedRoutineInfo,id) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.put(`/routine/update`,{
          "accountId": editedRoutineInfo.accountId,
          "id":id,
          "title": editedRoutineInfo.title,
          "days": editedRoutineInfo.days,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.reset({
        routes:[{
          name:'ViewRoutine'
        }]
      })
    } catch (error) {
      console.log(error)
      console.log(token)
      console.log("edit",editedRoutineInfo, id)
    }
  }

  const handleCompleteRoutine = async(id, setIsPauseModalVisible) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const response = await baseUrl.post(`/routine/complete?routineId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.navigate("ViewRoutine")
    } catch (error) {
      console.log(error)
      console.log(id)
      
    }
  }

  return {
    getRoutineByList,
    getRoutineByCalandar,
    getRoutineDetail,
    handleRoutineSuspend,
    handleAddRoutine,
    getRoutineCount,
    handleRoutineDelete,
    handleAddAiRoutine,
    handleEditRoutine,
    handleCompleteRoutine
  }
}
