// TopNavSearch.jsx
import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import { bookDummy } from "./bookDummy";
import { sentimentDummy } from "../Home/components/sentiment/sentimentDummy";
import RelatedBook from "./components/RelatedBook/RelatedBook";
import RelatedSentiment from "./components/RelatedSentiment/RelatedSentiment";
import RelatedNickname from "./components/RelatedNickname/RelatedNickname";
import "./TopNavSearch.scss";

function TopNavSearch() {
  const navigate = useNavigate();
  const search_result = useLocation().state;
  const content = search_result ? search_result.content : "";
  const displayedItems1 = bookDummy.slice(3, 6);
  const displayedItems2 = sentimentDummy.slice(30, 33);
  //const displayedItems3 = nicknameDummy.slice(0, 3);
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

            <div className="search-additional">
              <div className="related-book">
                <h2>#관련서적</h2>
                <RelatedBook
                  searchResult={search_result}
                  displayedItems={displayedItems1}
                />
              </div>
              <div className="related-sentiment">
                <h2>#센티먼트</h2>
                <RelatedSentiment
                  searchResult={search_result}
                  displayedItems={displayedItems2}
                />
              </div>
              <div className="related-nickname">
                <h2>#닉네임</h2>
                <RelatedNickname
                  searchResult={search_result}
                  displayedItems={displayedItems2} //---- 추후 3으로 수정
                />
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
    </div>
  );
}

export default TopNavSearch;
