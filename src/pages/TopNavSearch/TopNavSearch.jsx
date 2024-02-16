// TopNavSearch.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import { bookDummy } from "./bookDummy";
import { sentimentDummy } from "../Home/components/sentiment/sentimentDummy";
import RelatedBook from "./components/RelatedBook/RelatedBook";
import RelatedSentiment from "./components/RelatedSentiment/RelatedSentiment";
import RelatedNickname from "./components/RelatedNickname/RelatedNickname";
import AcountModalContainer from "../../container/AcountModalContainer";
import "./TopNavSearch.scss";
import { topNavSearch } from "../../modules/api/search";

function TopNavSearch() {
  //isLogin:false, id:null, email:null
  const userId = "2"; //추후 수정 --------

  const navigate = useNavigate();
  const search_result = useLocation().state;
  const content = search_result ? search_result.content : "";
  //const displayedItems1 = bookDummy.slice(3, 6);
  //const displayedItems2 = sentimentDummy.slice(30, 33);
  //const displayedItems3 = nicknameDummy.slice(0, 3);
  const [modalState, setModalState] = useState(null);
  const [SearchData, setSearchData] = useState(null);

  const handleLogoClick = () => {
    navigate("/");
  };

  console.log("content: ", content);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await topNavSearch(content, userId);
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
    if (SearchData && SearchData.searchSentimentObject) {
      console.log("검색 도서 데이터:", SearchData.searchSentimentObject);
    }
  }, [SearchData]);

  return (
    <div>
      <Header
        onLogoClick={handleLogoClick}
        defaultSearchContent={content}
        setModalState={setModalState}
      />
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

            <div className="search-additional">
              <div className="related-book">
                <h2>#관련서적</h2>
                {SearchData &&
                  SearchData.searchBookObject &&
                  SearchData.searchBookObject.bookObject && (
                    <RelatedBook
                      searchResult={search_result}
                      displayedItems={SearchData.searchBookObject}
                      userId={userId}
                    />
                  )}
              </div>
              <div className="related-sentiment">
                <h2>#센티먼트</h2>
                {SearchData &&
                  SearchData.searchSentimentObject &&
                  SearchData.searchSentimentObject.sentimentObject && (
                    <RelatedSentiment
                      searchResult={search_result}
                      displayedItems={SearchData.searchSentimentObject}
                      userId={userId}
                    />
                  )}
              </div>
              <div className="related-nickname">
                <h2>#닉네임</h2>
                {SearchData &&
                  SearchData.searchNicknameObject &&
                  SearchData.searchNicknameObject.nicknameObject && (
                    <RelatedNickname
                      searchResult={search_result}
                      displayedItems={SearchData.searchNicknameObject}
                      userId={userId}
                    />
                  )}
              </div>
            </div>
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

export default TopNavSearch;
