// BookDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import { BookSearch } from "../../modules/api/search";
import { SentimentSearch } from "../../modules/api/search";
import { topNavSearch } from "../../modules/api/search";
import { UserContext } from "../../context/Login";
import AcountModalContainer from "../../container/AcountModalContainer";

export default function BookDetail() {
  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  const userId = user_context.user_data.id; //"2"; //임시 --------------
  const isLogin = user_context.user_data.isLogin;

  const cursorId = "0"; // 센티먼트 커서 추후 수정 --------

  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);

  // 책 커서
  const { content, book_title, cursor_id, index, options } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = 1; //parseInt(id, 10);
  const displayedItems2 = sentimentDummy.slice(33, 36);
  const [SearchData, setSearchData] = useState(null);
  const [isAssessed, setIsAssessed] = useState(true);
  const [BookSearchData, setBookSearchData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (options === "전체검색") {
          const data = await topNavSearch(content, userId);
          setBookSearchData(data.searchBookObject.bookObject[index]);
        } else {
          const data = await BookSearch(userId, cursor_id, content);

          switch (options) {
            case "관련순":
              // "관련순"인 경우에는 데이터를 그대로 설정
              setBookSearchData(data.bookData.bookObject[index]);
              break;
            case "별점순":
              // "별점순"인 경우에는 데이터를 별점순으로 정렬하여 설정
              const sortedData = data.bookData.bookObject
                .slice()
                .sort((a, b) => b.avr_score - a.avr_score);
              setBookSearchData(sortedData[index]);
              break;
            default:
              // 다른 경우에는 기본적으로 데이터를 그대로 설정
              setBookSearchData(data.bookData.bookObject[index]);
          }

          //setSearchData(data);
        }
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    if (content) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log("검색 도서 데이터 진입", BookSearchData);
    if (BookSearchData) {
      console.log("검색 도서 데이터!!!!!:", BookSearchData);
      if (BookSearchData.user_score === null) {
        setIsAssessed(false);
      } else {
        setIsAssessed(true);
      }
    }
  }, [BookSearchData]);

  const handleLogoClick = () => {
    navigate("/");
  };

  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 관련 센티먼트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SentimentSearch(userId, cursorId, content);
        setSearchData(data.sentimentObject);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    if (content) {
      fetchData();
    }
  }, [content]);

  useEffect(() => {
    if (SearchData && SearchData) {
      console.log("검색 센티먼트 데이터22:", SearchData);
    }
  }, [SearchData]);

  function formatPublishDatetime(dateTimeString) {
    /*
    const dateTime = new Date(dateTimeString);
    const year = String(dateTime.getFullYear()).slice(-4);
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    */
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(6, 8);
    const day = dateTimeString.slice(10, 12);

    return `${year}.${month}.${day}`;
  }

  const handleWriteClick1 = () => {
    //navigate("/write");
    navigate("/bookwrite", { state: { bookTitle: book_title } });
  };

  const handleWriteClick2 = () => {
    alert("평가가 완료된 책입니다.");
    //navigate("/write", { state: { bookTitle: book_title } });
  };

  useEffect(() => {
    console.log("모달 상태 변경???: ", modalState);

    if (modalState != null) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [modalState]);

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
          <div className="book-detail-contents">
            {BookSearchData && (
              <div className="book-detail-container">
                <div className="book-row-container">
                  <div className="book-image-container">
                    <img
                      src={BookSearchData.image}
                      alt={BookSearchData.title}
                      className="book-image"
                    />
                  </div>

                  <div className="book-row-column">
                    <p className="book-detail-title">{BookSearchData.title}</p>
                    <div className="book-detail-info">
                      <div className="book-detail-info">
                        <p>
                          저자:&nbsp;
                          <span className="dynamic-content">
                            {BookSearchData.author}
                          </span>
                        </p>
                        <p>
                          출판:&nbsp;
                          <span className="dynamic-content">
                            {BookSearchData.publisher}
                          </span>
                        </p>
                        <p>
                          발행:&nbsp;
                          <span className="dynamic-content">
                            {formatPublishDatetime(BookSearchData.pubdate)}
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
                                  BookSearchData.avr_score,
                                  BookSearchData.user_score,
                                ]}
                              />
                            </div>
                            <div className="book-vote-value">
                              <div className="book-vote-avg-value">
                                <p className="book-vote1">
                                  {BookSearchData.avr_score}
                                </p>
                                <p className="book-vote-num">
                                  (총 {BookSearchData.eval_num}명)
                                </p>
                              </div>
                              <div className="book-vote-my-value">
                                <p className="book-vote2">
                                  {BookSearchData.user_score}
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
                  {BookSearchData.description}
                </div>
              </div>
            )}
          </div>
          <div className="book-detail-sentiment">
            <p className="book-related-sentiment">관련 센티먼트</p>
            {SearchData && (
              <RelatedSentiment
                searchResult={content}
                displayedItems={SearchData}
              />
            )}
            <p>페이지네이션 추가</p>
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
