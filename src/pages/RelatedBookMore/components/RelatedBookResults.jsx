// RelatedBookResults.jsx
import React from "react";
import { Link } from "react-router-dom";
//import { bookDummy } from "../../TopNavSearch/bookDummy";
import "./RelatedBookResults.scss";

export default function RelatedBookResults({
  searchResult,
  displayedItems,
  cursorId,
  options,
}) {
  //const displayedItems = bookDummy.slice(0, 8);

  function formatPublishYear(dateTimeString) {
    //const dateTime = new Date(dateTimeString);
    //const year = String(dateTime.getFullYear()).slice(-4);
    const year = dateTimeString.slice(0, 4);

    return `${year}`;
  }

  //console.log("확인 데이터: ", displayedItems);
  return (
    <>
      <div className="related-book-results">
        {displayedItems.map((result, index) => (
          <div key={index} className="search-result">
            <div className="related-book-info">
              <Link
                to={`/book/${searchResult}/${result.title}/${cursorId}/${index}/${options}`}
                className="more-book-link"
              >
                <img
                  src={result.image}
                  alt={result.title}
                  className="book-image"
                />
              </Link>
              <div className="none-img-detail-info">
                <Link
                  to={`/book/${searchResult}/${result.title}/${cursorId}/${index}/${options}`}
                  className="more-book-link"
                >
                  <h3>{result.title}</h3>
                </Link>
                <div className="publish-info">
                  <p>
                    {formatPublishYear(result.pubdate)}년 | {result.author} |{" "}
                    {result.publisher}
                  </p>
                </div>
                <div className="vote-info">
                  <p>평균평점: &nbsp;</p>
                  <p className="vote-avg">{result.avr_score}</p>
                  <p className="vote-num">&nbsp; ({result.eval_num}명 참여)</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
