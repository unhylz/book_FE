// SentimentDetail.jsx
// 나경 to 지현
// 이 파일이 홈페이지에서 센티먼트 항목 클릭하면 연결 돼요!
// 센티먼트 페이지 만들고 나중에 여기로 옮기면 될 것 같아요:)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import CommentItem from "./Comment/Comment";
import ModalFrame from "../SentimentWrite/Modal";
import axios from "axios";
import likeBlackIcon from "../../assets/icons/like_black.png";
import bookmarkBlackIcon from "../../assets/icons/bookmark_black.png";
import editIcon from "../../assets/icons/edit_Img.png";
import deleteIcon from "../../assets/icons/delete_Img.png";
import userImg from "../../assets/icons/user_Img.png";
import starIcon from "../../assets/icons/star.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import commentIcon from "../../assets/icons/comment.svg";
import likeIcon from "../../assets/icons/like.svg";
import RookieIcon from "../../assets/tiers/루키.svg";
import SilverIcon from "../../assets/tiers/실버.svg";
import GoldIcon from "../../assets/tiers/골드.svg";
import DiaIcon from "../../assets/tiers/다이아.svg";
import MasterIcon from "../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../assets/tiers/그랜드마스터.svg";
import "./SentimentDetail.scss";

import { SentimentIdSearch } from "../../modules/api/search";

export default function SentimentDetail() {
  // 선택한 센티먼트 id와 title 변수
  /*
  const { content, sentiment_title } = useParams();
  console.log("검색어가 있으면 ", content);
  console.log(sentiment_title);
  */

  const navigate = useNavigate();
  const { content, id, sentiment_title } = useParams();
  const [SearchData, setSearchData] = useState(null);

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SentimentIdSearch(id);
        setSearchData(data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (SearchData && SearchData[0].sentiment) {
      console.log("센티먼트 데이터 확인용 33:", SearchData[0].sentiment);
    }
  }, [SearchData]);

  //티어 아이콘 색상 변경용
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

  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  //추천, 스크랩 버튼
  const [isRecommand, setIsRecommand] = useState(false);
  const [isScrap, setIsScrap] = useState(false);

  const handleRecommand = () => {
    setIsRecommand(!isRecommand);
  };
  const handleScrap = () => {
    setIsScrap(!isScrap);
  };

  //상단 컴포넌트
  const DetailTop = ({ Sentiments }) => {
    const { id } = useParams();

    console.log(id);
    //console.log(content.title);
    //console.log(SentimentDetailDummy[id-1].title);

    if (!SearchData) {
      console.log("----SearchData: ", SearchData);
      return null; // SearchData가 null인 경우 렌더링하지 않음
    }

    return (
      <div>
        {SearchData && SearchData[0].sentiment && (
          <div id="detail-top">
            <div className="top-header">
              <div className="book-info-box">
                <div className="sort">Sentiment</div>
                <div className="title">
                  {SearchData[0].sentiment.sentiment_title}
                </div>
                <div className="title-author-box">
                  <div className="book-title">
                    {SearchData[0].sentiment.book_title}
                  </div>
                  <div className="book-author">
                    {SearchData[0].sentiment.author}
                  </div>
                </div>
                <div className="writer-info-box">
                  <img
                    src={SearchData[0].sentiment.image_path}
                    alt="userImg"
                    className="profile-image"
                  />
                  <div className="nick-date-box">
                    <div className="nickname-tier">
                      <div className="nickname">
                        {SearchData[0].sentiment.nickname}
                      </div>
                      <img
                        src={getTierIcon(SearchData[0].sentiment.tier)}
                        alt="tier"
                        className="tier-icon"
                      />
                    </div>
                    <div className="date">
                      {SearchData[0].sentiment.created_at}
                    </div>
                  </div>
                </div>
              </div>
              <div className="book-image-box">
                <div className="image-box">
                  <img
                    className="image"
                    src={SearchData[0].sentiment.book_image}
                    alt="Book Cover"
                  />
                  <div className="rating">{SearchData[0].sentiment.score}</div>
                </div>
              </div>
            </div>

            <div className="detail-top-main">
              <img
                className="detail-main-image"
                style={{ width: "1100px", height: "1100px" }}
                src={SearchData[0].sentiment.book_image} //{insertImg}
                alt="책 내용 사진"
              />
              <div className="detail-main-text">
                {SearchData[0].sentiment.content}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  //하단 컴포넌트
  const DetailBottom = () => {
    //모달 state
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div id="detail-bottom">
        <div className="update-delete-box">
          <div
            className="update-button"
            onClick={() => {
              navigate(`/editsentiment/${id}`);
            }}
          >
            <img src={editIcon} alt="editIcon" className="edit-icon" />
            <div className="edit-text">수정하기</div>
          </div>
          <div
            className="delete-button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <img src={deleteIcon} alt="deleteIcon" className="delete-icon" />
            <div className="delete-text">삭제하기</div>
          </div>
          {isOpen && (
            <ModalFrame>
              <h3>www.booksentimentleague.com 내용:</h3>
              <div style={{ fontWeight: "bold", marginBottom: "55px" }}>
                정말 삭제하시겠습니까?
              </div>
              <button
                className="close"
                onClick={async () => {
                  setIsOpen(false);
                  //await axios.delete(`/sentiments/${user_id}/delete/${id}`);
                  navigate(`/`);
                }}
                style={{
                  width: "90px",
                  backgroundColor: "#5FCB75",
                  color: "white",
                  fontSize: "20px",
                  borderRadius: "30px",
                  padding: "10px",
                  paddingTop: "none",
                  border: "none",
                  marginLeft: "72%",
                  cursor: "pointer",
                }}
              >
                확인
              </button>
            </ModalFrame>
          )}
        </div>
        <div className="bottom-button-box">
          <div className="like-box">
            <div className="like">
              <img src={likeIcon} alt="like" className="like-icon" />
              <div className="like-count">12</div>
            </div>
            <div className="comment">
              <img src={commentIcon} alt="comment" className="comment-icon" />
              <div className="comment-count">3</div>
            </div>
            <div className="scrap">
              <img src={bookmarkIcon} alt="scrap" className="scrap-icon" />
              <div className="scrap-count">0</div>
            </div>
          </div>
          <div className="recommand-box">
            <div
              className={`recommand-button ${
                isRecommand ? "recommand" : "not-recommand"
              }`}
              onClick={handleRecommand}
            >
              <img
                src={likeBlackIcon}
                alt="likeBlack"
                className="recommand-black-icon"
              />
              <div className="recommand-text">추천하기</div>
            </div>
            <div
              className={`scrap-button ${isScrap ? "scrap" : "not-scrap"}`}
              onClick={handleScrap}
            >
              <img
                src={bookmarkBlackIcon}
                alt="bookmarkBlack"
                className="scrap-black-icon"
              />
              <div className="scrap-text">스크랩</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header onLogoClick={handleLogoClick} defaultSearchContent={content} />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 부분 */}
        <div style={{ width: "auto" }} className="center">
          <div className="contents">
            <DetailTop />
            <DetailBottom />
            <CommentItem id={id} />
          </div>
        </div>

        {/* 3열 - 오른쪽 사이드 광고 부분 */}
        <div className="right">
          <SideAd />
        </div>
      </div>
      <Footer />
    </div>
  );
}
