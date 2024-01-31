import React from 'react';
import "../../../../Home/components/sentiment/Sentiment.scss";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination-container">
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;