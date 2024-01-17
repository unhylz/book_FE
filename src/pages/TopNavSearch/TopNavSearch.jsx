// TopNavSearch.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import "./TopNavSearch.scss";

function TopNavSearch() {
  const navigate = useNavigate();
  const search_result = useLocation().state;
  const content = search_result ? search_result.content : "";

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Header onLogoClick={handleLogoClick} defaultSearchContent={content} />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 광고 부분 */}
        <div className="center">
          {/* 메인 광고 영역 X */}
          <div className="search-contents">
            <div className="search-result">
              {search_result && (
                <p>
                  {<strong>{`"${search_result.content}"`}</strong>} 검색 결과
                </p>
              )}
            </div>
            {/* 추가 검색 결과를 표시*/}
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

export default TopNavSearch;
