// BookDetail.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import assessmentIcon1 from "../../assets/icons/assessment1.svg";
import assessmentIcon2 from "../../assets/icons/assessment2.svg";
import RelatedSentiment from "./components/relatedSentiment/RelatedSentiment";
import { bookDummy } from "../TopNavSearch/bookDummy.js";
import { sentimentDummy } from "../Home/components/sentiment/sentimentDummy";
import StarRating from "./components/starRating/StarRating.jsx";
import "./BookDetail.scss";

export default function BookDetail() {
  // 선택한 센티먼트 id와 title 변수
  const { content, book_title, id } = useParams();
  const navigate = useNavigate();
  //const location = useLocation();
  const bookId = parseInt(id, 10);
  const displayedItems2 = sentimentDummy.slice(33, 36);

  //확인용
  const isAssessed = true;

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

  const handleWriteClick1 = () => {
    navigate("/write");
  };

  const handleWriteClick2 = () => {
    alert("평가가 완료된 책입니다.");
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
                          <div className="book-vote-title">
                            <p className="book-scope-title">평균</p>
                            <p className="book-scope-title">평가</p>
                          </div>
                          <div className="book-vote-star">
                            <StarRating
                              averageRates={[
                                getBookById(bookId).vote_avg,
                                getBookById(bookId).my_vote,
                              ]}
                            />
                          </div>
                          <div className="book-vote-value">
                            <div className="book-vote-avg-value">
                              <p className="book-vote1">
                                {getBookById(bookId).vote_avg}
                              </p>
                              <p className="book-vote-num">
                                (총 {getBookById(bookId).vote}명)
                              </p>
                            </div>
                            <div className="book-vote-my-value">
                              <p className="book-vote2">
                                {getBookById(bookId).my_vote}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isAssessed && (
                        <>
                          <button
                            className="book-assess-btn1"
                            onClick={handleWriteClick1}
                          >
                            <img
                              src={assessmentIcon1}
                              alt="assessmentIcon1"
                              className="assessment-icon1"
                            />
                            평가하기
                          </button>
                        </>
                      )}
                      {isAssessed && (
                        <>
                          <button
                            className="book-assess-btn2"
                            onClick={handleWriteClick2}
                          >
                            <img
                              src={assessmentIcon2}
                              alt="assessmentIcon2"
                              className="assessment-icon2"
                            />
                            평가완료
                          </button>
                        </>
                      )}
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
