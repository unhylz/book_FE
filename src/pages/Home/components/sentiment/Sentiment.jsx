import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { sentimentDummy } from "./sentimentDummy";
import starIcon from "../../../../assets/icons/star.svg";
import boockmarkIcon from "../../../../assets/icons/bookmark.svg";
import commentIcon from "../../../../assets/icons/comment.svg";
import likeIcon from "../../../../assets/icons/like.svg";
import RookieIcon from "../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../assets/tiers/그랜드마스터.svg";
import rightIcon from "../../../../assets/icons/chevron_right.svg";
import leftIcon from "../../../../assets/icons/chevron_left.svg";
import "./Sentiment.scss";
import { SentimentData } from "../../../../modules/api/search";
import { FollowSentimentData } from "../../../../modules/api/search";

function formatDateTime(dateTimeString) {
  const year = dateTimeString.slice(6, 10);
  const month = dateTimeString.slice(0, 2);
  const day = dateTimeString.slice(3, 5);
  const hours = dateTimeString.slice(12, 14);
  const minutes = dateTimeString.slice(15, 17);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export default function Sentiment({ userId, selectedButton }) {
  const cursorId = "1"; // 센티먼트는 커서 1부터 추후 수정 ----------------

  const itemsPerPage = 2;
  const PageNumPerPage = 3;
  const [SearchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(PageNumPerPage);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    try {
      if (selectedButton === "sentiment") {
        const data = await SentimentData(cursorId);
        setSearchData(data.result);
      }
      if (selectedButton === "follow") {
        const data = await FollowSentimentData(userId, cursorId);
        setSearchData(data.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(selectedButton);

        if (selectedButton === "sentiment") {
          const data = await SentimentData(cursorId);
          setSearchData(data.result);
        }
        if (selectedButton === "follow") {
          const data = await FollowSentimentData(userId, cursorId);
          setSearchData(data.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, selectedButton]);

  useEffect(() => {
    if (SearchData) {
      console.log("Sentiment data:", SearchData);
    }
  }, [SearchData]);

  const getTierIcon = (tier) => {
    const tierIcons = {
      루키: RookieIcon,
      실버: SilverIcon,
      골드: GoldIcon,
      다이아: DiaIcon,
      마스터: MasterIcon,
      그랜드마스터: GrandMasterIcon,
    };

    const DefaultIcon = () => null;
    const formattedTier = tier.toLowerCase().replace(/\s/g, "");

    const SelectedIcon = tierIcons[formattedTier] || DefaultIcon;

    return SelectedIcon;
  };

  return (
    <div>
      <div className="search-container">
        {Array.isArray(SearchData) &&
          SearchData &&
          SearchData.map((result) => (
            <div key={result.sentiment_id} className="search-result">
              <div className="info">
                <Link
                  to={`/sentiment/main/${result.sentiment_id}/${result.sentiment_title}`}
                  className="book-link"
                >
                  <img src={result.book_image} alt={result.book_title} />
                </Link>
                <div className="none-img">
                  <div className="detail-info">
                    <Link
                      to={`/sentiment/main/${result.sentiment_id}/${result.sentiment_title}`}
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
          ))}
        {!Array.isArray(SearchData) && <p>센티먼트가 없습니다.</p>}
      </div>
      <div className="pagination-container">
        <div className="pagination">페이지네이션 추가</div>
      </div>
    </div>
  );
}
