// RelatedBookResults.jsx
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

  console.log("확인 데이터: ", displayedItems);
  return (
    <>
      <div className="book-results">
        <div className="sort">정확도순</div>
        {displayedItems && displayedItems[0].title &&
        displayedItems.map((result, index) => (
          <div key={index} className="search-result">
            <div className="book-info">
              <img
                src={result.image}
                alt={result.title}
                className="book-image"
              />
              <div className="none-img-detail-info">
                <h2>{result.title}</h2>
                <div className="publish-info">
                  <p style={{fontSize:"16px"}}>
                    {result.author}{"(저자)"} | {result.publisher} |{" "}
                    {formatPublishYear(result.pubdate)}년
                  </p>
                </div>
                <div className="vote-info">
                  <p className="vote-avg">유저평점: &nbsp;</p>
                  <p className="vote-avg">{result.avr_score}</p>
                  <p className="vote-num">&nbsp; ({result.eval_num}명 평가)</p>
                </div>
              </div>
              <button className="select-book">선택</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
