import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import starIcon from "../../../../../assets/icons/star.svg";
import boockmarkIcon from "../../../../../assets/icons/bookmark.svg";
import commentIcon from "../../../../../assets/icons/comment.svg";
import likeIcon from "../../../../../assets/icons/like.svg";
import RookieIcon from "../../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../../assets/tiers/그랜드마스터.svg";
import Pagination from "./pagenation";
import axios from "axios";

function formatDateTime(dateTimeString) {
  const year = dateTimeString.slice(6, 10);
  const month = dateTimeString.slice(0, 2);
  const day = dateTimeString.slice(3, 5);
  const hours = dateTimeString.slice(12, 14);
  const minutes = dateTimeString.slice(15, 17);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export default function Sentiment() { 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 3;
    const [cursorId, setCursorId] = useState(1);
    const [sentimentData, setSentimentData] = useState(null);

    useEffect(() => {
      axios.get(`users/1/mypage`, {
        withCredentials: true,
      })
      .then(response => {
        if(response.data.length > 1){
        setSentimentData(response.data[1].sentimentObject);
      }
      }) 
      .catch(error => console.error(error));
    }, []);

  const getTierIcon = (tier) => {
    const tierIcons = {
      루키: RookieIcon,
      실버: SilverIcon,
      골드: GoldIcon,
      다이아: DiaIcon,
      마스터: MasterIcon,
      그랜드마스터: GrandMasterIcon,
    };
    return tierIcons[tier];
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="search-container">
      {sentimentData && sentimentData.map((result) => (
        <div key={result.sentiment_id} className="search-result"> 
            <div className="info">
              <Link
                to={`/sentiment/${result.sentiment_id}/${result.sentiment_title}`}
                className="book-link"
              >
                <img
                  src={`${result.book_image}`}
                  alt={result.book_title}
                />
              </Link>
              <div className="none-img">
                <div className="detail-info">
                  <Link
                    to={`/sentiment/${result.sentiment_id}/${result.sentiment_title}`}
                    className="book-link"
                  >
                    <h3>{result.sentiment_title}</h3>
                  </Link>
                  <p>
                    <strong>{result.book_title}</strong> ({result.author}/
                    {result.publisher})
                  </p>
                </div>
                <div className="additional-info">
                  <div className="nickname">
                    <p>닉네임: {result.nickname} </p>
                  </div>
                  <div className="tier">
                    <p>티어: </p>
                    <img
                      src={getTierIcon(result.tier)}
                      alt="result.tier"
                      className="tier-icon"
                    />
                  </div>
                  <div className="likes">
                    <img src={likeIcon} alt="like" className="like-icon" />
                    <p>{result.like_num}</p>
                  </div>
                  <div className="comments">
                    <img
                      src={commentIcon}
                      alt="comment"
                      className="comment-icon"
                    />
                    <p>{result.comment_num}</p>
                  </div>
                  <div className="bookmarks">
                    <img
                      src={boockmarkIcon}
                      alt="bookmark"
                      className="bookmark-icon"
                    />
                    <p>{result.scrap_num}</p>
                  </div>
                  <p className="datetime">
                    {formatDateTime(result.created_at)}
                  </p>
                </div>
              </div>
            </div>
            <div className="rating-info">
              <img src={starIcon} alt="star" className="star-icon" />
              <p>{result.score.toFixed(1)}</p>
            </div>
          </div>
        ))
        }
      </div>
      <div className="pagination-container">
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}