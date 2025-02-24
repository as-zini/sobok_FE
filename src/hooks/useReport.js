import baseUrl from "../api/baseURL"

export const useReport = () => {

  const getReportInfo = async() => {
    try {
      const response = await baseUrl.get("/report")
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getReportInfo
  }
}
