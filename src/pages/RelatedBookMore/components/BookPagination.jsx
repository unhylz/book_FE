//BookPagination.jsx
import React, { useState, useEffect } from "react";
import rightIcon from "../../../assets/icons/chevron_right.svg";
import leftIcon from "../../../assets/icons/chevron_left.svg";
import "./BookPagination.scss";

export default function BookPagination({
  setCursorId,
  cursorId,
  setPageNum,
  pageNum,
}) {
  console.log("1!!!!pagenum: ", pageNum);
  const pageItems = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousClick = () => {
    if (cursorId - pageItems * 5 >= 0) {
      setCurrentPage(currentPage - pageItems);
      setCursorId(cursorId - pageItems * 5);
    }
  };

  const handleNextClick = () => {
    if (currentPage + pageItems <= pageNum) {
      setCurrentPage(currentPage + pageItems);
      setCursorId(cursorId + pageItems * 5);
    } else {
      setCurrentPage(pageNum);
      setCursorId((pageNum - 1) * 5);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setCursorId((page - 1) * 5);
  };

  const renderPagination = () => {
    const paginationItems = [];

    const start = Math.floor((currentPage - 1) / pageItems) * pageItems + 1;

    for (let i = start; i < start + pageItems && i <= pageNum; i++) {
      paginationItems.push(
        <div
          key={i}
          className={`pagination-item ${
            (i - 1) * 5 === cursorId ? "active" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>
      );
    }

    return paginationItems;
  };

  return (
    <div className="pagination">
      <div
        className={`left-right ${currentPage <= pageItems ? "disabled" : ""}`}
        onClick={handlePreviousClick}
      >
        <img src={leftIcon} alt="Previous" />
      </div>
      {renderPagination()}
      <div
        className={`left-right ${
          currentPage >= Math.floor(pageNum / pageItems) * pageItems
            ? "disabled"
            : ""
        }`}
        onClick={handleNextClick}
      >
        <img src={rightIcon} alt="Next" />
      </div>
    </div>
  );
}
