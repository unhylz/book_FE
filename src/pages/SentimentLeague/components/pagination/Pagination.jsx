//Pagination.jsx
import React from "react";
import rightIcon from "../../../../assets/icons/chevron_right.svg";
import leftIcon from "../../../../assets/icons/chevron_left.svg";
import "./Pagination.scss";

export default function Pagination({
  setCursorId,
  cursorId,
  setPageNum,
  pageNum,
}) {
  const pageItems = 5;
  const renderPagination = () => {
    const paginationItems = [];

    const startPage = Math.floor((cursorId - 1) / pageItems) * pageItems + 1;
    const endPage = Math.min(startPage + pageItems - 1, pageNum);

    if (startPage > 1) {
      paginationItems.push(
        <div
          key="prev"
          className="left-right"
          onClick={() => setCursorId(startPage - pageItems)}
        >
          <img src={leftIcon} alt="Previous" />
        </div>
      );
    } else {
      paginationItems.push(<div key="prev" className="left-right"></div>);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <div
          key={i}
          className={`pagination-item ${i === cursorId ? "active" : ""}`}
          onClick={() => setCursorId(i)}
        >
          {i}
        </div>
      );
    }

    if (endPage < pageNum) {
      paginationItems.push(
        <div
          key="next"
          className="left-right"
          onClick={() => setCursorId(startPage + pageItems)}
        >
          <img src={rightIcon} alt="Next" />
        </div>
      );
    } else {
      paginationItems.push(<div key="next" className="left-right"></div>);
    }

    return paginationItems;
  };

  return <div className="pagination">{renderPagination()}</div>;
}
