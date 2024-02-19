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
import deleteIcon from "../../../assets/icons/delete_Img.png";
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
  const [content, setContent] = useState("");
  const [commentValid, setCommentValid] = useState(true);
  const [parent_id, setParentID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputCount, setInputCount] = useState(0);

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
    setInputCount(e.target.value.length);
    setContent(e.target.value);
    setParentID(null)
    setCommentValid(!!e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      setCommentValid(false);
      return;
    }
    console.log("아이디 확인", id)
    console.log("사용자 확인", user_id)

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const body = JSON.stringify({ content, parent_id });
      console.log("전달할 댓글 확인", body)
  
      // API 요청
      const response = axios.post(`/sentiments/${id}/comments/${user_id}/write`, body, config);
      console.log('응답 데이터:', response.data);
      alert("api 전송 성공");
  
    } catch (error) {
      console.error('글 등록 오류:', error);
    }
    setContent("")
    window.location.reload();
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
                    { (data[0].sentiment.user_id === result.user_id) && (
                      <div className="writer-comment">(작성자)</div>
                    )}
                    { (user_id === result.user_id) && (
                      <div className="my-comment">(내가 쓴 댓글)</div>
                    )}
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
              <div className="comment-content">{result.content}</div>
              <div className="like-delete-box">
                <div className="comment-like-count"></div>
                { user_id === result.user_id && (
                <div className="comment-delete-button" onClick={() => { setIsOpen(true); }}>
                  <img className="delete-icon" src={deleteIcon} alt="deleteIcon" />
                  <div className="delete-text">삭제하기</div>
                </div>
)}
                {isOpen && (
                  <ModalFrame>
                    <h3>www.booksentimentleague.com 내용:</h3>
                    <div style={{ fontWeight: "bold", marginBottom: "55px" }}>
                      댓글을 삭제하시겠습니까?
                    </div>
                    <button
                      className="close"
                      onClick={async () => {
                        setIsOpen(false);
                        await axios.delete(`/sentiments/${id}/comments/${result.comment_id}/${user_id}/delete`);
                        // window.location.reload();
                      }}
                      style={ modalstyle }
                    >
                      확인
                    </button>
                  </ModalFrame>
                )}
                
                </div>
              </div>
          </div>
        ))}
      <div className="input-container">
        <div className="text-box">
          <input
            className="textarea"
            placeholder="댓글을 작성하세요"
            onChange={handleCommentChange}
            value={content}
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
          <div className="text-count">
            <div>{inputCount}</div>/300</div>
        </div>
        <button type="submit" className="comment-button">{"작성하기"}</button>
      </div>
    </form>
  );
}
