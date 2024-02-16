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
  const dateTime = new Date(dateTimeString);
  const year = String(dateTime.getFullYear()).slice(-2);
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
} 

export default function MypageScrap() {
    const [selectedButton, setSelectedButton] = useState("sentiment");
    const [sentimentData, setSentimentData] = useState([]); 
    const [result, setResult] = useState();
    const [modalState, setModalState] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const postsPerPage = 5; 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost);
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
    }

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const fetchUserSentiment = async () => {
      try {
        const response = await axios.get(`/users/1/sentiment`);
        setSentimentData(response.data);
        console.log(response.data);
      }
      catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("HTTP 400 Bad Request 오류 발생");
            if (error.response.data && error.response.data.errorCode) {
              console.log("오류 코드:", error.response.data.errorCode);
            }
            if (error.response.data && error.response.data.message) {
              console.log("오류 메시지:", error.response.data.message);
            }
          } else {
            console.log("HTTP 오류 발생:", error.response.status);
          }
        } else {
          console.error("서버 응답 오류 정보 없음");
        }
      }
    }

      useEffect(() => {
    fetchUserSentiment();
    })
    

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
                        {currentPosts.map((data) => (
                            <div key={data.id} className="search-result">
                    <div className="info">
                    <Link
                      to={`/sentiment/${data.id}/${data.sentiment_title}`}
                      className="book-link"
                    >
                      <img
                        src={`/bookcover_dummy/${data.image_file}`}
                        alt={data.title}
                      />
                    </Link>
                    <div className="none-img">
                      <div className="detail-info">
                        <Link
                          to={`/sentiment/${data.id}/${data.sentiment_title}`}
                          className="book-link"
                        >
                          <h3>{data.sentiment_title}</h3>
                        </Link>
                        <p>
                          <strong>{data.book_title}</strong> ({data.author}/
                          {data.publisher})
                        </p>
                      </div>
                      <div className="additional-info">
                        <div className="nickname">
                          <p>닉네임: {data.nickname} </p>
                        </div>
                        <div className="tier">
                          <p>티어: </p>
                          <img
                            src={getTierIcon(data.tier)}
                            alt="result.tier"
                            className="tier-icon"
                          />
                        </div>
                        <div className="likes">
                          <img src={likeIcon} alt="like" className="like-icon" />
                          <p>{data.likes}</p>
                        </div>
                        <div className="comments">
                          <img
                            src={commentIcon}
                            alt="comment"
                            className="comment-icon"
                          />
                          <p>{data.comments}</p>
                        </div>
                        <div className="bookmarks">
                          <img
                            src={boockmarkIcon}
                            alt="bookmark"
                            className="bookmark-icon"
                          />
                          <p>{data.bookmarks}</p>
                        </div>
                        <p className="datetime">{formatDateTime(data.datetime)}</p>
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
            totalPages={Math.ceil(totalItems / itemsPerPage)}
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