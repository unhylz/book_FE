// RelatedNicknameMore.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import RelatedNicknameResults from "./components/RelatedNicknameResults";
import AcountModalContainer from "../../container/AcountModalContainer";
import sortIcon from "../../assets/icons/sort.svg";
import "./RelatedNicknameMore.scss";
import { NicknameSearch } from "../../modules/api/search";
import { UserContext } from "../../context/Login";

export default function RelatedNicknameMore() {
  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  const userId = user_context.user_data.id; //"2"; //임시 --------------
  const isLogin = user_context.user_data.isLogin;
  const cursorId = "0";

  // 선택한 센티먼트 id와 title 변수
  const { content } = useParams();
  const navigate = useNavigate();
  const [SearchData, setSearchData] = useState(null);
  const [SearchNum, setSearchNum] = useState(null);

  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);

  console.log("content detail page: ", content);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await NicknameSearch(userId, cursorId, content);
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
    if (SearchData) {
      console.log("검색 닉네임 데이터:", SearchData);
      setSearchNum(SearchData.nicknameObject.length);
    }
  }, [SearchData]);

  const handleLogoClick = () => {
    navigate("/");
  };

  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  useEffect(() => {
    window.scrollTo(0, 0);
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
        onLogoClick={handleLogoClick}
        defaultSearchContent={content}
        setModalState={setModalState}
        setModal={setModal}
      />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 부분 */}
        <div className="center">
          <div className="nickname-results-contents">
            <div className="nickname-results-container">
              <div className="results-title">
                <div className="nickname-results">
                  <p>
                    {<strong>{`"${content}"`}</strong>} 닉네임 검색
                    결과&nbsp;&nbsp; 총&nbsp;<strong>{`${SearchNum}`}</strong>명
                  </p>
                </div>
              </div>
              {SearchData && (
                <RelatedNicknameResults
                  searchResult={content}
                  displayedItems={SearchData}
                  userId={userId}
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
