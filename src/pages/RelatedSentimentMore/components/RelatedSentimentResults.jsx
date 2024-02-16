// RelatedSentimentResults.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { sentimentDummy } from "../../Home/components/sentiment/sentimentDummy.js";
import starIcon from "../../../assets/icons/star.svg";
import boockmarkIcon from "../../../assets/icons/bookmark.svg";
import commentIcon from "../../../assets/icons/comment.svg";
import likeIcon from "../../../assets/icons/like.svg";
import RookieIcon from "../../../assets/tiers/루키.svg";
import SilverIcon from "../../../assets/tiers/실버.svg";
import GoldIcon from "../../../assets/tiers/골드.svg";
import DiaIcon from "../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../assets/tiers/그랜드마스터.svg";
import "./RelatedSentimentResults.scss";

function formatDateTime(dateTimeString) {
  /*
  const dateTime = new Date(dateTimeString);
  const year = String(dateTime.getFullYear()).slice(-2);
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
*/

  const year = dateTimeString.slice(6, 10);
  const month = dateTimeString.slice(0, 2);
  const day = dateTimeString.slice(3, 5);
  const hours = dateTimeString.slice(12, 14);
  const minutes = dateTimeString.slice(15, 17);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export default function RelatedSentimentResults({
  searchResult,
  displayedItems,
}) {
  //const displayedItems = sentimentDummy.slice(30, 36);

  //티어 아이콘 색상 변경용
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
    <>
      <div className="related-sentiment-results">
        {displayedItems.map((result, index) => (
          <div key={index} className="related-sentiment-search-result">
            <div className="info">
              <Link
                to={`/sentiment/${searchResult}/${result.sentiment_id}/${result.sentiment_title}`}
                className="book-link"
              >
                <div className="book-cover">
                  <img src={result.book_image} alt={result.book_title} />
                </div>
              </Link>
              <div className="none-img">
                <div className="detail-info">
                  <Link
                    to={`/sentiment/${searchResult}/${result.sentiment_id}/${result.sentiment_title}`}
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
      </div>
    </>
  );
}
