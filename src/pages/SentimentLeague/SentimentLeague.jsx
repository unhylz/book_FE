import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import MainAd from "../Home/components/advertisement/MainAd";
import SideAd from "../Home/components/advertisement/SideAd";
import Ranking from "./components/ranking/Ranking";
import Footer from "../Home/components/footer/Footer";
import AcountModalContainer from "../../container/AcountModalContainer";
import "./SentimentLeague.scss";

function SentimentLeague() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(null);
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Header onLogoClick={handleLogoClick} setModalState={setModalState} />
      <div className="main-title">
        <div className="tilte-info">
          <div className="title">SentimentLeague</div>
          <p>자신의 독후감을 공유하고 순위를 확인해보세요.</p>
          <p>시즌은 6개월마다 초기화 됩니다.</p>
        </div>
      </div>
      <div className="main-content-league">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left-league">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 광고 부분 */}
        <div className="center-league">
          {/* 메인 광고 영역 */}
          <MainAd />

          <div className="contents-league">
            <Ranking />
          </div>
        </div>

        {/* 3열 - 오른쪽 사이드 광고 부분 */}
        <div className="right-league">
          <SideAd />
        </div>
      </div>
      <Footer />
      {modalState && <AcountModalContainer state={modalState} />}
    </div>
  );
}

export default SentimentLeague;
