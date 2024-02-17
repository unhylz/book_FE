// Header.jsx
import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BSL_logo from "../../../../assets/logos/BSL_logo.svg";
import topSearch from "../../../../assets/icons/topSearch.svg";
import leagueIcon from "../../../../assets/icons/league.svg";
import writeIcon from "../../../../assets/icons/write.svg";
import notificationIcon from "../../../../assets/icons/notification.svg";
import bellIcon from "../../../../assets/icons/bell.svg";
import logoutIcon from "../../../../assets/icons/logout.svg";
import { userDummy } from "./userDummy.js";
import { UserContext } from "../../../../context/Login";
//import LoginContext from "../../../../modules/api/login_context";
import "./Header.scss";
import { postLogout } from "../../../../modules/api/account.js";

export default function Header({
  onLogoClick,
  defaultSearchContent,
  setModalState,
  setModal,
}) {
  const [content, setContent] = useState(defaultSearchContent || "");
  const navigate = useNavigate();
  const nowContent = useRef();
  const { userName, image } = userDummy[0];

  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  const userId = user_context.user_data.id; //"2"; //임시 --------------
  const isLoggedIn = user_context.user_data.isLogin;
  const [isNotified, setIsNotified] = useState(false); //Notification 알람처리

  const handleLogoClick = () => {
    // 로고 클릭 시 홈으로 이동하면서 sentiment-btn이 선택된 상태로 변경
    navigate("/");
    onLogoClick("sentiment"); // 센티먼트/팔로우 중 센티먼트 기본 선택 상태
  };

  const handleLeagueClick = () => {
    if (isLoggedIn) {
      // League 버튼 클릭 시 SentimentLeague 페이지로 이동
      navigate("/sentiment-league");
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  const handleWriteClick = () => {
    if (isLoggedIn) {
      navigate("/write");
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  const handleNotificationClick = () => {
    if (isLoggedIn) {
      navigate("/notification");
      setIsNotified(false);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  const handleLogoutClick = () => {
    postLogout(); //로그아웃 함수 추가
    user_context.setLogout();
    alert("로그아웃 되었습니다.");
  };

  const handleMypageClick = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  const handleLoginClick = () => {
    //navigate("/modal");
    setModalState("login");
  };

  const handleSignupClick = () => {
    //navigate("/signup");
    setModalState("signup");
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
          value={content === "main" ? "" : content}
          onChange={handleInputChange}
          placeholder="책 제목, 센티먼트, 유저를 검색하세요"
          onKeyUp={handleInputKeyUp}
        />
      </div>
      {/* 로그인, 회원가입 버튼 등 */}

      {/* isLoggedIn && <div>로그인 되었습니다.</div> */}
      <div className="buttons">
        <button className="league-btn" onClick={handleLeagueClick}>
          <img src={leagueIcon} alt="League" className="league-icon" />
          League
        </button>
        <button className="write-btn" onClick={handleWriteClick}>
          <img src={writeIcon} alt="Write" className="write-icon" />
          Write
        </button>

        {!isLoggedIn && (
          <>
            <button className="login-btn" onClick={handleLoginClick}>
              로그인
            </button>
            <button className="signup-btn" onClick={handleSignupClick}>
              <p>회원가입</p>
            </button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button
              className="notification-btn"
              onClick={handleNotificationClick}
            >
              {isNotified && (
                <>
                  <img
                    src={bellIcon}
                    alt="Notification"
                    className="notification-icon"
                  />
                </>
              )}
              {!isNotified && (
                <>
                  <img
                    src={notificationIcon}
                    alt="Notification"
                    className="notification-icon"
                  />
                </>
              )}
              Notification
            </button>
            <button className="logout-btn" onClick={handleLogoutClick}>
              <img src={logoutIcon} alt="Logout" className="logout-icon" />
              Logout
            </button>
            <button className="mypage-btn" onClick={handleMypageClick}>
              <div className="icon-container">
                <div className="image-container">
                  <img
                    src={`/user_image_dummy/${image}`}
                    alt="MyPage"
                    className="mypage-icon"
                  />
                </div>
              </div>
              {userName}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
