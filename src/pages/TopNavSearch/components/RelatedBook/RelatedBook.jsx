// RelatedBook.jsx
import React from "react";
import { Link } from "react-router-dom";
import moreIcon from "../../../../assets/icons/moreicon.svg";
import "./RelatedBook.scss";

export default function RelatedBook({ searchResult, displayedItems }) {
  function formatPublishYear(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = String(dateTime.getFullYear()).slice(-4);

    return `${year}`;
  }

  return (
    <>
      <div className="related-book-container">
        {/* displayedItems가 정의되어 있고, 배열이면 map 함수를 사용하도록 변경 */}
        {displayedItems &&
          Array.isArray(displayedItems) &&
          displayedItems.length > 0 &&
          displayedItems.map((result) => (
            <div key={result.id} className="search-result">
              <div className="related-book-info">
                <Link
                  to={{
                    pathname: `/book/${searchResult.content}/${result.book_title}/${result.id}`,
                    state: { bookInfo: result }, // 책 정보를 상태로 전달
                  }}
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
                    to={`/book/${searchResult.content}/${result.book_title}`}
                    className="more-book-link"
                  >
                    <h3>{result.book_title}</h3>
                  </Link>
                  <div className="publish-info">
                    <p>
                      {formatPublishYear(result.publish)}년 | {result.author} |
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
      <div className="more-details">
        <Link
          to={`/${searchResult.content}/related_book_more`}
          className="more-link"
        >
          <h3>더보기</h3>
          <img src={moreIcon} alt="moreIcon" className="more-icon" />
        </Link>
      </div>
    </>
  );
}
