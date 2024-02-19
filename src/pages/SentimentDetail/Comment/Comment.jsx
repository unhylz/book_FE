import "./Comment.scss";
import React, { useEffect, useState } from "react";

import userImg from "../../../assets/icons/user_Img.png";
import RookieIcon from "../../../assets/tiers/루키.svg";
import SilverIcon from "../../../assets/tiers/실버.svg";
import GoldIcon from "../../../assets/tiers/골드.svg";
import DiaIcon from "../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../assets/tiers/그랜드마스터.svg";
import Notification from "../../page1/notification/notification";
import recommentIcon from "../../../assets/icons/comment.svg";
import likeIcon from "../../../assets/icons/like.svg";
import { SentimentIdSearch } from "../../../modules/api/search";
import axios from "axios";
import ModalFrame from "../../SentimentWrite/Modal";


function formatDateTime(dateTimeString) {
  const year = dateTimeString.slice(6, 10);
  const month = dateTimeString.slice(0, 2);
  const day = dateTimeString.slice(3, 5);
  const hours = dateTimeString.slice(12, 14);
  const minutes = dateTimeString.slice(15, 17);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}


export default function CommentItem({data, id, user_id}) {
  const [SearchData, setSearchData] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [commentValid, setCommentValid] = useState(true);
  const [commentParent, setCommentParent] = useState("");

  const modalstyle ={
    width: "90px",
    backgroundColor: "#5FCB75",
    color: "white",
    fontSize: "20px",
    borderRadius: "30px",
    padding: "10px",
    border: "none",
    marginLeft: "72%",
    cursor: "pointer",
  }


  const handleCloseModal = () => {
    setCommentValid(true); // 모달이 닫힐 때 유효성 상태를 초기화
  };


  useEffect(() => {
    console.log("센티먼트 데이터 확인용 55:", data);

    if (data) {
      setSearchData(data[1].comment);
    }
  }, [data]);

  useEffect(() => {
    console.log("센티먼트 데이터 확인용 66:", SearchData);
  }, [SearchData]);

  const getTierIcon = (tier) => {
    const tierIcons = {
      루키: RookieIcon,
      실버: SilverIcon,
      골드: GoldIcon,
      다이아: DiaIcon,
      마스터: MasterIcon,
      그랜드마스터: GrandMasterIcon,
    };

    const DefaultIcon = () => null;
    const formattedTier = tier.toLowerCase().replace(/\s/g, "");
    const SelectedIcon = tierIcons[formattedTier] || DefaultIcon;

    return SelectedIcon;
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
    setCommentParent(123)
    setCommentValid(!!e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (commentContent.trim() === "") {
      setCommentValid(false);
      return;
    }
    console.log("아이디 확인이이이ㅣㅣㅣㅣㅣ", id)
    console.log("사용자 확이니이ㅣ리니이ㅣ낭ㄹ", user_id)

    try {
      // 모든 유효성 검사를 통과한 경우에만 API에 데이터를 전송
      const commentData = new FormData();
      console.log("댓글 입력",commentContent)
      commentData.append("parent_id", commentParent);
      commentData.append("content", commentContent);
      console.log("전달할 댓글 확인", commentData.get("content"))
      console.log("부모 아이디 확인", commentData.get("parent_id"))
  
      // API 요청
      const response = await axios.post(`/sentiments/${id}/comments/${user_id}/write`, commentData);
      console.log('응답 데이터:', response.data);
      alert("api 전송 성공");
  
    } catch (error) {
      console.error('글 등록 오류:', error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="comment-list-item">
      {SearchData &&
        SearchData.map((result) => (
          <div key={result.comment_id} className="comment-result">
            <div className="comment-header">
              <div className="list-top">
                <div className="profile-box">
                  {(result.profile_image === "기본 프로필") && 
                    <img src={userImg} alt="userImg" className="profile-image" 
                    style={{ width: "34px", height: "34px" }} />
                  }
                  {!(result.profile_image === "기본 프로필") && 
                    <img
                    src={result.profile_image}
                    alt="userImg"
                    className="profile-image"
                    style={{ width: "35px", height: "35px" }}
                  />
                  }
                </div>
                <div className="info-box">
                  <div className="name-tier">
                    <div className="nickname">{result.nickname}</div>
                    <img
                      src={getTierIcon(result.tier)}
                      alt="result.tier"
                      className="tier-icon"
                    />
                  </div>
                  <div className="time">{formatDateTime(result.created_at)}</div>
                </div>
              </div>
              <div className="like-recomment-container">
                <div className="like">
                  <img
                    src={likeIcon}
                    alt="like"
                    className="comment-like-icon"
                  />
                </div>
                <div className="divider"></div>
                <div className="recomment">
                  <img
                    src={recommentIcon}
                    alt="recomment"
                    className="recomment-icon"
                  />
                </div>
              </div>
            </div>
            <div className="comment-main">
              <div className="content">{result.content}</div>
              <div className="comment-like-count"></div>
            </div>
          </div>
        ))}
      <div className="input-container">
        <div className="text-box">
          <input
            className="textarea"
            placeholder="댓글을 작성하세요"
            onChange={handleCommentChange}
            value={commentContent}
          ></input>
          {!commentValid && (
            <ModalFrame _handleModal={handleCloseModal}>
              <h3>www.booksentimentleague.com 내용:</h3>
              <div style={{ fontWeight: "bold", marginBottom: "55px" }}>
                댓글을 작성해주세요.
              </div>
              <button
                className="close"
                onClick={handleCloseModal}
                style={ modalstyle }
              >
                확인
              </button>
            </ModalFrame>
          )}
          <div className="text-count">0/300</div>
        </div>
        <button type="submit" className="comment-button">{"작성하기"}</button>
      </div>
    </form>
  );
}
