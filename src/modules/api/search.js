//search.js

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

export const NicknameSearch = async (keyword) => {
  try {
    const response = await axios.get(`/search/nickname`, {
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

export const NicknameFollow = async (user_id, followingId) => {
  try {
    const response = await axios.post(
      `/users/${user_id}/follow`,
      {
        followingId: followingId,
      },
      {
        withCredentials: true,
      }
    );
    console.log("user_id: ", user_id, "-> ", response.data, "-> ", followingId);
    return response.data;
  } catch (error) {
    console.log("NicknameFollow response error: ", error);
    throw error;
  }
};

export const RankingData = async () => {
  try {
    const response = await axios.get(`/ranks`, {
      withCredentials: true,
    });
    console.log("rankning response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("rankning response error: ", error);
    throw error;
  }
};
