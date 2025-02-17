import axios from "axios"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore)

export const useTodo = () => {

  const getTodayTodo = async(setTodayTodo, setNowTodo) => {
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
      console.log(now)
      setNowTodo(now)


    } catch (error) {
      console.log(error)
    }
  }

  return {
    getTodayTodo
  }
}
