// TopNavSearch.jsx
import React from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import moreIcon from "../../assets/icons/moreicon.svg";
import { bookDummy } from "./bookDummy";

import "./TopNavSearch.scss";

function TopNavSearch() {
  const navigate = useNavigate();
  const search_result = useLocation().state;
  const content = search_result ? search_result.content : "";

  const displayedItems = bookDummy.slice(0, 3);


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
                <div className="related-book-container">
                  {displayedItems.map((result) => (
                    <div key={result.id} className="search-result">
                      <div className="related-book-info">
                        <Link
                          to={`/book/${search_result.content}/${result.book_title}`}
                          className="more-book-link"
                        >
                          <img
                            src={`bookcover_dummy/${result.image_file}`}
                            alt={result.title}
                            className="book-image"
                          />
                        </Link>
                        <div className="none-img-detail-info">
                          <Link
                            to={`/book/${search_result.content}/${result.book_title}`}
                            className="more-book-link"
                          >
                            <h3>{result.book_title}</h3>
                          </Link>
                          <div className="publish-info">
                            <p>
                              {result.publish_year}년 | {result.author} |
                              {result.publisher}
                            </p>
                          </div>
                          <div className="vote-info">
                            <p>평균평점: </p>
                            <p className="vote-avg">{result.vote_avg}</p>
                            <p className="vote-num">({result.vote}명 참여)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="more-books">
                  <Link
                    to={`/${search_result.content}/related_book_more`}
                    className="more-book-link"
                  >
                    <h3>더보기</h3>
                    <img src={moreIcon} alt="moreIcon" className="more-icon" />
                  </Link>
                </div>
              </div>
              <div className="related-sentiment">
                <h2>#센티먼트</h2>
              </div>
              <div className="related-nickname">
                <h2>#닉네임</h2>
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
