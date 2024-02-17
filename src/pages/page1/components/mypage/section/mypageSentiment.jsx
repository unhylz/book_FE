import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../../../pages/Home/components/header/Header";
import SideAd from "../../../../Home/components/advertisement/SideAd";
import Footer from "../../../../../pages/Home/components/footer/Footer";
import "../../../../Home/components/sentiment/Sentiment.scss";
import boockmarkIcon from "../../../../../assets/icons/bookmark.svg";
import commentIcon from "../../../../../assets/icons/comment.svg";
import likeIcon from "../../../../../assets/icons/like.svg";
import RookieIcon from "../../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../../assets/tiers/그랜드마스터.svg";
import "../mypage.scss";
import Pagination from "./pagenation";
import axios from "axios";
import "../mypageScrap.scss"

function formatDateTime(dateTimeString) {
  const year = dateTimeString.slice(6, 10);
  const month = dateTimeString.slice(0, 2);
  const day = dateTimeString.slice(3, 5);
  const hours = dateTimeString.slice(12, 14);
  const minutes = dateTimeString.slice(15, 17);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export default function MypageScrap() {
    const [selectedButton, setSelectedButton] = useState("sentiment");
    const [sentimentData, setSentimentData] = useState(null); 
    const [modalState, setModalState] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 5;

    

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
    }

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    useEffect(() => {
      axios.get(`users/1/sentiment`, {
        withCredentials: true,
      })
      .then(response => {
        setSentimentData(response.data)
      })
      .catch(error => console.error(error))
    }, []);
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };



    return (
        <div>
            <Header onLogoClick={handleButtonClick} setModalState={setModalState} />
            <div className="mypage-wrapper">
                <div className="left">
                    <SideAd />
                </div>
                <div className="main-container">
                <strong className="Title">센티멘트</strong>
                <div className="mypage-container">
                    <div className="search-container">
                    {sentimentData && sentimentData.map((result) => (
                    <div key={result.sentiment_id} className="search-result"> 
                    <div className="info">
                    <Link
                      to={`/sentiment/${result.sentiment_id}/${result.sentiment_title}`}
                      className="book-link"
                    >
                      <img
                        src={`/bookcover_dummy/${result.book_image}`}
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
                          <p>{result.likes}</p>
                        </div>
                        <div className="comments">
                          <img
                            src={commentIcon}
                            alt="comment"
                            className="comment-icon"
                          />
                          <p>{result.comments}</p>
                        </div>
                        <div className="bookmarks">
                          <img
                            src={boockmarkIcon}
                            alt="bookmark"
                            className="bookmark-icon"
                          />
                          <p>{result.bookmarks}</p>
                        </div>
                        <p className="datetime">{formatDateTime(result.datetime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              ))}
            </div>
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
          <div className="right">
          <SideAd />
          </div>
          <div>
    </div>
          </div>
          <Footer />
        </div>
    );
}