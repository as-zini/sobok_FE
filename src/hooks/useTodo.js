import axios from "axios"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import baseUrl from "../api/baseURL";
import { useNowTodoStore } from "../store/todo";
dayjs.extend(isSameOrBefore)

export const useTodo = () => {
  const {nowTodo, setNowTodo} = useNowTodoStore();

  const getTodayTodo = async(setTodayTodo,setIsReady) => {
    try {
      const response = await axios.get("https://sobok-app.com/todo/today")
      console.log(response.data)
      setTodayTodo(response.data)
      setIsReady(true)


    } catch (error) {
      console.log(error)
    }
  }

  const getNotCompletedTodo = async(setNotCompletedTodo, setIsReady) => {
    try {
      const response = await baseUrl.get('/routine/today/not-completed')
      console.log("notCompletedTodo",response.data)
      setNotCompletedTodo(response.data)
      setIsReady(true)
    } catch (error) {
      console.log(error)
    }
  }

  const startTodo = async(id) => {
    try {
      const response = await baseUrl.post(`/todo/start?todoId=${id}`)
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const completeTodo = async(id, time) => {
    try {
      const response = await baseUrl.post(`/todo/end?todoId=${id}&duration=${time}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getNowTodo = async() => {
    try {
      const response = await baseUrl.get("/todo/closest")
      console.log("getNow",response.data);
      setNowTodo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTodaySaveTime = async(setSaveTime) => {
    try {
      const response = await baseUrl.get("/routine/today/completed-time");
      console.log(response.data);
      setSaveTime(response.data.totalTime)
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
    startTodo
  }
}
