import axios from "axios";

export const topNavSearch = async (keyword) => {
  try {
    const response = await axios.get(`/search`, {
      params: {
        query: keyword,
      },
      withCredentials: true,
    });
    console.log("response.data: ", response.data);
    return response.data; // 결과를 반환하는 Promise
  } catch (error) {
    console.log("response error: ", error);
    throw error; // 오류가 발생하면 오류를 던짐
  }
};

export const BookSearch = async (keyword) => {
  try {
    const response = await axios.get(`/search/book`, {
      params: {
        query: keyword,
      },
      withCredentials: true,
    });
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("response error: ", error);
    throw error;
  }
};

export const SentimentSearch = async (keyword) => {
  try {
    const response = await axios.get(`/search/sentiment`, {
      params: {
        query: keyword,
      },
      withCredentials: true,
    });
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("response error: ", error);
    throw error;
  }
};
