import axios from "axios";


export const baseURL = axios.create({
  baseURL:"http://Sobok-env.eba-rw35wa8t.ap-northeast-2.elasticbeanstalk.com"
})