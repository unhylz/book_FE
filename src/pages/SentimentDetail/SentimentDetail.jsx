// SentimentDetail.jsx
// 나경 to 지현
// 이 파일이 홈페이지에서 센티먼트 항목 클릭하면 연결 돼요!
// 센티먼트 페이지 만들고 나중에 여기로 옮기면 될 것 같아요:)
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import CommentItem from "./Comment/Comment";
import ModalFrame from "../SentimentWrite/Modal";
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
import AcountModalContainer from "../../container/AcountModalContainer";
import { UserContext } from "../../context/Login";
import { SentimentIdSearch } from "../../modules/api/search";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import axios from 'axios';

function formatDateTime(dateTimeString) {
  const year = dateTimeString.slice(6, 10);
  const month = dateTimeString.slice(0, 2);
  const day = dateTimeString.slice(3, 5);
  const hours = dateTimeString.slice(12, 14);
  const minutes = dateTimeString.slice(15, 17);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export default function SentimentDetail() {
  // 선택한 센티먼트 id와 title 변수
  /*
  const { content, sentiment_title } = useParams();
  console.log("검색어가 있으면 ", content);
  console.log(sentiment_title);
  */

  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  const user_id = user_context.user_data.id;
  const isLoggedIn = user_context.user_data.isLogin;

  const navigate = useNavigate();
  const { content, id, sentiment_title } = useParams();
  const [SearchData, setSearchData] = useState(null);
  const [sentimentData, setSentimentData] = useState("");

  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("모달 상태 변경???: ", modalState);

    if (modalState != null) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [modalState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SentimentIdSearch(id);
        setSearchData(data);
        setSentimentData(data[0].sentiment);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, []);


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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //추천, 스크랩 버튼
  const [isRecommand, setIsRecommand] = useState(false);
  const [isScrap, setIsScrap] = useState(false);

  const handleRecommand = async () => {
    if(isLoggedIn){
      if(user_id === SearchData[0].sentiment.user_id) {
        alert("본인 센티먼트는 추천할 수 없습니다.")
      }
      else {
        setIsRecommand(!isRecommand);
        const response = await axios.post(`/users/${user_id}/like/sentiment/${id}`);
        console.log("추천 성공", response.data)
      }
    }
    else {
      alert("로그인 후 가능합니다.")
    }
  };
  const handleScrap = async () => {
    if(isLoggedIn){
      if(user_id === SearchData[0].sentiment.user_id) {
        alert("본인 센티먼트는 스크랩할 수 없습니다.")
      }
      else {
        setIsScrap(!isScrap);
      const response = await axios.post(`/users/${user_id}/scrap/${id}`);
      console.log("스크랩 성공", response.data)
      }
    }
    else {
      alert("로그인 후 가능합니다")
    }
  };

  //상단 컴포넌트
  const DetailTop = ({ Sentiments }) => {
    const { id } = useParams();

    console.log(id);


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
                    {SearchData[0].sentiment.author} | {SearchData[0].sentiment.publisher}
                  </div>
                </div>
                <div className="writer-info-box">
                  {(SearchData[0].sentiment.profile_image === "기본 프로필") && 
                    <img src={userImg} alt="userImg" className="profile-image" />
                  }
                  {!(SearchData[0].sentiment.profile_image === "기본 프로필") && 
                    <img
                    src={SearchData[0].sentiment.profile_image}
                    alt="userImg"
                    className="profile-image"
                  />
                  }
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
                      {formatDateTime(SearchData[0].sentiment.created_at)}
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
                  <div className="rating">
                    <div className="star">
                      {[...Array(Math.floor(SearchData[0].sentiment.score))].map((_, i) => (
                        <PiStarFill
                          color="#5FCB75"
                          className="star-lg"
                          key={i}
                        />
                      ))}
                    </div>
                    {SearchData[0].sentiment.score.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-top-main">
              {Array.isArray(SearchData[0].sentiment.image_path) &&
                SearchData[0].sentiment.image_path.map((imagePath, index) => (
                  <img
                    key={index}
                    className="detail-main-image"
                    style={{ width: "1100px", height: "1100px" }}
                    src={imagePath}
                    alt={`책 내용 사진 ${index + 1}`}
                  />
                ))}
              {!Array.isArray(SearchData[0].sentiment.image_path) &&
                SearchData[0].sentiment.image_path !== null && (
                  <img
                    className="detail-main-image"
                    style={{ width: "1100px", height: "1100px" }}
                    src={SearchData[0].sentiment.image_path}
                    alt={`책 내용 사진`}
                  />
                )}
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
      <>
      {SearchData && SearchData[0].sentiment && (
      <div id="detail-bottom">
        {isLoggedIn && (user_id === SearchData[0].sentiment.user_id) && (
          <div className="update-delete-box">
            <div
              className="update-button"
              onClick={() => {
                navigate(`/editsentiment/${id}`, {state: { id }});
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
                    await axios.delete(`/sentiments/${user_id}/delete/${id}`);
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
        )}

        <div className="bottom-button-box">
          <div className="like-box">
            <div className="like">
              <img src={likeIcon} alt="like" className="like-icon" />
              <div className="like-count">{SearchData[0].sentiment.like_num}</div>
            </div>
            <div className="comment">
              <img src={commentIcon} alt="comment" className="comment-icon" />
              <div className="comment-count">{SearchData[0].sentiment.comment_num}</div>
            </div>
            <div className="scrap">
              <img src={bookmarkIcon} alt="scrap" className="scrap-icon" />
              <div className="scrap-count">{SearchData[0].sentiment.scrap_num}</div>
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
      )}
      </>
    );
  };
  useEffect(() => {
    console.log("센티먼트 데이터 확인용 77:", SearchData);
  }, [SearchData]);

  return (
    <div>
      {modal && modalState && (
        <AcountModalContainer
          state={modalState}
          setModalState={setModalState}
        />
      )}
      <Header
        onLogoClick={handleLogoClick}
        defaultSearchContent={content}
        setModalState={setModalState}
        setModal={setModal}
      />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 부분 */}
        <div className="center">
          <div className="contents">
            <DetailTop />
            <DetailBottom />
            {SearchData && SearchData[1].comment.length >= 0 && (
              <CommentItem data={SearchData} id={id} user_id={user_id}/>
            )}
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
