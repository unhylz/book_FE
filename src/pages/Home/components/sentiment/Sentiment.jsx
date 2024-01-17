// Sentiment.jsx
import React, { useState } from "react";
import { sentimentDummy } from "./sentimentDummy";
import "./Sentiment.scss";

function Sentiment() {
  const searchResults = sentimentDummy;

  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 번호 클릭 시 해당 페이지로 이동하는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="search-container">
        {/* 검색 결과 리스트 */}
        {searchResults.map((result) => (
          <div key={result.id} className="search-result">
            <img src={result.image} alt={result.title} />
            <div className="info">
              <div className="detail-info">
                <h3>{result.title}</h3>
                <p>{result.subtitle}</p>
                <p>{result.author}</p>
                <p>{result.publisher}</p>
              </div>
              <div className="additional-info">
                <p>{result.nickname}</p>
                <p>{result.tier}</p>
                <p>Likes: {result.likes}</p>
                <p>Comments: {result.comments}</p>
                <p>Bookmarks: {result.bookmarks}</p>
                <p>
                  {result.date} {result.time}
                </p>
              </div>
            </div>
            <div className="rating-info">
              <p>{result.rating}</p>
            </div>
          </div>
        ))}
      </div>
      {/* 페이지 번호 */}
      <div className="pagination">
        {Array.from({ length: 5 }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Sentiment;
