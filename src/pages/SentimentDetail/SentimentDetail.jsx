// SentimentDetail.jsx
// 나경 to 지현
// 이 파일이 홈페이지에서 센티먼트 항목 클릭하면 연결 돼요!
// 센티먼트 페이지 만들고 나중에 여기로 옮기면 될 것 같아요:)
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import "./SentimentDetail.scss";

export default function SentimentDetail() {
  // 선택한 센티먼트 id와 title 변수
  const { content, sentiment_title } = useParams();
  console.log("검색어가 있으면 ", content);

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
      <Header onLogoClick={handleLogoClick} />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 부분 */}
        <div className="center">
          <div className="contents">
            {/* ----------- 지현님 여기 아래에 넣으면 돼용! -----------*/}

            <div>
              <p>센티먼트명: {<strong>{`"${sentiment_title}"`}</strong>}</p>
            </div>

            {/* ------------ 지현님 여기 위에 넣으면 돼용! ------------*/}
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
