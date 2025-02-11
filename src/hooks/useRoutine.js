import axios from "axios"
import dayjs from "dayjs";

export const useRoutine = () => {

  const getRoutineByList = async(setRoutineInfo, setIsComplete) => {
    try {
      const response = await axios.get("https://sobok-app.com/routine/by-list")
      console.log("Routine",response.data);
      setRoutineInfo(response.data)
      setIsComplete(true)
    } catch (error) {
      console.log(error)
    }
  }

  const getRoutineByCalandar = async(selectedDate, setTodayRoutineList) => {
    const year = dayjs().get("year");
    const month = dayjs().format("MM");
    
    
    try {
      const response = await axios.get(`https://sobok-app.com/routine/by-date?dateString=${year}-${month}-${selectedDate-1}`)
      console.log("cal",response.data)
      console.log(response.data.message)
      response.data.message ? setTodayRoutineList([]) : setTodayRoutineList(response.data)
    } catch (error) {
      console.log("cal",error)
    }
  }

  const getRoutineDetail = async(id, setRoutineDetailInfo) => {
    try {
      const response = await axios.get(`https://sobok-app.com/routine/detail?routineId=${id}`)
      console.log("detail",response.data)
      setRoutineDetailInfo(response.data)
    } catch (error) {
      console.log(error)
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

  return {
    getRoutineByList,
    getRoutineByCalandar,
    getRoutineDetail,
    handleRoutineSuspend
  }
}
