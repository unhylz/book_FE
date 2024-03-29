import axios from "axios";

export const SentimentBookSearch = async (title) => {
  try {
    console.log("전달됐나요", title)
    const response = await axios.get(`/search/title`, {
      params: {
        query: title,
      },
      withCredentials: true,
    });
    console.log("SentimentBookSearch response.data: ", response.data);
    return response.data; // 결과를 반환하는 Promise
  } catch (error) {
    console.log("response error: ", error);
    throw error; // 오류가 발생하면 오류를 던짐
  }
};