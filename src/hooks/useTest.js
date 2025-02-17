import axios from "axios"

export const useTest = () => {

  const handleSubmitTest = async(spareTpo, spareTime, preference1, preference2, preference3, likeOption, extraRequest, setIsCreateComplete) => {
    try {
      const response = await axios.post("https://sobok-app.com/survey/generate",{
        spareTpo:spareTpo,
        spareTime:spareTime,
        preference1:preference1,
        preference2:preference2,
        preference3:preference3,
        likeOption:likeOption,
        extraRequest:extraRequest
    //     "spareTpo" : "출퇴근시간(대중교통)",
	  // "spareTime": ["09:00-10:00", "18:00-20:00"],
	  // "preference1": "여러 가지를 다양하게",
	  // "preference2": "느슨하고 여유로운",
	  // "preference3": "쉽게 질려 금방 쉬기",
	  // "likeOption": ["요리", "영어"],
    // "extraRequest" : "요리 영상 시청을 포함해줘"
      })
      console.log(response.data)
      setIsCreateComplete(true)
    } catch (error) {
      console.log(error)
      console.log(spareTpo, spareTime, preference1, preference2, preference3, likeOption, extraRequest)
    }
  }

  return {
    handleSubmitTest
  }
  
}

