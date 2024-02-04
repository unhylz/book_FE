// Home.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import SideAd from "../../pages/Home/components/advertisement/SideAd";
import MainAd from "../../pages/Home/components/advertisement/MainAd";
import Sentiment from "./components/sentiment/Sentiment";
import Follow from "./components/follow/Follow";
import Footer from "./components/footer/Footer";
import AcountModalContainer from "../../container/AcountModalContainer";
import "./Home.scss";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState("sentiment");
  const [modalState, setModalState] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleCloseModal = () => {
    setModalState(null);
  };

  useEffect(() => {
    // 홈 페이지 진입 시 기본으로 sentiment 버튼이 선택된 상태로 표시
    setSelectedButton("sentiment");
  }, []);

  return (
    <div>
      <Header
        onLogoClick={handleButtonClick}
        setModalState={setModalState}
        onCloseModal={handleCloseModal}
      />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 광고 부분 */}
        <div className="center">
          {/* 메인 광고 영역 */}
          <MainAd />
          <div className="contents">
            <div className="buttons">
              <button
                className={`sentiment-btn ${
                  selectedButton === "sentiment" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("sentiment")}
              >
                센티먼트
              </button>
              <button
                className={`follow-btn ${
                  selectedButton === "follow" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("follow")}
              >
                팔로우
              </button>
            </div>

            {/* 조건부 렌더링을 사용하여 버튼에 따라 다른 내용 표시 */}
            {selectedButton === "sentiment" && <Sentiment />}
            {selectedButton === "follow" && <Sentiment />}
          </div>
        </div>

        {/* 3열 - 오른쪽 사이드 광고 부분 */}
        <div className="right">
          <SideAd />
        </div>
      </div>
      <Footer />
      {modalState && <AcountModalContainer state={modalState} />}
    </div>
  );
}
