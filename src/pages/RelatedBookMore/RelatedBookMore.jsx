// RelatedBookMore.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import sortIcon from "../../assets/icons/sort.svg";
import RelatedBookResults from "./components/RelatedBookResults";
import "./RelatedBookMore.scss";
import { BookSearch } from "../../modules/api/search";
import { UserContext } from "../../context/Login";
import AcountModalContainer from "../../container/AcountModalContainer";
import Pagination from "./components/BookPagination";

export default function RelatedBookMore() {
  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  const userId = user_context.user_data.id; //"2"; //임시 --------------
  const isLogin = user_context.user_data.isLogin;

  const [cursorId, setCursorId] = useState(0);
  const [pageNum, setPageNum] = useState(null);

  // 선택한 센티먼트 id와 title 변수
  const { content } = useParams();
  const navigate = useNavigate();
  const [SearchData, setSearchData] = useState(null);
  const [SearchNum, setSearchNum] = useState(null);
  const [SortedSearchData, setSortedSearchData] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // 드롭다운 메뉴 열림/닫힘
  const [selectedSortOption, setSelectedSortOption] = useState("관련순"); // 선택된 정렬 옵션
  const sortOptions = ["관련순", "별점순"]; // 정렬 옵션 리스트

  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);
  const [Num, setNum] = useState(null);

  //console.log("content detail page: ", content);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSortOptionClick = (option) => {
    setIsMenuOpen(false); // 메뉴 닫기
    setSelectedSortOption(option); // 선택한 옵션 설정
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BookSearch(userId, cursorId, content);
        ///*
        const temp = (data.total_page_num - 1) * 5;
        const num = await BookSearch(userId, temp, content);
        setNum(num.cursorId);
        //*/
        setSearchData(data.list);
        setPageNum(data.total_page_num);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    if (content) {
      fetchData();
    }
  }, [content, userId, cursorId]);

  useEffect(() => {
    if (SearchData) {
      console.log("검색 도서 데이터:", SearchData);
    }
  }, [SearchData]);

  useEffect(() => {
    if (pageNum) {
      console.log("PageNum 검색 도서 데이터:", pageNum);
    }
  }, [pageNum]);

  useEffect(() => {
    if (Num) {
      console.log("==----검색 num 데이터:", Num);
      setSearchNum(Num);
    } else {
      setSearchNum(0);
    }
  }, [Num]);

  const handleLogoClick = () => {
    navigate("/");
  };

  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 정렬 함수
    const sortData = (data, option) => {
      console.log("옵션: ", option);
      switch (option) {
        case "관련순":
          //console.log("옵2션: ", data);
          return data;
        case "별점순":
          return data.slice().sort((a, b) => b.avr_score - a.avr_score);
        default:
          return data;
      }
    };

    if (SearchData) {
      // 선택된 정렬 옵션에 따라 데이터를 정렬
      const sortedData = sortData(SearchData, selectedSortOption);
      // 정렬된 데이터를 RelatedSentimentResults 컴포넌트에 전달
      setSortedSearchData(sortedData);
    }
  }, [SearchData, selectedSortOption]);

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
          <div className="results-contents">
            <div className="results-container">
              <div className="results-title">
                <p className="results">
                  {<strong>{`"${content}"`}</strong>} 관련 서적 검색
                  결과&nbsp;&nbsp; 총&nbsp;
                  {<strong>{`${SearchNum}`}</strong>}권
                </p>
                <div className="dropdown2">
                  <button className="sort-btn" onClick={handleMenuToggle}>
                    <img src={sortIcon} alt="Sort" className="sort-icon" />
                    {selectedSortOption}
                  </button>
                  {isMenuOpen && (
                    <div className="dropdown-menu">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSortOptionClick(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {SortedSearchData && (
                <RelatedBookResults
                  searchResult={content}
                  displayedItems={SortedSearchData}
                  cursorId={cursorId}
                  options={selectedSortOption}
                />
              )}
            </div>
            <div className="pagination-container">
              {Array.isArray(SearchData) && (
                <Pagination
                  setCursorId={setCursorId}
                  cursorId={cursorId}
                  setPageNum={setPageNum}
                  pageNum={pageNum}
                />
              )}
            </div>
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
