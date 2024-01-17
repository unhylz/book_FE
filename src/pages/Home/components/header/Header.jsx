// Header.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BSL_logo from "../../../../assets/logos/BSL_logo.svg";
import topSearch from "../../../../assets/icons/topSearch.svg";
import league from "../../../../assets/icons/league.svg";
import write from "../../../../assets/icons/write.svg";
import "./Header.scss";

export default function Header({ onLogoClick, defaultSearchContent }) {
  const [content, setContent] = useState(defaultSearchContent || "");
  const navigate = useNavigate();
  const nowContent = useRef();

  const handleLogoClick = () => {
    // 로고 클릭 시 홈으로 이동하면서 sentiment-btn이 선택된 상태로 변경
    navigate("/");
    onLogoClick("sentiment");
  };

  const handleLeagueClick = () => {
    // League 버튼 클릭 시 SentimentLeague 페이지로 이동
    navigate("/sentiment-league");
  };

  const handleSearchButtonClick = () => {
    goToSearchPage();
  };

  /*
  const goToSearchPage = (e) => {
    if (e.key === "Enter") {
      navigate("/top-nav-search?query=" + content, { state: { content } });
    } else {
      setContent(nowContent.current.value);
    }
  };
  */

  const goToSearchPage = () => {
    if (content.trim() === "") {
      alert("검색어를 입력해주세요.");
    } else {
      navigate("/top-nav-search?query=" + content, { state: { content } });
    }
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      goToSearchPage();
    }
  };

  return (
    <header className="header">
      {/* "header" 클래스를 추가 */}
      {/* 로고 */}
      <div className="logo" onClick={handleLogoClick}>
        <img src={BSL_logo} alt="BSL Logo" className="logo-image" />
      </div>
      {/* 검색창 */}
      <div className="search-bar">
        {/* 검색 버튼 */}
        <div className="search-button" onClick={handleSearchButtonClick}>
          <img src={topSearch} alt="Search" />
        </div>
        {/* 검색 입력창 */}
        <input
          type="input"
          ref={nowContent}
          value={content}
          onChange={handleInputChange}
          placeholder="책 제목, 센티먼트, 유저를 검색하세요"
          onKeyUp={handleInputKeyUp}
        />
      </div>
      {/* 로그인, 회원가입 버튼 등 */}
      <div className="buttons">
        <button className="league-btn" onClick={handleLeagueClick}>
          <img src={league} alt="League" className="league-icon" />
          League
        </button>
        <button className="write-btn" onClick={() => {}}>
          <img src={write} alt="Write" className="write-icon" />
          Write
        </button>
        <button className="login-btn">로그인</button>
        <button className="signup-btn">회원가입</button>
      </div>
    </header>
  );
}
