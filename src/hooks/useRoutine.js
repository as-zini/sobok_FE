import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import dayjs from "dayjs";
import { useTodoStore } from "../store/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRoutine = () => {
  const navigation = useNavigation();
  const {todoData, setTodoData} = useTodoStore();

  const getRoutineByList = async(setRoutineInfo, setIsComplete) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))
      const response = await axios.get("https://sobok-app.com/routine/by-list",{
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

  const getRoutineByCalandar = async(selectedDate, setTodayRoutineList) => {
    const year = dayjs().get("year");
    const month = dayjs().format("MM");
    
    
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await axios.get(`https://sobok-app.com/routine/by-date?dateString=${year}-${month}-${selectedDate}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("cal",response.data)
      console.log(response.data.message)
      response.data.message ? setTodayRoutineList([]) : setTodayRoutineList(response.data)
    } catch (error) {
      console.log("cal",error)
    }
  }

  const getRoutineDetail = async(id, setRoutineDetailInfo, setIsComplete) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await axios.get(`https://sobok-app.com/routine/detail?routineId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("detail",response.data)
      setRoutineDetailInfo(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log("detail",error)
    }
  }

  const handleRoutineSuspend = async(id, setIsComplete) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await axios.get(`https://sobok-app.com/routine/suspend?routineId=${id}`,{
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
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await axios.post("https://sobok-app.com/routine/create",{
        accountId:newRoutineData.id,
        title: newRoutineData.title,
        startTime: newRoutineData.startTime,
        endTime: newRoutineData.endTime,
        days: newRoutineData.days,
        todos:isAiRoutine ? newRoutineData.todos : todoData
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(isAiRoutine ? "AI" : "", response.data);
      setTodoData([]);
      !isAiRoutine?navigation.navigate("CompleteAddRoutine"):null
    } catch (error) {
      console.log(error)
      console.log(newRoutineData.todos)
    }
  }

  const getRoutineCount = async(setRoutineCount) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("access_token"))

      const response = await axios.get("https://sobok-app.com/routine/by-list",{
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

  return {
    getRoutineByList,
    getRoutineByCalandar,
    getRoutineDetail,
    handleRoutineSuspend,
    handleAddRoutine,
    getRoutineCount
  }
}
