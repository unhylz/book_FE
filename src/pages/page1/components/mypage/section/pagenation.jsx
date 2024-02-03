import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-container">
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Pagination;