//Pagination.jsx
import React from "react";
import rightIcon from "../../../../assets/icons/chevron_right.svg";
import leftIcon from "../../../../assets/icons/chevron_left.svg";
import "./Pagination.scss";

export default function Pagination({ setCursorId, cursorId, pageNum }) {
  const pageItems = 1;
  const renderPagination = () => {
    const paginationItems = [];

    const startPage = Math.floor(cursorId / pageItems) * pageItems + 1;
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
          className={`pagination-item ${i - 1 === cursorId ? "active" : ""}`}
          onClick={() => setCursorId(i - 1)}
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
