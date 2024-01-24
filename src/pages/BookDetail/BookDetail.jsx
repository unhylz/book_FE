// BookDetail.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import assessmentIcon from "../../assets/icons/assessment.svg";
import RelatedSentiment from "./components/relatedSentiment/RelatedSentiment";
import { bookDummy } from "../TopNavSearch/bookDummy.js";
import { sentimentDummy } from "../Home/components/sentiment/sentimentDummy";
//import StarRating from "react-star-rating-component";
import "./BookDetail.scss";

export default function BookDetail() {
  // 선택한 센티먼트 id와 title 변수
  const { content, book_title, id } = useParams();
  const navigate = useNavigate();
  //const location = useLocation();
  const bookId = parseInt(id, 10);
  const displayedItems2 = sentimentDummy.slice(33, 36);

  console.log(book_title);

  const handleLogoClick = () => {
    navigate("/");
  };

  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //const bookInfo = location.state?.bookInfo;

  // 해당 도서 데이터 가져오기
  function getBookById(bookId) {
    const foundBook = bookDummy.find((book) => book.id === bookId);
    // 책이 존재하면 콘솔에 출력, 존재하지 않으면 메시지 출력
    if (foundBook) {
      return foundBook;
    } else {
      console.log("Book not found with id:", bookId);
    }
  }

  function formatPublishDatetime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = String(dateTime.getFullYear()).slice(-4);
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }

  return (
    <div>
      <Header onLogoClick={handleLogoClick} defaultSearchContent={content} />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 부분 */}
        <div className="center">
          <div className="book-detail-contents">
            <div className="book-detail-container">
              <div className="book-row-container">
                <div className="book-image-container">
                  <img
                    src={`/bookcover_dummy/${getBookById(bookId).image_file}`}
                    alt={getBookById(bookId).book_title}
                    className="book-image"
                  />
                </div>

                <div className="book-row-column">
                  <p className="book-detail-title">
                    {getBookById(bookId).book_title}
                  </p>
                  <div className="book-detail-info">
                    <div className="book-detail-info">
                      <p>
                        저자:{" "}
                        <span className="dynamic-content">
                          {getBookById(bookId).author}
                        </span>
                      </p>
                      <p>
                        출판:{" "}
                        <span className="dynamic-content">
                          {getBookById(bookId).publisher}
                        </span>
                      </p>
                      <p>
                        발행:{" "}
                        <span className="dynamic-content">
                          {formatPublishDatetime(getBookById(bookId).publish)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="book-detail-scope">
                    <div className="book-detail-row">
                      <div className="book-detail-column">
                        <div className="book-detail-vote-avg">
                          <p className="book-scope-title">평균</p>
                          {/* bookDummy.js vote_avg 값 -> className="book-vote-star"*/}
                          <div className="book-vote-star">
                            {/* <StarRating popularity={getBookById(bookId).vote_avg} /> */}
                          </div>
                          <p className="book-vote">
                            {getBookById(bookId).vote_avg}
                          </p>
                          <p className="book-vote-num">
                            (총 {getBookById(bookId).vote}명)
                          </p>
                        </div>
                        <div className="book-detail-my-vote">
                          <p className="book-scope-title">평가</p>
                          {/* bookDummy.js my_vote 값 -> className="book-vote-star"*/}
                          <div className="book-vote-star">
                            {/* <StarRating popularity={getBookById(bookId).my_vote} /> */}
                          </div>
                          <p className="book-vote">
                            {getBookById(bookId).my_vote}
                          </p>
                        </div>
                      </div>

                      <button className="book-assess-btn">
                        <img
                          src={assessmentIcon}
                          alt="assessmentIcon"
                          className="assessment-icon"
                        />
                        평가하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="book-intro-title">책 소개</p>
              <div
                className="book-intro-detail"
                style={{ whiteSpace: "pre-line" }}
              >
                {getBookById(bookId).intro}
              </div>
            </div>
          </div>
          <div className="book-detail-sentiment">
            <p className="book-related-sentiment">관련 센티먼트</p>
            <RelatedSentiment
              searchResult={content}
              displayedItems={displayedItems2}
            />
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
