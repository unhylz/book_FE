//search.js

import axios from "axios";

export const topNavSearch = async (keyword, user_id) => {
  try {
    const response = await axios.get(`/search/${user_id}`, {
      params: {
        query: keyword,
      },
      withCredentials: true,
    });
    console.log("topNavSearch response.data: ", response.data);
    return response.data; // 결과를 반환하는 Promise
  } catch (error) {
    console.log("response error: ", error);
    throw error; // 오류가 발생하면 오류를 던짐
  }
};

export const BookSearch = async (user_id, cursor_id, keyword) => {
  try {
    const response = await axios.get(`/search/${user_id}/book/${cursor_id}`, {
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

export const SentimentSearch = async (user_id, cursor_id, keyword) => {
  try {
    const response = await axios.get(
      `/search/${user_id}/sentiment/${cursor_id}`,
      {
        params: {
          query: keyword,
        },
        withCredentials: true,
      }
    );
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("response error: ", error);
    throw error;
  }
};

export const NicknameSearch = async (user_id, cursor_id, keyword) => {
  try {
    const response = await axios.get(
      `/search/${user_id}/nickname/${cursor_id}`,
      {
        params: {
          query: keyword,
        },
        withCredentials: true,
      }
    );
    console.log("NicknameSearch response.data: ", response.data);
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

export const TotalRankingData = async (pageNumber, seasonNumber) => {
  try {
    const response = await axios.get(`/ranks/${pageNumber}`, {
      params: {
        season: seasonNumber,
      },
      withCredentials: true,
    });
    console.log("TotalRankingData response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("TotalRankingData response error: ", error);
    throw error;
  }
};

export const RankingData = async (pageNumber, seasonNumber, nickname) => {
  try {
    const response = await axios.get(`/ranks/${pageNumber}`, {
      params: {
        season: seasonNumber,
        nickname: nickname,
      },
      withCredentials: true,
    });
    console.log("RankingData response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("RankingData response error: ", error);
    throw error;
  }
};

export const SentimentData = async (cursor_id) => {
  try {
    const response = await axios.get(`/sentiments/list/${cursor_id}`, {
      withCredentials: true,
    });
    console.log("sentiments response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("sentiments response error: ", error);
    throw error;
  }
};

export const FollowSentimentData = async (user_id, cursor_id) => {
  try {
    const response = await axios.get(
      `/sentiments/follow/${user_id}/${cursor_id}`,
      {
        withCredentials: true,
      }
    );
    console.log("FollowSentimentData response.data: ", response.data);
    return response.data; // 결과를 반환하는 Promise
  } catch (error) {
    console.log("response error: ", error);
    throw error; // 오류가 발생하면 오류를 던짐
  }
};

export const SentimentIdSearch = async (sentiment_id) => {
  try {
    const response = await axios.get(`/sentiments/${sentiment_id}`, {
      withCredentials: true,
    });
    console.log("SentimentIdSearch response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("SentimentIdSearch response error: ", error);
    throw error;
  }
};
