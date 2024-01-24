// SentimentDetail.jsx
// 나경 to 지현
// 이 파일이 홈페이지에서 센티먼트 항목 클릭하면 연결 돼요!
// 센티먼트 페이지 만들고 나중에 여기로 옮기면 될 것 같아요:)
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import "./SentimentDetail.scss";
import InsertImg from "./insert_Img.png";
import BookImg from "./book_image_1.svg";

export default function SentimentDetail() {
  // 선택한 센티먼트 id와 title 변수
  const { content, sentiment_title } = useParams();
  console.log("검색어가 있으면 ", content);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const sentimentData = {
    sort: 'Sentiment',
    title: '플러터 프로그래밍 책 후기',
    book: 'Must Have 코드팩토리의 플러터 프로그래밍',
    author: '(최지호/골든래빗)',
    name: 'Paul',
    date: '23/12/18(월요일) * 15:05',
    text: '플러터 프로그래밍을 인강이 아닌 책으로 배워봤다.\n이 책에서는 플러터를 포함하여 Dart언어와 Firebase를 추가로 알려준다.\n640페이지의 많은 양으로 자세히 배울 수 있다.',
    star: '★★★★★ 5.0',
  };

  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  //상단 컴포넌트
  const DetailTop = () => {


  return (
    <div id="detail-top">
      <div className="top-header">
        <div className="book-info-box">
          <div className="sort">{sentimentData.sort}</div>
          <div className="title">{sentimentData.title}</div>
          <div className="title-author-box">
            <div className="book-title">{sentimentData.book}</div>
            <div className="book-author">{sentimentData.author}</div>
          </div>
          <div className="writer-info-box">
            <FaUserCircle className="profile-image"/>
            <div className="nick-date-box">
              <div className="nickname">Paul</div>
              <div className="date">2023/12/18(월요일) 15:05</div>
            </div>
          </div>
        </div>
        <div className="book-image-box">
          <div className="image">
            <img src = {BookImg} alt="Book Cover"/>
            <div className="rating">★★★★★ 5.0</div>
          </div>
        </div>
      </div>

      <div className="detail-top-main">
      <img className="detail-main-image" style={{width:"1100px", height:"1100px"}} src={InsertImg} alt="책 내용 사진" />
        <div className="detail-main-text">{sentimentData.text}</div>
        
      </div>
    </div>
  );
}


//하단 컴포넌트
const DetailBottom = () => {


  return (
    <div id='detail-bottom'>
      <div className="update-delete-box">
        <div className="update-button">{`수정하기`}</div>
        <div className="delete-button">{`삭제하기`}</div>
      </div>
      <div className="bottom-button-box">
        <div className="like-box">
          <div className="like">{`좋아요 ${12}`}</div>
          <div className="comment">{`댓글 ${3}`}</div>
          <div className="scrap">{`스크랩 ${0}`}</div>
        </div>
        <div className="recommand-box">
          <div className="recommand-button">{`추천하기`}</div>
          <div className="scrap-button">{`스크랩`}</div>
        </div>
      </div>
      <div className="comment-box">
        <div className="comment-container">
          <div className='list-top'>
            <div className='profile-box'>
              <FaUserCircle className="userimg"/>
            </div>
            <div className='info-box'>
              <div className='nickname'>{`닉네임 A`}</div>
              <div className='tier'></div>
              <div className='time'>{`2023/12/18 15:10`}</div>
            </div>
          </div>
          <div className='comment-main'>
            <div className='content'> {`플러터 어렵나요?`} </div>
          </div>
      </div>
        <div className="divider"></div>
        <div className="input-container">
            <textarea className="textarea" placeholder="댓글을 작성하세요"></textarea>
            <div className="comment-button-box">
              <div className="disable-button">{'작성하기'}</div>
            </div>
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
