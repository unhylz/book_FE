// Home.jsx
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import SideAd from "../../pages/Home/components/advertisement/SideAd";
import MainAd from "../../pages/Home/components/advertisement/MainAd";
import Sentiment from "./components/sentiment/Sentiment";
import Footer from "./components/footer/Footer";
import AcountModalContainer from "../../container/AcountModalContainer";
import { UserContext } from "../../context/Login";
import { SentimentData } from "../../modules/api/search";
import { FollowSentimentData } from "../../modules/api/search";
import "./Home.scss";

export default function Home() {
  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  const userId = user_context.user_data.id; //"2"; //임시 --------------
  const isLogin = user_context.user_data.isLogin;

  const [selectedButton, setSelectedButton] = useState("sentiment");
  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);

  const [cursorId, setCursorId] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(selectedButton);

        if (selectedButton === "sentiment") {
          const data = await SentimentData(cursorId);
          setPageNum(data.result.total_page_num);
        }
        if (selectedButton === "follow") {
          const data = await FollowSentimentData(userId, cursorId);
          setPageNum(data.result.total_page_num);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, selectedButton]);

  useEffect(() => {
    if (pageNum) {
      console.log("pageNum data ?????:", pageNum);
    }
  }, [pageNum]);

  const handleButtonClick = (button) => {
    if (!isLogin && button === "follow") {
      alert("로그인이 필요한 기능입니다.");
    } else {
      setSelectedButton(button);
    }
  };

  const handleCloseModal = () => {
    setModalState(null);
  };

  useEffect(() => {
    // 홈 페이지 진입 시 기본으로 sentiment 버튼이 선택된 상태로 표시
    setSelectedButton("sentiment");
  }, []);

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
        onLogoClick={handleButtonClick}
        setModalState={setModalState}
        onCloseModal={handleCloseModal}
        setModal={setModal}
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
            <Sentiment
              userId={userId}
              selectedButton={selectedButton}
              setCursorId={setCursorId}
              cursorId={cursorId}
              setPageNum={setPageNum}
              pageNum={pageNum}
            />
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
