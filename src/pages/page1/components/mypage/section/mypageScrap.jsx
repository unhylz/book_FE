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
import { UserContext } from "../../../../../context/Login";
import { useContext } from "react";


export default function MypageScrap() {
    const [selectedButton, setSelectedButton] = useState("sentiment");
    const [modalState, setModalState] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const postsPerPage = 5; 
    const [sentimentData, setSentimentData] = useState([]);
    const user_context = useContext(UserContext);
    console.log(user_context);
    if (user_context && user_context.user_data) {
    console.log("사용자 정보: ", user_context.user_data.id); 
    } else {
    console.log("사용자 데이터가 없습니다.");
    }

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
      const user_Id = user_context.user_data.id;
      axios.get(`users/${user_Id}/scrap`, {
        withCredentials: true,
      })
      .then(response => {
      if(response.data && response.data.sentimentObject){
        setSentimentData(response.data.sentimentObject);
      }
      }) 
      .catch(error => console.error(error));
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
                <strong className="Title">스크랩</strong>
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
                        src={`${result.book_image}`}
                        alt={result.book_title}
                        width="100" height="148"
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
                        <p className="datetime">{(result.create_at)}</p>
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