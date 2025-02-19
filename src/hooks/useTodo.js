import axios from "axios"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import baseUrl from "../api/baseURL";
dayjs.extend(isSameOrBefore)

export const useTodo = () => {

  const getTodayTodo = async(setTodayTodo, setNowTodo, setIsReady) => {
    try {
      const response = await axios.get("https://sobok-app.com/todo/today")
      console.log(response.data)
      setTodayTodo(response.data)
      const now = response.data.find((el) => {
        const timeString = el.startTime;
        const timeArray = timeString.split(':');
        const time = dayjs().hour(timeArray[0]).minute(timeArray[1]).second(timeArray[2]);
        // console.log(time.format());
        console.log(`Checking time: ${time.format()} (Current: ${dayjs().format()})`);
        return dayjs().isSameOrBefore(time)
      })
      console.log("now", now)
      setNowTodo(now)
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
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const endTodo = async(id) => {
    try {
      const response = await baseUrl.post(`/todo/end?todoId=${id}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return {
    getTodayTodo,
    getNotCompletedTodo,
    startTodo,
    endTodo
  }
}
