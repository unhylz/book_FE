// RelatedBookResults.jsx
import React from "react";
import { Link } from "react-router-dom";
//import { bookDummy } from "../../TopNavSearch/bookDummy";
import "./BookSearch.scss";

export default function BookSearch({
  displayedItems,
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
            <img
                  src={result.image}
                  alt={result.title}
                  className="book-image"
                />
              <div className="none-img-detail-info">
                <h3>{result.title}</h3>
                <div className="publish-info">
                  <p>
                    {formatPublishYear(result.pubdate)}년 | {result.author} |{" "}
                    {result.publisher}
                  </p>
                </div>
                <div className="vote-info">
                  <p>유저평점: &nbsp;</p>
                  <p className="vote-avg">{result.avr_score}</p>
                  <p className="vote-num">&nbsp; ({result.eval_num}명 평가)</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}