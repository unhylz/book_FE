// SentimentDetail.jsx
// 나경 to 지현
// 이 파일이 홈페이지에서 센티먼트 항목 클릭하면 연결 돼요!
// 센티먼트 페이지 만들고 나중에 여기로 옮기면 될 것 같아요:)
import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import CommentItem from "./Comment/Comment";
import SentimentDetailDummy from "./SentimentDetailDummy";
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

export default function SentimentDetail() {
  // 선택한 센티먼트 id와 title 변수
  const { content, sentiment_title } = useParams();
  console.log("검색어가 있으면 ", content);
  console.log(sentiment_title);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

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


  //상단 컴포넌트
  const DetailTop = ({Sentiments}) => {

    const { id } = useParams(); 

    console.log(id);
    //console.log(content.title);
    //console.log(SentimentDetailDummy[id-1].title);


  return (
    <div id="detail-top">
      <div className="top-header">
        <div className="book-info-box">
          <div className="sort">Sentiment</div>
          <div className="title">{SentimentDetailDummy[id-1].title}</div>
          <div className="title-author-box">
            <div className="book-title">{SentimentDetailDummy[id-1].book}</div>
            <div className="book-author">{SentimentDetailDummy[id-1].author}</div>
          </div>
          <div className="writer-info-box">
            <img src={userImg} alt="userImg" className="profile-image" />
            <div className="nick-date-box">
              <div className="nickname-tier">
                <div className="nickname">{SentimentDetailDummy[id-1].name}</div>
                <img
                  src={getTierIcon(SentimentDetailDummy[id-1].tier)}
                  alt="tier"
                  className="tier-icon"
                />
              </div>
              <div className="date">{SentimentDetailDummy[id-1].date}</div>
            </div>
          </div>
        </div>
        <div className="book-image-box">
          <div className="image">
            <img src = {`bookcover_dummy/${SentimentDetailDummy[id-1].imagefile}`} alt="Book Cover"/>
            <div className="rating">{SentimentDetailDummy[id-1].star}</div>
          </div>
        </div>
      </div>

      <div className="detail-top-main">
      <img className="detail-main-image" style={{width:"1100px", height:"1100px"}} src={`./${SentimentDetailDummy[id-1].insertImg}`} alt="책 내용 사진" />
        <div className="detail-main-text">{SentimentDetailDummy[id-1].text}</div>
      </div>
    </div>
  );
}


//하단 컴포넌트
const DetailBottom = () => {


  return (
    <div id='detail-bottom'>
      <div className="update-delete-box">
        <div className="update-button">
          <img src={editIcon} style={{width:"20px"}} alt="editIcon" className="edit-icon"/>
          {`수정하기`}
        </div>
        <div className="delete-button">
          <img src={deleteIcon} style={{width:"20px"}} alt="deleteIcon" className="delete-icon"/>
          {`삭제하기`}</div>
      </div>
      <div className="bottom-button-box">
        <div className="like-box">
          <div className="like">
            <img src={likeIcon} alt="like" className="like-icon" />
            {`${12}`}
          </div>
          <div className="comment">
            <img src={commentIcon} alt="comment" className="comment-icon"/>
            {`${3}`}
          </div>
          <div className="scrap">
            <img src={bookmarkIcon} alt="bookmark" className="bookmark-icon"/>
            {`${0}`}
          </div>
        </div>
        <div className="recommand-box">
          <div className="recommand-button">
            <img src={likeBlackIcon} style={{width:"20px"}} alt="likeBlack" className="like-black-icon"/>
            {`추천하기`}
          </div>
          <div className="scrap-button">
            <img src={bookmarkBlackIcon} style={{width:"20px"}} alt="bookmarkBlack" className="bookmark-black-icon" />
            {`스크랩`}</div>
        </div>
      </div>
    </div>
    
  );
}



  return (
    <div>
      <Header onLogoClick={handleLogoClick} />
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
            <CommentItem />
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
