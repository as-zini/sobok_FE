import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import dayjs from "dayjs";
import { useTodoStore } from "../store/todo";

export const useRoutine = () => {
  const navigation = useNavigation();
  const {todoData, setTodoData} = useTodoStore();

  const getRoutineByList = async(setRoutineInfo, setIsComplete) => {
    try {
      const response = await axios.get("https://sobok-app.com/routine/by-list")
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
      const response = await axios.get(`https://sobok-app.com/routine/by-date?dateString=${year}-${month}-${selectedDate}`)
      console.log("cal",response.data)
      console.log(response.data.message)
      response.data.message ? setTodayRoutineList([]) : setTodayRoutineList(response.data)
    } catch (error) {
      console.log("cal",error)
    }
  }

  const getRoutineDetail = async(id, setRoutineDetailInfo, setIsComplete) => {
    try {
      const response = await axios.get(`https://sobok-app.com/routine/detail?routineId=${id}`)
      console.log("detail",response.data)
      setRoutineDetailInfo(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log("detail",error)
    }
  }

  const handleRoutineSuspend = async(id, setIsComplete) => {
    try {
      const response = await axios.get(`https://sobok-app.com/routine/suspend?routineId=${id}`)
      console.log(response.data);
      setIsComplete(true);
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddRoutine = async(newRoutineData, isAiRoutine) => {
    try {
      const response = await axios.post("https://sobok-app.com/routine/create",{
        accountId:newRoutineData.id,
        title: newRoutineData.title,
        startTime: newRoutineData.startTime,
        endTime: newRoutineData.endTime,
        days: newRoutineData.days,
        todos:isAiRoutine ? newRoutineData.todos : todoData
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
      const response = await axios.get("https://sobok-app.com/routine/by-list");
      setRoutineCount(response.data.length)
    } catch (error) {
      console.log(error)
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
