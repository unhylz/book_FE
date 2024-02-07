// RelatedSentimentMore.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import RelatedSentimentResults from "./components/RelatedSentimentResults";
import sortIcon from "../../assets/icons/sort.svg";
import "./RelatedSentimentMore.scss";
import axios from "axios";

const url = "http://3.37.54.220:3000";

export default function RelatedSentimentMore() {
  // 선택한 센티먼트 id와 title 변수
  const { content } = useParams();
  const navigate = useNavigate();

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

  console.log("검색 searchResult: ", content);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/search/sentiment?query=${encodeURIComponent(content)}`
        );
        console.log("센티먼트 데이터 확인용", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (content) {
      fetchData();

      console.log("확인");
    }
  }, [content]);

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
                  {<strong>{`"${content}"`}</strong>} 센티먼트 검색 결과
                </p>
                <button className="sort-btn" onClick={handleSortClick}>
                  <img src={sortIcon} alt="Sort" className="sort-icon" />
                  관련순
                </button>
              </div>

              <RelatedSentimentResults searchResult={content} />
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
