// RelatedBookMore.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import sortIcon from "../../assets/icons/sort.svg";
import RelatedBookResults from "./components/RelatedBookResults";
import "./RelatedBookMore.scss";
import { BookSearch } from "../../modules/api/search";

export default function RelatedBookMore() {
  // 선택한 센티먼트 id와 title 변수
  const { content } = useParams();
  const navigate = useNavigate();
  const [SearchData, setSearchData] = useState(null);
  const [SearchNum, setSearchNum] = useState(null);

  console.log("content detail page: ", content);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BookSearch(content);
        setSearchData(data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    if (content) {
      fetchData();
    }
  }, [content]);

  useEffect(() => {
    if (SearchData && SearchData.bookData) {
      console.log("검색 도서 데이터:", SearchData.bookData);
      setSearchNum(SearchData.bookData.bookObject.length);
    }
  }, [SearchData]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSortClick = () => {
    alert("정렬 기능 구현 예정");
  };
  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <div className="results-contents">
            <div className="results-container">
              <div className="results-title">
                <p className="results">
                  {<strong>{`"${content}"`}</strong>} 관련 서적 검색
                  결과&nbsp;&nbsp; 총&nbsp;
                  {<strong>{`${SearchNum}`}</strong>}권
                </p>

                <button className="sort-btn" onClick={handleSortClick}>
                  <img src={sortIcon} alt="Sort" className="sort-icon" />
                  관련순
                </button>
              </div>
              {SearchData && SearchData.bookData && (
                <RelatedBookResults
                  searchResult={content}
                  displayedItems={SearchData.bookData}
                />
              )}
            </div>
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
