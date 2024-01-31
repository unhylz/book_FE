// RelatedNicknameMore.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import RelatedNicknameResults from "./components/RelatedNicknameResults";
import "./RelatedNicknameMore.scss";

export default function RelatedNicknameMore() {
  // 선택한 센티먼트 id와 title 변수
  const { content } = useParams();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
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
          <div className="nickname-results-contents">
            <div className="nickname-results-container">
              <div className="nickname-results">
                <p>{<strong>{`"${content}"`}</strong>} 관련 닉네임 검색 결과</p>
                <p>
                  총 <strong>10</strong> 명
                </p>
              </div>

              <RelatedNicknameResults searchResult={content} />
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
